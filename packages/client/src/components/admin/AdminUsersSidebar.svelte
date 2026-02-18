<script lang="ts">
  const roles = [
    { name: 'All Users', icon: 'group', count: 1248, active: true },
    { name: 'Admins Only', icon: 'admin_panel_settings', count: 12 },
    { name: 'Developers', icon: 'terminal', count: 86 },
    { name: 'Standard Users', icon: 'person', count: 1150 },
  ];

  const statuses = [
    { name: 'Active', icon: 'check_circle', color: 'green' },
    { name: 'Pending Approval', icon: 'schedule', color: 'yellow', hasDot: true },
    { name: 'Banned Users', icon: 'block', color: 'red' },
  ];
</script>

<aside class="admin-users-sidebar">
  <div class="sidebar-header">
    <h2 class="label">Views</h2>
  </div>
  
  <div class="groups">
    <div class="group">
      <h3 class="group-title">Role Filters</h3>
      <nav class="nav">
        {#each roles as role}
          <button class="nav-btn" class:active={role.active}>
            <span class="material-symbols-outlined icon">{role.icon}</span>
            <span class="text">{role.name}</span>
            {#if role.active}
              <span class="count-badge active">{role.count}</span>
            {:else}
              <span class="count-badge">{role.count}</span>
            {/if}
          </button>
        {/each}
      </nav>
    </div>

    <div class="group">
      <h3 class="group-title">Status</h3>
      <nav class="nav">
        {#each statuses as status}
          <button class="nav-btn">
            <span class="material-symbols-outlined icon" style="color: var(--{status.color}-600)">{status.icon}</span>
            <span class="text">{status.name}</span>
            {#if status.hasDot}
              <span class="dot" style="background-color: #eab308"></span>
            {/if}
          </button>
        {/each}
      </nav>
    </div>
  </div>

  <div class="footer">
    <button class="export-btn">
      <span class="material-symbols-outlined icon-small">download</span>
      Export CSV
    </button>
  </div>
</aside>

<style>
  .admin-users-sidebar {
    width: 16rem;
    background-color: #ffffff;
    border-right: 1px solid #e5e7eb;
    display: flex;
    flex-direction: column;
    flex-shrink: 0;
  }

  :global(.dark) .admin-users-sidebar { background-color: #171717; border-right-color: #404040; }

  .sidebar-header { padding: 1rem; border-bottom: 1px solid #e5e7eb; }
  :global(.dark) .sidebar-header { border-bottom-color: #404040; }

  .label { font-size: 0.625rem; font-weight: 700; color: #111827; text-transform: uppercase; letter-spacing: 0.1em; }
  :global(.dark) .label { color: #ffffff; }

  .groups { padding: 0.75rem; flex: 1; display: flex; flex-direction: column; gap: 1.5rem; }

  .group-title { padding-left: 0.5rem; font-size: 0.625rem; font-weight: 700; color: #9ca3af; text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 0.5rem; }

  .nav { display: flex; flex-direction: column; gap: 0.125rem; }

  .nav-btn {
    width: 100%;
    display: flex;
    align-items: center;
    padding: 0.5rem;
    font-size: 0.75rem;
    font-weight: 500;
    color: #4b5563;
    background: transparent;
    border: none;
    border-radius: 0.125rem;
    cursor: pointer;
    transition: all 0.2s;
  }

  :global(.dark) .nav-btn { color: #a3a3a3; }

  .nav-btn:hover { background-color: #f9fafb; color: #000000; }
  :global(.dark) .nav-btn:hover { background-color: #262626; color: #ffffff; }

  .nav-btn.active { background-color: #f3f4f6; color: #000000; font-weight: 600; }
  :global(.dark) .nav-btn.active { background-color: #262626; color: #ffffff; }

  .icon { font-size: 1.125rem; margin-right: 0.75rem; }

  .text { flex: 1; text-align: left; }

  .count-badge { font-size: 0.625rem; color: #9ca3af; }
  .count-badge.active { background-color: #ffffff; border: 1px solid #e5e7eb; padding: 0.125rem 0.375rem; border-radius: 0.25rem; color: #000000; }
  :global(.dark) .count-badge.active { background-color: #000000; border-color: #404040; color: #ffffff; }

  .dot { width: 0.5rem; height: 0.5rem; border-radius: 50%; }

  .footer { padding: 1rem; border-top: 1px solid #e5e7eb; }
  :global(.dark) .footer { border-top-color: #404040; }

  .export-btn {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    padding: 0.5rem;
    font-size: 0.75rem;
    font-weight: 500;
    color: #374151;
    background: transparent;
    border: 1px solid #d1d5db;
    border-radius: 0.125rem;
    cursor: pointer;
    transition: all 0.2s;
  }

  :global(.dark) .export-btn { color: #d1d5db; border-color: #404040; }

  .export-btn:hover { background-color: #f9fafb; border-color: #000000; }
  :global(.dark) .export-btn:hover { background-color: #262626; border-color: #ffffff; }

  .icon-small { font-size: 1rem; }
</style>
