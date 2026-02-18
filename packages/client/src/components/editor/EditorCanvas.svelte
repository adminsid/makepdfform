<script lang="ts">
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';
  import { page } from '$app/stores';
  import PDFPage from './PDFPage.svelte';
  import Toolbar from './Toolbar.svelte';
  import Header from './Header.svelte';
  import { PDFRenderer } from '$lib/pdf/renderer';
  import { PDFGenerator } from '$lib/pdf/generator';
  import type { EditorCanvasManager } from '$lib/editor/canvas';
  import type { FormField } from '$lib/types';
  import { CollaborationManager } from '$lib/collaboration';

  let pdfRenderer = new PDFRenderer();
  let pdfGenerator = new PDFGenerator();
  
  let numPages = $state(0);
  let scale = $state(1.5);
  let isLoaded = $state(false);
  let formId = $state<string | null>(null);
  let isSaving = $state(false);
  let isPro = $state(false);
  let brandingConfig = $state({ logoUrl: '', primaryColor: '#000000' });
  let selectedTool = $state<string | null>(null);

  async function handleLogoUpload(file: File) {
      if (!formId) return;
      try {
          const res = await fetch(`/api/forms/${formId}/branding/logo`, {
              method: 'PUT',
              headers: { 'Content-Type': file.type },
              body: await file.arrayBuffer()
          });
          const data = await res.json();
          if (data.logoUrl) {
              brandingConfig.logoUrl = data.logoUrl;
              await saveBranding();
          }
      } catch (e) {
          console.error(e);
          alert('Failed to upload logo');
      }
  }

  async function handleBrandingUpdate(config: any) {
      brandingConfig = config;
      await saveBranding();
  }

  async function handleSaveTemplate() {
      if (!originalPdfBytes) return;
      isSaving = true;
      try {
          // 1. Gather fields
          const allFields: FormField[] = [];
          Object.entries(managers).forEach(([p, manager]) => {
              allFields.push(...manager.getFields(Number(p)));
          });

          // 2. Create new form (Clone)
          const res = await fetch('/api/forms', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ 
                  title: 'New Template',
                  fields: allFields 
              })
          });
          const data = await res.json();
          const newId = data.id;

          // 3. Upload same PDF
          await fetch(`/api/forms/${newId}/file`, {
              method: 'PUT',
              headers: { 'Content-Type': 'application/pdf' },
              body: new Blob([originalPdfBytes as any], { type: 'application/pdf' })
          });

          // 4. Redirect
          goto(`/editor?id=${newId}`, { invalidateAll: true });
          alert('Template saved as new form!');
      } catch (e) {
          console.error(e);
          alert('Failed to save template');
      } finally {
          isSaving = false;
      }
  }

  async function saveBranding() {
      if (!formId) return;
      try {
          await fetch(`/api/forms/${formId}/branding`, {
              method: 'PATCH',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(brandingConfig)
          });
      } catch (e) {
          console.error('Failed to save branding', e);
      }
  }

  async function handleUpgrade() {
      if (!formId) return;
      try {
          const res = await fetch('/api/billing/create-checkout-session', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ formId })
          });
          const data = await res.json();
          if (data.url) {
              window.location.href = data.url;
          }
      } catch (e) {
          console.error(e);
          alert('Failed to initiate upgrade');
      }
  }

  $effect(() => {
      const id = $page.url.searchParams.get('id');
      if (id && id !== formId) {
          formId = id;
      }
  });
  
  let originalPdfBytes: Uint8Array | null = $state.raw(null);
  let managers = $state<Record<number, EditorCanvasManager>>({});
  
  // Collaboration State
  let collabManager: CollaborationManager | null = null;
  let remoteCursors = $state<Record<string, { x: number, y: number, color: string, page: number }>>({});
  
  // Derived cursors per page
  function getCursorsForPage(page: number) {
      const pageCursors: Record<string, { x: number, y: number, color: string }> = {};
      Object.entries(remoteCursors).forEach(([id, c]) => {
          if (c.page === page) {
              pageCursors[id] = { x: c.x, y: c.y, color: c.color || 'red' };
          }
      });
      return pageCursors;
  }

  function registerManager(page: number, manager: EditorCanvasManager) {
      managers[page] = manager;
      
      // Listen for local updates to sync
      manager.onUpdate = () => {
          if (collabManager) {
              const allFields: FormField[] = [];
              Object.entries(managers).forEach(([p, m]) => {
                  allFields.push(...m.getFields(Number(p)));
              });
              collabManager.sendFieldsUpdate(allFields);
          }
      };
  }


  // Effect to load data when formId changes
  $effect(() => {
      async function loadFormData() {
          if (formId && !isLoaded) {
              try {
                  // 1. Fetch Form Data (Fields)
                  const res = await fetch(`/api/forms/${formId}`);
                  if (!res.ok) throw new Error('Failed to load form data');
                  const formData = await res.json();
                  isPro = !!formData.isPro;
                  brandingConfig = formData.brandingConfig || { logoUrl: '', primaryColor: '#000000' };
                  
                  // 2. Fetch Base PDF
                  const fileRes = await fetch(`/api/forms/${formId}/file`);
                  if (!fileRes.ok) throw new Error('Failed to load PDF file');
                  const buffer = await fileRes.arrayBuffer();
                  
                  // 3. Load PDF
                  originalPdfBytes = new Uint8Array(buffer);
                  // Pass a copy to the renderer
                  const rendererCopy = new Uint8Array(originalPdfBytes);
                  await pdfRenderer.loadDocument(rendererCopy);
                  numPages = pdfRenderer.getNumPages();
                  isLoaded = true;

                  // 4. Initialize Collaboration
                  initialFieldsCache = formData.fields || [];
                  initializeCollaboration(initialFieldsCache);

              } catch (e) {
                  console.error('Error loading form:', e);
                  alert('Failed to load form');
              }
          }
      }

      loadFormData();
  });

  // Effect to apply initial fields to managers when cache is populated
  $effect(() => {
      const managerEntries = Object.entries(managers);
      if (initialFieldsCache.length > 0 && managerEntries.length > 0) {
          managerEntries.forEach(([pageStr, manager]) => {
              const page = Number(pageStr);
              const pageFields = initialFieldsCache.filter(f => f.page === page);
              if (pageFields.length > 0) {
                  manager.setFields(pageFields);
              }
          });
      }
  });

  function initializeCollaboration(initialFields: FormField[] = []) {
      if (collabManager) return; // Already initialized?
      // Actually we might want to re-init if formId changed?
      // But for now assuming simple flow.
      if (!formId) return;
      
      console.log('Initializing Collaboration for', formId);

      collabManager = new CollaborationManager(formId);
      
      collabManager.onFieldsUpdate = (fields) => {
          if (fields.length === 0 && initialFieldsCache.length > 0) {
              console.log('Collaboration room is empty, seeding with initial fields');
              collabManager?.sendFieldsUpdate(initialFieldsCache);
              return;
          }
          
          const fieldsByPage = new Map<number, FormField[]>();
          fields.forEach(f => {
              if (!fieldsByPage.has(f.page)) fieldsByPage.set(f.page, []);
              fieldsByPage.get(f.page)!.push(f);
          });
          
          Object.entries(managers).forEach(([pageStr, manager]) => {
              const page = Number(pageStr);
              const pageFields = fieldsByPage.get(page) || [];
              manager.setFields(pageFields);
          });
      };

      collabManager.onCursorMove = (clientId, x, y, page) => {
          remoteCursors[clientId] = { x, y, page, color: 'red' }; 
      };

      // Set initial fields locally
      // We need to apply these to managers when they register.
      initialFieldsCache = initialFields;
      // Also apply to any EXISTING managers (if any)
      Object.entries(managers).forEach(([pageStr, manager]) => {
         const page = Number(pageStr);
         const pageFields = initialFieldsCache.filter(f => f.page === page);
         if (pageFields.length > 0) manager.setFields(pageFields);
      });
      
      collabManager.connect();
  }
  
  let initialFieldsCache = $state<FormField[]>([]);

  // Track local cursor
  function handleMouseMove(e: MouseEvent, page: number) {
      if (collabManager) {
          const target = e.currentTarget as HTMLElement;
          const rect = target.getBoundingClientRect();
          const x = (e.clientX - rect.left) / scale;
          const y = (e.clientY - rect.top) / scale;
          
          collabManager.sendCursorMove(x, y, page);
      }
  }

  async function handleFileUpload(e: Event) {
    const target = e.target as HTMLInputElement;
    const file = target.files?.[0];
    if (!file) return;

    try {
        const buffer = await file.arrayBuffer();
        originalPdfBytes = new Uint8Array(buffer);
        // Pass a copy to the renderer because PDF.js might detach the buffer when transferring to worker
        const rendererCopy = new Uint8Array(originalPdfBytes);
        await pdfRenderer.loadDocument(rendererCopy);
        numPages = pdfRenderer.getNumPages();
        isLoaded = true;
    } catch (err) {
        console.error(err);
        alert("Failed to load PDF");
    }
  }

  async function handleDownload() {
      if (!originalPdfBytes) return;
      
      try {
        console.log('Downloading...', { 
            hasBytes: !!originalPdfBytes, 
            byteLength: originalPdfBytes?.length 
        });

        const allFields: FormField[] = [];
        Object.entries(managers).forEach(([p, manager]) => {
            allFields.push(...manager.getFields(Number(p)));
        });

        // Ensure we pass a clean Uint8Array, not a proxy (redundant with $state.raw but safe)
        const bytesCopy = new Uint8Array(originalPdfBytes);
        const modifiedPdfBytes = await pdfGenerator.embedFields(bytesCopy, allFields);
        const blob = new Blob([modifiedPdfBytes as any], { type: 'application/pdf' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'form-edited.pdf';
        a.click();
        URL.revokeObjectURL(url);
      } catch (e) {
          console.error("Failed to download", e);
          alert("Failed to generate PDF for download");
      }
  }

  async function handleSave() {
      if (!originalPdfBytes) return;
      isSaving = true;

      try {
          // 1. Gather all fields
          const allFields: FormField[] = [];
          Object.entries(managers).forEach(([p, manager]) => {
              allFields.push(...manager.getFields(Number(p)));
          });

          if (!formId) {
              // CREATE NEW FORM
              const res = await fetch('/api/forms', {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({ 
                      title: 'Untitled Form',
                      fields: allFields 
                  })
              });
              
              if (!res.ok) throw new Error('Failed to create form');
              const data = await res.json();
              formId = data.id;

              // Upload Original PDF (Clean)
              const uploadRes = await fetch(`/api/forms/${formId}/file`, {
                  method: 'PUT',
                  headers: { 'Content-Type': 'application/pdf' },
                  body: new Blob([originalPdfBytes as any], { type: 'application/pdf' })
              });
              
              if (!uploadRes.ok) throw new Error('Failed to upload file');
              
              // Init collab for this new form
              initializeCollaboration(allFields);

              // Navigate to the new ID so URL is correct
              goto(`?id=${formId}`, { replaceState: true });

          } else {
              // UPDATE EXISTING FORM
              // Save Fields
              const res = await fetch(`/api/forms/${formId}`, {
                  method: 'PATCH',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({ fields: allFields })
              });

              if (!res.ok) throw new Error('Failed to save fields');
          }

          alert(`Form saved! ID: ${formId}`);
      } catch (e) {
          console.error('Failed to save', e);
          alert('Failed to save form');
      } finally {
          isSaving = false;
      }
  }
</script>

<div class="editor-layout">
  {#if isLoaded}
    <div class="sidebar">
      <Toolbar 
        {selectedTool} 
        {isPro} 
        {brandingConfig}
        onSelect={(t: string | null) => selectedTool = t} 
        onLogoUpload={handleLogoUpload}
        onBrandingUpdate={handleBrandingUpdate}
      />
    </div>
  {/if}

  <div class="main-content">
    {#if !isLoaded}
      <div class="upload-container">
        <input type="file" accept="application/pdf" onchange={handleFileUpload} />
        <p>Upload a PDF to start editing</p>
      </div>
    {:else}
      <Header 
        onDownload={handleDownload} 
        onSave={handleSave} 
        onUpgrade={handleUpgrade}
        onSaveTemplate={handleSaveTemplate}
        {isSaving} 
        {isPro}
      />

      <div class="toolbar-controls">
        <button onclick={() => scale = Math.max(0.5, scale - 0.1)}>-</button>
        <span>{Math.round(scale * 100)}%</span>
        <button onclick={() => scale = Math.min(3.0, scale + 0.1)}>+</button>
      </div>

      <div class="pages-container">
        {#each Array(numPages) as _, i}
          <div 
            class="page-wrapper" 
            onmousemove={(e) => handleMouseMove(e, i + 1)}
            role="presentation"
          >
            <PDFPage 
                {pdfRenderer} 
                pageNumber={i + 1} 
                {scale} 
                {registerManager}
                {selectedTool}
                {brandingConfig}
                cursors={getCursorsForPage(i + 1)}
            />
          </div>
        {/each}
      </div>
    {/if}
  </div>
</div>

<style>
  .editor-layout {
    display: flex;
    min-height: 100vh;
    background-color: #f5f5f5;
  }

  .sidebar {
    position: sticky;
    top: 0;
    height: 100vh;
    z-index: 100;
  }

  .main-content {
    flex: 1;
    display: flex;
    flex-direction: column;
    padding: 0; /* Remove padding to let header go full width */
    overflow-y: auto;
  }

  .upload-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 300px;
    width: 500px;
    background: white;
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0,0,0,0.1);
    margin: 100px auto;
  }

  .toolbar-controls {
    position: sticky;
    top: 80px; /* Below header */
    left: 50%;
    transform: translateX(-50%); /* Centered but relative to regular flow if not fixed... sticky interacts with flex parents intricately */
    /* Let's simplify: just put it in the flow below header */
    margin: 20px auto;
    z-index: 90;
    background: white;
    padding: 10px 20px;
    border-radius: 20px;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    display: flex;
    gap: 10px;
    align-items: center;
    width: fit-content;
  }

  .pages-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    padding-bottom: 50px;
  }

  .page-wrapper {
    margin-bottom: 20px;
    transition: transform 0.2s ease-out, opacity 0.3s ease-in;
    animation: fadeIn 0.5s ease-out;
  }

  @keyframes fadeIn {
      from { opacity: 0; transform: translateY(10px); }
      to { opacity: 1; transform: translateY(0); }
  }

  .sidebar :global(.pro-tag) {
      /* We can't easily pass the primary color to the tag without more props, 
         but let's keep it black for the minimal look unless it's Pro */
  }
</style>
