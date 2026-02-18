<script lang="ts">
  import { appState } from '../../lib/appState.svelte';
  import { editorState } from '../../lib/editorState.svelte';
  import Logo from '../ui/Logo.svelte';
  import Button from '../ui/Button.svelte';

  interface Props {
    toggleHistory: () => void;
  }

  let { toggleHistory }: Props = $props();
</script>

<header class="header">
  <div class="left-section">
    <Logo size="md" />
    <div class="title-container">
      <h1>Make PDF Form</h1>
    </div>
    <div class="divider"></div>
    <nav>
      <button class="nav-item active">Editor</button>
      <button class="nav-item" onclick={toggleHistory}>History</button>
      <button class="nav-item">Settings</button>
    </nav>
  </div>

  <div class="right-section">
    <div class="save-template">
      <span>Save as Template</span>
      <button class="toggle-switch">
        <span class="toggle-handle"></span>
      </button>
    </div>
    
    <button class="icon-btn" title="Undo" onclick={() => editorState.undo()} disabled={!editorState.canUndo}>
      <span class="material-symbols-outlined" style:opacity={editorState.canUndo ? 1 : 0.3}>undo</span>
    </button>
    <button class="icon-btn" title="Redo" onclick={() => editorState.redo()} disabled={!editorState.canRedo}>
      <span class="material-symbols-outlined" style:opacity={editorState.canRedo ? 1 : 0.3}>redo</span>
    </button>

    <div class="divider"></div>
     
    <button class="icon-btn" title="Save Version" onclick={() => editorState.saveSnapshot()}>
      <span class="material-symbols-outlined">save</span>
    </button>
    
    <div class="divider"></div>
    
    <Button variant="outline" size="sm">
      <span class="material-symbols-outlined">link</span>
      <span>Share</span>
    </Button>
    
    <Button variant="primary" size="sm" onclick={() => editorState.generatePDF()}>
      <span class="material-symbols-outlined">save_alt</span>
      <span>Export PDF</span>
    </Button>
    
    <button class="icon-btn theme-toggle" onclick={() => appState.toggleDarkMode()}>
      <span class="material-symbols-outlined">{appState.isDarkMode ? 'light_mode' : 'dark_mode'}</span>
    </button>
  </div>
</header>

<style>
  .header {
    height: 56px; /* h-14 */
    background-color: var(--color-surface-light);
    border-bottom: 1px solid var(--color-border-light);
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 16px;
    z-index: 20;
    flex-shrink: 0;
    transition: background-color 0.2s, border-color 0.2s;
  }

  :global(.dark) .header {
    background-color: var(--color-surface-dark);
    border-bottom-color: var(--color-border-dark);
  }

  .left-section, .right-section {
    display: flex;
    align-items: center;
    gap: 16px;
  }

  h1 {
    font-size: 0.875rem; /* text-sm */
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    margin: 0;
    color: #111827;
  }

  :global(.dark) h1 {
    color: #fff;
  }

  .divider {
    height: 16px;
    width: 1px;
    background-color: #D1D5DB; /* gray-300 */
    margin: 0 8px;
  }

  .header.dark .divider {
    background-color: #4B5563; /* gray-600 */
  }

  nav {
    display: flex;
    gap: 4px;
  }

  .nav-item {
    padding: 6px 12px;
    font-size: 0.75rem; /* text-xs */
    font-weight: 500;
    color: #6B7280; /* gray-500 */
    border-bottom: 2px solid transparent;
    border-radius: 0;
    cursor: pointer;
    transition: color 0.2s;
    background: none;
    border: none;
    border-bottom: 2px solid transparent;
  }

  .nav-item:hover {
    color: #000;
  }

  .header.dark .nav-item {
    color: #9CA3AF; /* gray-400 */
  }

  .header.dark .nav-item:hover {
    color: #fff;
  }

  .nav-item.active {
    font-weight: 700;
    color: #000;
    border-bottom-color: #000;
  }

  .header.dark .nav-item.active {
    color: #fff;
    border-bottom-color: #fff;
  }

  .save-template {
    display: flex;
    align-items: center;
    margin-right: 16px;
  }
  
  .save-template span {
    font-size: 0.75rem;
    font-weight: 500;
    margin-right: 8px;
    color: #4B5563;
  }
  
  .header.dark .save-template span {
    color: #D1D5DB;
  }

  .toggle-switch {
    position: relative;
    width: 36px;
    height: 20px;
    background-color: #E5E7EB; /* gray-200 */
    border-radius: 9999px;
    border: none;
    cursor: pointer;
    padding: 0;
    transition: background-color 0.2s;
  }
  
  .header.dark .toggle-switch {
    background-color: #374151; /* gray-700 */
  }
  
  .toggle-handle {
    position: absolute;
    top: 2px;
    left: 2px;
    display: block;
    width: 16px;
    height: 16px;
    background-color: #fff;
    border-radius: 50%;
    transition: transform 0.2s;
  }

  .icon-btn {
    padding: 8px;
    color: #6B7280;
    border-radius: 2px;
    cursor: pointer;
    border: none;
    background: none;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: background-color 0.2s;
  }
  
  .icon-btn:hover {
    background-color: #F3F4F6; /* gray-100 */
  }
  
  .icon-btn:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }
  
  .header.dark .icon-btn {
    color: #9CA3AF;
  }
  
  .header.dark .icon-btn:hover {
    background-color: #1F2937; /* gray-800 */
  }

  .btn {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 6px 12px;
    border-radius: 2px;
    font-size: 0.75rem;
    font-weight: 500;
    box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
    cursor: pointer;
    transition: background-color 0.2s;
  }
</style>
