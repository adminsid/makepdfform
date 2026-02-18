<script lang="ts">
  import { editorState } from '../../lib/editorState.svelte';
  import { goto } from '$app/navigation';

  function handleFileSelect(e: Event) {
    const input = e.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      editorState.importPDF(input.files[0]).then(() => {
        goto('/editor');
      });
    }
  }
</script>

<div class="card-wrapper">
  <input 
    type="file" 
    accept=".pdf" 
    class="hidden" 
    id="pdf-upload"
    onchange={handleFileSelect}
  />

  <a href="/editor" class="create-card group" onclick={(e) => {
    e.preventDefault();
    editorState.clear();
    goto('/editor');
  }}>
    <div class="icon-container group-hover:bg-gray-100 dark:group-hover:bg-gray-800 transition-colors">
      <span class="material-symbols-outlined text-4xl text-gray-400 group-hover:text-black dark:group-hover:text-white transition-colors">
        add_circle
      </span>
    </div>
    <span class="label group-hover:text-black dark:group-hover:text-white transition-colors">Create New Form</span>
    <span class="subtitle">Start from scratch</span>
  </a>

  <button 
    class="import-btn"
    onclick={() => document.getElementById('pdf-upload')?.click()}
  >
    <span class="material-symbols-outlined">upload_file</span>
    Import PDF
  </button>
</div>

<style>
  .card-wrapper {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    height: 100%;
  }

  .create-card {
    flex: 1;
    min-height: 16rem; /* adjusted */
    background-color: transparent;
    border-radius: 0.125rem;
    border: 2px dashed #d1d5db;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all 0.2s;
    padding: 1.5rem;
  }

  :global(.dark) .create-card {
    border-color: #374151;
  }

  .create-card:hover {
    border-color: #000000;
  }

  :global(.dark) .create-card:hover {
    border-color: #ffffff;
  }

  .icon-container {
    width: 3rem;
    height: 3rem;
    border-radius: 50%;
    background-color: #f3f4f6;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 1rem;
    transition: background-color 0.2s;
  }

  :global(.dark) .icon-container {
    background-color: #1f2937;
  }

  .import-btn {
    width: 100%;
    padding: 0.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    background-color: transparent;
    border: 1px solid #d1d5db;
    color: #6b7280;
    font-size: 0.75rem;
    cursor: pointer;
    transition: all 0.2s;
  }

  .import-btn:hover {
    border-color: #000;
    color: #000;
  }

  :global(.dark) .import-btn:hover {
    border-color: #fff;
    color: #fff;
  }

  .label {
    font-size: 0.875rem;
    font-weight: 700;
    color: #111827;
  }

  :global(.dark) .label {
    color: #ffffff;
  }

  .subtitle {
    font-size: 0.75rem;
    color: #6b7280;
    margin-top: 0.25rem;
  }

  :global(.dark) .subtitle {
    color: #9ca3af;
  }
</style>
