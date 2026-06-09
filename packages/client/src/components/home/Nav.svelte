<script lang="ts">
  import { appState } from '../../lib/appState.svelte';
  import Logo from '../ui/Logo.svelte';
  import { authClient } from '../../lib/auth-client';
  import { page } from '$app/stores';
  import { goto } from '$app/navigation';

  let profileOpen = $state(false);

  const session = $derived($page.data.session);

  async function signOut() {
    await authClient.signOut();
    goto('/');
  }
</script>

<svelte:window onclick={(e) => {
  if (!(e.target as Element).closest('.profile-wrap')) profileOpen = false;
}} />

<nav class="nav">
  <div class="container">
    <div class="nav-content">
      <a href="/" class="logo-wrap" aria-label="Go to homepage">
        <Logo size="md" />
        <span class="logo-text">MakePDFForm</span>
      </a>
      <div class="nav-links">
        <a href="/templates" class="nav-link">Templates</a>
        <a href="/pricing" class="nav-link">Pricing</a>
        {#if session?.user}
          <a href="/dashboard" class="nav-link">Dashboard</a>
          <div class="profile-wrap">
            <button class="profile-btn" onclick={() => profileOpen = !profileOpen} aria-label="Profile menu">
              {#if session.user.image}
                <img src={session.user.image} alt={session.user.name} class="avatar" />
              {:else}
                <span class="avatar-placeholder">{(session.user.name ?? session.user.email ?? 'U')[0].toUpperCase()}</span>
              {/if}
            </button>
            {#if profileOpen}
              <div class="dropdown">
                <div class="dropdown-header">
                  <p class="user-name">{session.user.name || 'User'}</p>
                  <p class="user-email">{session.user.email}</p>
                </div>
                <div class="dropdown-divider"></div>
                <a href="/dashboard" class="dropdown-item" onclick={() => profileOpen = false}>
                  <span class="material-symbols-outlined">dashboard</span>Dashboard
                </a>
                <a href="/settings" class="dropdown-item" onclick={() => profileOpen = false}>
                  <span class="material-symbols-outlined">settings</span>Settings
                </a>
                <div class="dropdown-divider"></div>
                <button class="dropdown-item danger" onclick={signOut}>
                  <span class="material-symbols-outlined">logout</span>Sign Out
                </button>
              </div>
            {/if}
          </div>
        {:else}
          <a href="/login" class="nav-link">Login</a>
          <a href="/register" class="start-btn">Start for Free</a>
        {/if}
        <button class="icon-btn" onclick={() => appState.toggleDarkMode()} aria-label="Toggle dark mode">
          <span class="material-symbols-outlined">{appState.isDarkMode ? 'light_mode' : 'dark_mode'}</span>
        </button>
      </div>
      <div class="mobile-menu">
        <button class="menu-btn">
          <span class="material-symbols-outlined">menu</span>
        </button>
      </div>
    </div>
  </div>
</nav>

<style>
  .nav {
    position: sticky;
    top: 0;
    z-index: 50;
    background-color: rgba(255, 255, 255, 0.8);
    backdrop-filter: blur(12px);
    border-bottom: 1px solid #f3f4f6;
    transition: background-color 0.2s, border-color 0.2s;
  }

  :global(.dark) .nav {
    background-color: rgba(17, 24, 39, 0.8);
    border-bottom-color: #1f2937;
  }

  .container {
    max-width: 80rem;
    margin-left: auto;
    margin-right: auto;
    padding-left: 1rem;
    padding-right: 1rem;
  }

  @media (min-width: 640px) { .container { padding-left: 1.5rem; padding-right: 1.5rem; } }
  @media (min-width: 1024px) { .container { padding-left: 2rem; padding-right: 2rem; } }

  .nav-content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 4rem;
  }

  .logo-wrap {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    flex-shrink: 0;
    text-decoration: none;
  }

  .logo-text {
    font-weight: 700;
    font-size: 1.125rem;
    letter-spacing: -0.025em;
    color: #111827;
  }

  :global(.dark) .logo-text { color: #ffffff; }

  .nav-links {
    display: none;
    align-items: center;
    gap: 1.5rem;
  }

  @media (min-width: 768px) { .nav-links { display: flex; } }

  .nav-link {
    font-size: 0.875rem;
    font-weight: 500;
    color: #4b5563;
    text-decoration: none;
    transition: color 0.2s;
  }

  :global(.dark) .nav-link { color: #9ca3af; }
  .nav-link:hover { color: #000000; }
  :global(.dark) .nav-link:hover { color: #ffffff; }

  .start-btn {
    background-color: #000000;
    color: #ffffff;
    font-size: 0.875rem;
    font-weight: 500;
    padding: 0.5rem 1rem;
    border-radius: 0.5rem;
    text-decoration: none;
    transition: background-color 0.2s;
  }

  :global(.dark) .start-btn { background-color: #ffffff; color: #000000; }
  .start-btn:hover { background-color: #1f2937; }
  :global(.dark) .start-btn:hover { background-color: #e5e7eb; }

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

  /* Profile */
  .profile-wrap { position: relative; }

  .profile-btn {
    width: 2rem;
    height: 2rem;
    border-radius: 50%;
    border: 2px solid #e5e7eb;
    overflow: hidden;
    cursor: pointer;
    background: none;
    padding: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: border-color 0.2s;
  }

  .profile-btn:hover { border-color: #000; }
  :global(.dark) .profile-btn { border-color: #374151; }
  :global(.dark) .profile-btn:hover { border-color: #9ca3af; }

  .avatar { width: 100%; height: 100%; object-fit: cover; }

  .avatar-placeholder {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #111;
    color: #fff;
    font-size: 0.75rem;
    font-weight: 700;
    border-radius: 50%;
  }

  :global(.dark) .avatar-placeholder { background-color: #e5e7eb; color: #111; }

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

  .mobile-menu { display: flex; align-items: center; }
  @media (min-width: 768px) { .mobile-menu { display: none; } }

  .menu-btn { color: #111827; background: none; border: none; cursor: pointer; padding: 0.5rem; }
  :global(.dark) .menu-btn { color: #ffffff; }
</style>
