<script lang="ts">
  const menuItems = [
    { name: 'Share Links', icon: 'link', active: true },
    { name: 'Embed', icon: 'code' },
    { name: 'QR Code', icon: 'qr_code' },
    { name: 'Email Invites', icon: 'mail' },
  ];

  const settingsItems = [
    { name: 'Access Control', icon: 'security' },
    { name: 'Notifications', icon: 'notifications' },
  ];
</script>

<aside class="share-sidebar">
  <div class="form-context">
    <div class="form-icon">
      <span class="material-symbols-outlined">description</span>
    </div>
    <div class="form-info">
      <h2 class="form-name">Buyer Registration</h2>
      <p class="edit-time">Last edited 2h ago</p>
    </div>
  </div>

  <nav class="nav-section">
    <h3 class="label">Distribution</h3>
    {#each menuItems as item}
      <a href="#" class="nav-link" class:active={item.active}>
        <span class="material-symbols-outlined icon">{item.icon}</span>
        {item.name}
      </a>
    {/each}

    <h3 class="label mt-6">Settings</h3>
    {#each settingsItems as item}
      <a href="#" class="nav-link">
        <span class="material-symbols-outlined icon">{item.icon}</span>
        {item.name}
      </a>
    {/each}
  </nav>

  <div class="sidebar-footer">
    <div class="limit-box">
      <h4 class="limit-title">Plan Limit</h4>
      <div class="progress-bar">
        <div class="progress-fill" style="width: 45%"></div>
      </div>
      <p class="limit-text">450 / 1,000 monthly submissions</p>
    </div>
  </div>
</aside>

<style>
  .share-sidebar {
    width: 16rem;
    height: 100%;
    background-color: #ffffff;
    border-right: 1px solid #e5e7eb;
    display: flex;
    flex-direction: column;
    flex-shrink: 0;
  }

  :global(.dark) .share-sidebar { background-color: #171717; border-right-color: #404040; }

  .form-context {
    padding: 1rem;
    border-bottom: 1px solid #e5e7eb;
    display: flex;
    align-items: center;
    gap: 0.75rem;
  }

  :global(.dark) .form-context { border-bottom-color: #404040; }

  .form-icon {
    padding: 0.5rem;
    background-color: #f3f4f6;
    border: 1px solid #e5e7eb;
    border-radius: 0.125rem;
    color: #4b5563;
  }

  :global(.dark) .form-icon { background-color: #262626; border-color: #404040; color: #d1d5db; }

  .form-name { font-size: 0.75rem; font-weight: 700; color: #111827; }
  :global(.dark) .form-name { color: #ffffff; }

  .edit-time { font-size: 0.625rem; color: #6b7280; }

  .nav-section { padding: 0.75rem; flex: 1; }

  .label {
    padding-left: 0.5rem;
    font-size: 0.625rem;
    font-weight: 700;
    color: #9ca3af;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    margin-bottom: 0.5rem;
  }

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

  .nav-link.active { background-color: #f3f4f6; color: #000000; }
  :global(.dark) .nav-link.active { background-color: #262626; color: #ffffff; }

  .icon { font-size: 1.125rem; margin-right: 0.75rem; }

  .mt-6 { margin-top: 1.5rem; }

  .sidebar-footer { padding: 1rem; border-top: 1px solid #e5e7eb; }
  :global(.dark) .sidebar-footer { border-top-color: #404040; }

  .limit-box {
    padding: 0.75rem;
    background-color: #f9fafb;
    border: 1px dashed #d1d5db;
    border-radius: 0.125rem;
  }

  :global(.dark) .limit-box { background-color: #262626; border-color: #404040; }

  .limit-title { font-size: 0.75rem; font-weight: 700; color: #111827; margin-bottom: 0.25rem; }
  :global(.dark) .limit-title { color: #ffffff; }

  .progress-bar { width: 100%; height: 0.375rem; background-color: #e5e7eb; border-radius: 9999px; margin-bottom: 0.5rem; overflow: hidden; }
  :global(.dark) .progress-bar { background-color: #404040; }

  .progress-fill { height: 100%; background-color: #000000; border-radius: 9999px; }
  :global(.dark) .progress-fill { background-color: #ffffff; }

  .limit-text { font-size: 0.625rem; color: #6b7280; }
</style>
