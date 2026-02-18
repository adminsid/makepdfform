<script lang="ts">
  import { appState } from '../../lib/appState.svelte';
  import Logo from '../ui/Logo.svelte';
</script>

<header class="admin-header">
  <div class="left">
    <div class="brand">
      <Logo size="md" />
      <h1 class="title">Make PDF Form <span class="sep">|</span> <span class="admin-tag">ADMIN</span></h1>
    </div>
    <div class="divider"></div>
    <nav class="admin-nav">
      <a href="/admin" class="nav-link active">Dashboard</a>
      <a href="/admin/users" class="nav-link">Users</a>
      <a href="/admin/settings" class="nav-link">Settings</a>
      <a href="#" class="nav-link">System Health</a>
    </nav>
  </div>

  <div class="right">
    <div class="search-wrap">
      <span class="material-symbols-outlined search-icon">search</span>
      <input type="text" placeholder="Search logs, users..." class="search-input" />
    </div>
    
    <button class="icon-btn" onclick={() => appState.toggleDarkMode()}>
      <span class="material-symbols-outlined">{appState.isDarkMode ? 'light_mode' : 'dark_mode'}</span>
    </button>
    
    <div class="user-avatar">AD</div>
  </div>
</header>

<style>
  .admin-header {
    height: 4rem;
    padding: 0 1.5rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #ffffff;
    border-bottom: 1px solid #e5e7eb;
    z-index: 50;
    flex-shrink: 0;
  }

  :global(.dark) .admin-header { background-color: #171717; border-bottom-color: #404040; }

  .left { display: flex; align-items: center; gap: 1.5rem; }

  .brand { display: flex; align-items: center; gap: 0.75rem; }

  .title { font-size: 0.875rem; font-weight: 700; color: #111827; text-transform: uppercase; letter-spacing: 0.05em; white-space: nowrap; }
  :global(.dark) .title { color: #ffffff; }

  .sep { color: #d1d5db; margin: 0 0.25rem; }
  :global(.dark) .sep { color: #4b5563; }

  .admin-tag { color: #9ca3af; }

  .divider { width: 1px; height: 1.5rem; background-color: #e5e7eb; margin: 0 0.5rem; }
  :global(.dark) .divider { background-color: #404040; }

  .admin-nav { display: flex; gap: 1.5rem; }

  .nav-link {
    font-size: 0.875rem;
    font-weight: 500;
    color: #6b7280;
    text-decoration: none;
    transition: color 0.2s;
    padding-bottom: 0.125rem;
  }

  :global(.dark) .nav-link { color: #9ca3af; }

  .nav-link:hover { color: #000000; }
  :global(.dark) .nav-link:hover { color: #ffffff; }

  .nav-link.active {
    color: #000000;
    border-bottom: 2px solid #000000;
  }

  :global(.dark) .nav-link.active { color: #ffffff; border-bottom-color: #ffffff; }

  .right { display: flex; align-items: center; gap: 1rem; }

  .search-wrap { position: relative; }

  .search-icon {
    position: absolute;
    left: 0.5rem;
    top: 50%;
    transform: translateY(-50%);
    font-size: 1.125rem;
    color: #9ca3af;
  }

  .search-input {
    width: 16rem;
    padding: 0.375rem 0.75rem 0.375rem 2rem;
    background-color: #f9fafb;
    border: 1px solid #e5e7eb;
    font-size: 0.875rem;
    outline: none;
    transition: all 0.2s;
  }

  :global(.dark) .search-input { background-color: #262626; border-color: #404040; color: #ffffff; }

  .search-input:focus { border-color: #000000; box-shadow: 0 0 0 1px #000000; }
  :global(.dark) .search-input:focus { border-color: #ffffff; box-shadow: 0 0 0 1px #ffffff; }

  .icon-btn {
    padding: 0.5rem;
    color: #6b7280;
    background: none;
    border: none;
    cursor: pointer;
    display: flex;
    align-items: center;
    border-radius: 0.125rem;
  }

  .icon-btn:hover { background-color: #f3f4f6; color: #000000; }
  :global(.dark) .icon-btn:hover { background-color: #262626; color: #ffffff; }

  .user-avatar {
    width: 2rem;
    height: 2rem;
    background-color: #e5e7eb;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.75rem;
    font-weight: 700;
    color: #4b5563;
  }

  :global(.dark) .user-avatar { background-color: #262626; color: #d1d5db; }
</style>
