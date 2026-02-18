<script lang="ts">
  const links = [
    { name: 'Public Website Main', date: 'Oct 24, 2023', url: 'makepdfform.com/f/x8k2...', views: '1,240', submissions: 342, status: 'Active' },
    { name: 'Email Campaign Q4', date: 'Nov 01, 2023', url: 'makepdfform.com/f/9m2p...', views: '856', submissions: 128, status: 'Active' },
    { name: 'Internal Testing', date: 'Oct 10, 2023', url: 'makepdfform.com/f/t3s1...', views: '42', submissions: 15, status: 'Paused' },
  ];
</script>

<div class="table-container">
  <div class="table-header">
    <h2 class="table-title">Active Links</h2>
    <div class="sort-control">
      <span class="sort-label">Sort by:</span>
      <select class="sort-select">
        <option>Date Created</option>
        <option>Views</option>
      </select>
    </div>
  </div>
  
  <div class="scroll-area">
    <table class="links-table">
      <thead>
        <tr>
          <th>Link Name</th>
          <th>URL</th>
          <th class="center">Views</th>
          <th class="center">Submissions</th>
          <th class="center">Status</th>
          <th class="right">Actions</th>
        </tr>
      </thead>
      <tbody>
        {#each links as link}
          <tr class:paused={link.status === 'Paused'}>
            <td>
              <div class="name">{link.name}</div>
              <div class="date">Created on {link.date}</div>
            </td>
            <td>
              <code class="url-code">{link.url}</code>
            </td>
            <td class="center font-mono">{link.views}</td>
            <td class="center">
              <span class="count-badge">{link.submissions}</span>
            </td>
            <td class="center">
              <span class="status-pill" class:active={link.status === 'Active'}>
                {link.status}
              </span>
            </td>
            <td class="right">
              <div class="actions">
                <button class="icon-btn" title="Copy Link">
                  <span class="material-symbols-outlined">content_copy</span>
                </button>
                <button class="icon-btn" title="Settings">
                  <span class="material-symbols-outlined">settings</span>
                </button>
              </div>
            </td>
          </tr>
        {/each}
      </tbody>
    </table>
  </div>

  <div class="table-footer">
    <span>Showing 3 of 3 links</span>
    <div class="pagination">
      <button class="page-btn disabled">Previous</button>
      <button class="page-btn disabled">Next</button>
    </div>
  </div>
</div>

<style>
  .table-container {
    background-color: #ffffff;
    border: 1px solid #e5e7eb;
    border-radius: 0.125rem;
    box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
    overflow: hidden;
    margin-bottom: 2rem;
  }

  :global(.dark) .table-container { background-color: #171717; border-color: #404040; }

  .table-header {
    padding: 1rem 1.5rem;
    border-bottom: 1px solid #e5e7eb;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: rgba(249, 250, 251, 0.5);
  }

  :global(.dark) .table-header { border-bottom-color: #404040; background-color: rgba(23, 23, 23, 0.5); }

  .table-title { font-size: 0.75rem; font-weight: 700; color: #111827; text-transform: uppercase; letter-spacing: 0.05em; }
  :global(.dark) .table-title { color: #ffffff; }

  .sort-control { display: flex; align-items: center; gap: 0.5rem; }

  .sort-label { font-size: 0.625rem; font-weight: 700; color: #6b7280; text-transform: uppercase; }

  .sort-select { font-size: 0.75rem; border: none; background: transparent; color: #374151; font-weight: 500; cursor: pointer; padding: 0; outline: none; }
  :global(.dark) .sort-select { color: #d1d5db; }

  .scroll-area { overflow-x: auto; }

  .links-table { width: 100%; border-collapse: collapse; font-size: 0.875rem; }

  th {
    padding: 0.75rem 1.5rem;
    background-color: #ffffff;
    border-bottom: 1px solid #e5e7eb;
    font-size: 0.625rem;
    font-weight: 700;
    color: #6b7280;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    text-align: left;
  }

  :global(.dark) th { background-color: #171717; border-bottom-color: #404040; color: #a3a3a3; }

  td { padding: 1rem 1.5rem; border-bottom: 1px solid #e5e7eb; vertical-align: middle; }
  :global(.dark) td { border-bottom-color: #404040; }

  tr:hover { background-color: #f9fafb; }
  :global(.dark) tr:hover { background-color: #262626; }

  tr.paused { opacity: 0.6; }

  .name { font-weight: 700; color: #111827; }
  :global(.dark) .name { color: #ffffff; }

  .date { font-size: 0.625rem; color: #6b7280; margin-top: 0.25rem; }

  .url-code { font-family: monospace; font-size: 0.75rem; color: #4b5563; }
  :global(.dark) .url-code { color: #d1d5db; }

  .center { text-align: center; }
  .right { text-align: right; }
  .font-mono { font-family: monospace; }

  .count-badge {
    display: inline-flex;
    padding: 0.125rem 0.5rem;
    background-color: #f3f4f6;
    border: 1px solid #e5e7eb;
    border-radius: 0.25rem;
    font-size: 0.75rem;
    font-weight: 500;
    color: #1f2937;
  }

  :global(.dark) .count-badge { background-color: #262626; border-color: #404040; color: #e5e7eb; }

  .status-pill {
    display: inline-flex;
    padding: 0.125rem 0.5rem;
    border-radius: 9999px;
    font-size: 0.625rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    background-color: #e5e7eb;
    color: #4b5563;
  }

  .status-pill.active { background-color: #000000; color: #ffffff; }
  :global(.dark) .status-pill.active { background-color: #ffffff; color: #000000; }

  .actions { display: flex; justify-content: flex-end; gap: 0.5rem; }

  .icon-btn {
    padding: 0.375rem;
    color: #9ca3af;
    background: none;
    border: none;
    cursor: pointer;
    border-radius: 0.125rem;
    transition: all 0.2s;
  }

  .icon-btn:hover { color: #000000; background-color: #f3f4f6; }
  :global(.dark) .icon-btn:hover { color: #ffffff; background-color: #262626; }

  .table-footer {
    padding: 0.75rem 1.5rem;
    background-color: rgba(249, 250, 251, 0.5);
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 0.75rem;
    color: #6b7280;
  }

  :global(.dark) .table-footer { background-color: rgba(23, 23, 23, 0.5); color: #a3a3a3; }

  .pagination { display: flex; gap: 0.25rem; }

  .page-btn { padding: 0.25rem 0.5rem; border-radius: 0.125rem; background: none; border: none; cursor: pointer; }
  .page-btn:hover:not(.disabled) { background-color: #e5e7eb; color: #000000; }
  .page-btn.disabled { opacity: 0.5; cursor: not-allowed; }
</style>
