<script lang="ts">
  import { appState } from '../../lib/appState.svelte';
  import Logo from '../ui/Logo.svelte';
  import { getContext } from 'svelte';
  
  const userState: any = getContext('user');
</script>

<header class="header">
  <div class="left-section">
    <Logo size="sm" />
    <div class="title-container">
      <h1 class="title">Make PDF Form</h1>
    </div>
    <div class="divider"></div>
    <nav class="nav">
      <a href="/dashboard" class="nav-btn" class:active={true}>Forms</a>
      <a href="/submissions" class="nav-btn">Submissions</a>
      <a href="/templates" class="nav-btn">Templates</a>
    </nav>
  </div>

  <div class="right-section">
    <button class="icon-btn" onclick={() => appState.toggleDarkMode()} title="Toggle Dark Mode">
      <span class="material-symbols-outlined">{appState.isDarkMode ? 'light_mode' : 'dark_mode'}</span>
    </button>
    <div class="user-avatar" title={userState?.session?.user?.email || 'User'}>
      <div class="avatar-bg">
        {userState?.session?.user?.name ? userState.session.user.name.split(' ').map((n: string) => n[0]).join('').substring(0, 2).toUpperCase() : 'U'}
      </div>
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

  .user-avatar {
    width: 2rem;
    height: 2rem;
    border-radius: 50%;
    background-color: #e5e7eb;
    overflow: hidden;
    border: 1px solid #d1d5db;
  }

  :global(.dark) .user-avatar {
    background-color: #374151;
    border-color: #4b5563;
  }

  .avatar-bg {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    font-size: 0.75rem;
    font-weight: 700;
    color: #4b5563;
  }

  :global(.dark) .avatar-bg {
    color: #d1d5db;
  }
</style>
