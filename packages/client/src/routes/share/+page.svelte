<script lang="ts">
  import Header from '../../components/design/Header.svelte';
  import ShareSidebar from '../../components/share/ShareSidebar.svelte';
  import LinksTable from '../../components/share/LinksTable.svelte';
  import EmbedSection from '../../components/share/EmbedSection.svelte';
  import { appState } from '../../lib/appState.svelte';
</script>

<svelte:head>
  <title>Share & Distribute - Make PDF Form</title>
</svelte:head>

<div class="share-wrapper" class:dark={appState.isDarkMode}>
  <Header toggleHistory={() => {}} />
  
  <div class="main-layout">
    <ShareSidebar />
    
    <main class="content-area">
      <div class="container">
        <header class="page-header">
          <div class="header-text">
            <h1 class="title">Form Links</h1>
            <p class="subtitle">
              Create and manage unique links for your form. Track performance separately for different channels or campaigns.
            </p>
          </div>
          <button class="generate-btn">
            <span class="material-symbols-outlined">add_link</span>
            Generate New Link
          </button>
        </header>

        <LinksTable />
        <EmbedSection />
      </div>
    </main>
  </div>
</div>

<style>
  .share-wrapper {
    height: 100vh;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    background-color: #f9fafb;
    transition: background-color 0.2s;
  }

  :global(.dark) .share-wrapper { background-color: #000000; }

  .main-layout { flex: 1; display: flex; overflow: hidden; }

  .content-area { flex: 1; overflow-y: auto; padding: 2rem; }

  .container { max-width: 72rem; margin-left: auto; margin-right: auto; }

  .page-header {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-start;
    gap: 1rem;
    margin-bottom: 2rem;
  }

  @media (min-width: 640px) {
    .page-header { flex-direction: row; align-items: flex-end; }
  }

  .title { font-size: 1.5rem; font-weight: 700; color: #111827; letter-spacing: -0.025em; margin-bottom: 0.5rem; }
  :global(.dark) .title { color: #ffffff; }

  .subtitle { font-size: 0.875rem; color: #4b5563; max-width: 42rem; }
  :global(.dark) .subtitle { color: #a3a3a3; }

  .generate-btn {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.625rem 1.5rem;
    background-color: #000000;
    color: #ffffff;
    font-size: 0.875rem;
    font-weight: 500;
    border-radius: 0.125rem;
    border: none;
    cursor: pointer;
    transition: background-color 0.2s;
    box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  }

  :global(.dark) .generate-btn { background-color: #ffffff; color: #000000; }

  .generate-btn:hover { background-color: #1f2937; }
  :global(.dark) .generate-btn:hover { background-color: #e5e7eb; }
</style>
