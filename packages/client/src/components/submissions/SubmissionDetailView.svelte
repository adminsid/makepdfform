<div class="detail-view">
  <div class="toolbar">
    <div class="toolbar-left">
      <span class="id-badge">#4291 - John Doe</span>
      <span class="status-chip verified">Verified</span>
    </div>
    <div class="toolbar-right">
      <button class="icon-btn"><span class="material-symbols-outlined">remove</span></button>
      <span class="zoom-text">100%</span>
      <button class="icon-btn"><span class="material-symbols-outlined">add</span></button>
      <div class="divider-small"></div>
      <button class="icon-btn" title="Download Source"><span class="material-symbols-outlined">code</span></button>
      <button class="icon-btn" title="Open in New Tab"><span class="material-symbols-outlined">open_in_new</span></button>
    </div>
  </div>

  <div class="canvas-container">
    <div class="page" id="print-area">
      <div class="watermark">Submitted</div>
      <header class="doc-header">
        <h1 class="doc-title">Buyer Registration Agreement</h1>
        <p class="instructions">
          <span class="bold">INSTRUCTIONS:</span> A good match of business and acquirer is one of the keys to success. To find a suitable business acquisition for you, we need some personal information and your criteria. <span class="underline">Before releasing a company's confidential financial information, we need to understand your financial qualifications.</span>
        </p>
      </header>

      <section class="doc-section">
        <div class="section-title-row">
          <h2 class="section-title">PERSONAL INFORMATION</h2>
          <span class="timestamp">Submitted on Oct 25, 2023 10:42 AM</span>
        </div>
        <div class="grid-form">
          <div class="cell col-6 filled">
            <span class="field-label">NAME</span>
            <div class="value">John Doe</div>
          </div>
          <div class="cell col-2 filled center">
            <span class="field-label">AGE</span>
            <div class="value">42</div>
          </div>
          <div class="cell col-2 filled">
            <span class="field-label">MARITAL STATUS</span>
            <div class="value">Married</div>
          </div>
          <div class="cell col-2 filled center">
            <span class="field-label">NO. IN FAMILY</span>
            <div class="value">4</div>
          </div>
          <div class="cell col-4 filled">
            <span class="field-label">ADDRESS</span>
            <div class="value">123 Pine Street, Apt 4B</div>
          </div>
          <div class="cell col-3 filled">
            <span class="field-label">CITY</span>
            <div class="value">San Francisco</div>
          </div>
          <div class="cell col-1 filled uppercase">
            <span class="field-label">STATE</span>
            <div class="value">CA</div>
          </div>
          <div class="cell col-4 empty"></div>
        </div>
      </section>

      <section class="doc-section">
        <div class="section-title-row">
          <h2 class="section-title">FINANCIAL INFORMATION</h2>
          <span class="client-data">CLIENT PROVIDED DATA</span>
        </div>
        <div class="grid-split">
          <div class="column">
            <div class="col-header">ASSETS</div>
            <div class="field-item">
              <span class="field-label">CASH & MARKETABLE SECURITIES</span>
              <div class="currency-cell">
                <span class="currency-symbol">$</span>
                <div class="currency-value">250,000.00</div>
              </div>
            </div>
            <div class="field-item">
              <span class="field-label">REAL ESTATE – MARKET VALUE</span>
              <div class="currency-cell">
                <span class="currency-symbol">$</span>
                <div class="currency-value">1,200,000.00</div>
              </div>
            </div>
          </div>
          <div class="column">
            <div class="col-header">LIABILITIES</div>
             <div class="field-item">
              <span class="field-label">NOTES PAYABLE TO BANKS</span>
              <div class="currency-cell">
                <span class="currency-symbol">$</span>
                <div class="currency-value">0.00</div>
              </div>
            </div>
            <div class="field-item">
              <span class="field-label">REAL ESTATE MORTGAGES</span>
              <div class="currency-cell">
                <span class="currency-symbol">$</span>
                <div class="currency-value">850,000.00</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="doc-section">
        <div class="inline-field">
          <span class="field-label bold">I am interested in the following Businesses:</span>
          <div class="inline-value">SaaS, E-commerce, Logistics</div>
        </div>
      </section>

      <footer class="doc-footer">
        <div class="signature-block">
          <div class="signature-line">
            <img class="signature-img" src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyMDAgNjAiPjxwYXRoIGQ9Ik0xMCw1MCBDMzAsMjAgNTAsNjAgODAsMzAgQzkwLDIwIDExMCw1MCAxMzAsNDAgQzE1MCwzMCAxNzAsNTAgMTkwLDMwIiBzdHJva2U9IiMwMDAiIHN0cm9rZS13aWR0aD0iMiIgZmlsbD0ibm9uZSIvPjwvc3ZnPg==" alt="sign" />
          </div>
          <span class="italic-label">Signature</span>
        </div>
        <div class="date-block">
          <div class="date-line">10/25/2023</div>
          <span class="italic-label">Date</span>
        </div>
      </footer>
    </div>
  </div>
