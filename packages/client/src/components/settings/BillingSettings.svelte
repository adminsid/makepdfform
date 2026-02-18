<section class="settings-section">
  <header class="section-header">
    <h2 class="title">Billing & Plans</h2>
    <p class="subtitle">Manage your subscription and payment methods.</p>
  </header>

  <div class="plan-card">
    <div class="plan-info">
      <div class="left">
        <span class="label">Current Plan</span>
        <h3 class="plan-name">Pro <span class="price-side">($9/mo)</span></h3>
      </div>
      <div class="right">
        <span class="status-badge">Active</span>
      </div>
    </div>
    <div class="plan-actions">
      <button class="primary-btn">Manage Subscription</button>
      <button class="secondary-btn">View Invoices</button>
    </div>
  </div>

  <div class="payment-method">
    <h3 class="method-title">Payment Method</h3>
    <div class="card-box">
      <div class="card-chip">
        <div class="chip-inner"></div>
      </div>
      <div class="card-details">
        <p class="card-number">**** **** **** 4242</p>
        <p class="expiry">Expires 12/25</p>
      </div>
      <button class="edit-btn">Edit</button>
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

  .plan-card {
    border: 1px solid #000000;
    border-radius: 0.125rem;
    padding: 1.5rem;
    margin-bottom: 2rem;
  }

  :global(.dark) .plan-card { border-color: #ffffff; }

  .plan-info { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 2rem; }

  .label { font-size: 0.75rem; font-weight: 700; color: #6b7280; text-transform: uppercase; margin-bottom: 0.25rem; display: block; }
  :global(.dark) .label { color: #9ca3af; }

  .plan-name { font-size: 1.5rem; font-weight: 700; color: #000000; }
  :global(.dark) .plan-name { color: #ffffff; }

  .price-side { font-size: 1rem; font-weight: 400; color: #6b7280; margin-left: 0.5rem; }

  .status-badge {
    padding: 0.25rem 0.75rem;
    background-color: #000000;
    color: #ffffff;
    font-size: 0.75rem;
    font-weight: 500;
    border-radius: 9999px;
  }

  :global(.dark) .status-badge { background-color: #ffffff; color: #000000; }

  .plan-actions { border-top: 1px solid #e5e7eb; padding-top: 1.5rem; display: flex; gap: 1rem; }

  :global(.dark) .plan-actions { border-top-color: #1f2937; }

  .primary-btn {
    padding: 0.5rem 1rem;
    font-size: 0.75rem;
    font-weight: 500;
    background-color: #000000;
    color: #ffffff;
    border-radius: 0.125rem;
    border: none;
    cursor: pointer;
  }

  :global(.dark) .primary-btn { background-color: #ffffff; color: #000000; }

  .secondary-btn {
    padding: 0.5rem 1rem;
    font-size: 0.75rem;
    font-weight: 500;
    border: 1px solid #d1d5db;
    border-radius: 0.125rem;
    background: transparent;
    cursor: pointer;
    transition: all 0.2s;
  }

  :global(.dark) .secondary-btn { border-color: #374151; color: #ffffff; }

  .secondary-btn:hover { border-color: #000000; }
  :global(.dark) .secondary-btn:hover { border-color: #ffffff; }

  .payment-method { max-width: 36rem; }

  .method-title { font-size: 0.875rem; font-weight: 700; color: #000000; margin-bottom: 1rem; }
  :global(.dark) .method-title { color: #ffffff; }

  .card-box {
    display: flex;
    align-items: center;
    padding: 1rem;
    background-color: #f9fafb;
    border: 1px solid #e5e7eb;
    border-radius: 0.125rem;
  }

  :global(.dark) .card-box { background-color: #111827; border-color: #1f2937; }

  .card-chip {
    width: 2.5rem;
    height: 1.5rem;
    background-color: #ffffff;
    border: 1px solid #e5e7eb;
    border-radius: 0.125rem;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 1rem;
  }

  .chip-inner { width: 1.5rem; height: 0.75rem; background-color: #000000; opacity: 0.2; border-radius: 0.125rem; }

  .card-details { flex: 1; }

  .card-number { font-size: 0.875rem; font-weight: 500; color: #111827; font-family: monospace; }
  :global(.dark) .card-number { color: #ffffff; }

  .expiry { font-size: 0.75rem; color: #6b7280; }

  .edit-btn { font-size: 0.75rem; font-weight: 500; color: #6b7280; border: none; background: none; cursor: pointer; transition: color 0.2s; }

  .edit-btn:hover { color: #000000; }
  :global(.dark) .edit-btn:hover { color: #ffffff; }
</style>
