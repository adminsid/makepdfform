<script lang="ts">
  const submissions = [
    { id: '#4291', name: 'John Doe', time: '10:42 AM', title: 'Buyer Registration', status: 'COMPLETE', active: true },
    { id: '#4290', name: 'Sarah Smith', time: 'Yesterday', title: 'Buyer Registration', status: 'PENDING' },
    { id: '#4289', name: 'Michael Brown', time: 'Oct 24', title: 'Buyer Registration', status: 'REVIEWED', flagged: true },
    { id: '#4288', name: 'Emily Davis', time: 'Oct 23', title: 'Buyer Registration', status: 'COMPLETE' },
  ];
</script>

<aside class="sidebar">
  <div class="sidebar-header">
    <div class="header-top">
      <h2 class="title">All Submissions</h2>
      <span class="count">24</span>
    </div>
    <div class="search-box">
      <span class="material-symbols-outlined search-icon">search</span>
      <input class="search-input" placeholder="Search by name or ID..." type="text"/>
    </div>
    <div class="filters">
      <button class="filter-btn active">Newest</button>
      <button class="filter-btn">Unread</button>
      <button class="filter-btn">Flagged</button>
    </div>
  </div>
  <div class="submission-list">
    {#each submissions as sub}
      <div class="submission-item" class:active={sub.active}>
        <div class="item-top">
          <span class="name">{sub.name}</span>
          <span class="time">{sub.time}</span>
        </div>
        <div class="item-title">{sub.title} {sub.id}</div>
        <div class="item-footer">
          <span class="status-badge" class:pending={sub.status === 'PENDING'} class:reviewed={sub.status === 'REVIEWED'}>
            {sub.status}
          </span>
          {#if sub.flagged}
            <span class="material-symbols-outlined icon-small">flag</span>
          {/if}
          <span class="material-symbols-outlined icon-small">attachment</span>
        </div>
      </div>
    {/each}
  </div>
</aside>

<style>
  .sidebar {
    width: 20rem; /* 80 */
    background-color: var(--color-surface-light, #ffffff);
    border-right: 1px solid #e5e7eb;
    display: flex;
    flex-direction: column;
    overflow-y: auto;
    z-index: 10;
    flex-shrink: 0;
  }

  :global(.dark) .sidebar {
    background-color: var(--color-surface-dark, #171717);
    border-right-color: #404040;
  }

  .sidebar-header {
    padding: 1rem;
    border-bottom: 1px solid #e5e7eb;
  }

  :global(.dark) .sidebar-header {
    border-bottom-color: #404040;
  }

  .header-top {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 0.75rem;
  }

  .title {
    font-size: 0.875rem;
    font-weight: 700;
    color: #111827;
    text-transform: uppercase;
    letter-spacing: 0.025em;
  }

  :global(.dark) .title {
    color: #ffffff;
  }

  .count {
    font-size: 0.75rem;
    color: #6b7280;
    background-color: #f3f4f6;
    padding: 0.125rem 0.5rem;
    border-radius: 9999px;
  }

  :global(.dark) .count {
    background-color: #1f2937;
    color: #9ca3af;
  }

  .search-box {
    position: relative;
    margin-bottom: 0.75rem;
  }

  .search-icon {
    position: absolute;
    left: 0.625rem;
    top: 0.5rem;
    color: #9ca3af;
    font-size: 1rem;
  }

  .search-input {
    width: 100%;
    background-color: #f9fafb;
    border: 1px solid #e5e7eb;
    border-radius: 0.125rem;
    padding: 0.375rem 0.75rem 0.375rem 2rem;
    font-size: 0.75rem;
    outline: none;
    transition: box-shadow 0.2s;
  }

  :global(.dark) .search-input {
    background-color: #1f2937;
    border-color: #374151;
    color: #ffffff;
  }

  .search-input:focus {
    box-shadow: 0 0 0 1px #000000;
  }

  :global(.dark) .search-input:focus {
    box-shadow: 0 0 0 1px #ffffff;
  }

  .filters {
    display: flex;
    gap: 0.5rem;
  }

  .filter-btn {
    flex: 1;
    padding: 0.25rem;
    font-size: 10px;
    font-weight: 500;
    border: 1px solid #e5e7eb;
    border-radius: 0.125rem;
    background: transparent;
    cursor: pointer;
    transition: all 0.2s;
  }

  :global(.dark) .filter-btn {
    border-color: #374151;
    color: #9ca3af;
  }

  .filter-btn:hover {
    background-color: #f9fafb;
  }

  :global(.dark) .filter-btn:hover {
    background-color: #1f2937;
  }

  .filter-btn.active {
    background-color: #000000;
    color: #ffffff;
    border-color: #000000;
  }

  :global(.dark) .filter-btn.active {
    background-color: #ffffff;
    color: #000000;
    border-color: #ffffff;
  }

  .submission-list {
    display: flex;
    flex-direction: column;
    border-top: 1px solid #f9fafb;
  }

  :global(.dark) .submission-list {
    border-top-color: #000000;
  }

  .submission-item {
    padding: 1rem;
    border-bottom: 1px solid #f3f4f6;
    cursor: pointer;
    transition: background-color 0.2s;
    border-left: 2px solid transparent;
  }

  :global(.dark) .submission-item {
    border-bottom-color: #1f2937;
  }

  .submission-item:hover {
    background-color: #f9fafb;
  }

  :global(.dark) .submission-item:hover {
    background-color: #111827;
  }

  .submission-item.active {
    background-color: #f3f4f6;
    border-left-color: #000000;
  }

  :global(.dark) .submission-item.active {
    background-color: #1f2937;
    border-left-color: #ffffff;
  }

  .item-top {
    display: flex;
    justify-content: space-between;
    margin-bottom: 0.25rem;
  }

  .name {
    font-size: 0.75rem;
    font-weight: 700;
    color: #000000;
  }

  :global(.dark) .name {
    color: #ffffff;
  }

  .time {
    font-size: 10px;
    color: #6b7280;
    font-family: monospace;
  }

  .item-title {
    font-size: 11px;
    color: #4b5563;
    margin-bottom: 0.25rem;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  :global(.dark) .item-title {
    color: #9ca3af;
  }

  .item-footer {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin-top: 0.5rem;
  }

  .status-badge {
    padding: 0.125rem 0.375rem;
    background-color: #ffffff;
    border: 1px solid #e5e7eb;
    border-radius: 0.25rem;
    font-size: 9px;
    font-family: monospace;
    color: #4b5563;
  }

  :global(.dark) .status-badge {
    background-color: #000000;
    border-color: #374151;
    color: #9ca3af;
  }

  .status-badge.pending {
    background-color: #f9fafb;
    color: #6b7280;
  }

  .status-badge.reviewed {
    background-color: #f9fafb;
    color: #4b5563;
  }

  .icon-small {
    font-size: 14px;
    color: #9ca3af;
  }
</style>
