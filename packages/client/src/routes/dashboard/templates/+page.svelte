<script lang="ts">
  import DashboardNav from '../../../components/dashboard/DashboardNav.svelte';
  import CategorySidebar from '../../../components/templates/CategorySidebar.svelte';
  import TemplateCard from '../../../components/templates/TemplateCard.svelte';
  import { templates } from '../../../lib/templates';
  import { goto } from '$app/navigation';
  import { page } from '$app/stores';

  let { data } = $props();
  let searchQuery = $state('');
  let selectedCategory = $state('All Templates');
  let loading = $state<string | null>(null);

  // User's saved templates from the server
  const myTemplates = $derived((data.forms || []).filter((f: any) => f.isTemplate));

  // System templates matching filter
  const filteredSystemTemplates = $derived(
    templates.filter(t => {
      const q = searchQuery.toLowerCase();
      const matchSearch = !q || t.title.toLowerCase().includes(q) || t.description.toLowerCase().includes(q);
      const matchCat = selectedCategory === 'All Templates' || t.category === selectedCategory;
      return matchSearch && matchCat;
    })
  );

  const filteredMyTemplates = $derived(
    myTemplates.filter((t: any) => {
      const q = searchQuery.toLowerCase();
      return !q || t.title.toLowerCase().includes(q);
    })
  );

  async function useTemplate(template: any) {
    loading = template.id;
    try {
      const res = await fetch('/api/forms', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: template.title,
          fields: { content: template.content || '' }
        })
      });
      if (!res.ok) throw new Error('Failed');
      const { id } = await res.json();
      goto(`/editor/${id}`);
    } catch (e) {
      loading = null;
    }
  }

  async function createFromTemplate(userTemplate: any) {
    loading = userTemplate.id;
    try {
      const res = await fetch('/api/forms', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: userTemplate.title,
          fields: userTemplate.fields
        })
      });
      if (!res.ok) throw new Error('Failed');
      const { id } = await res.json();
      goto(`/editor/${id}`);
    } catch (e) {
      loading = null;
    }
  }

  function formatDate(d: any) {
    if (!d) return '';
    return new Date(d).toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
  }
</script>

<svelte:head>
  <title>MakePDFForm – My Templates</title>
</svelte:head>

