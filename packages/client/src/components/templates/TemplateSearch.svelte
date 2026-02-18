<script lang="ts">
  let { searchQuery = $bindable() } = $props();
</script>

<div class="search-section">
  <div class="container">
    <h1 class="title">Start with a professional template</h1>
    <p class="subtitle">
      Don't start from scratch. Choose from our gallery of high-conversion PDF templates, customize in seconds, and start collecting data.
    </p>
    <div class="search-box">
      <div class="search-wrapper">
        <span class="material-symbols-outlined search-icon">search</span>
        <input 
            class="search-input" 
            placeholder="Search templates (e.g., 'Rental Application', 'Invoice', 'W-9')" 
            type="text"
            bind:value={searchQuery}
        />
      </div>
    </div>
    <div class="popular-tags">
      <span class="label">Popular:</span>
      <div class="tags">
        <button class="tag" onclick={() => searchQuery = 'Real Estate'}>Real Estate</button>
        <button class="tag" onclick={() => searchQuery = 'Human Resources'}>Human Resources</button>
        <button class="tag" onclick={() => searchQuery = 'Contracts'}>Contracts</button>
      </div>
    </div>
  </div>
</div>

<style>
  .search-section {
    background-color: #fafafa;
    border-bottom: 1px solid #e5e5e5;
    padding-top: 4rem;
    padding-bottom: 4rem;
  }

  .container {
    max-width: 56rem; /* 4xl */
    margin-left: auto;
    margin-right: auto;
    padding-left: 1rem;
    padding-right: 1rem;
    text-align: center;
  }

  .title {
    font-size: 1.875rem;
    font-weight: 700;
    letter-spacing: -0.025em;
    margin-bottom: 1rem;
    color: #111111;
  }

  @media (min-width: 768px) {
    .title { font-size: 3rem; }
  }

  .subtitle {
    font-size: 1.125rem;
    color: #666666;
    margin-bottom: 2rem;
    max-width: 42rem;
    margin-left: auto;
    margin-right: auto;
  }

  .search-box {
    max-width: 36rem; /* xl */
    margin-left: auto;
    margin-right: auto;
    position: relative;
  }

  .search-wrapper {
      position: relative;
  }

  .search-icon {
    position: absolute;
    left: 0.75rem;
    top: 0.75rem;
    color: #9ca3af;
  }

  .search-input {
    width: 100%;
    padding: 0.75rem 0.75rem 0.75rem 2.5rem;
    border: 1px solid #e5e5e5;
    border-radius: 0.75rem;
    background-color: #ffffff;
    font-size: 0.875rem;
    outline: none;
    box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
    transition: border-color 0.2s, box-shadow 0.2s;
  }

  .search-input:focus {
    border-color: #000000;
    box-shadow: 0 0 0 1px #000000;
  }

  .popular-tags {
    margin-top: 1.5rem;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    gap: 0.5rem;
  }

  .label {
    font-size: 0.75rem;
    font-weight: 500;
    color: #6b7280;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    margin-right: 0.5rem;
  }

  .tags {
    display: flex;
    gap: 0.5rem;
  }

  .tag {
    padding: 0.25rem 0.75rem;
    background-color: #ffffff;
    border: 1px solid #e5e5e5;
    border-radius: 9999px;
    font-size: 0.75rem;
    font-weight: 500;
    cursor: pointer;
    transition: border-color 0.2s;
  }

  .tag:hover {
    border-color: #9ca3af;
  }
</style>
