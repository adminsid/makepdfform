<script lang="ts">
  const navItems = [
    { name: 'Profile', icon: 'person', active: true },
    { name: 'Login & Security', icon: 'lock' },
    { name: 'Billing & Plans', icon: 'credit_card' },
    { name: 'Notifications', icon: 'notifications' },
    { name: 'API Access', icon: 'api' },
  ];
</script>

<aside class="settings-sidebar">
  <div class="sidebar-content">
    <h2 class="sidebar-title">Account Settings</h2>
    <nav class="nav-list">
      {#each navItems as item}
        <a href="#" class="nav-link" class:active={item.active}>
          <span class="material-symbols-outlined icon">{item.icon}</span>
          <span class="name">{item.name}</span>
        </a>
      {/each}
    </nav>
  </div>
</aside>

<style>
  .settings-sidebar {
    width: 16rem;
    background-color: #f9fafb;
    border-right: 1px solid #e5e7eb;
    overflow-y: auto;
    flex-shrink: 0;
  }

  :global(.dark) .settings-sidebar {
    background-color: #000000;
    border-right-color: #1f2937;
  }

  .sidebar-content { padding: 1.5rem; }

  .sidebar-title {
    font-size: 0.75rem;
    font-weight: 700;
    color: #6b7280;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    margin-bottom: 1rem;
    padding-left: 0.75rem;
  }

  :global(.dark) .sidebar-title { color: #9ca3af; }

  .nav-list { display: flex; flex-direction: column; gap: 0.25rem; }

  .nav-link {
    display: flex;
    align-items: center;
    padding: 0.5rem 0.75rem;
    font-size: 0.875rem;
    font-weight: 500;
    color: #374151;
    text-decoration: none;
    border-radius: 0.125rem;
    transition: all 0.2s;
  }

  :global(.dark) .nav-link { color: #d1d5db; }

  .nav-link:hover {
    background-color: #e5e7eb;
    color: #000000;
  }

  :global(.dark) .nav-link:hover {
    background-color: #1f2937;
    color: #ffffff;
  }

  .nav-link.active {
    background-color: #000000;
    color: #ffffff;
  }

  :global(.dark) .nav-link.active {
    background-color: #ffffff;
    color: #000000;
  }

  .icon {
    font-size: 1.125rem;
    margin-right: 0.75rem;
  }
</style>
