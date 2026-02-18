<script lang="ts">
  interface Props {
    title: string;
    lastEdited: string;
    submissions: number;
    users?: string[];
  }

  let { title, lastEdited, submissions, users = [] }: Props = $props();
</script>

<div class="card">
  <div class="more-btn-container">
    <button class="more-btn">
      <span class="material-symbols-outlined">more_vert</span>
    </button>
  </div>
  <div class="preview-area">
    <div class="mini-doc">
      <div class="mini-title"></div>
      <div class="mini-line"></div>
      <div class="mini-line"></div>
      <div class="mini-line short"></div>
      <div class="mini-line"></div>
      <div class="mini-line"></div>
    </div>
  </div>
  <div class="card-info">
    <h3 class="card-title" title={title}>{title}</h3>
    <div class="card-footer">
      <div class="footer-left">
        <span class="stat">Last edited: {lastEdited}</span>
        <span class="stat">Submissions: {submissions}</span>
      </div>
      {#if users.length > 0}
        <div class="user-avatars">
          {#each users as user}
            <div class="mini-avatar">{user}</div>
          {/each}
        </div>
      {/if}
    </div>
  </div>
</div>

<style>
  .card {
    background-color: #ffffff;
    border: 1px solid #000000;
    border-radius: 0.125rem;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    transition: box-shadow 0.2s;
    position: relative;
  }

  :global(.dark) .card {
    background-color: #171717;
    border-color: #374151;
  }

  .card:hover {
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
  }

  .more-btn-container {
    position: absolute;
    top: 0.75rem;
    right: 0.75rem;
    z-index: 10;
    opacity: 0;
    transition: opacity 0.2s;
  }

  .card:hover .more-btn-container {
    opacity: 1;
  }

  .more-btn {
    padding: 0.25rem;
    background-color: #ffffff;
    border: 1px solid #e5e7eb;
    border-radius: 0.125rem;
    cursor: pointer;
  }

  :global(.dark) .more-btn {
    background-color: #000000;
    border-color: #374151;
    color: #ffffff;
  }

  .more-btn:hover {
    background-color: #f9fafb;
  }

  :global(.dark) .more-btn:hover {
    background-color: #1f2937;
  }

  .preview-area {
    padding: 1.5rem;
    background-color: #f9fafb;
    border-bottom: 1px solid #f3f4f6;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 12.5rem;
  }

  :global(.dark) .preview-area {
    background-color: #111827;
    border-bottom-color: #1f2937;
  }

  .mini-doc {
    width: 7.5rem;
    height: 10rem;
    background-color: #ffffff;
    box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
    border: 1px solid #e5e7eb;
    display: flex;
    flex-direction: column;
    padding: 0.5rem;
  }

  :global(.dark) .mini-doc {
    background-color: #1f2937;
    border-color: #374151;
  }

  .mini-title {
    height: 0.5rem;
    width: 4rem;
    background-color: #e5e7eb;
    margin-bottom: 0.5rem;
  }

  :global(.dark) .mini-title { background-color: #374151; }

  .mini-line {
    height: 0.25rem;
    width: 100%;
    background-color: #f3f4f6;
    margin-bottom: 0.25rem;
  }

  :global(.dark) .mini-line { background-color: #374151; }

  .mini-line.short { width: 66.666667%; margin-bottom: 0.75rem; }

  .card-info {
    padding: 1rem;
    display: flex;
    flex-direction: column;
    flex: 1;
  }

  .card-title {
    font-size: 0.875rem;
    font-weight: 700;
    color: #111827;
    margin-bottom: 0.25rem;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  :global(.dark) .card-title {
    color: #ffffff;
  }

  .card-footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: auto;
    padding-top: 1rem;
  }

  .footer-left {
    display: flex;
    flex-direction: column;
  }

  .stat {
    font-size: 0.625rem; /* 10px */
    color: #6b7280;
    font-family: var(--font-mono, monospace);
  }

  :global(.dark) .stat {
    color: #9ca3af;
  }

  .user-avatars {
    display: flex;
    margin-left: -0.5rem;
  }

  .mini-avatar {
    width: 1.5rem;
    height: 1.5rem;
    border-radius: 50%;
    border: 2px solid #ffffff;
    background-color: #e5e7eb;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 8px;
    font-weight: 700;
    margin-left: -0.5rem;
  }

  :global(.dark) .mini-avatar {
    border-color: #171717;
    background-color: #374151;
  }
</style>
