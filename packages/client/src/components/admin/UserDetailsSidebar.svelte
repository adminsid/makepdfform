<div class="user-details-sidebar">
  <header class="header">
    <div class="user-meta">
      <h2 class="name">Elena Developer</h2>
      <p class="id-role">ID: usr_89234 • Developer</p>
    </div>
    <button class="close-btn"><span class="material-symbols-outlined">close</span></button>
  </header>

  <div class="scroll-content">
    <section class="config-section">
      <h3 class="section-title">Account Status</h3>
      <div class="toggle-row">
        <span class="toggle-label">Account Active</span>
        <div class="toggle-switch">
          <input type="checkbox" id="t1" checked />
          <label for="t1"></label>
        </div>
      </div>
      <div class="toggle-row">
        <span class="toggle-label">Email Verified</span>
        <div class="toggle-switch">
          <input type="checkbox" id="t2" checked />
          <label for="t2"></label>
        </div>
      </div>
    </section>

    <section class="config-section">
      <h3 class="section-title">Developer Flags</h3>
      <div class="toggle-group">
        <div class="toggle-row-complex">
          <div class="text">
            <div class="main">API Access</div>
            <div class="sub">Generate API keys</div>
          </div>
          <div class="toggle-switch">
            <input type="checkbox" id="t3" checked />
            <label for="t3"></label>
          </div>
        </div>
        <div class="toggle-row-complex">
          <div class="text">
            <div class="main">Beta Features</div>
            <div class="sub">Early access program</div>
          </div>
          <div class="toggle-switch">
            <input type="checkbox" id="t4" />
            <label for="t4"></label>
          </div>
        </div>
        <div class="toggle-row-complex">
          <div class="text">
            <div class="main">Debug Mode</div>
            <div class="sub">Verbose error logs</div>
          </div>
          <div class="toggle-switch">
            <input type="checkbox" id="t5" checked />
            <label for="t5"></label>
          </div>
        </div>
      </div>
    </section>

    <section class="config-section">
      <h3 class="section-title">Administrative Rights</h3>
      <div class="rights-box">
        <div class="check-item">
          <input type="checkbox" id="r1" class="check-input" />
          <div class="text">
            <div class="main">Manage Users</div>
            <div class="sub">Can ban/edit users</div>
          </div>
        </div>
        <div class="check-item">
          <input type="checkbox" id="r2" class="check-input" />
          <div class="text">
            <div class="main">Global Settings</div>
            <div class="sub">Edit system config</div>
          </div>
        </div>
      </div>
    </section>
  </div>

  <div class="footer">
    <button class="save-btn">Save Changes</button>
    <button class="ban-btn">Ban User</button>
  </div>
</div>

