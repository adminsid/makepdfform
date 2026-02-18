<div class="sub-header">
  <div class="tabs">
    <button class="tab active">My Forms</button>
    <button class="tab">Shared with me</button>
  </div>
  <div class="search-container">
    <div class="search-wrapper">
      <span class="material-symbols-outlined search-icon">search</span>
      <input class="search-input" placeholder="Search forms..." type="text"/>
    </div>
  </div>
  <div class="sort-container">
    <span class="sort-label">Sort by:</span>
    <button class="sort-btn">
      Last Edited
      <span class="material-symbols-outlined sort-icon-small">expand_more</span>
    </button>
  </div>
</div>

<style>
  .sub-header {
    height: 3rem;
    border-bottom: 1px solid #e5e7eb;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-left: 1.5rem;
    padding-right: 1.5rem;
    background-color: #ffffff;
    flex-shrink: 0;
    transition: background-color 0.2s, border-color 0.2s;
  }

  :global(.dark) .sub-header {
    background-color: #000000;
    border-bottom-color: #1f2937;
  }

  .tabs {
    display: flex;
    gap: 1.5rem;
    height: 100%;
  }

  .tab {
    font-size: 0.75rem;
    font-weight: 500;
    color: #6b7280;
    background: none;
    border: none;
    cursor: pointer;
    transition: color 0.2s;
    height: 100%;
    display: flex;
    align-items: center;
    position: relative;
    padding: 0;
  }

  :global(.dark) .tab {
    color: #9ca3af;
  }

  .tab.active {
    font-weight: 700;
    color: #000000;
  }

  :global(.dark) .tab.active {
    color: #ffffff;
  }

  .tab.active::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 2px;
    background-color: #000000;
  }

  :global(.dark) .tab.active::after {
    background-color: #ffffff;
  }

  .search-container {
    flex: 1;
    max-width: 32rem;
    padding-left: 2rem;
    padding-right: 2rem;
  }

  .search-wrapper {
    position: relative;
  }

  .search-icon {
    position: absolute;
    left: 0.625rem;
    top: 0.375rem;
    color: #9ca3af;
    font-size: 1.125rem;
  }

  .search-input {
    width: 100%;
    background-color: #f9fafb;
    border: 1px solid #e5e7eb;
    border-radius: 0.125rem;
    padding: 0.375rem 0.75rem 0.375rem 2.25rem;
    font-size: 0.75rem;
    outline: none;
    transition: all 0.2s;
  }

  :global(.dark) .search-input {
    background-color: #111827;
    border-color: #374151;
    color: #ffffff;
  }

  .search-input:focus {
    border-color: #000000;
    box-shadow: 0 0 0 1px #000000;
  }

  :global(.dark) .search-input:focus {
    border-color: #ffffff;
    box-shadow: 0 0 0 1px #ffffff;
  }

  .sort-container {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  .sort-label {
    font-size: 0.75rem;
    color: #6b7280;
  }

  .sort-btn {
    display: flex;
    align-items: center;
    font-size: 0.75rem;
    font-weight: 500;
    color: #000000;
    background: none;
    border: none;
    cursor: pointer;
  }

  .sort-btn:hover {
    text-decoration: underline;
  }

  :global(.dark) .sort-btn {
    color: #ffffff;
  }

  .sort-icon-small {
    font-size: 1rem;
    margin-left: 0.25rem;
  }
</style>
