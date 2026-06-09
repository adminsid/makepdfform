<script lang="ts">
  import { appState } from '../../lib/appState.svelte';
  import Logo from '../ui/Logo.svelte';
  import { page } from '$app/stores';
  import { authClient } from '../../lib/auth-client';
  import { goto } from '$app/navigation';

  const userState = $derived($page.data.session);
  let profileOpen = $state(false);

  function isActive(path: string) {
    return $page.url.pathname === path || $page.url.pathname.startsWith(path + '/');
  }

  async function signOut() {
    await authClient.signOut();
    goto('/');
  }
</script>

<svelte:window onclick={(e) => {
  if (!(e.target as Element).closest('.profile-wrap')) profileOpen = false;
}} />

<header class="header">
  <div class="left-section">
    <a href="/" class="logo-link">
      <Logo size="sm" />
    </a>
    <div class="title-container">
      <h1 class="title">MakePDFForm</h1>
    </div>
    <div class="divider"></div>
    <nav class="nav">
      <a href="/dashboard" class="nav-btn" class:active={isActive('/dashboard') && !isActive('/dashboard/templates')}>Forms</a>
      <a href="/submissions" class="nav-btn" class:active={isActive('/submissions')}>Submissions</a>
      <a href="/dashboard/templates" class="nav-btn" class:active={isActive('/dashboard/templates')}>Templates</a>
    </nav>
  </div>

  <div class="right-section">
    <button class="icon-btn" onclick={() => appState.toggleDarkMode()} title="Toggle Dark Mode">
      <span class="material-symbols-outlined">{appState.isDarkMode ? 'light_mode' : 'dark_mode'}</span>
    </button>
    <div class="profile-wrap">
      <button class="profile-btn" onclick={() => profileOpen = !profileOpen} title={userState?.user?.email || 'Profile'}>
        {#if userState?.user?.image}
          <img src={userState.user.image} alt={userState.user.name} class="avatar-img" />
        {:else}
          <div class="avatar-bg">
            {userState?.user?.name ? userState.user.name[0].toUpperCase() : 'U'}
          </div>
        {/if}
      </button>
      {#if profileOpen}
        <div class="dropdown">
          <div class="dropdown-header">
            <p class="user-name">{userState?.user?.name || 'User'}</p>
            <p class="user-email">{userState?.user?.email || ''}</p>
          </div>
          <div class="dropdown-divider"></div>
          <a href="/settings" class="dropdown-item"><span class="material-symbols-outlined">settings</span>Settings</a>
          <div class="dropdown-divider"></div>
          <button class="dropdown-item danger" onclick={signOut}><span class="material-symbols-outlined">logout</span>Sign Out</button>
        </div>
      {/if}
    </div>
  </div>
</header>

<style>
  .header {
    height: 3.5rem;
    background-color: var(--color-surface-light, #ffffff);
    border-bottom: 2px solid #000000;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-left: 1rem;
    padding-right: 1rem;
    position: relative;
    z-index: 20;
    flex-shrink: 0;
    transition: background-color 0.2s, border-color 0.2s;
  }

  :global(.dark) .header {
    background-color: var(--color-surface-dark, #171717);
    border-bottom-color: #ffffff;
  }

  .left-section {
    display: flex;
    align-items: center;
    gap: 1rem;
  }

  .title {
    font-size: 0.875rem;
    font-weight: 700;
    color: #111827;
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }

  :global(.dark) .title {
    color: #ffffff;
  }

  .divider {
    height: 1rem;
    width: 1px;
    background-color: #d1d5db;
    margin-left: 0.5rem;
    margin-right: 0.5rem;
  }

  :global(.dark) .divider {
    background-color: #4b5563;
  }

  .nav {
    display: flex;
    gap: 0.25rem;
  }

  .nav-btn {
    padding: 0.375rem 0.75rem;
    font-size: 0.75rem;
    font-weight: 500;
    color: #6b7280;
    text-decoration: none;
    cursor: pointer;
    transition: color 0.2s;
  }

  .nav-btn:hover {
    color: #000000;
  }

  :global(.dark) .nav-btn {
    color: #9ca3af;
  }

  :global(.dark) .nav-btn:hover {
    color: #ffffff;
  }

  .nav-btn.active {
    background-color: #000000;
    color: #ffffff;
    border-radius: 0.125rem;
  }

  :global(.dark) .nav-btn.active {
    background-color: #ffffff;
    color: #000000;
  }

  .right-section {
    display: flex;
    align-items: center;
    gap: 0.75rem;
  }

  .icon-btn {
    padding: 0.375rem;
    color: #6b7280;
    background: none;
    border: none;
    border-radius: 0.125rem;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .icon-btn:hover {
    background-color: #f3f4f6;
  }

  :global(.dark) .icon-btn {
    color: #9ca3af;
  }

  :global(.dark) .icon-btn:hover {
    background-color: #1f2937;
  }

  .logo-link {
    display: flex;
    text-decoration: none;
  }

  .profile-wrap { position: relative; }

  .profile-btn {
    width: 2rem;
    height: 2rem;
    border-radius: 50%;
    border: 1px solid #d1d5db;
    overflow: hidden;
    cursor: pointer;
    background: #e5e7eb;
    padding: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: border-color 0.2s;
  }

  .profile-btn:hover { border-color: #000; }
  :global(.dark) .profile-btn { border-color: #4b5563; background: #374151; }

  .avatar-img { width: 100%; height: 100%; object-fit: cover; }

  .dropdown {
    position: absolute;
    right: 0;
    top: calc(100% + 0.5rem);
    background-color: #ffffff;
    border: 1px solid #e5e7eb;
    border-radius: 0.5rem;
    box-shadow: 0 10px 15px -3px rgba(0,0,0,0.1);
    min-width: 12rem;
    z-index: 100;
    overflow: hidden;
  }

  :global(.dark) .dropdown { background-color: #1f2937; border-color: #374151; }

  .dropdown-header { padding: 0.75rem 1rem; }
  .user-name { font-weight: 600; font-size: 0.875rem; color: #111; margin: 0; }
  :global(.dark) .user-name { color: #f9fafb; }
  .user-email { font-size: 0.75rem; color: #6b7280; margin: 0.25rem 0 0; }

  .dropdown-divider { height: 1px; background-color: #f3f4f6; }
  :global(.dark) .dropdown-divider { background-color: #374151; }

  .dropdown-item {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.625rem 1rem;
    font-size: 0.875rem;
    color: #374151;
    text-decoration: none;
    background: none;
    border: none;
    width: 100%;
    text-align: left;
    cursor: pointer;
    transition: background-color 0.15s;
  }

  .dropdown-item .material-symbols-outlined { font-size: 16px; }
  :global(.dark) .dropdown-item { color: #d1d5db; }
  .dropdown-item:hover { background-color: #f9fafb; }
  :global(.dark) .dropdown-item:hover { background-color: #374151; }
  .dropdown-item.danger { color: #ef4444; }
</style>
