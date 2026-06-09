<script lang="ts">
  import Nav from '../../components/home/Nav.svelte';
  import Footer from '../../components/home/Footer.svelte';
  import TemplateSearch from '../../components/templates/TemplateSearch.svelte';
  import CategorySidebar from '../../components/templates/CategorySidebar.svelte';
  import TemplateCard from '../../components/templates/TemplateCard.svelte';
  import { templates } from '../../lib/templates';
  import { goto } from '$app/navigation';
  import { page } from '$app/stores';

  let searchQuery = $state('');
  let selectedCategory = $state('All Templates');
  let currentPage = $state(1);
  const ITEMS_PER_PAGE = 9;
  let loading = $state<string | null>(null);

  const filteredTemplates = $derived(templates.filter(t => {
      const matchesSearch = !searchQuery || 
        t.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
        (t.description && t.description.toLowerCase().includes(searchQuery.toLowerCase()));
      const matchesCategory = selectedCategory === 'All Templates' || t.category === selectedCategory;
      return matchesSearch && matchesCategory;
  }));

  // Reset to page 1 when filter changes
  $effect(() => {
    searchQuery;
    selectedCategory;
    currentPage = 1;
  });

  const totalPages = $derived(Math.max(1, Math.ceil(filteredTemplates.length / ITEMS_PER_PAGE)));

  const pagedTemplates = $derived(
    filteredTemplates.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE)
  );

  const pageNumbers = $derived(() => {
    const pages: (number | '...')[] = [];
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1);
      if (currentPage > 3) pages.push('...');
      for (let i = Math.max(2, currentPage - 1); i <= Math.min(totalPages - 1, currentPage + 1); i++) {
        pages.push(i);
      }
      if (currentPage < totalPages - 2) pages.push('...');
      pages.push(totalPages);
    }
    return pages;
  });

  async function handleTemplateSelect(template: typeof templates[0]) {
    const session = $page.data.session;
    if (!session?.user) {
      sessionStorage.setItem('pendingTemplate', JSON.stringify({ id: template.id, title: template.title, content: template.content }));
      goto(`/login?redirect=/templates`);
      return;
    }

    loading = template.id;
    try {
      const res = await fetch('/api/forms', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: template.title,
          fields: { content: template.content }
        })
      });
      if (!res.ok) throw new Error('Failed to create form');
      const { id } = await res.json();
      goto(`/editor/${id}`);
    } catch (e) {
      console.error(e);
      loading = null;
    }
  }

  async function createFromScratch() {
    const session = $page.data.session;
    if (!session?.user) { goto('/login?redirect=/editor'); return; }
    const res = await fetch('/api/forms', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: 'Untitled Form', fields: { content: '' } })
    });
    if (res.ok) {
      const { id } = await res.json();
      goto(`/editor/${id}`);
    }
  }
</script>

<svelte:head>
  <title>MakePDFForm - Template Library</title>
</svelte:head>

