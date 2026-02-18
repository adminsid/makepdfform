<script lang="ts">
  import Nav from '../../components/home/Nav.svelte';
  import Footer from '../../components/home/Footer.svelte';
  import TemplateSearch from '../../components/templates/TemplateSearch.svelte';
  import CategorySidebar from '../../components/templates/CategorySidebar.svelte';
  import TemplateCard from '../../components/templates/TemplateCard.svelte';
  import { templates } from '../../lib/templates';
  import { editorState } from '../../lib/editorState.svelte';
  import { goto } from '$app/navigation';

  let searchQuery = $state('');
  let selectedCategory = $state('All Templates');

  const filteredTemplates = $derived(templates.filter(t => {
      const matchesSearch = t.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            t.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'All Templates' || t.category === selectedCategory;
      return matchesSearch && matchesCategory;
  }));

  const sections = $derived([
    {
      title: selectedCategory === 'All Templates' ? 'All Templates' : `${selectedCategory} Templates`,
      templates: filteredTemplates,
      showGridToggle: true
    }
  ]);

  function handleTemplateSelect(template: any) {
      editorState.loadTemplate(template.content);
      goto('/editor');
  }
</script>

<svelte:head>
  <title>Make PDF Form - Template Library</title>
</svelte:head>

<div class="page-wrapper">
  <Nav />
  
  <main>
    <TemplateSearch bind:searchQuery />
    
    <div class="container py-12">
      <div class="layout">
        <CategorySidebar bind:selectedCategory />
        
        <div class="content">
          {#each sections as section}
            <div class="section-container">
              <div class="section-header">
                <h2 class="section-title">{section.title}</h2>
              </div>
              
              <div class="template-grid">
                {#each section.templates as template}
                  <div onclick={() => handleTemplateSelect(template)} role="button" tabindex="0" onkeydown={(e) => e.key === 'Enter' && handleTemplateSelect(template)}>
                    <TemplateCard {...template} />
                  </div>
                {/each}
              </div>
            </div>
          {/each}
          
          <div class="pagination">
            <nav class="pagination-nav">
              <button class="page-link disabled">Previous</button>
              <button class="page-link active">1</button>
              <button class="page-link">2</button>
              <button class="page-link">3</button>
              <span class="sep">...</span>
              <button class="page-link">8</button>
              <button class="page-link">Next</button>
            </nav>
          </div>
        </div>
      </div>
    </div>

    <section class="cta-section">
      <div class="cta-content">
        <h2 class="cta-title">Can't find what you're looking for?</h2>
        <p class="cta-subtitle">Build your custom PDF form from scratch or upload an existing PDF to make it fillable.</p>
        <div class="cta-buttons">
          <button class="primary-btn">Create from Scratch</button>
          <button class="secondary-btn">
            <span class="material-symbols-outlined icon-small">upload</span>
            Upload PDF
          </button>
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

  .content { flex: 1; }

  .section-container { margin-bottom: 2.5rem; }

  .section-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1.5rem;
  }

  @media (min-width: 640px) {
    .section-header { border-bottom: 1px solid #f3f4f6; padding-bottom: 0.5rem; }
  }

  .section-title { font-size: 1.125rem; font-weight: 700; color: #111111; }

  .grid-controls { display: flex; gap: 0.5rem; }

  .control-btn {
    padding: 0.25rem;
    border-radius: 0.25rem;
    color: #d1d5db;
    background: none;
    border: none;
    cursor: pointer;
    transition: all 0.2s;
  }

  .control-btn:hover { color: #000000; background-color: #f3f4f6; }

  .view-all {
    display: flex;
    align-items: center;
    gap: 0.25rem;
    font-size: 0.875rem;
    font-weight: 500;
    color: #2563eb;
    text-decoration: none;
  }

  .view-all:hover { color: #1e40af; }

  .template-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }

  @media (min-width: 640px) {
    .template-grid { grid-template-columns: repeat(2, 1fr); }
  }

  @media (min-width: 1024px) {
    .template-grid { grid-template-columns: repeat(3, 1fr); }
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

  .cta-buttons { display: flex; flex-direction: column; justify-content: center; gap: 1rem; }

  @media (min-width: 640px) { .cta-buttons { flex-direction: row; } }

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

  .secondary-btn {
    background-color: transparent;
    color: #ffffff;
    font-weight: 600;
    padding: 0.75rem 1.5rem;
    border-radius: 0.5rem;
    border: 1px solid #374151;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    transition: background-color 0.2s;
  }

  .secondary-btn:hover { background-color: #111111; }

  .icon-small { font-size: 16px; }
</style>