<div class="dashboard-wrapper">
  <DashboardNav />

  <main class="main-content">
    <!-- Search bar -->
    <div class="search-bar">
      <input
        type="text"
        bind:value={searchQuery}
        placeholder="Search templates…"
        class="search-input"
      />
    </div>

    <div class="layout">
      <CategorySidebar bind:selectedCategory />

      <div class="content">
        <!-- My Templates -->
        {#if filteredMyTemplates.length > 0}
          <section class="section">
            <h2 class="section-title">My Templates</h2>
            <div class="template-grid">
              {#each filteredMyTemplates as t (t.id)}
                <div class="card-wrap" onclick={() => createFromTemplate(t)} role="button" tabindex="0" onkeydown={(e) => e.key === 'Enter' && createFromTemplate(t)}>
                  <div class="my-template-card">
                    <span class="material-symbols-outlined my-icon">description</span>
                    <div class="my-info">
                      <p class="my-title">{t.title}</p>
                      <p class="my-date">Saved {formatDate(t.updatedAt)}</p>
                    </div>
                    <button class="use-chip" disabled={loading === t.id}>
                      {loading === t.id ? '...' : 'Use'}
                    </button>
                  </div>
                </div>
              {/each}
            </div>
          </section>
        {/if}

        <!-- System Templates -->
        <section class="section">
          <h2 class="section-title">
            {selectedCategory === 'All Templates' ? 'All Templates' : `${selectedCategory} Templates`}
            <span class="count-badge">{filteredSystemTemplates.length}</span>
          </h2>
          {#if filteredSystemTemplates.length === 0}
            <div class="empty-state">
              <p>No templates found. <button class="link-btn" onclick={() => { searchQuery = ''; selectedCategory = 'All Templates'; }}>Clear filters</button></p>
            </div>
          {:else}
            <div class="template-grid">
              {#each filteredSystemTemplates as t (t.id)}
                <div class="card-wrap" onclick={() => useTemplate(t)} role="button" tabindex="0" onkeydown={(e) => e.key === 'Enter' && useTemplate(t)}>
                  <TemplateCard
                    id={t.id}
                    title={t.title}
                    category={t.category}
                    description={t.description}
                    previewType={t.previewType}
                    content={t.content}
                    isLoading={loading === t.id}
                  />
                </div>
              {/each}
            </div>
          {/if}
        </section>
      </div>
    </div>
  </main>
</div>

<style>
  .dashboard-wrapper {
    height: 100vh;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    background-color: #ffffff;
  }

  :global(.dark) .dashboard-wrapper { background-color: #0a0a0a; }

  .main-content {
    flex: 1;
    overflow-y: auto;
    background-color: #f9fafb;
  }

  :global(.dark) .main-content { background-color: #111827; }

  .search-bar {
    padding: 1rem 1.5rem 0;
    border-bottom: 1px solid #e5e7eb;
    background: #fff;
  }

  :global(.dark) .search-bar { background: #1f2937; border-bottom-color: #374151; }

  .search-input {
    width: 100%;
    max-width: 28rem;
    padding: 0.5rem 0.75rem;
    border: 1px solid #d1d5db;
    border-radius: 0.375rem;
    font-size: 0.875rem;
    margin-bottom: 1rem;
    background: #f9fafb;
    color: #111;
  }

  :global(.dark) .search-input { background: #374151; border-color: #4b5563; color: #f9fafb; }

  .layout {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    padding: 1.5rem;
    max-width: 72rem;
    margin: 0 auto;
  }

  @media (min-width: 1024px) { .layout { flex-direction: row; } }

  .content { flex: 1; min-width: 0; }

  .section { margin-bottom: 2.5rem; }

  .section-title {
    font-size: 1rem;
    font-weight: 700;
    color: #111;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin-bottom: 1rem;
    padding-bottom: 0.5rem;
    border-bottom: 1px solid #e5e7eb;
  }

  :global(.dark) .section-title { color: #f9fafb; border-bottom-color: #374151; }

  .count-badge {
    font-size: 0.7rem;
    font-weight: 500;
    background-color: #f3f4f6;
    color: #6b7280;
    padding: 0.1rem 0.4rem;
    border-radius: 9999px;
  }

  :global(.dark) .count-badge { background-color: #374151; color: #9ca3af; }

  .template-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 1rem;
  }

  @media (min-width: 640px) { .template-grid { grid-template-columns: repeat(2, 1fr); } }
  @media (min-width: 1024px) { .template-grid { grid-template-columns: repeat(3, 1fr); } }

  .card-wrap { cursor: pointer; display: block; }

  .my-template-card {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding: 0.875rem 1rem;
    background: #fff;
    border: 1px solid #e5e7eb;
    border-radius: 0.5rem;
    transition: box-shadow 0.2s;
  }

  :global(.dark) .my-template-card { background: #1f2937; border-color: #374151; }
  .my-template-card:hover { box-shadow: 0 4px 6px -1px rgba(0,0,0,0.08); }

  .my-icon { font-size: 1.5rem; color: #111; }
  :global(.dark) .my-icon { color: #f9fafb; }

  .my-info { flex: 1; min-width: 0; }
  .my-title { font-size: 0.875rem; font-weight: 600; color: #111; margin: 0; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
  :global(.dark) .my-title { color: #f9fafb; }
  .my-date { font-size: 0.75rem; color: #6b7280; margin: 0.125rem 0 0; }

  .use-chip {
    background: #111;
    color: #fff;
    font-size: 0.75rem;
    font-weight: 600;
    padding: 0.25rem 0.625rem;
    border-radius: 9999px;
    border: none;
    cursor: pointer;
    white-space: nowrap;
  }

  :global(.dark) .use-chip { background: #fff; color: #111; }

  .empty-state { text-align: center; padding: 3rem; color: #6b7280; }

  .link-btn { background: none; border: none; color: #2563eb; cursor: pointer; font-size: inherit; text-decoration: underline; }
</style>
