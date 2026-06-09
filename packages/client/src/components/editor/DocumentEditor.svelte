<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  import { Editor } from '@tiptap/core';
  import StarterKit from '@tiptap/starter-kit';
  import Placeholder from '@tiptap/extension-placeholder';
  import TextAlign from '@tiptap/extension-text-align';
  import { SignaturePlaceholder } from './extensions/SignaturePlaceholder';
  import { TextBox } from './extensions/TextBox';
  // import mammoth from 'mammoth';
  // import { saveAs } from 'file-saver';
  import { FileDown, FileUp } from 'lucide-svelte';
  
  let element: HTMLElement;
  let fileInput: HTMLInputElement;
  let editor: Editor | undefined = $state();

  onMount(async () => {
    // Dynamically import problematic CJS/SSR packages
    const { default: Table } = await import('@tiptap/extension-table');
    const { default: TableRow } = await import('@tiptap/extension-table-row');
    const { default: TableCell } = await import('@tiptap/extension-table-cell');
    const { default: TableHeader } = await import('@tiptap/extension-table-header');

    editor = new Editor({
      element,
      extensions: [
        StarterKit,
        Placeholder.configure({
          placeholder: 'Start writing your document...',
        }),
        TextAlign.configure({
          types: ['heading', 'paragraph'],
        }),
        Table.configure({
          resizable: true,
        }),
        TableRow,
        TableHeader,
        TableCell,
        TextStyle,
        Color,
        SignaturePlaceholder,
        TextBox,
      ],
      content: '<p>Standard deal outline sheet...</p>',
      onTransaction: () => {
        editor = editor;
      },
    });
  });

  onDestroy(() => {
    editor?.destroy();
  });

  async function exportDocx() {
    if (!editor) return;
    const htmlString = editor.getHTML();
    try {
      const { default: htmlToDocx } = await import('html-to-docx');
      const { saveAs } = await import('file-saver');

      const fileBuffer = await htmlToDocx(htmlString, null, {
        table: { row: { cantSplit: true } },
        footer: true,
        pageNumber: true,
      });
      // Fallback for browser if htmlToDocx returns array buffer or blob
      const blob = fileBuffer instanceof Blob ? fileBuffer : new Blob([fileBuffer], { type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' });
      saveAs(blob, 'Document.docx');
    } catch (err) {
      console.error('Failed to export docx in browser. Backend conversion may be needed:', err);
      alert('Export failed. Check console for details.');
    }
  }

  async function handleFileUpload(event: Event) {
    const target = event.target as HTMLInputElement;
    const file = target.files?.[0];
    if (!file || !editor) return;
    
    try {
      const arrayBuffer = await file.arrayBuffer();
      const { default: mammoth } = await import('mammoth');
      const result = await mammoth.convertToHtml({ arrayBuffer });
      editor.commands.setContent(result.value);
      if (result.messages.length > 0) {
        console.warn('Mammoth warnings:', result.messages);
      }
    } catch (err) {
      console.error('Failed to import docx:', err);
      alert('Import failed. Please ensure it is a valid .docx file.');
    }
    // reset input
    if (fileInput) fileInput.value = '';
  }
</script>

<div class="flex flex-col h-full overflow-hidden flex-1 relative bg-neutral-100">
  <!-- Top Action Bar -->
  <div class="shrink-0 bg-white border-b border-neutral-200 p-2 flex justify-between items-center">
    <div class="text-sm font-medium text-neutral-500 pl-2">Editing Document</div>
    <div class="flex items-center gap-2">
      <input 
        type="file" 
        accept=".docx" 
        class="hidden" 
        bind:this={fileInput}
        onchange={handleFileUpload}
      />
      <button 
        onclick={() => fileInput.click()}
        class="flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-neutral-600 bg-neutral-100 rounded-md hover:bg-neutral-200 transition-colors"
      >
        <FileUp size={16} /> Import Docx
      </button>
      <button 
        onclick={exportDocx}
        class="flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-colors"
      >
        <FileDown size={16} /> Export Docx
      </button>
    </div>
  </div>

  <!-- Toolbar Area -->
  {#if editor}
    <div class="shrink-0 bg-white border-b border-neutral-200">
      <EditorToolbar {editor} />
    </div>
  {/if}

  <!-- Page Area (simulating Mac Pages / Word document look) -->
  <div class="flex-1 overflow-y-auto w-full flex justify-center py-10 px-4 bg-neutral-100/50 tiptap-scroll-container">
    <div
      class="bg-white tiptap-page shadow-sm border border-neutral-200 w-full max-w-[850px] min-h-[1100px] p-12 lg:p-16 rounded-sm focus-within:ring-1 focus-within:ring-neutral-300 focus-within:outline-none transition-shadow prose max-w-none"
      bind:this={element}
    ></div>
  </div>
</div>

<style>
  :global(.tiptap-page .tiptap) {
    outline: none;
    min-height: 100%;
    font-family: inherit;
  }
  
  :global(.tiptap-page .tiptap p.is-editor-empty:first-child::before) {
    color: #adb5bd;
    content: attr(data-placeholder);
    float: left;
    height: 0;
    pointer-events: none;
  }
</style>
