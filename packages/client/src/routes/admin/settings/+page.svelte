<script lang="ts">
  import AdminHeader from '../../../components/admin/AdminHeader.svelte';
  import AdminSettingsSidebar from '../../../components/admin/AdminSettingsSidebar.svelte';
  import DeveloperConsole from '../../../components/admin/DeveloperConsole.svelte';
  import { appState } from '../../../lib/appState.svelte';
</script>

<svelte:head>
  <title>Global Platform Settings - Make PDF Form</title>
</svelte:head>

<div class="admin-wrapper" class:dark={appState.isDarkMode}>
  <AdminHeader />
  
  <div class="main-layout">
    <AdminSettingsSidebar />
    
    <main class="content-area">
      <div class="settings-scroll">
        <div class="container">
          <header class="page-header">
            <div class="text">
              <h2 class="title">Global Platform Settings</h2>
              <p class="subtitle">Manage system-wide configurations, API keys, and maintenance states.</p>
            </div>
            <button class="save-btn">
              <span class="material-symbols-outlined">save</span>
              Save Changes
            </button>
          </header>

          <div class="sections">
            <!-- Maintenance Mode -->
            <section class="settings-section">
              <div class="section-top">
                <div class="text">
                  <h3 class="section-title">
                    <span class="material-symbols-outlined icon">build_circle</span>
                    System-wide Maintenance Mode
                  </h3>
                  <p class="section-desc">
                    When enabled, the platform will be inaccessible to all non-admin users. A maintenance page will be displayed.
                  </p>
                </div>
                <div class="toggle-control">
                  <div class="toggle-switch">
                    <input type="checkbox" id="maintenance-mode" />
                    <label for="maintenance-mode">
                      <span class="sr-only">Toggle Maintenance Mode</span>
                    </label>
                  </div>
                  <span class="status-label">Disabled</span>
                </div>
              </div>
              <div class="section-content grid">
                <div class="field">
                  <label for="maintenance-start">Scheduled Window Start</label>
                  <input id="maintenance-start" type="datetime-local" class="input" />
                </div>
                <div class="field">
                  <label for="maintenance-duration">Estimated Duration</label>
                  <select id="maintenance-duration" class="input">
                    <option>30 Minutes</option>
                    <option>1 Hour</option>
                    <option>2 Hours</option>
                    <option>4 Hours</option>
                  </select>
                </div>
              </div>
            </section>

            <!-- API Configuration -->
            <section class="settings-section">
              <div class="section-top">
                <div class="text">
                  <h3 class="section-title">
                    <span class="material-symbols-outlined icon">hub</span>
                    API Configuration
                  </h3>
                  <p class="section-desc">Manage endpoints and rate limiting for the public API.</p>
                </div>
              </div>
              <div class="section-content stack">
                <div class="grid">
                  <div class="field">
                    <label for="api-endpoint">Core API Endpoint</label>
                    <div class="icon-input">
                      <span class="material-symbols-outlined input-icon">link</span>
                      <input id="api-endpoint" type="text" value="https://api.makepdfform.com/v1" class="input pl-8 mono" />
                    </div>
                  </div>
                  <div class="field">
                    <label for="webhook-receiver">Webhook Receiver</label>
                    <div class="icon-input">
                      <span class="material-symbols-outlined input-icon">webhook</span>
                      <input id="webhook-receiver" type="text" value="https://hooks.makepdfform.com/listener" class="input pl-8 mono" />
                    </div>
                  </div>
                </div>
                <div class="field mt-4">
                  <label for="rate-limit">Rate Limit (Requests/Min)</label>
                  <div class="range-wrap">
                    <input id="rate-limit" type="range" min="60" max="1000" value="600" class="range" />
                    <span class="range-val mono">600</span>
                  </div>
                </div>
              </div>
            </section>

            <!-- Payment Gateway -->
            <section class="settings-section">
              <div class="section-top">
                <div class="text">
                  <h3 class="section-title">
                    <span class="material-symbols-outlined icon">payments</span>
                    Payment Gateway Status
                  </h3>
                  <p class="section-desc">Current active provider and transaction mode.</p>
                </div>
                <span class="status-badge">Active</span>
              </div>
              <div class="section-content">
                <div class="gateways-grid">
                  <div class="gateway-card active">
                    <div class="check"><span class="material-symbols-outlined">check_circle</span></div>
                    <h4 class="gw-name">Stripe Connect</h4>
                    <p class="gw-role">Primary Processor</p>
                    <code class="gw-key">pk_live_...4592</code>
                  </div>
                  <div class="gateway-card disabled">
                    <h4 class="gw-name">PayPal Pro</h4>
                    <p class="gw-role">Backup Processor</p>
                    <button class="activate-btn">Activate</button>
                  </div>
                  <div class="gateway-card add">
                    <span class="material-symbols-outlined">add</span>
                    <span class="text">Add Provider</span>
                  </div>
                </div>
                <div class="test-mode mt-6">
                  <div class="toggle-switch small">
                    <input type="checkbox" id="testmode" />
                    <label for="testmode"></label>
                  </div>
                  <span class="test-label">Sandbox Mode (Test Transactions)</span>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
      
      <DeveloperConsole />
    </main>
  </div>
