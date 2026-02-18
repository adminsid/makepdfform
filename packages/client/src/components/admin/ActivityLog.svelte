<script lang="ts">
  const activities = [
    { time: '14:30', title: 'New Admin Added', desc: "User 'dev_ops_lead' granted full access." },
    { time: '14:15', title: 'Database Migration', desc: 'Migration v4.2.1 completed successfully.', badge: 'v4.2.1' },
    { time: '13:58', title: 'API Alert Resolved', desc: 'Latency spike in US-EAST-1 normalized.' },
    { time: '13:42', title: 'Backup Complete', desc: 'Hourly snapshot stored in S3 bucket.' },
    { time: '13:20', title: 'User Report', desc: 'Flagged content in PDF ID #99281 reviewed.' },
    { time: '12:55', title: 'System Deploy', desc: 'Hotfix deployed to production cluster A.' },
    { time: '12:40', title: 'Plan Upgrade', desc: 'Enterprise License activated for Org #442.' },
  ];
</script>

<div class="activity-log">
  <header class="header">
    <div class="title-wrap">
      <div class="pulse-dot"></div>
      <h3 class="title">Recent Activity Log</h3>
    </div>
    <a href="#" class="view-all">View All</a>
  </header>
  
  <div class="scroll-area">
    <table class="activity-table">
      <tbody>
        {#each activities as act}
          <tr class="activity-row">
            <td class="time-col">{act.time}</td>
            <td class="content-col">
              <div class="act-title">{act.title}</div>
              <div class="act-desc">
                {#if act.badge}
                  {act.desc.split(act.badge)[0]}
                  <span class="version-badge">{act.badge}</span>
                  {act.desc.split(act.badge)[1]}
                {:else}
                  {act.desc}
                {/if}
              </div>
            </td>
          </tr>
        {/each}
      </tbody>
    </table>
  </div>
</div>

<style>
  .activity-log {
    background-color: #ffffff;
    border: 1px solid #e5e7eb;
    height: 100%;
    display: flex;
    flex-direction: column;
    overflow: hidden;
  }

  :global(.dark) .activity-log { background-color: #171717; border-color: #404040; }

  .header {
    padding: 1rem;
    border-bottom: 1px solid #e5e7eb;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #f9fafb;
    flex-shrink: 0;
  }

  :global(.dark) .header { border-bottom-color: #404040; background-color: #111111; }

  .title-wrap { display: flex; align-items: center; gap: 0.5rem; }

  .pulse-dot {
    width: 0.5rem;
    height: 0.5rem;
    background-color: #22c55e;
    border-radius: 50%;
    animation: pulse 2s infinite;
  }

  @keyframes pulse {
    0%, 100% { opacity: 1; transform: scale(1); }
    50% { opacity: 0.5; transform: scale(0.9); }
  }

  .title { font-size: 0.875rem; font-weight: 700; color: #111827; }
  :global(.dark) .title { color: #ffffff; }

  .view-all { font-size: 0.75rem; color: #6b7280; text-decoration: none; }
  .view-all:hover { text-decoration: underline; }

  .scroll-area { flex: 1; overflow-y: auto; }

  .activity-table { width: 100%; border-collapse: collapse; font-family: monospace; font-size: 0.75rem; }

  .activity-row { border-bottom: 1px solid #f3f4f6; transition: background-color 0.2s; }
  :global(.dark) .activity-row { border-bottom-color: #262626; }

  .activity-row:hover { background-color: #f9fafb; }
  :global(.dark) .activity-row:hover { background-color: #262626; }

  td { padding: 0.75rem; vertical-align: top; }

  .time-col { color: #9ca3af; width: 4rem; }

  .act-title { font-weight: 700; color: #111827; }
  :global(.dark) .act-title { color: #e5e5e5; }

  .act-desc { color: #6b7280; margin-top: 0.125rem; }

  .version-badge {
    padding: 0 0.25rem;
    background-color: #f3f4f6;
    border: 1px solid #e5e7eb;
    color: #374151;
    border-radius: 0.125rem;
  }

  :global(.dark) .version-badge { background-color: #404040; border-color: #525252; color: #d1d5db; }
</style>
