<script lang="ts">
  interface Props {
    label: string;
    value: string;
    trend: string;
    trendUp: boolean;
    icon: string;
    subLeft: string;
    subRight: string;
    hasAlert?: boolean;
  }

  let { label, value, trend, trendUp, icon, subLeft, subRight, hasAlert = false }: Props = $props();
</script>

<div class="stat-card group">
  <div class="header">
    <h3 class="label">{label}</h3>
    <span class="material-symbols-outlined icon">{icon}</span>
  </div>
  
  <div class="main-val">
    <span class="value">{value}</span>
    <span class="trend" class:up={trendUp} class:down={!trendUp}>
      <span class="material-symbols-outlined trend-icon">{trendUp ? 'arrow_upward' : 'arrow_downward'}</span>
      {trend}
    </span>
  </div>
  
  <div class="footer">
    <span>{subLeft}</span>
    <span>{subRight}</span>
  </div>

  {#if hasAlert}
    <div class="alert-dot"></div>
  {/if}
</div>

<style>
  .stat-card {
    background-color: #ffffff;
    border: 1px solid #e5e7eb;
    padding: 1.5rem;
    position: relative;
    transition: all 0.2s;
  }

  :global(.dark) .stat-card { background-color: #171717; border-color: #404040; }

  .stat-card:hover { border-color: #000000; }
  :global(.dark) .stat-card:hover { border-color: #ffffff; }

  .header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 1rem; }

  .label {
    font-size: 0.625rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    color: #6b7280;
  }

  :global(.dark) .label { color: #a3a3a3; }

  .icon { font-size: 1.25rem; color: #d1d5db; transition: color 0.2s; }

  .stat-card:hover .icon { color: #000000; }
  :global(.dark) .stat-card:hover .icon { color: #ffffff; }

  .main-val { display: flex; align-items: baseline; gap: 0.5rem; }

  .value { font-family: monospace; font-size: 2.25rem; font-weight: 500; letter-spacing: -0.05em; color: #111827; }
  :global(.dark) .value { color: #ffffff; }

  .trend { display: flex; align-items: center; font-size: 0.75rem; font-weight: 600; }

  .trend.up { color: #16a34a; }
  .trend.down { color: #dc2626; }

  .trend-icon { font-size: 0.875rem; margin-right: 0.125rem; }

  .footer {
    margin-top: 1rem;
    padding-top: 1rem;
    border-top: 1px dashed #e5e7eb;
    display: flex;
    justify-content: space-between;
    font-family: monospace;
    font-size: 0.75rem;
    color: #6b7280;
  }

  :global(.dark) .footer { border-top-color: #262626; color: #9ca3af; }

  .alert-dot {
    position: absolute;
    top: 1.5rem;
    right: 3rem;
    width: 0.5rem;
    height: 0.5rem;
    background-color: #22c55e;
    border-radius: 50%;
    animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
  }

  @keyframes pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: .5; }
  }
</style>
