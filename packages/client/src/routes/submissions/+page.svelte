<script lang="ts">
  import DashboardNav from '../../components/dashboard/DashboardNav.svelte';
  import SubmissionsSidebar from '../../components/submissions/SubmissionsSidebar.svelte';
  import SubmissionDetailView from '../../components/submissions/SubmissionDetailView.svelte';
  import ActivitySidebar from '../../components/submissions/ActivitySidebar.svelte';
  import { appState } from '../../lib/appState.svelte';
</script>

<svelte:head>
  <title>Make PDF Form - Submissions</title>
</svelte:head>

<div class="submissions-wrapper" class:dark={appState.isDarkMode}>
  <DashboardNav />
  
  <div class="main-layout">
    <SubmissionsSidebar />
    <SubmissionDetailView />
    <ActivitySidebar />
  </div>
</div>

<style>
  .submissions-wrapper {
    height: 100vh;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    background-color: #ffffff;
    transition: background-color 0.2s;
  }

  :global(.dark) .submissions-wrapper {
    background-color: #000000;
  }

  .main-layout {
    flex: 1;
    display: flex;
    overflow: hidden;
  }
</style>
