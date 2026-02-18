<script lang="ts">
  import DashboardNav from '../../components/dashboard/DashboardNav.svelte';
  import DashboardSubHeader from '../../components/dashboard/DashboardSubHeader.svelte';
  import FormCard from '../../components/dashboard/FormCard.svelte';
  import CreateFormCard from '../../components/dashboard/CreateFormCard.svelte';

  const forms = [
    { title: 'Buyer Registration Agreement', lastEdited: 'Oct 26, 2023', submissions: 24, users: ['JD', 'SS'] },
    { title: 'Vendor Application 2024', lastEdited: 'Oct 25, 2023', submissions: 156 },
    { title: 'Employee Onboarding', lastEdited: 'Oct 22, 2023', submissions: 12 },
    { title: 'Event Feedback Survey', lastEdited: 'Oct 20, 2023', submissions: 89 },
    { title: 'NDA Template v2', lastEdited: 'Sep 28, 2023', submissions: 5 },
  ];
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
        <CreateFormCard />
        {#each forms as form}
          <FormCard {...form} />
        {/each}
      </div>
      
      <div class="pagination">
        <button class="load-more">
          Load more forms
        </button>
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

  .pagination {
    margin-top: 2rem;
    display: flex;
    justify-content: center;
    padding-bottom: 2rem;
  }

  .load-more {
    padding: 0.5rem 1rem;
    font-size: 0.75rem;
    font-weight: 500;
    color: #6b7280;
    background: transparent;
    border: 1px solid #e5e7eb;
    border-radius: 0.125rem;
    cursor: pointer;
    transition: all 0.2s;
  }

  .load-more:hover {
    border-color: #000000;
    color: #000000;
  }

  :global(.dark) .load-more {
    border-color: #374151;
    color: #9ca3af;
  }

  :global(.dark) .load-more:hover {
    border-color: #ffffff;
    color: #ffffff;
  }
</style>
