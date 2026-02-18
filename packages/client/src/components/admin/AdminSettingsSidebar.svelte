<script lang="ts">
  const configItems = [
    { name: 'Global Settings', icon: 'settings', active: true },
    { name: 'User Management', icon: 'group' },
    { name: 'Security Policies', icon: 'shield' },
    { name: 'Database Backups', icon: 'database' },
  ];

  const monitoringItems = [
    { name: 'Usage Analytics', icon: 'bar_chart' },
    { name: 'Error Logs', icon: 'error' },
    { name: 'API Health', icon: 'api' },
  ];
</script>

<aside class="admin-settings-sidebar">
  <div class="section">
    <h2 class="section-title">Configuration</h2>
    <nav class="nav">
      {#each configItems as item}
        <a href="#" class="nav-link" class:active={item.active}>
          <span class="material-symbols-outlined icon">{item.icon}</span>
          {item.name}
        </a>
      {/each}
    </nav>
  </div>

  <div class="section mt-4">
    <h2 class="section-title">Monitoring</h2>
    <nav class="nav">
      {#each monitoringItems as item}
        <a href="#" class="nav-link">
          <span class="material-symbols-outlined icon">{item.icon}</span>
          {item.name}
        </a>
      {/each}
    </nav>
  </div>
</aside>

<style>
  .admin-settings-sidebar {
    width: 16rem;
    background-color: #ffffff;
    border-right: 1px solid #e5e7eb;
    display: flex;
    flex-direction: column;
    padding: 1rem;
    flex-shrink: 0;
  }

  :global(.dark) .admin-settings-sidebar { background-color: #171717; border-right-color: #404040; }

  .section { margin-bottom: 1.5rem; }

  .section-title { font-size: 0.625rem; font-weight: 700; color: #111827; text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 0.75rem; padding-left: 0.5rem; }
  :global(.dark) .section-title { color: #ffffff; }

  .nav { display: flex; flex-direction: column; gap: 0.125rem; }

  .nav-link {
    display: flex;
    align-items: center;
    padding: 0.5rem;
    font-size: 0.75rem;
    font-weight: 500;
    color: #4b5563;
    text-decoration: none;
    border-radius: 0.125rem;
    transition: all 0.2s;
  }

  :global(.dark) .nav-link { color: #a3a3a3; }

  .nav-link:hover { background-color: #f9fafb; color: #000000; }
  :global(.dark) .nav-link:hover { background-color: #262626; color: #ffffff; }

  .nav-link.active { background-color: #f3f4f6; color: #000000; font-weight: 600; }
  :global(.dark) .nav-link.active { background-color: #262626; color: #ffffff; }

  .icon { font-size: 1.125rem; margin-right: 0.75rem; color: #9ca3af; }
  .nav-link.active .icon { color: #000000; }
  :global(.dark) .nav-link.active .icon { color: #ffffff; }

  .mt-4 { margin-top: 1rem; }
</style>
