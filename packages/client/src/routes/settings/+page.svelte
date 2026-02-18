<script lang="ts">
  import DashboardNav from '../../components/dashboard/DashboardNav.svelte';
  import SettingsSidebar from '../../components/settings/SettingsSidebar.svelte';
  import ProfileSettings from '../../components/settings/ProfileSettings.svelte';
  import SecuritySettings from '../../components/settings/SecuritySettings.svelte';
  import BillingSettings from '../../components/settings/BillingSettings.svelte';
  import { appState } from '../../lib/appState.svelte';
</script>

<svelte:head>
  <title>Make PDF Form - User Settings</title>
</svelte:head>

<div class="settings-wrapper" class:dark={appState.isDarkMode}>
  <DashboardNav />
  
  <div class="main-layout">
    <SettingsSidebar />
    
    <main class="content-area">
      <div class="container">
        <ProfileSettings />
        <SecuritySettings />
        <BillingSettings />
      </div>
    </main>
  </div>
</div>

<style>
  .settings-wrapper {
    height: 100vh;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    background-color: #ffffff;
    transition: background-color 0.2s;
  }

  :global(.dark) .settings-wrapper {
    background-color: #000000;
  }

  .main-layout {
    flex: 1;
    display: flex;
    overflow: hidden;
  }

  .content-area {
    flex: 1;
    overflow-y: auto;
    background-color: #ffffff;
    padding: 2rem;
  }

  :global(.dark) .content-area {
    background-color: #000000;
  }

  @media (min-width: 768px) {
    .content-area { padding: 3rem; }
  }

  .container {
    max-width: 48rem; /* 3xl */
    margin-left: auto;
    margin-right: auto;
  }
</style>
