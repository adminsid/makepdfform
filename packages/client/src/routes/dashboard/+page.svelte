<script lang="ts">
  import DashboardNav from '../../components/dashboard/DashboardNav.svelte';
  import DashboardSubHeader from '../../components/dashboard/DashboardSubHeader.svelte';
  import FormCard from '../../components/dashboard/FormCard.svelte';
  import CreateFormCard from '../../components/dashboard/CreateFormCard.svelte';
  import { goto } from '$app/navigation';

  let { data } = $props();
  // Simple reactive state from data
  let forms = $derived(data.forms || []);

  async function createForm() {
    try {
      const res = await fetch('/api/forms', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ title: 'Untitled Form' })
      });
      
      if (res.ok) {
        const newForm = await res.json();
        goto(`/editor/${newForm.id}`);
      }
    } catch (e) {
      console.error('Failed to create form', e);
    }
  }

  function formatDate(dateStr: string) {
    if (!dateStr) return 'N/A';
    return new Date(dateStr).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' });
  }
</script>

<svelte:head>
  <title>Make PDF Form - Forms Dashboard</title>
</svelte:head>

<div class="dashboard-wrapper">
  <DashboardNav />
  <DashboardSubHeader />
  
  <main class="main-content">
    <div class="container">
      <div class="grid">
        <CreateFormCard onCreate={createForm} />
        {#each forms as form}
          <a href="/editor/{form.id}" class="form-link">
            <FormCard 
                title={form.title} 
                lastEdited={formatDate(form.updatedAt)} 
                submissions={0} 
                users={[]} 
            />
          </a>
        {/each}
      </div>
      
      {#if forms.length === 0}
         <div class="empty-state">
            <p>You haven't created any forms yet.</p>
         </div>
      {/if}

      <!-- Pagination/Load more hidden for now if all loaded -->
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
    transition: background-color 0.2s;
  }

  :global(.dark) .dashboard-wrapper {
    background-color: #000000;
  }

  .main-content {
    flex: 1;
    overflow-y: auto;
    padding: 2rem;
    background-color: #f9fafb;
  }

  :global(.dark) .main-content {
    background-color: #0a0a0a;
  }

  .container {
    max-width: 72rem;
    margin-left: auto;
    margin-right: auto;
  }

  .grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }

  @media (min-width: 768px) {
    .grid {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  @media (min-width: 1024px) {
    .grid {
      grid-template-columns: repeat(3, 1fr);
    }
  }

  @media (min-width: 1280px) {
    .grid {
      grid-template-columns: repeat(4, 1fr);
    }
  }

  .form-link {
    text-decoration: none;
    color: inherit;
    display: block;
  }
  
  .empty-state {
    text-align: center;
    padding: 3rem;
    color: #6b7280;
  }

  /* ... previous media queries ... */
  /* Remove unused pagination styles or keep if plan to re-add */

</style>
