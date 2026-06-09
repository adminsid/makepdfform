<script lang="ts">
  /**
   * PDF Template Editor — powered by @makepdfform/editor-react (pdfme Designer)
   *
   * Loads the React island lazily on mount so React is only bundled for this
   * route and never leaks into the rest of the Svelte app.
   */
  import { onMount, onDestroy } from 'svelte';
  import { page } from '$app/stores';

  // The pdfme-based designer handle
  let designerHandle: {
    update(template: unknown): void;
    destroy(): void;
    getTemplate(): unknown;
    downloadTemplate(): void;
  } | null = null;

  // DOM container ref
  let containerEl: HTMLDivElement;

  let isSaving = $state(false);
  let saveError = $state<string | null>(null);
  let saveSuccess = $state(false);

  /**
   * Blank A4 template — used when no existing pdfme template is found.
   */
  const defaultTemplate = {
    basePdf: { width: 210, height: 297, padding: [0, 0, 0, 0] as [number, number, number, number] },
    schemas: [[]],
  };

  async function saveTpl(template: unknown) {
    isSaving = true;
    saveError = null;
    saveSuccess = false;
    try {
      const id = $page.params.id;
      const res = await fetch(`/api/templates`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id,
          name: `Template ${id}`,
          template,
        }),
      });
      if (!res.ok) {
        const text = await res.text();
        throw new Error(`Server error ${res.status}: ${text}`);
      }
      saveSuccess = true;
      setTimeout(() => { saveSuccess = false; }, 2500);
    } catch (e) {
      saveError = e instanceof Error ? e.message : String(e);
    } finally {
      isSaving = false;
    }
  }

  async function handleManualSave() {
    if (!designerHandle) return;
    const template = designerHandle.getTemplate();
    await saveTpl(template);
  }

  onMount(async () => {
    // Dynamic import — React + pdfme only loads for this route
    const mod = await import('@makepdfform/editor-react');

    // Try to load an existing template from the API
    let initialTemplate = defaultTemplate;
    try {
      const id = $page.params.id;
      const res = await fetch(`/api/templates/${id}`);
      if (res.ok) {
        const data = await res.json();
        if (data?.template) {
          initialTemplate = data.template;
        }
      }
    } catch {
      // Fall back to default template silently
    }

    designerHandle = mod.mountDesigner({
      container: containerEl,
      template: initialTemplate as Parameters<typeof mod.mountDesigner>[0]['template'],
      onSaveTemplate: saveTpl,
      onChangeTemplate: () => {
        // Optionally auto-save on change (debounced by pdfme internally)
      },
    });
  });

  onDestroy(() => {
    designerHandle?.destroy();
    designerHandle = null;
  });
</script>

<svelte:head>
  <title>PDF Template Editor — MakePDFForm</title>
</svelte:head>

<div class="editor-shell">
  <!-- Toolbar -->
  <header class="editor-header">
    <div class="editor-header__left">
      <a href="/editor/{$page.params.id}" class="back-link">← Form Editor</a>
      <h1 class="editor-title">PDF Template Editor</h1>
    </div>
    <div class="editor-header__right">
      {#if saveSuccess}
        <span class="save-badge save-badge--ok">Saved ✓</span>
      {/if}
      {#if saveError}
        <span class="save-badge save-badge--error">Error: {saveError}</span>
      {/if}
      <button
        class="save-btn"
        onclick={handleManualSave}
        disabled={isSaving}
      >
        {isSaving ? 'Saving…' : 'Save Template'}
      </button>
    </div>
  </header>

  <!-- pdfme Designer mounts here -->
  <div bind:this={containerEl} class="designer-container"></div>
</div>

<style>
  :global(body) {
    margin: 0;
    padding: 0;
    overflow: hidden;
  }

  .editor-shell {
    display: flex;
    flex-direction: column;
    height: 100vh;
    font-family: 'Inter', sans-serif;
  }

  .editor-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 1rem;
    height: 48px;
    background: #000;
    color: #fff;
    flex-shrink: 0;
  }

  .editor-header__left {
    display: flex;
    align-items: center;
    gap: 1rem;
  }

  .editor-header__right {
    display: flex;
    align-items: center;
    gap: 0.75rem;
  }

  .back-link {
    color: #a0a0a0;
    text-decoration: none;
    font-size: 0.85rem;
  }

  .back-link:hover {
    color: #fff;
  }

  .editor-title {
    font-size: 1rem;
    font-weight: 600;
    margin: 0;
  }

  .save-btn {
    padding: 0.4rem 1rem;
    background: #fff;
    color: #000;
    border: none;
    border-radius: 4px;
    font-size: 0.875rem;
    font-weight: 500;
    cursor: pointer;
    transition: opacity 0.15s;
  }

  .save-btn:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  .save-badge {
    font-size: 0.8rem;
    padding: 0.25rem 0.6rem;
    border-radius: 4px;
  }

  .save-badge--ok {
    background: #d4edda;
    color: #155724;
  }

  .save-badge--error {
    background: #f8d7da;
    color: #721c24;
    max-width: 300px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .designer-container {
    flex: 1;
    overflow: hidden;
  }
</style>