<div class="page-wrapper">
  <Nav />
  
  <main>
    <TemplateSearch bind:searchQuery />
    
    <div class="container">
      <div class="layout">
        <CategorySidebar bind:selectedCategory />
        
        <div class="content">
          <div class="section-container">
            <div class="section-header">
              <h2 class="section-title">
                {selectedCategory === 'All Templates' ? 'All Templates' : `${selectedCategory} Templates`}
                <span class="count-badge">{filteredTemplates.length}</span>
              </h2>
            </div>
            
            {#if pagedTemplates.length === 0}
              <div class="empty-state">
                <span class="material-symbols-outlined empty-icon">search_off</span>
                <p>No templates found for "{searchQuery}"</p>
                <button class="clear-btn" onclick={() => { searchQuery = ''; selectedCategory = 'All Templates'; }}>Clear filters</button>
              </div>
            {:else}
              <div class="template-grid">
                {#each pagedTemplates as template (template.id)}
                  <div onclick={() => handleTemplateSelect(template)} role="button" tabindex="0" onkeydown={(e) => e.key === 'Enter' && handleTemplateSelect(template)} class="template-btn" aria-label="Use {template.title}">
                    <TemplateCard 
                      id={template.id}
                      title={template.title}
                      category={template.category}
                      description={template.description || ''}
                      previewType={template.previewType}
                      content={template.content}
                      isLoading={loading === template.id}
                    />
                  </div>
                {/each}
              </div>
            {/if}
          </div>
          
          {#if totalPages > 1}
            <div class="pagination">
              <nav class="pagination-nav" aria-label="Template pages">
                <button 
                  class="page-link" 
                  class:disabled={currentPage === 1}
                  onclick={() => currentPage = Math.max(1, currentPage - 1)}
                  disabled={currentPage === 1}
                >Previous</button>
                
                {#each pageNumbers() as p}
                  {#if p === '...'}
                    <span class="sep">...</span>
                  {:else}
                    <button 
                      class="page-link" 
                      class:active={currentPage === p}
                      onclick={() => currentPage = p as number}
                    >{p}</button>
                  {/if}
                {/each}
                
                <button 
                  class="page-link"
                  class:disabled={currentPage === totalPages}
                  onclick={() => currentPage = Math.min(totalPages, currentPage + 1)}
                  disabled={currentPage === totalPages}
                >Next</button>
              </nav>
            </div>
          {/if}
        </div>
      </div>
    </div>

    <section class="cta-section">
      <div class="cta-content">
        <h2 class="cta-title">Can't find what you're looking for?</h2>
        <p class="cta-subtitle">Build your custom PDF form from scratch.</p>
        <div class="cta-buttons">
          <button class="primary-btn" onclick={createFromScratch}>Create from Scratch</button>
        </div>
      </div>
    </section>
  </main>
  
  <Footer />
</div>

<style>
  .page-wrapper {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    background-color: #ffffff;
  }

  :global(.dark) .page-wrapper { background-color: #111827; }

  main { flex: 1; }

  .container {
    max-width: 80rem;
    margin-left: auto;
    margin-right: auto;
    padding: 3rem 1rem;
  }

  .layout {
    display: flex;
    flex-direction: column;
    gap: 2rem;
  }

  @media (min-width: 1024px) {
    .layout { flex-direction: row; gap: 2rem; }
  }

  .content { flex: 1; min-width: 0; }

  .section-container { margin-bottom: 2.5rem; }

  .section-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1.5rem;
    border-bottom: 1px solid #f3f4f6;
    padding-bottom: 0.5rem;
  }

  :global(.dark) .section-header { border-bottom-color: #374151; }

  .section-title {
    font-size: 1.125rem;
    font-weight: 700;
    color: #111111;
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  :global(.dark) .section-title { color: #f9fafb; }

  .count-badge {
    font-size: 0.75rem;
    font-weight: 500;
    background-color: #f3f4f6;
    color: #6b7280;
    padding: 0.125rem 0.5rem;
    border-radius: 9999px;
  }

  :global(.dark) .count-badge { background-color: #374151; color: #9ca3af; }

  .template-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }

  @media (min-width: 640px) { .template-grid { grid-template-columns: repeat(2, 1fr); } }
  @media (min-width: 1024px) { .template-grid { grid-template-columns: repeat(3, 1fr); } }

  .template-btn {
    cursor: pointer;
    display: block;
  }

  .empty-state {
    text-align: center;
    padding: 4rem 2rem;
    color: #6b7280;
  }

  .empty-icon { font-size: 3rem; display: block; margin-bottom: 1rem; }

  .clear-btn {
    margin-top: 1rem;
    padding: 0.5rem 1rem;
    background: #111;
    color: #fff;
    border: none;
    border-radius: 0.375rem;
    cursor: pointer;
    font-size: 0.875rem;
  }

  .pagination {
    margin-top: 3rem;
    display: flex;
    justify-content: center;
  }

  .pagination-nav { display: flex; align-items: center; gap: 0.25rem; }

  .page-link {
    padding: 0.5rem 0.75rem;
    border-radius: 0.375rem;
    font-size: 0.875rem;
    font-weight: 500;
    color: #4b5563;
    background: none;
    border: none;
    cursor: pointer;
    transition: all 0.2s;
  }

  :global(.dark) .page-link { color: #9ca3af; }
  :global(.dark) .page-link:hover:not(.disabled) { background-color: #1f2937; color: #f9fafb; }

  .page-link:hover:not(.disabled) { background-color: #f3f4f6; color: #000000; }
  .page-link.active { background-color: #000000; color: #ffffff; }
  .page-link.disabled { color: #d1d5db; cursor: not-allowed; }
  .sep { color: #d1d5db; padding: 0 0.5rem; }

  .cta-section {
    background-color: #000000;
    color: #ffffff;
    padding: 4rem 1rem;
    text-align: center;
  }

  .cta-content { max-width: 56rem; margin-left: auto; margin-right: auto; }
  .cta-title { font-size: 1.875rem; font-weight: 700; margin-bottom: 1rem; }
  .cta-subtitle { font-size: 1.125rem; color: #9ca3af; margin-bottom: 2rem; }
  .cta-buttons { display: flex; justify-content: center; }

  .primary-btn {
    background-color: #ffffff;
    color: #000000;
    font-weight: 600;
    padding: 0.75rem 1.5rem;
    border-radius: 0.5rem;
    border: none;
    cursor: pointer;
    transition: background-color 0.2s;
  }

  .primary-btn:hover { background-color: #e5e7eb; }
</style>