<style>
  .user-details-sidebar {
    width: 20rem;
    background-color: #ffffff;
    border-left: 1px solid #e5e7eb;
    display: flex;
    flex-direction: column;
    box-shadow: -10px 0 15px -3px rgba(0, 0, 0, 0.05);
    z-index: 20;
    flex-shrink: 0;
  }

  :global(.dark) .user-details-sidebar { background-color: #171717; border-left-color: #404040; box-shadow: -10px 0 15px -3px rgba(0, 0, 0, 0.2); }

  .header { padding: 1.25rem; border-bottom: 1px solid #e5e7eb; display: flex; justify-content: space-between; align-items: flex-start; }
  :global(.dark) .header { border-bottom-color: #404040; }

  .name { font-size: 0.875rem; font-weight: 700; color: #111827; text-transform: uppercase; letter-spacing: 0.05em; }
  :global(.dark) .name { color: #ffffff; }

  .id-role { font-size: 0.625rem; font-family: monospace; color: #6b7280; margin-top: 0.25rem; }

  .close-btn { background: none; border: none; color: #9ca3af; cursor: pointer; transition: color 0.2s; }
  .close-btn:hover { color: #000000; }
  :global(.dark) .close-btn:hover { color: #ffffff; }

  .scroll-content { flex: 1; overflow-y: auto; padding: 1.25rem; display: flex; flex-direction: column; gap: 2rem; }

  .section-title { font-size: 0.625rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em; color: #111827; margin-bottom: 0.75rem; padding-bottom: 0.5rem; border-bottom: 1px solid #f3f4f6; }
  :global(.dark) .section-title { color: #ffffff; border-bottom-color: #262626; }

  .toggle-row { display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.75rem; }

  .toggle-label { font-size: 0.75rem; font-weight: 500; color: #374151; }
  :global(.dark) .toggle-label { color: #d1d5db; }

  /* Minimal Toggle Switch */
  .toggle-switch { position: relative; width: 2rem; height: 1rem; }
  .toggle-switch input { opacity: 0; width: 0; height: 0; }
  .toggle-switch label { position: absolute; cursor: pointer; top: 0; left: 0; right: 0; bottom: 0; background-color: #d1d5db; transition: .4s; border-radius: 1rem; }
  .toggle-switch label:before { position: absolute; content: ""; height: 0.875rem; width: 0.875rem; left: 0.0625rem; bottom: 0.0625rem; background-color: white; transition: .4s; border-radius: 50%; }
  .toggle-switch input:checked + label { background-color: #000000; }
  :global(.dark) .toggle-switch input:checked + label { background-color: #ffffff; }
  :global(.dark) .toggle-switch input:checked + label:before { background-color: #000000; }
  .toggle-switch input:checked + label:before { transform: translateX(1rem); }

  .toggle-group { display: flex; flex-direction: column; gap: 0.75rem; }

  .toggle-row-complex { display: flex; justify-content: space-between; align-items: center; }

  .toggle-row-complex .main { font-size: 0.75rem; font-weight: 500; color: #374151; }
  :global(.dark) .toggle-row-complex .main { color: #d1d5db; }

  .toggle-row-complex .sub { font-size: 0.625rem; color: #9ca3af; }

  .rights-box { padding: 0.75rem; background-color: #f9fafb; border: 1px solid #f3f4f6; border-radius: 0.125rem; display: flex; flex-direction: column; gap: 0.75rem; }
  :global(.dark) .rights-box { background-color: rgba(38, 38, 38, 0.5); border-color: #262626; }

  .check-item { display: flex; gap: 0.75rem; align-items: flex-start; }

  .check-input { width: 0.875rem; height: 0.875rem; border: 1px solid #d1d5db; border-radius: 0.125rem; accent-color: #000000; margin-top: 0.125rem; }

  .check-item .main { font-size: 0.75rem; font-weight: 500; color: #111827; }
  :global(.dark) .check-item .main { color: #ffffff; }

  .check-item .sub { font-size: 0.625rem; color: #6b7280; }

  .footer { padding: 1rem; border-top: 1px solid #e5e7eb; background-color: #f9fafb; display: flex; flex-direction: column; gap: 0.5rem; }
  :global(.dark) .footer { border-top-color: #404040; background-color: #111111; }

  .save-btn { width: 100%; padding: 0.5rem; background-color: #000000; color: #ffffff; border: none; font-size: 0.75rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; cursor: pointer; transition: opacity 0.2s; border-radius: 0.125rem; }
  :global(.dark) .save-btn { background-color: #ffffff; color: #000000; }
  .save-btn:hover { opacity: 0.8; }

  .ban-btn { width: 100%; padding: 0.5rem; background-color: transparent; color: #dc2626; border: 1px solid #fee2e2; font-size: 0.75rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; cursor: pointer; transition: all 0.2s; border-radius: 0.125rem; }
  .ban-btn:hover { background-color: #fef2f2; border-color: #fca5a5; }
  :global(.dark) .ban-btn:hover { background-color: rgba(127, 29, 29, 0.2); }
</style>
