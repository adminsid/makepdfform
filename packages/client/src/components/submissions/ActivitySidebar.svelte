<aside class="activity-sidebar">
  <div class="sidebar-header">
    <h2 class="title">Submission Activity</h2>
    <button class="icon-btn" title="Export Log">
      <span class="material-symbols-outlined">download</span>
    </button>
  </div>

  <div class="timeline">
    <div class="timeline-item">
      <div class="marker-container">
        <div class="marker dot-black"></div>
        <div class="line"></div>
      </div>
      <div class="item-content">
        <div class="item-header">
          <span class="activity-title active">Submission Reviewed</span>
          <span class="time">11:05 AM</span>
        </div>
        <p class="description">Admin User marked this submission as <span class="status-verified">Verified</span>.</p>
      </div>
    </div>

    <div class="timeline-item">
      <div class="marker-container">
        <div class="marker dot-gray-dark"></div>
        <div class="line"></div>
      </div>
      <div class="item-content">
        <div class="item-header">
          <span class="activity-title">PDF Generated</span>
          <span class="time">10:43 AM</span>
        </div>
        <p class="description">System generated the final PDF document.</p>
        <button class="action-link">
          <span class="material-symbols-outlined">visibility</span>
          View generated file
        </button>
      </div>
    </div>

    <div class="timeline-item">
      <div class="marker-container">
        <div class="marker dot-gray"></div>
        <div class="line"></div>
      </div>
      <div class="item-content">
        <div class="item-header">
          <span class="activity-title">Form Submitted</span>
          <span class="time">10:42 AM</span>
        </div>
        <p class="description">John Doe completed the form submission.</p>
        <div class="metadata-box">
          <div class="meta-row">
            <span class="meta-label">IP Address:</span>
            <span class="meta-value">192.168.1.42</span>
          </div>
          <div class="meta-row">
            <span class="meta-label">Device:</span>
            <span class="meta-value">Mac / Chrome</span>
          </div>
        </div>
      </div>
    </div>

    <div class="timeline-item">
      <div class="marker-container">
        <div class="marker dot-gray-light"></div>
      </div>
      <div class="item-content">
        <div class="item-header">
          <span class="activity-title">Form Opened</span>
          <span class="time">10:15 AM</span>
        </div>
        <p class="description">John Doe viewed the form.</p>
      </div>
    </div>
  </div>

  <div class="sidebar-footer">
    <h3 class="footer-title">Actions</h3>
    <div class="actions-list">
      <button class="footer-btn">
        <span class="material-symbols-outlined">mail</span>
        Email Receipt
      </button>
      <button class="footer-btn danger">
        <span class="material-symbols-outlined">delete</span>
        Delete Submission
      </button>
    </div>
  </div>
</aside>

