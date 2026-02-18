<script lang="ts">
  // In a real app, we'd fetch the form data based on the route params
</script>

<svelte:head>
  <title>Buyer Registration Agreement - Fill Form</title>
</svelte:head>

<div class="public-page-wrapper">
  <div class="pdf-page">
    <div class="pdf-header">
      <h1 class="doc-title">Buyer Registration Agreement</h1>
      <div class="instructions">
        <span class="bold">INSTRUCTIONS:</span> A good match of business and acquirer is one of the keys to success. To find a suitable business acquisition for you, we need some personal information and your criteria. <span class="highlight">Before releasing a company's confidential financial information, we need to understand your financial qualifications.</span> Please feel free to submit your own financial statement and resume, if you have one.
      </div>
    </div>

    <!-- Personal Information Section -->
    <div class="section-container">
      <div class="section-hdr">
        <h2 class="section-title">PERSONAL INFORMATION</h2>
        <span class="sub-label">Please type or print</span>
      </div>
      
      <div class="form-grid-main">
        <div class="cell span-6 br bb">
          <label>NAME</label>
          <input type="text" placeholder="Full Legal Name" class="field-input" />
        </div>
        <div class="cell span-2 br bb">
          <label>AGE</label>
          <input type="number" class="field-input text-center" />
        </div>
        <div class="cell span-2 br bb">
          <label>MARITAL STATUS</label>
          <select class="field-select">
            <option value="" disabled selected></option>
            <option>Single</option>
            <option>Married</option>
            <option>Divorced</option>
            <option>Widowed</option>
          </select>
        </div>
        <div class="cell span-2 bb">
          <label>NO. IN FAMILY</label>
          <input type="number" class="field-input text-center" />
        </div>
        
        <div class="cell span-4 br bb">
          <label>ADDRESS</label>
          <input type="text" class="field-input" />
        </div>
        <div class="cell span-3 br bb">
          <label>CITY</label>
          <input type="text" class="field-input" />
        </div>
        <div class="cell span-1 br bb">
          <label>STATE</label>
          <input type="text" maxlength="2" class="field-input text-center uppercase" />
        </div>
        <div class="cell span-2 br bb">
          <label>ZIP</label>
          <input type="text" class="field-input" />
        </div>
        <div class="cell span-2 bb">
          <label>PHONE</label>
          <input type="tel" class="field-input" />
        </div>
        
        <div class="cell span-6 br">
          <label>EMAIL</label>
          <input type="email" class="field-input" />
        </div>
        <div class="cell span-6 flex-center-left pl-4">
          <label class="checkbox-label">
            <input type="checkbox" class="checkbox" />
            I am a US Citizen / Permanent Resident
          </label>
        </div>
      </div>
    </div>

    <!-- Financial Information Section -->
    <div class="section-container mt-10">
      <div class="section-hdr flex-between">
        <h2 class="section-title">FINANCIAL INFORMATION</h2>
        <div class="confidential-badge">Confidential</div>
      </div>
      
      <div class="financial-grid">
        <div class="col br">
          <div class="col-header">ASSETS</div>
          <div class="fin-cell bb">
            <label>CASH ON HAND</label>
            <div class="input-line">
              <span class="currency">$</span>
              <input type="text" placeholder="0.00" class="fin-input" />
            </div>
          </div>
          <div class="fin-cell bb">
            <label>STOCKS & BONDS</label>
            <div class="input-line">
              <span class="currency">$</span>
              <input type="text" placeholder="0.00" class="fin-input" />
            </div>
          </div>
          <div class="fin-cell bb">
            <label>REAL ESTATE (Market Value)</label>
            <div class="input-line">
              <span class="currency">$</span>
              <input type="text" placeholder="0.00" class="fin-input" />
            </div>
          </div>
          <div class="fin-cell">
            <label>OTHER ASSETS</label>
            <div class="input-line">
              <span class="currency">$</span>
              <input type="text" placeholder="0.00" class="fin-input" />
            </div>
          </div>
        </div>
        
        <div class="col">
          <div class="col-header">LIABILITIES</div>
          <div class="fin-cell bb">
            <label>NOTES PAYABLE</label>
            <div class="input-line">
              <span class="currency">$</span>
              <input type="text" placeholder="0.00" class="fin-input" />
            </div>
          </div>
          <div class="fin-cell bb">
            <label>MORTGAGES</label>
            <div class="input-line">
              <span class="currency">$</span>
              <input type="text" placeholder="0.00" class="fin-input" />
            </div>
          </div>
          <div class="fin-cell bb">
            <label>OTHER DEBTS</label>
            <div class="input-line">
              <span class="currency">$</span>
              <input type="text" placeholder="0.00" class="fin-input" />
            </div>
          </div>
          <div class="total-row">
            <span class="total-label">TOTAL LIABILITIES</span>
            <span class="total-value">$0.00</span>
          </div>
        </div>
      </div>
    </div>

    <div class="preferences-area mt-8">
      <div class="pref-row">
        <label>I am interested in the following types of Businesses:</label>
        <div class="underline-input-wrap">
          <input type="text" class="underline-input" />
        </div>
      </div>
      <div class="pref-row mt-4">
        <label>Geographic Preference:</label>
        <div class="underline-input-wrap">
          <input type="text" class="underline-input" />
        </div>
      </div>
    </div>

    <div class="signature-area mt-16">
      <div class="sign-box">
        <input type="text" placeholder="Sign here..." class="sign-input" />
        <label>Signature</label>
      </div>
      <div class="sign-box">
        <input type="date" class="date-input" />
        <label>Date</label>
      </div>
    </div>

    <div class="submission-area mt-12">
      <button class="submit-btn">Submit Form</button>
      <p class="powered-by">Powered by MakePDFForm</p>
    </div>
  </div>
  
  <footer class="public-footer">
    <p>© 2024 Make PDF Form. All rights reserved.</p>
  </footer>