</div>

<style>
  .detail-view {
    flex: 1;
    background-color: #f3f4f6;
    display: flex;
    flex-direction: column;
    overflow-y: auto;
    position: relative;
  }

  :global(.dark) .detail-view {
    background-color: #0a0a0a;
  }

  .toolbar {
    position: sticky;
    top: 0;
    z-index: 10;
    background-color: rgba(243, 244, 246, 0.9);
    backdrop-filter: blur(8px);
    border-bottom: 1px solid #e5e7eb;
    padding: 0.5rem 1rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  :global(.dark) .toolbar {
    background-color: rgba(10, 10, 10, 0.9);
    border-bottom-color: #1f2937;
  }

  .toolbar-left {
    display: flex;
    align-items: center;
    gap: 0.75rem;
  }

  .id-badge {
    font-size: 0.75rem;
    font-weight: 700;
    color: #111827;
  }

  :global(.dark) .id-badge { color: #ffffff; }

  .status-chip {
    padding: 0.125rem 0.5rem;
    font-size: 10px;
    font-weight: 700;
    border-radius: 9999px;
    text-transform: uppercase;
  }

  .status-chip.verified {
    background-color: #dcfce7;
    color: #15803d;
  }

  :global(.dark) .status-chip.verified {
    background-color: #064e3b;
    color: #6ee7b7;
  }

  .toolbar-right {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  .icon-btn {
    padding: 0.375rem;
    border-radius: 0.125rem;
    border: none;
    background: transparent;
    cursor: pointer;
    color: #6b7280;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: background-color 0.2s;
  }

  .icon-btn:hover {
    background-color: #e5e7eb;
  }

  :global(.dark) .icon-btn:hover {
    background-color: #1f2937;
  }

  .zoom-text {
    font-size: 10px;
    font-family: monospace;
    color: #6b7280;
    width: 2rem;
    text-align: center;
  }

  .divider-small {
    width: 1px;
    height: 0.75rem;
    background-color: #d1d5db;
    margin: 0 0.25rem;
  }

  .canvas-container {
    padding: 2rem 1rem;
    display: flex;
    justify-content: center;
    width: 100%;
  }

  .page {
    width: 210mm;
    min-height: 297mm;
    background-color: #ffffff;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
    border: 1px solid #e5e7eb;
    padding: 15mm;
    position: relative;
    color: #000000;
  }

  .watermark {
    position: absolute;
    top: 2.5rem;
    right: 2.5rem;
    border: 4px solid #e5e7eb;
    color: #e5e7eb;
    font-weight: 700;
    font-size: 2.25rem;
    padding: 0.5rem 1rem;
    transform: rotate(-15deg);
    pointer-events: none;
    opacity: 0.5;
    text-transform: uppercase;
    letter-spacing: 0.1em;
  }

  .doc-header { text-align: center; margin-bottom: 2rem; }

  .doc-title {
    font-size: 1.5rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.025em;
    margin-bottom: 0.75rem;
  }

  .instructions {
    font-size: 0.75rem;
    line-height: 1.625;
    text-align: justify;
    color: #1f2937;
  }

  .bold { font-weight: 700; }
  .underline { text-decoration: underline; }

  .doc-section { margin-bottom: 2rem; }

  .section-title-row {
    display: flex;
    align-items: baseline;
    border-bottom: 1px solid #000000;
    padding-bottom: 0.25rem;
    margin-bottom: 0.5rem;
  }

  .section-title {
    font-family: serif;
    font-weight: 700;
    font-style: italic;
    font-size: 1.125rem;
    margin-right: 1rem;
  }

  .timestamp, .client-data {
    font-size: 10px;
    font-style: italic;
    color: #6b7280;
  }

  .grid-form {
    border: 1px solid #000000;
    display: grid;
    grid-template-columns: repeat(12, 1fr);
  }

  .cell {
    border-bottom: 1px solid #000000;
    border-right: 1px solid #000000;
    padding: 0.25rem;
    height: 3rem;
    position: relative;
  }

  .col-6 { grid-column: span 6; }
  .col-4 { grid-column: span 4; }
  .col-3 { grid-column: span 3; }
  .col-2 { grid-column: span 2; }
  .col-1 { grid-column: span 1; }

  .filled { background-color: rgba(239, 246, 255, 0.3); }
  .empty { background-color: #f9fafb; border-bottom: 1px solid #000000; }

  .field-label {
    font-size: 9px;
    font-weight: 700;
    color: #6b7280;
    position: absolute;
    top: 0.25rem;
    left: 0.25rem;
  }

  .value {
    width: 100%;
    height: 100%;
    padding-top: 1rem;
    padding-left: 0.25rem;
    font-size: 0.75rem;
    font-family: monospace;
    font-weight: 500;
  }

  .center { text-align: center; }
  .uppercase { text-transform: uppercase; }

  .grid-split {
    border: 1px solid #000000;
    display: grid;
    grid-template-columns: 1fr 1fr;
  }

  .column { border-right: 1px solid #000000; }
  .column:last-child { border-right: none; }

  .col-header {
    padding: 0.25rem;
    font-weight: 700;
    font-size: 9px;
    border-bottom: 1px solid #000000;
    text-decoration: underline;
    background-color: #f3f4f6;
    height: 1.5rem;
    display: flex;
    align-items: center;
  }

  .field-item {
    height: 3rem;
    border-bottom: 1px solid #000000;
    padding: 0.25rem;
    position: relative;
    background-color: rgba(239, 246, 255, 0.3);
  }

  .field-item:last-child { border-bottom: none; }

  .currency-cell {
    position: absolute;
    bottom: 0.25rem;
    right: 0.5rem;
    display: flex;
    align-items: center;
    width: 8rem;
    border-bottom: 1px solid #d1d5db;
  }

  .currency-symbol { font-size: 0.75rem; color: #6b7280; margin-right: 0.25rem; }
  .currency-value { width: 100%; text-align: right; font-family: monospace; font-size: 0.75rem; }

  .inline-field {
    display: flex;
    align-items: flex-end;
    gap: 0.5rem;
  }

  .inline-value {
    flex: 1;
    border-bottom: 1px solid #000000;
    font-family: monospace;
    font-size: 0.75rem;
    padding-left: 0.5rem;
    background-color: rgba(239, 246, 255, 0.3);
  }

  .doc-footer {
    margin-top: 4rem;
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    border-top: 1px solid #000000;
    padding-top: 1rem;
  }

  .signature-block { width: 12rem; text-align: center; }
  .date-block { width: 8rem; text-align: center; }

  .signature-line, .date-line {
    height: 3rem;
    border-bottom: 1px solid #000000;
    margin-bottom: 0.25rem;
    position: relative;
    background-color: rgba(239, 246, 255, 0.3);
  }

  .signature-img {
    height: 2.5rem;
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    opacity: 0.8;
  }

  .date-line { display: flex; align-items: flex-end; justify-content: center; padding-bottom: 0.5rem; font-family: monospace; font-size: 0.75rem; }

  .italic-label { font-family: serif; font-style: italic; font-size: 0.75rem; }

  @media print {
    :global(body *) { visibility: hidden; }
    .page, .page * { visibility: visible; }
    .page {
      position: absolute;
      left: 0;
      top: 0;
      margin: 0;
      box-shadow: none;
      border: none;
    }
  }
</style>