<style>
  .activity-sidebar {
    width: 18rem; /* 72 */
    background-color: var(--color-surface-light, #ffffff);
    border-left: 1px solid #e5e7eb;
    display: flex;
    flex-direction: column;
    overflow-y: auto;
    z-index: 10;
    flex-shrink: 0;
  }

  :global(.dark) .activity-sidebar {
    background-color: var(--color-surface-dark, #171717);
    border-left-color: #404040;
  }

  .sidebar-header {
    padding: 1rem;
    border-bottom: 1px solid #e5e7eb;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  :global(.dark) .sidebar-header {
    border-bottom-color: #404040;
  }

  .title {
    font-size: 0.875rem;
    font-weight: 700;
    color: #111827;
  }

  :global(.dark) .title { color: #ffffff; }

  .icon-btn {
    padding: 0.25rem;
    background: none;
    border: none;
    cursor: pointer;
    color: #9ca3af;
  }

  .icon-btn:hover { color: #000000; }
  :global(.dark) .icon-btn:hover { color: #ffffff; }

  .timeline {
    padding: 1.5rem 1rem;
    flex: 1;
  }

  .timeline-item {
    display: flex;
    gap: 0;
    position: relative;
    padding-bottom: 2rem;
  }

  .timeline-item:last-child { padding-bottom: 0; }

  .marker-container {
    width: 2rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
  }

  .marker {
    width: 0.75rem;
    height: 0.75rem;
    border-radius: 50%;
    background-color: #d1d5db;
    z-index: 10;
    box-shadow: 0 0 0 4px #ffffff;
  }

  :global(.dark) .marker { box-shadow: 0 0 0 4px #171717; }

  .dot-black { background-color: #000000; }
  :global(.dark) .dot-black { background-color: #ffffff; }
  .dot-gray-dark { background-color: #1f2937; }
  :global(.dark) .dot-gray-dark { background-color: #9ca3af; }
  .dot-gray { background-color: #9ca3af; }
  .dot-gray-light { background-color: #e5e7eb; }

  .line {
    position: absolute;
    top: 0.75rem;
    bottom: -2rem;
    width: 1px;
    background-color: #e5e7eb;
    z-index: 0;
  }

  :global(.dark) .line { background-color: #404040; }

  .item-content { flex: 1; padding-left: 0.5rem; }

  .item-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 0.25rem;
  }

  .activity-title { font-size: 0.75rem; font-weight: 600; color: #4b5563; }
  :global(.dark) .activity-title { color: #d1d5db; }
  .activity-title.active { font-weight: 700; color: #000000; }
  :global(.dark) .activity-title.active { color: #ffffff; }

  .time { font-size: 10px; color: #9ca3af; font-family: monospace; }

  .description { font-size: 11px; color: #6b7280; line-height: 1.4; }
  :global(.dark) .description { color: #9ca3af; }

  .status-verified { font-weight: 700; color: #15803d; }
  :global(.dark) .status-verified { color: #4ade80; }

  .action-link {
    display: flex;
    align-items: center;
    gap: 0.25rem;
    font-size: 10px;
    color: #2563eb;
    background: none;
    border: none;
    cursor: pointer;
    margin-top: 0.25rem;
    padding: 0;
  }

  .action-link:hover { text-decoration: underline; }

  .metadata-box {
    margin-top: 0.5rem;
    padding: 0.5rem;
    background-color: #f9fafb;
    border: 1px solid #e5e7eb;
    border-radius: 0.25rem;
  }

  :global(.dark) .metadata-box { background-color: #111827; border-color: #374151; }

  .meta-row { display: flex; justify-content: space-between; font-size: 10px; margin-bottom: 0.25rem; }
  .meta-row:last-child { margin-bottom: 0; }
  .meta-label { color: #9ca3af; }
  .meta-value { font-family: monospace; color: #4b5563; }
  :global(.dark) .meta-value { color: #d1d5db; }

  .sidebar-footer {
    padding: 1rem;
    border-top: 1px solid #e5e7eb;
    background-color: #f9fafb;
  }

  :global(.dark) .sidebar-footer { background-color: #111827; border-top-color: #374151; }

  .footer-title {
    font-size: 10px;
    font-weight: 700;
    text-transform: uppercase;
    color: #9ca3af;
    margin-bottom: 0.75rem;
    letter-spacing: 0.05em;
  }

  .actions-list { display: flex; flex-direction: column; gap: 0.5rem; }

  .footer-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    width: 100%;
    padding: 0.5rem;
    background-color: #ffffff;
    border: 1px solid #e5e7eb;
    border-radius: 0.125rem;
    font-size: 0.75rem;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s;
  }

  :global(.dark) .footer-btn { background-color: #000000; border-color: #374151; color: #ffffff; }

  .footer-btn:hover { border-color: #000000; }
  :global(.dark) .footer-btn:hover { border-color: #ffffff; }

  .footer-btn.danger { color: #dc2626; }
  :global(.dark) .footer-btn.danger { color: #f87171; }
  .footer-btn.danger:hover { border-color: #dc2626; }
</style>
