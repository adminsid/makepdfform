<script lang="ts">
  const logs = [
    { time: '14:23:01.042', type: 'INFO', msg: 'Connection established to wss://log-stream.makepdfform.com' },
    { time: '14:23:02.115', type: 'SUCCESS', msg: 'Auth handshake completed. Session ID: sess_8x923kjsd' },
    { time: '14:23:05.500', type: 'INFO', msg: 'Loading configuration schema v2.4.1' },
    { time: '14:23:05.890', type: 'WARN', msg: 'Rate limit threshold approaching for endpoint /v1/templates (85%)' },
    { time: '14:24:12.331', type: 'INFO', msg: "User 'admin_dev' accessed Global Settings" },
    { time: '14:24:15.004', type: 'ERROR', msg: 'Payment Gateway health check failed for PayPal Pro: Timeout (5000ms)' },
    { time: '14:24:15.005', type: 'INFO', msg: 'Retrying health check... (Attempt 1/3)' },
    { time: '14:25:01.120', type: 'INFO', msg: 'Fetching system metrics... CPU: 12%, Memory: 450MB' },
    { time: '14:25:03.450', type: 'SUCCESS', msg: 'Database backup completed: daily_backup_2023_10_27.sql.gz (45MB)' },
  ];
</script>

<div class="developer-console">
  <header class="console-header">
    <div class="left">
      <span class="material-symbols-outlined icon">terminal</span>
      <h3 class="title">Developer Console</h3>
    </div>
    <div class="right">
      <div class="status">
        <div class="pulse-dot"></div>
        <span class="status-text">LIVE CONNECTION</span>
      </div>
      <div class="divider"></div>
      <button class="action-btn"><span class="material-symbols-outlined">delete</span></button>
      <button class="action-btn"><span class="material-symbols-outlined">vertical_align_bottom</span></button>
    </div>
  </header>

  <div class="log-view">
    {#each logs as log}
      <div class="log-line">
        <span class="timestamp">[{log.time}]</span>
        <span class="type" class:info={log.type==='INFO'} class:success={log.type==='SUCCESS'} class:warn={log.type==='WARN'} class:error={log.type==='ERROR'}>
          {log.type}
        </span>
        <span class="sep">|</span>
        <span class="message">{log.msg}</span>
      </div>
    {/each}
  </div>
</div>

<style>
  .developer-console {
    height: 16rem;
    background-color: #000000;
    display: flex;
    flex-direction: column;
    border-top: 1px solid #1f2937;
    flex-shrink: 0;
  }

  .console-header {
    height: 2.5rem;
    padding: 0 1rem;
    background-color: #111111;
    border-bottom: 1px solid #1f2937;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .left { display: flex; align-items: center; gap: 0.5rem; }

  .icon { font-size: 1rem; color: #9ca3af; }

  .title { font-size: 0.625rem; font-weight: 700; color: #d1d5db; text-transform: uppercase; letter-spacing: 0.1em; }

  .right { display: flex; align-items: center; gap: 0.75rem; }

  .status { display: flex; align-items: center; gap: 0.5rem; }

  .pulse-dot { width: 0.5rem; height: 0.5rem; background-color: #22c55e; border-radius: 50%; animation: pulse 2s infinite; }

  @keyframes pulse {
    0%, 100% { opacity: 1; transform: scale(1); }
    50% { opacity: 0.5; transform: scale(0.9); }
  }

  .status-text { font-size: 0.625rem; font-family: monospace; color: #9ca3af; }

  .divider { width: 1px; height: 1rem; background-color: #374151; }

  .action-btn { background: none; border: none; color: #6b7280; cursor: pointer; display: flex; transition: color 0.2s; }
  .action-btn:hover { color: #ffffff; }
  .action-btn .material-symbols-outlined { font-size: 1.125rem; }

  .log-view { flex: 1; overflow-y: auto; padding: 0.75rem 1rem; font-family: 'JetBrains Mono', monospace; font-size: 0.75rem; }

  .log-line { padding: 0.125rem 0; border-bottom: 1px dashed rgba(156, 163, 175, 0.1); color: #d1d5db; display: flex; gap: 0.5rem; }

  .timestamp { color: #6b7280; }

  .type { font-weight: 700; min-width: 3.5rem; }
  .type.info { color: #60a5fa; }
  .type.success { color: #34d399; }
  .type.warn { color: #fbbf24; }
  .type.error { color: #f87171; }

  .sep { color: #4b5563; }

  .message { line-height: 1.4; }
</style>
