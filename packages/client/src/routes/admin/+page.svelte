<script lang="ts">
  import { onMount } from 'svelte';
  import AdminHeader from '../../components/admin/AdminHeader.svelte';
  import StatCard from '../../components/admin/StatCard.svelte';
  import ActivityLog from '../../components/admin/ActivityLog.svelte';
  import HealthSection from '../../components/admin/HealthSection.svelte';
  import { appState } from '../../lib/appState.svelte';

  let serverTime = $state('14:32:01 UTC');

  onMount(() => {
    const timer = setInterval(() => {
      serverTime = new Date().toISOString().split('T')[1].split('.')[0] + ' UTC';
    }, 1000);
    return () => clearInterval(timer);
  });

  const stats = [
    { label: 'Total Users', value: '24,592', trend: '12%', trendUp: true, icon: 'group', subLeft: 'New (24h): +142', subRight: 'Churn: 0.8%' },
    { label: 'Active Subscriptions', value: '8,103', trend: '4.2%', trendUp: true, icon: 'credit_card', subLeft: 'MRR: $124,520', subRight: 'Pro Plan: 65%' },
    { label: 'API Latency (p95)', value: '42ms', trend: 'Stable', trendUp: true, icon: 'speed', subLeft: 'Uptime: 99.99%', subRight: 'Req/s: 340', hasAlert: true },
  ];
</script>

<svelte:head>
  <title>Admin System Overview - Make PDF Form</title>
</svelte:head>

<div class="admin-wrapper" class:dark={appState.isDarkMode}>
  <AdminHeader />
  
  <main class="admin-main">
    <div class="container">
      <header class="page-header">
        <div class="title-area">
          <h2 class="page-title">System Overview</h2>
          <p class="server-time">Server Time: <span class="mono">{serverTime}</span></p>
        </div>
        <div class="actions">
          <button class="outline-btn">
            <span class="material-symbols-outlined">refresh</span> Refresh Data
          </button>
          <button class="primary-btn">
            <span class="material-symbols-outlined">download</span> Export Report
          </button>
        </div>
      </header>

      <div class="stats-grid">
        {#each stats as stat}
          <StatCard {...stat} />
        {/each}
      </div>

      <div class="main-grid">
        <div class="chart-area">
          <header class="chart-header">
            <h3 class="chart-title">Traffic & Usage</h3>
            <div class="tabs">
              <button class="tab-btn active">24H</button>
              <button class="tab-btn">7D</button>
              <button class="tab-btn">30D</button>
            </div>
          </header>
          <div class="chart-mock">
            <div class="chart-grid-bg">
              <div class="line"></div><div class="line"></div><div class="line"></div><div class="line"></div>
            </div>
            <div class="bars">
              {#each [40, 55, 45, 70, 60, 85, 75, 90, 65, 50, 95, 80] as h, i}
                <div class="bar" style="height: {h}%" style:opacity={h/100 + 0.1}></div>
              {/each}
            </div>
          </div>
        </div>
        
        <div class="log-area">
          <ActivityLog />
        </div>
      </div>

      <HealthSection />
    </div>
  </main>
</div>

<style>
  .admin-wrapper {
    height: 100vh;
    display: flex;
    flex-direction: column;
    background-color: #f9fafb;
    transition: background-color 0.2s;
  }

  :global(.dark) .admin-wrapper { background-color: #000000; }

  .admin-main { flex: 1; overflow-y: auto; padding: 2rem; }

  .container { max-width: 80rem; margin-left: auto; margin-right: auto; display: flex; flex-direction: column; gap: 2rem; }

  .page-header { display: flex; justify-content: space-between; align-items: flex-end; padding-bottom: 1rem; border-bottom: 1px solid #e5e7eb; }
  :global(.dark) .page-header { border-bottom-color: #404040; }

  .page-title { font-size: 1.5rem; font-weight: 700; color: #111827; margin-bottom: 0.25rem; }
  :global(.dark) .page-title { color: #ffffff; }

  .server-time { font-family: monospace; font-size: 0.875rem; color: #6b7280; }

  .mono { color: #111827; font-weight: 500; }
  :global(.dark) .mono { color: #d1d5db; }

  .actions { display: flex; gap: 0.75rem; }

  .outline-btn {
    display: flex;
    align-items: center;
    gap: 0.25rem;
    padding: 0.375rem 0.75rem;
    background: transparent;
    border: 1px solid #d1d5db;
    font-size: 0.75rem;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s;
  }

  :global(.dark) .outline-btn { border-color: #404040; color: #ffffff; }

  .outline-btn:hover { background-color: #ffffff; border-color: #000000; }
  :global(.dark) .outline-btn:hover { background-color: #1a1a1a; border-color: #ffffff; }

  .primary-btn {
    display: flex;
    align-items: center;
    gap: 0.25rem;
    padding: 0.375rem 0.75rem;
    background-color: #000000;
    color: #ffffff;
    border: none;
    font-size: 0.75rem;
    font-weight: 500;
    cursor: pointer;
    transition: opacity 0.2s;
  }

  :global(.dark) .primary-btn { background-color: #ffffff; color: #000000; }

  .primary-btn:hover { opacity: 0.9; }

  .stats-grid { display: grid; grid-template-columns: repeat(1, 1fr); gap: 1.5rem; }
  @media (min-width: 768px) { .stats-grid { grid-template-columns: repeat(3, 1fr); } }

  .main-grid { display: grid; grid-template-columns: 1fr; gap: 1.5rem; height: auto; }
  @media (min-width: 1024px) { .main-grid { grid-template-columns: 2fr 1fr; height: 32rem; } }

  .chart-area {
    background-color: #ffffff;
    border: 1px solid #e5e7eb;
    display: flex;
    flex-direction: column;
  }

  :global(.dark) .chart-area { background-color: #171717; border-color: #404040; }

  .chart-header { padding: 1rem; border-bottom: 1px solid #e5e7eb; display: flex; justify-content: space-between; align-items: center; }
  :global(.dark) .chart-header { border-bottom-color: #404040; }

  .chart-title { font-size: 0.875rem; font-weight: 700; color: #111827; }
  :global(.dark) .chart-title { color: #ffffff; }

  .tabs { display: flex; gap: 0.5rem; }

  .tab-btn {
    font-size: 0.625rem;
    font-weight: 700;
    padding: 0.25rem 0.5rem;
    background: none;
    border: none;
    color: #6b7280;
    cursor: pointer;
  }

  .tab-btn.active { background-color: #000000; color: #ffffff; }
  :global(.dark) .tab-btn.active { background-color: #ffffff; color: #000000; }

  .chart-mock { flex: 1; padding: 1.5rem; position: relative; display: flex; align-items: flex-end; justify-content: space-between; gap: 0.25rem; }

  .chart-grid-bg { position: absolute; inset: 1.5rem; display: flex; flex-direction: column; justify-content: space-between; pointer-events: none; }

  .line { width: 100%; height: 1px; border-top: 1px dashed #e5e7eb; }
  :global(.dark) .line { border-top-color: #262626; }

  .bars { width: 100%; height: 100%; position: relative; display: flex; align-items: flex-end; justify-content: space-around; padding: 0 1rem; }

  .bar { width: 2rem; background-color: #000000; transition: opacity 0.2s; cursor: pointer; }
  :global(.dark) .bar { background-color: #ffffff; }

  .bar:hover { opacity: 1 !important; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2); }
  :global(.dark) .bar:hover { box-shadow: 0 4px 12px rgba(255, 255, 255, 0.2); }

  .log-area { height: 100%; }
</style>
