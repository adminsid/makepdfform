<script lang="ts">
  const services = [
    { name: 'Auth Service', status: 'online', version: 'v2.1.0' },
    { name: 'PDF Generator', status: 'online', version: 'v3.0.5' },
    { name: 'Email Queue', status: 'warning', version: 'High Load' },
    { name: 'Storage (S3)', status: 'online', version: '45% Used' },
  ];
</script>

<div class="health-section">
  <h3 class="section-title">Infrastructure Health</h3>
  <div class="health-grid">
    {#each services as svc}
      <div class="svc-card">
        <div class="svc-status">
          <div class="dot" class:online={svc.status === 'online'} class:warning={svc.status === 'warning'}></div>
          <span class="svc-name">{svc.name}</span>
        </div>
        <span class="svc-version">{svc.version}</span>
      </div>
    {/each}
  </div>
</div>

<style>
  .health-section {
    background-color: #ffffff;
    border: 1px solid #e5e7eb;
    padding: 1.5rem;
  }

  :global(.dark) .health-section { background-color: #171717; border-color: #404040; }

  .section-title { font-size: 0.875rem; font-weight: 700; color: #111827; margin-bottom: 1rem; }
  :global(.dark) .section-title { color: #ffffff; }

  .health-grid { display: grid; grid-template-columns: repeat(1, 1fr); gap: 1rem; }

  @media (min-width: 768px) {
    .health-grid { grid-template-columns: repeat(4, 1fr); }
  }

  .svc-card {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.75rem;
    border: 1px solid #f3f4f6;
    background-color: #f9fafb;
    font-family: monospace;
  }

  :global(.dark) .svc-card { border-color: #262626; background-color: #111111; }

  .svc-status { display: flex; align-items: center; gap: 0.5rem; }

  .dot { width: 0.5rem; height: 0.5rem; border-radius: 50%; }
  .dot.online { background-color: #22c55e; }
  .dot.warning { background-color: #eab308; animation: pulse 1s infinite; }

  @keyframes pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.5; }
  }

  .svc-name { font-size: 0.75rem; font-weight: 500; color: #4b5563; }
  :global(.dark) .svc-name { color: #d1d5db; }

  .svc-version { font-size: 0.75rem; color: #9ca3af; }
</style>
