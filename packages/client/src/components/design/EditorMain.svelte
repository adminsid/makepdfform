<script lang="ts">
  import { editorState } from '../../lib/editorState.svelte';

  function handleInput(event: Event) {
    const target = event.target as HTMLTextAreaElement;
    editorState.updateContent(target.value);
  }

  function handleDrop(event: DragEvent) {
    event.preventDefault();
    const componentType = event.dataTransfer?.getData('componentType');
    if (componentType) {
      // In a textarea, we could try to insert at cursor, but for now append or use generic insert
      // editorState.insertComponent(componentType); 
      // Better: Insert at cursor position if possible
      const textarea = event.target as HTMLTextAreaElement;
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      // We need a way to insert at specific index in editorState
      // For now, let's just let the default insertComponent handle it (appends)
      // Or we can improve insertComponent to take an index.
      editorState.insertComponent(componentType);
    }
  }

  function handleDragOver(event: DragEvent) {
    event.preventDefault();
  }
</script>

<div class="editor-main">
  <div class="toolbar">
    <div class="toolbar-group">
        <span class="mode-label">Markdown Editor</span>
    </div>
    <div class="spacer"></div>
  </div>

  <textarea 
    class="content user-content" 
    value={editorState.content}
    oninput={handleInput}
    ondrop={handleDrop}
    ondragover={handleDragOver}
    spellcheck="false"
  ></textarea>
</div>

<style>
  .editor-main {
    flex: 1;
    display: flex;
    flex-direction: column;
    min-width: 350px;
    background-color: var(--color-editor-bg);
    border-right: 1px solid var(--color-border-light);
    height: 100%;
    transition: background-color 0.2s, border-color 0.2s;
  }

  :global(.dark) .editor-main {
    background-color: var(--color-editor-dark-bg);
    border-right-color: var(--color-border-dark);
  }

  .toolbar {
    height: 40px;
    border-bottom: 1px solid var(--color-border-light);
    display: flex;
    align-items: center;
    padding: 0 12px;
    gap: 4px;
    background-color: #fff;
    flex-shrink: 0;
  }

  :global(.dark) .toolbar {
    background-color: #000;
    border-bottom-color: var(--color-border-dark);
  }

  .spacer { flex: 1; }

  .mode-label {
    font-size: 10px;
    text-transform: uppercase;
    font-family: var(--font-mono);
    color: #9CA3AF;
    letter-spacing: 0.05em;
    font-weight: 700;
  }

  textarea.content {
    flex: 1;
    overflow-y: auto;
    padding: 24px;
    font-family: var(--font-mono);
    font-size: 0.875rem; /* text-sm */
    line-height: 1.625;
    outline: none;
    color: #000;
    resize: none;
    border: none;
    background: transparent;
    white-space: pre-wrap;
  }

  :global(.dark) textarea.content {
    color: #fff;
  }
</style>
