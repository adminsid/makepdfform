<script lang="ts">
  const categories = [
    { name: 'All Templates', count: 124, active: true },
    { name: 'Real Estate', count: 42 },
    { name: 'Finance & Tax', count: 28 },
    { name: 'Human Resources', count: 35 },
    { name: 'Legal Contracts', count: 19 },
    { name: 'Education', count: 12 },
    { name: 'Healthcare', count: 8 },
  ];
</script>

<aside class="sidebar">
  <div class="sticky-content">
    <h3 class="sidebar-title">Categories</h3>
    <ul class="category-list">
      {#each categories as cat}
        <li>
          <a href="#" class="category-link" class:active={cat.active}>
            <span class="name">{cat.name}</span>
            <span class="count" class:active={cat.active}>{cat.count}</span>
          </a>
        </li>
      {/each}
    </ul>
  </div>
</aside>

<style>
  .sidebar {
    width: 100%;
  }

  @media (min-width: 1024px) {
    .sidebar { width: 16rem; flex-shrink: 0; }
  }

  .sticky-content {
    position: sticky;
    top: 6rem;
  }

  .sidebar-title {
    font-size: 0.75rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    color: #9ca3af;
    margin-bottom: 1rem;
    padding-left: 0.75rem;
  }

  .category-list {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
  }

  .category-link {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.5rem 0.75rem;
    border-radius: 0.375rem;
    font-size: 0.875rem;
    font-weight: 500;
    color: #4b5563;
    text-decoration: none;
    transition: all 0.2s;
  }

  .category-link:hover {
    background-color: #f9fafb;
    color: #000000;
  }

  .category-link.active {
    background-color: #111111;
    color: #ffffff;
  }

  .count {
    font-size: 0.75rem;
    color: #9ca3af;
  }

  .count.active {
    background-color: #1f2937;
    color: #d1d5db;
    padding: 0.125rem 0.375rem;
    border-radius: 9999px;
  }
</style>