</div>

<style>
  .admin-wrapper {
    height: 100vh;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    background-color: #f9fafb;
    transition: background-color 0.2s;
  }

  :global(.dark) .admin-wrapper { background-color: #000000; }

  .main-layout { flex: 1; display: flex; overflow: hidden; }

  .content-area { flex: 1; display: flex; flex-direction: column; overflow: hidden; }

  .settings-scroll { flex: 1; overflow-y: auto; padding: 2rem; }

  .container { max-width: 56rem; margin-left: auto; margin-right: auto; }

  .page-header { display: flex; justify-content: space-between; align-items: center; padding-bottom: 2rem; border-bottom: 1px solid #e5e7eb; margin-bottom: 2rem; }
  :global(.dark) .page-header { border-bottom-color: #404040; }

  .title { font-size: 1.5rem; font-weight: 700; color: #111827; }
  :global(.dark) .title { color: #ffffff; }

  .subtitle { font-size: 0.875rem; color: #6b7280; margin-top: 0.25rem; }

  .save-btn { display: flex; align-items: center; gap: 0.5rem; padding: 0.625rem 1.25rem; background-color: #000000; color: #ffffff; border: none; font-size: 0.75rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; cursor: pointer; border-radius: 0.125rem; }
  :global(.dark) .save-btn { background-color: #ffffff; color: #000000; }

  .sections { display: flex; flex-direction: column; gap: 1.5rem; padding-bottom: 2rem; }

  .settings-section { background-color: #ffffff; border: 1px solid #e5e7eb; padding: 1.5rem; border-radius: 0.125rem; box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05); }
  :global(.dark) .settings-section { background-color: #171717; border-color: #404040; }

  .section-top { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 1.5rem; }

  .section-title { display: flex; align-items: center; gap: 0.75rem; font-size: 1rem; font-weight: 700; color: #111827; }
  :global(.dark) .section-title { color: #ffffff; }

  .icon { font-size: 1.25rem; color: #9ca3af; }

  .section-desc { font-size: 0.875rem; color: #6b7280; margin-top: 0.25rem; max-width: 36rem; }

  .toggle-control { display: flex; align-items: center; gap: 0.75rem; }

  .status-label { font-size: 0.625rem; font-weight: 700; text-transform: uppercase; color: #6b7280; }

  .section-content { border-top: 1px solid #f3f4f6; padding-top: 1.5rem; }
  :global(.dark) .section-content { border-top-color: #262626; }

  .grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 1.5rem; }

  .field label { display: block; font-size: 0.625rem; font-weight: 700; text-transform: uppercase; color: #374151; margin-bottom: 0.5rem; }
  :global(.dark) .field label { color: #a3a3a3; }

  .input { width: 100%; padding: 0.5rem 0.75rem; background-color: #f9fafb; border: 1px solid #e5e7eb; font-size: 0.875rem; outline: none; transition: border-color 0.2s; }
  :global(.dark) .input { background-color: #262626; border-color: #404040; color: #ffffff; }
  .input:focus { border-color: #000000; }
  :global(.dark) .input:focus { border-color: #ffffff; }

  .mono { font-family: monospace; }
  .pl-8 { padding-left: 2rem; }

  .icon-input { position: relative; }
  .input-icon { position: absolute; left: 0.625rem; top: 50%; transform: translateY(-50%); font-size: 1rem; color: #9ca3af; }

  .range-wrap { display: flex; align-items: center; gap: 1rem; }
  .range { flex: 1; height: 0.25rem; background-color: #e5e7eb; accent-color: #000000; cursor: pointer; }
  :global(.dark) .range { background-color: #404040; accent-color: #ffffff; }

  .status-badge { padding: 0.25rem 0.5rem; background-color: #dcfce7; color: #166534; font-size: 0.625rem; font-weight: 700; text-transform: uppercase; border-radius: 0.125rem; }
  :global(.dark) .status-badge { background-color: rgba(22, 101, 52, 0.2); color: #4ade80; }

  .gateways-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem; }

  .gateway-card { padding: 1rem; border: 1px solid #e5e7eb; border-radius: 0.125rem; transition: all 0.2s; }
  :global(.dark) .gateway-card { border-color: #404040; }

  .gateway-card.active { border-color: #000000; background-color: #f9fafb; position: relative; }
  :global(.dark) .gateway-card.active { border-color: #ffffff; background-color: #262626; }

  .gateway-card.disabled { opacity: 0.6; }

  .gateway-card .check { position: absolute; top: 0.5rem; right: 0.5rem; color: #000000; }
  :global(.dark) .gateway-card .check { color: #ffffff; }

  .gw-name { font-size: 0.875rem; font-weight: 700; color: #111827; }
  :global(.dark) .gw-name { color: #ffffff; }

  .gw-role { font-size: 0.75rem; color: #6b7280; margin-bottom: 0.75rem; }

  .gw-key { font-size: 0.625rem; font-family: monospace; color: #9ca3af; }

  .activate-btn { font-size: 0.625rem; font-weight: 700; text-transform: uppercase; color: #6b7280; background: transparent; border: 1px solid #d1d5db; padding: 0.25rem 0.5rem; cursor: pointer; border-radius: 0.125rem; }
  .activate-btn:hover { border-color: #000000; color: #000000; }

  .gateway-card.add { border: 1px dashed #d1d5db; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 0.5rem; height: 100%; cursor: pointer; color: #9ca3af; }
  .gateway-card.add:hover { border-color: #000000; color: #000000; }

  .test-mode { display: flex; align-items: center; gap: 0.75rem; }

  .test-label { font-size: 0.75rem; font-weight: 700; text-transform: uppercase; color: #374151; }
  :global(.dark) .test-label { color: #d1d5db; }

  /* Toggle Switch */
  .toggle-switch { position: relative; width: 2.5rem; height: 1.25rem; }
  .toggle-switch input { opacity: 0; width: 0; height: 0; }
  .toggle-switch label { position: absolute; cursor: pointer; top: 0; left: 0; right: 0; bottom: 0; background-color: #d1d5db; transition: .4s; border-radius: 1rem; }
  .toggle-switch label:before { position: absolute; content: ""; height: 1.125rem; width: 1.125rem; left: 0.0625rem; bottom: 0.0625rem; background-color: white; transition: .4s; border-radius: 50%; }
  .toggle-switch input:checked + label { background-color: #000000; }
  :global(.dark) .toggle-switch input:checked + label { background-color: #ffffff; }
  :global(.dark) .toggle-switch input:checked + label:before { background-color: #000000; }
  .toggle-switch input:checked + label:before { transform: translateX(1.25rem); }

  .mt-6 { margin-top: 1.5rem; }
</style>
