<script lang="ts">
  import { onMount } from 'svelte';
  import { editorState } from '../../lib/editorState.svelte';
  import Header from '../../components/design/Header.svelte';
  import ComponentSidebar from '../../components/design/ComponentSidebar.svelte';
  import EditorMain from '../../components/design/EditorMain.svelte';
  import PreviewPane from '../../components/design/PreviewPane.svelte';
  import HistorySidebar from '../../components/design/HistorySidebar.svelte';

  let isDarkMode = $state(false);
  let historyOpen = $state(false);

  function toggleDarkMode() {
    isDarkMode = !isDarkMode;
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }

  function toggleHistory() {
    historyOpen = !historyOpen;
  }
</script>

<svelte:head>
  <link href="https://fonts.googleapis.com" rel="preconnect"/>
  <link crossorigin="" href="https://fonts.gstatic.com" rel="preconnect"/>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&amp;family=Playfair+Display:ital,wght@1,500&amp;family=JetBrains+Mono:wght@400;500&amp;display=swap" rel="stylesheet"/>
  <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
</svelte:head>

<div class="app-container" class:dark={isDarkMode}>
  <Header {isDarkMode} {toggleDarkMode} {toggleHistory} />
  
  <div class="main-content">
    <ComponentSidebar />
    {#if editorState.isMarkdownOpen}
        <EditorMain />
    {/if}
    <PreviewPane />
    {#if historyOpen}
      <HistorySidebar />
    {/if}
  </div>
</div>

<style>
  :global(:root) {
    /* Colors from Stitch export */
    --color-primary: #000000;
    --color-primary-hover: #333333;
    --color-bg-light: #F9FAFB;
    --color-bg-dark: #000000;
    --color-surface-light: #FFFFFF;
    --color-surface-dark: #171717;
    --color-border-light: #E5E7EB;
    --color-border-dark: #404040;
    --color-editor-bg: #FFFFFF;
    --color-editor-dark-bg: #171717;

    /* Fonts */
    --font-sans: 'Inter', sans-serif;
    --font-serif: 'Playfair Display', serif;
    --font-mono: 'JetBrains Mono', monospace;
  }

  /* Reset body/html for this page specifically if needed, or rely on global reset */
  :global(body) {
    margin: 0;
    padding: 0;
    overflow: hidden; /* Prevent scrolling on the body */
  }

  .app-container {
    display: flex;
    flex-direction: column;
    height: 100vh;
    font-family: var(--font-sans);
    background-color: var(--color-bg-light);
    color: #111827; /* gray-900 */
    transition: background-color 0.2s, color 0.2s;
  }

  .app-container.dark {
    background-color: var(--color-bg-dark);
    color: #F3F4F6; /* gray-100 */
  }

  .main-content {
    display: flex;
    flex: 1;
    overflow: hidden;
  }

  /* Material Symbols sizing override if needed */
  :global(.material-symbols-outlined) {
    font-size: 20px; 
    font-variation-settings:
      'FILL' 0,
      'wght' 400,
      'GRAD' 0,
      'opsz' 24;
  }
</style>
