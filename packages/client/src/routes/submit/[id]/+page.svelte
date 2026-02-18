<script lang="ts">
  import { page } from '$app/stores';
  import { onMount } from 'svelte';
  import { PDFRenderer } from '$lib/pdf/renderer';
  import type { FormField } from '$lib/types';
  import PDFPage from '../../../components/editor/PDFPage.svelte'; // Reuse for rendering

  let formId = $derived($page.params.id);
  let form: any = $state(null);
  let pdfBytes: Uint8Array | null = $state(null);
  let pdfRenderer = new PDFRenderer();
  let numPages = $state(0);
  let scale = $state(1.5);
  let isLoaded = $state(false);
  let formData: Record<string, any> = $state({});
  let isSubmitting = $state(false);
  let issubmitted = $state(false);

  onMount(async () => {
    try {
      // 1. Fetch Form Metadata
      const res = await fetch(`/api/forms/${formId}`);
      if (!res.ok) throw new Error('Form not found');
      form = await res.json();

      // 2. Fetch PDF
      const fileRes = await fetch(`/api/forms/${formId}/file`);
      if (!fileRes.ok) throw new Error('PDF not found');
      const buffer = await fileRes.arrayBuffer();
      pdfBytes = new Uint8Array(buffer);
      
      await pdfRenderer.loadDocument(pdfBytes);
      numPages = pdfRenderer.getNumPages();
      isLoaded = true;
      
      // Initialize form data
      if (form.fields) {
          form.fields.forEach((f: FormField) => {
             if (f.type === 'checkbox') {
                 formData[f.id] = f.value === 'true' || f.value === true;
             } else {
                 formData[f.id] = f.value || '';
             }
          });
      }
    } catch (e) {
      console.error(e);
      alert('Failed to load form');
    }
  });

  async function handleSubmit() {
    isSubmitting = true;
    try {
      const res = await fetch(`/api/submissions/${formId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      
      if (!res.ok) throw new Error('Submission failed');
      issubmitted = true;
    } catch (e) {
      console.error(e);
      alert('Failed to submit form');
    } finally {
      isSubmitting = false;
    }
  }
</script>

<div class="submit-container">
  {#if issubmitted}
    <div class="success-message">
      <h1>Thank You!</h1>
      <p>Your submission has been received.</p>
    </div>
  {:else if !isLoaded}
    <div class="loading">Loading form...</div>
  {:else}
    <header>
      <h1>{form.title}</h1>
      <button class="btn-primary" onclick={handleSubmit} disabled={isSubmitting}>
        {isSubmitting ? 'Submitting...' : 'Submit Form'}
      </button>
    </header>

    <div class="document-container">
      {#each Array(numPages) as _, i}
        <div class="page-wrapper">
             <!-- Render PDF Page -->
             <PDFPage {pdfRenderer} pageNumber={i + 1} {scale} interactive={false} />
             
             <!-- Overlay Form Fields -->
             {#await pdfRenderer.getPageDimensions(i+1, scale) then dims}
             <div class="fields-overlay" style="width: {dims.width}px; height: {dims.height}px;">
                {#if form.fields}
                  {#each form.fields.filter((f: FormField) => f.page === i + 1) as field}
                    <div 
                      class="field-input"
                      style="left: {field.x * scale}px; top: {field.y * scale}px; width: {field.width * scale}px; height: {field.height * scale}px;"
                    >
                      {#if field.type === 'text'}
                        <input type="text" bind:value={formData[field.id]} />
                      {:else if field.type === 'checkbox'}
                         <input type="checkbox" bind:checked={formData[field.id]} />
                      {:else}
                        <div class="unsupported">Field</div>
                      {/if}
                    </div>
                  {/each}
                {/if}
             </div>
             {/await}
        </div>
      {/each}
    </div>
  {/if}
</div>

<style>
  .submit-container {
    max-width: 900px;
    margin: 0 auto;
    padding: 20px;
    font-family: sans-serif;
  }

  header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
    position: sticky;
    top: 0;
    background: white;
    z-index: 100;
    padding: 10px 0;
    border-bottom: 1px solid #eee;
  }

  .document-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 20px;
  }

  .page-wrapper {
      position: relative;
  }

  .fields-overlay {
      position: absolute;
      top: 0;
      left: 0;
      pointer-events: none; /* Let clicks pass through to canvas if needed, but inputs need pointer-events */
  }

  .field-input {
      position: absolute;
      pointer-events: auto;
  }

  .field-input input[type="text"] {
      width: 100%;
      height: 100%;
      border: 1px solid rgba(0,0,200, 0.3);
      background: rgba(255, 255, 255, 0.5);
      padding: 2px;
  }
  
  .field-input input[type="text"]:focus {
      background: white;
      border-color: blue;
      outline: none;
  }

  .field-input input[type="checkbox"] {
      width: 100%;
      height: 100%;
      cursor: pointer;
  }

  .btn-primary {
    background: black;
    color: white;
    border: none;
    padding: 10px 20px;
    border-radius: 4px;
    cursor: pointer;
    font-weight: bold;
  }

  .btn-primary:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }

  .success-message {
      text-align: center;
      margin-top: 100px;
  }
</style>
