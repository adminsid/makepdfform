<script lang="ts">
  import AdminDashboardHeader from '../../../components/admin/AdminHeader.svelte';
  import AdminUsersSidebar from '../../../components/admin/AdminUsersSidebar.svelte';
  import UsersTable from '../../../components/admin/UsersTable.svelte';
  import UserDetailsSidebar from '../../../components/admin/UserDetailsSidebar.svelte';
  import { appState } from '../../../lib/appState.svelte';
</script>

<svelte:head>
  <title>Admin User & Permissions Manager - Make PDF Form</title>
</svelte:head>

<div class="admin-wrapper" class:dark={appState.isDarkMode}>
  <AdminDashboardHeader />
  
  <div class="main-layout">
    <AdminUsersSidebar />
    
    <main class="content-area">
      <UsersTable />
    </main>

    <UserDetailsSidebar />
  </div>
</div>

<style>
  .admin-wrapper {
    height: 100vh;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    background-color: #f9fafb;
    transition: background-color 0.2s;
  }

  :global(.dark) .admin-wrapper { background-color: #000000; }

  .main-layout { flex: 1; display: flex; overflow: hidden; }

  .content-area { flex: 1; display: flex; flex-direction: column; overflow: hidden; }
</style>
