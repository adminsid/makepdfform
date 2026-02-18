<section class="settings-section">
  <header class="section-header">
    <h2 class="title">Login & Security</h2>
    <p class="subtitle">Update your email and password.</p>
  </header>

  <div class="form-grid">
    <div class="form-row">
      <div class="form-group flex-1">
        <label for="email">Email Address</label>
        <input type="email" id="email" value="john.doe@example.com" class="input disabled" disabled />
      </div>
      <button class="action-btn">Change Email</button>
    </div>

    <div class="form-group">
      <label>Password</label>
      <div class="password-box">
        <div class="info">
          <span class="material-symbols-outlined icon">lock</span>
          <span class="placeholder">••••••••••••••••</span>
        </div>
        <button class="reset-link">Reset Password</button>
      </div>
    </div>
  </div>
</section>

<style>
  .settings-section { margin-bottom: 3rem; padding-top: 2rem; }

  .section-header {
    border-bottom: 1px solid #000000;
    padding-bottom: 1rem;
    margin-bottom: 2rem;
  }

  :global(.dark) .section-header { border-bottom-color: #ffffff; }

  .title { font-size: 1.25rem; font-weight: 700; color: #000000; }
  :global(.dark) .title { color: #ffffff; }

  .subtitle { font-size: 0.875rem; color: #6b7280; margin-top: 0.25rem; }

  .form-grid { display: grid; gap: 2rem; max-width: 36rem; }

  .form-row { display: flex; align-items: flex-end; gap: 1rem; }

  .flex-1 { flex: 1; }

  .form-group { display: flex; flex-direction: column; }

  label {
    font-size: 0.75rem;
    font-weight: 700;
    text-transform: uppercase;
    color: #111827;
    margin-bottom: 0.375rem;
  }

  :global(.dark) label { color: #ffffff; }

  .input {
    width: 100%;
    background-color: #ffffff;
    border: 1px solid #000000;
    border-radius: 0.125rem;
    padding: 0.5rem 0.75rem;
    font-size: 0.875rem;
    outline: none;
  }

  :global(.dark) .input { background-color: #000000; border-color: #ffffff; color: #ffffff; }

  .input.disabled { background-color: #f9fafb; border-color: #e5e7eb; color: #9ca3af; cursor: not-allowed; }

  :global(.dark) .input.disabled { background-color: #111827; border-color: #374151; color: #6b7280; }

  .action-btn {
    padding: 0.5rem 1rem;
    font-size: 0.875rem;
    font-weight: 500;
    border: 1px solid #000000;
    border-radius: 0.125rem;
    background: transparent;
    cursor: pointer;
    transition: background-color 0.2s;
    white-space: nowrap;
  }

  :global(.dark) .action-btn { border-color: #ffffff; color: #ffffff; }

  .action-btn:hover { background-color: #f9fafb; }
  :global(.dark) .action-btn:hover { background-color: #1f2937; }

  .password-box {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem;
    background-color: #f9fafb;
    border: 1px solid #e5e7eb;
    border-radius: 0.125rem;
  }

  :global(.dark) .password-box { background-color: #111827; border-color: #1f2937; }

  .info { display: flex; align-items: center; gap: 0.5rem; }

  .icon { font-size: 1.25rem; color: #9ca3af; }

  .placeholder { font-size: 0.875rem; color: #111827; }
  :global(.dark) .placeholder { color: #d1d5db; }

  .reset-link {
    font-size: 0.75rem;
    font-weight: 700;
    border-bottom: 1px solid #000000;
    padding-bottom: 1px;
    background: none;
    border-left: none;
    border-right: none;
    border-top: none;
    cursor: pointer;
    transition: opacity 0.2s;
  }

  :global(.dark) .reset-link { color: #ffffff; border-bottom-color: #ffffff; }

  .reset-link:hover { opacity: 0.7; }
</style>
