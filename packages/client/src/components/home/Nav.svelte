<script lang="ts">
  import { appState } from '../../lib/appState.svelte';
  import Logo from '../ui/Logo.svelte';
</script>

<nav class="nav">
  <div class="container">
    <div class="nav-content">
      <div class="logo-wrap">
        <Logo size="md" />
        <span class="logo-text">MakePDFForm</span>
      </div>
      <div class="nav-links">
        <a href="/templates" class="nav-link">Templates</a>
        <a href="/pricing" class="nav-link">Pricing</a>
        <a href="/login" class="nav-link">Login</a>
        <a href="/dashboard" class="start-btn">Start for Free</a>
        <button class="icon-btn" onclick={() => appState.toggleDarkMode()}>
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
    background-color: rgba(0, 0, 0, 0.8);
    border-bottom-color: #1f2937;
  }

  .container {
    max-width: 80rem;
    margin-left: auto;
    margin-right: auto;
    padding-left: 1rem;
    padding-right: 1rem;
  }

  @media (min-width: 640px) {
    .container {
      padding-left: 1.5rem;
      padding-right: 1.5rem;
    }
  }

  @media (min-width: 1024px) {
    .container {
      padding-left: 2rem;
      padding-right: 2rem;
    }
  }

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
  }

  .logo-text {
    font-weight: 700;
    font-size: 1.125rem;
    letter-spacing: -0.025em;
    color: #111827;
  }

  :global(.dark) .logo-text {
    color: #ffffff;
  }

  .nav-links {
    display: none;
    align-items: center;
    gap: 2rem;
  }

  @media (min-width: 768px) {
    .nav-links {
      display: flex;
    }
  }

  .nav-link {
    font-size: 0.875rem;
    font-weight: 500;
    color: #4b5563;
    text-decoration: none;
    transition: color 0.2s;
  }

  :global(.dark) .nav-link {
    color: #9ca3af;
  }

  .nav-link:hover {
    color: #000000;
  }

  :global(.dark) .nav-link:hover {
    color: #ffffff;
  }

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

  :global(.dark) .start-btn {
    background-color: #ffffff;
    color: #000000;
  }

  .start-btn:hover {
    background-color: #1f2937;
  }

  :global(.dark) .start-btn:hover {
    background-color: #e5e7eb;
  }

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

  .icon-btn:hover {
    background-color: #f3f4f6;
    color: #000000;
  }

  :global(.dark) .icon-btn:hover {
    background-color: #262626;
    color: #ffffff;
  }

  .mobile-menu {
    display: flex;
    align-items: center;
  }

  @media (min-width: 768px) {
    .mobile-menu {
      display: none;
    }
  }

  .menu-btn {
    color: #111827;
    background: none;
    border: none;
    cursor: pointer;
    padding: 0.5rem;
  }

  :global(.dark) .menu-btn {
    color: #ffffff;
  }

  .menu-btn:hover {
    color: #4b5563;
  }
</style>