</div>

<style>
  .public-page-wrapper {
    min-height: 100vh;
    background-color: #f3f4f6;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 2rem 0;
  }

  .pdf-page {
    width: 210mm;
    min-height: 297mm;
    background-color: #ffffff;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
    padding: 20mm;
    margin-bottom: 2rem;
  }

  @media (max-width: 850px) {
    .pdf-page { width: 100%; margin: 0; padding: 1.5rem; min-height: 100vh; box-shadow: none; }
    .public-page-wrapper { padding: 0; }
  }

  .pdf-header { text-align: center; margin-bottom: 2rem; }

  .doc-title { font-size: 1.5rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; color: #000000; margin-bottom: 1rem; }

  .instructions { font-size: 0.875rem; text-align: justify; line-height: 1.6; color: #1f2937; }

  .bold { font-weight: 700; }

  .highlight { border-bottom: 1px solid #000000; }

  .section-container { margin-bottom: 2rem; }

  .section-hdr { display: flex; align-items: baseline; border-bottom: 2px solid #000000; padding-bottom: 0.25rem; margin-bottom: 0.5rem; }

  .section-title { font-family: serif; font-style: italic; font-weight: 700; font-size: 1.125rem; margin-right: 1rem; text-transform: uppercase; }

  .sub-label { font-size: 0.625rem; color: #6b7280; font-style: italic; text-transform: uppercase; letter-spacing: 0.05em; }

  .form-grid-main { border: 1px solid #000000; display: grid; grid-template-columns: repeat(12, 1fr); }

  .cell { position: relative; padding: 0.375rem; height: 3.5rem; display: flex; flex-direction: column; }

  .span-6 { grid-column: span 6; }
  .span-4 { grid-column: span 4; }
  .span-3 { grid-column: span 3; }
  .span-2 { grid-column: span 2; }
  .span-1 { grid-column: span 1; }

  .br { border-right: 1px solid #000000; }
  .bb { border-bottom: 1px solid #000000; }

  label { font-size: 0.5625rem; font-weight: 700; color: #4b5563; position: absolute; top: 0.25rem; left: 0.375rem; }

  .field-input { width: 100%; height: 100%; padding-top: 1rem; background: transparent; border: none; font-size: 0.875rem; color: #111827; outline: none; }
  .field-input:focus { background-color: #f9fafb; transition: background-color 0.2s; }

  .text-center { text-align: center; }
  .uppercase { text-transform: uppercase; }

  .field-select { width: 100%; height: 100%; padding-top: 1rem; background: transparent; border: none; font-size: 0.875rem; outline: none; cursor: pointer; appearance: none; }
  .field-select:focus { background-color: #f9fafb; }

  .flex-center-left { display: flex; align-items: center; }

  .checkbox-label { position: static; font-size: 0.75rem; font-weight: 700; color: #374151; display: flex; align-items: center; gap: 0.5rem; cursor: pointer; }

  .checkbox { width: 1rem; height: 1rem; border: 1px solid #000000; border-radius: 0; appearance: none; position: relative; cursor: pointer; }
  .checkbox:checked::after { content: '✕'; position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); font-size: 0.625rem; }

  .mt-10 { margin-top: 2.5rem; }
  .flex-between { justify-content: space-between; align-items: center; }

  .confidential-badge { font-size: 0.625rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; border: 1px solid #000000; padding: 0.25rem 0.5rem; }

  .financial-grid { border: 1px solid #000000; display: grid; grid-template-columns: 1fr 1fr; }

  .col-header { padding: 0.375rem; font-weight: 700; border-bottom: 1px solid #000000; background-color: #f3f4f6; font-size: 0.625rem; letter-spacing: 0.05em; }

  .fin-cell { padding: 0.375rem; height: 3.5rem; position: relative; transition: background-color 0.2s; }
  .fin-cell:hover { background-color: #f9fafb; }

  .input-line { position: absolute; bottom: 0.375rem; right: 0.5rem; display: flex; align-items: center; width: 8rem; border-bottom: 1px solid #d1d5db; }
  .fin-cell:hover .input-line { border-bottom-color: #000000; }

  .currency { font-size: 0.875rem; color: #6b7280; margin-right: 0.25rem; }

  .fin-input { width: 100%; background: transparent; border: none; text-align: right; font-family: monospace; font-size: 0.875rem; outline: none; padding: 0; }

  .total-row { height: 3.5rem; display: flex; align-items: center; justify-content: space-between; padding: 0 0.75rem; background-color: #f9fafb; }

  .total-label { font-size: 0.75rem; font-weight: 700; }

  .total-value { font-family: monospace; font-size: 0.875rem; color: #6b7280; }

  .pref-row { display: flex; align-items: flex-end; gap: 0.75rem; }

  .pref-row label { position: static; font-size: 0.875rem; font-weight: 700; white-space: nowrap; }

  .underline-input-wrap { flex: 1; border-bottom: 1px solid #000000; }

  .underline-input { width: 100%; background: transparent; border: none; font-size: 0.875rem; outline: none; padding-bottom: 0.25rem; }

  .signature-area { display: grid; grid-template-columns: 1fr 1fr; gap: 4rem; }

  .sign-box { border-bottom: 1px solid #000000; padding-top: 2rem; position: relative; }

  .sign-box label { position: static; display: block; font-size: 0.75rem; font-weight: 700; text-transform: uppercase; color: #9ca3af; margin-top: 0.25rem; }

  .sign-input { width: 100%; background: transparent; border: none; font-family: serif; font-style: italic; font-size: 1.125rem; outline: none; padding-bottom: 0.5rem; }

  .date-input { width: 100%; background: transparent; border: none; font-family: monospace; font-size: 0.875rem; outline: none; padding-bottom: 0.5rem; }

  .submission-area { text-align: center; padding-top: 2rem; border-top: 1px solid #f3f4f6; }

  .submit-btn {
    background-color: #000000;
    color: #ffffff;
    font-size: 0.875rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    padding: 0.75rem 2rem;
    border: none;
    border-radius: 0.125rem;
    cursor: pointer;
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
    transition: all 0.2s;
  }

  .submit-btn:hover { background-color: #1f2937; transform: translateY(-1px); box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1); }
  .submit-btn:active { transform: translateY(0); }

  .powered-by { font-size: 0.625rem; font-weight: 500; text-transform: uppercase; letter-spacing: 0.1em; color: #9ca3af; margin-top: 1rem; }

  .public-footer { padding-bottom: 2rem; }

  .public-footer p { font-size: 0.75rem; color: #9ca3af; }
</style>
