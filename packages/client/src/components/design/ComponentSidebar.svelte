<script lang="ts">
  import { editorState } from '../../lib/editorState.svelte';

  function handleDragStart(event: DragEvent, type: string) {
    if (event.dataTransfer) {
      event.dataTransfer.setData('componentType', type);
      event.dataTransfer.effectAllowed = 'copy';
    }
  }
</script>

<div class="sidebar">
  <div class="sidebar-content">
    <div class="search-wrapper">
      <span class="material-symbols-outlined search-icon">search</span>
      <input type="text" placeholder="Filter components..." class="search-input" />
    </div>

    <button 
        class="btn-markdown" 
        class:active={editorState.isMarkdownOpen}
        onclick={() => editorState.toggleMarkdown()}
    >
      <span class="material-symbols-outlined">edit_note</span>
      <span>{editorState.isMarkdownOpen ? 'Hide Markdown' : 'Edit Markdown'}</span>
    </button>

    <div class="section">
      <h3>Layout</h3>
      <div class="grid">
        <div class="drag-item group" draggable="true" role="button" tabindex="0" ondragstart={(e) => handleDragStart(e, 'section')}>
          <span class="material-symbols-outlined icon">grid_view</span>
          <span class="label">Section</span>
        </div>
        <div class="drag-item group" draggable="true" ondragstart={(e) => handleDragStart(e, 'cols-2')}>
          <span class="material-symbols-outlined icon">view_column</span>
          <span class="label">2 Cols</span>
        </div>
        <div class="drag-item group" draggable="true" ondragstart={(e) => handleDragStart(e, 'table')}>
          <span class="material-symbols-outlined icon">table_chart</span>
          <span class="label">Table</span>
        </div>
        <div class="drag-item group" draggable="true" ondragstart={(e) => handleDragStart(e, 'divider')}>
          <span class="material-symbols-outlined icon">horizontal_rule</span>
          <span class="label">Divider</span>
        </div>
      </div>
    </div>

    <div class="section">
      <h3>Form Elements</h3>
      <div class="list">
        <div class="drag-item-list group" draggable="true" role="button" tabindex="0" ondragstart={(e) => handleDragStart(e, 'text-input')}>
          <span class="material-symbols-outlined icon">short_text</span>
          <span class="label">Text Input</span>
        </div>
        <div class="drag-item-list group" draggable="true" ondragstart={(e) => handleDragStart(e, 'textarea')}>
          <span class="material-symbols-outlined icon">article</span>
          <span class="label">Text Area</span>
        </div>
        <div class="drag-item-list group" draggable="true" ondragstart={(e) => handleDragStart(e, 'checkbox')}>
          <span class="material-symbols-outlined icon">check_box</span>
          <span class="label">Checkboxes</span>
        </div>
        <div class="drag-item-list group" draggable="true" ondragstart={(e) => handleDragStart(e, 'radio')}>
          <span class="material-symbols-outlined icon">radio_button_checked</span>
          <span class="label">Radio Group</span>
        </div>
        <div class="drag-item-list group" draggable="true" ondragstart={(e) => handleDragStart(e, 'signature')}>
          <span class="material-symbols-outlined icon">signature</span>
          <span class="label">Signature</span>
        </div>
      </div>
    </div>
  </div>
</div>

<style>
  .sidebar {
    width: 256px;
    background-color: var(--color-surface-light);
    border-right: 1px solid var(--color-border-light);
    display: flex;
    flex-direction: column;
    flex-shrink: 0;
    z-index: 10;
    height: 100%;
    /* Removed overflow-y: auto from children, effectively making the whole sidebar container */
    /* If the user wants NO scrolling at all, we'd use overflow: hidden, but that cuts content. */
    /* "don't make it scrollable" likely means "don't make distinct scroll regions" */
    overflow-y: auto; 
    transition: background-color 0.2s, border-color 0.2s;
  }

  :global(.dark) .sidebar {
    background-color: var(--color-surface-dark);
    border-right-color: var(--color-border-dark);
  }

  .sidebar-content {
    padding: 12px;
    display: flex;
    flex-direction: column;
    gap: 16px;
  }

  .search-wrapper {
    position: relative;
    margin-bottom: 4px;
  }

  .search-icon {
    position: absolute;
    left: 10px;
    top: 8px;
    font-size: 16px;
    color: #9CA3AF;
  }

  .search-input {
    width: 100%;
    background-color: #F9FAFB;
    border: 1px solid #E5E7EB;
    border-radius: 2px;
    padding: 6px 12px 6px 32px;
    font-size: 0.75rem;
    outline: none;
    transition: box-shadow 0.2s;
  }

  .search-input:focus {
    box-shadow: 0 0 0 1px #000;
  }

  :global(.dark) .search-input {
    background-color: #1F2937;
    border-color: #374151;
    color: #fff;
  }

  :global(.dark) .search-input:focus {
    box-shadow: 0 0 0 1px #fff;
  }

  .btn-markdown {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    padding: 8px 16px;
    background-color: #000;
    color: #fff;
    border-radius: 2px;
    font-size: 0.75rem;
    font-weight: 700;
    box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
    border: none;
    cursor: pointer;
    transition: background-color 0.2s;
  }

  .btn-markdown:hover {
    background-color: #1F2937;
  }

  .btn-markdown.active {
    background-color: #374151; /* Darker when active */
  }

  :global(.dark) .btn-markdown {
    background-color: #fff;
    color: #000;
  }

  :global(.dark) .btn-markdown:hover {
    background-color: #E5E7EB;
  }

  h3 {
    font-size: 10px;
    font-weight: 700;
    color: #9CA3AF;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    margin: 0 0 8px 0;
  }

  .grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 8px;
  }

  .drag-item {
    background-color: #fff;
    border: 1px solid #E5E7EB;
    padding: 8px;
    border-radius: 2px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    gap: 4px;
    cursor: grab;
    transition: border-color 0.2s;
  }

  .drag-item:active {
    cursor: grabbing;
  }

  .drag-item:hover {
    border-color: #000;
  }

  :global(.dark) .drag-item {
    background-color: #1F2937;
    border-color: #374151;
  }

  :global(.dark) .drag-item:hover {
    border-color: #fff;
  }

  .icon {
    color: #9CA3AF;
    font-size: 18px;
    transition: color 0.2s;
  }

  .drag-item:hover .icon {
    color: #000;
  }

  :global(.dark) .drag-item:hover .icon {
    color: #fff;
  }

  .label {
    font-size: 10px;
    font-weight: 500;
    color: #4B5563;
  }

  :global(.dark) .label {
    color: #D1D5DB;
  }

  .list {
    display: flex;
    flex-direction: column;
    gap: 4px;
  }

  .drag-item-list {
    display: flex;
    align-items: center;
    padding: 8px;
    border-radius: 2px;
    cursor: grab;
    border: 1px solid transparent;
    transition: background-color 0.2s, border-color 0.2s;
  }

  .drag-item-list:hover {
    background-color: #F3F4F6;
    border-color: #E5E7EB;
  }

  :global(.dark) .drag-item-list:hover {
    background-color: #1F2937;
    border-color: #374151;
  }

  .drag-item-list .icon {
    margin-right: 12px;
    font-size: 16px;
  }

  .drag-item-list .label {
    font-size: 0.75rem;
    font-weight: 500;
    color: #374151;
  }

  :global(.dark) .drag-item-list .label {
    color: #E5E5E5;
  }

  .drag-item-list:hover .label {
    color: #000;
  }

  :global(.dark) .drag-item-list:hover .label {
    color: #fff;
  }
</style>
