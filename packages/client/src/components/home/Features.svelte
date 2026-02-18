<section class="features">
  <div class="container">
    <div class="header">
      <h2 class="title">Simply Powerful</h2>
      <p class="subtitle">Create complex legal and business forms without the complexity.</p>
    </div>
    <div class="feature-grid">
      <!-- Feature 1 -->
      <div class="feature-item">
        <div class="feature-hover-bg"></div>
        <div class="feature-content">
          <div class="icon-box primary">
            <span class="material-symbols-outlined">markdown</span>
          </div>
          <h3 class="feature-title">1. Write in Markdown</h3>
          <p class="feature-desc">
            Structure your document instantly using simple text. Headers, lists, and tables render perfectly every time.
          </p>
          <div class="code-preview">
            # Lease Agreement<br/>
            **Parties** involved:<br/>
            - Landlord: John Doe<br/>
            - Tenant: ___
          </div>
        </div>
      </div>

      <!-- Feature 2 -->
      <div class="feature-item">
        <div class="feature-hover-bg"></div>
        <div class="feature-content">
          <div class="icon-box secondary">
            <span class="material-symbols-outlined">drag_pan</span>
          </div>
          <h3 class="feature-title">2. Drag & Drop Fields</h3>
          <p class="feature-desc">
            Place interactive form fields exactly where you need them. Text inputs, checkboxes, signatures, and more.
          </p>
          <div class="drag-preview">
            <div class="preview-chip gray">Input</div>
            <div class="preview-chip black">Signature</div>
          </div>
        </div>
      </div>

      <!-- Feature 3 -->
      <div class="feature-item">
        <div class="feature-hover-bg"></div>
        <div class="feature-content">
          <div class="icon-box primary">
            <span class="material-symbols-outlined">ios_share</span>
          </div>
          <h3 class="feature-title">3. Export PDF</h3>
          <p class="feature-desc">
            Download a polished, professional PDF ready for printing or digital signing. No watermarks on Pro plans.
          </p>
          <div class="pdf-preview">
            <div class="pdf-icon">
              <span class="pdf-label">PDF</span>
              <span class="material-symbols-outlined check">check_circle</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

<style>
  .features {
    padding-top: 6rem;
    padding-bottom: 6rem;
    background-color: #ffffff;
  }

  .container {
    max-width: 80rem;
    margin-left: auto;
    margin-right: auto;
    padding-left: 1rem;
    padding-right: 1rem;
  }

  @media (min-width: 640px) {
    .container {
      padding-left: 1.5rem;
      padding-right: 1.5rem;
    }
  }

  @media (min-width: 1024px) {
    .container {
      padding-left: 2rem;
      padding-right: 2rem;
    }
  }

  .header {
    text-align: center;
    margin-bottom: 5rem;
  }

  .title {
    font-size: 1.875rem;
    font-weight: 700;
    letter-spacing: -0.025em;
    color: #000000;
  }

  @media (min-width: 640px) {
    .title {
      font-size: 2.25rem;
    }
  }

  .subtitle {
    margin-top: 1rem;
    font-size: 1.125rem;
    color: #6b7280;
  }

  .feature-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 3rem;
  }

  @media (min-width: 768px) {
    .feature-grid {
      grid-template-columns: repeat(3, 1fr);
      gap: 3rem;
    }
  }

  @media (min-width: 1024px) {
    .feature-grid {
      gap: 4rem;
    }
  }

  .feature-item {
    position: relative;
    padding: 1rem;
  }

  .feature-hover-bg {
    position: absolute;
    inset: -1rem;
    background-color: #f9fafb;
    border-radius: 0.75rem;
    opacity: 0;
    transition: opacity 0.3s;
  }

  .feature-item:hover .feature-hover-bg {
    opacity: 1;
  }

  .feature-content {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
  }

  .icon-box {
    width: 4rem;
    height: 4rem;
    border-radius: 1rem;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 1.5rem;
  }

  .icon-box.primary {
    background-color: #000000;
    color: #ffffff;
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
  }

  .icon-box.secondary {
    background-color: #ffffff;
    border: 1px solid #e5e7eb;
    color: #000000;
  }

  .icon-box span {
    font-size: 1.875rem;
  }

  .feature-title {
    font-size: 1.25rem;
    font-weight: 600;
    color: #000000;
    margin-bottom: 0.75rem;
  }

  .feature-desc {
    color: #6b7280;
    line-height: 1.625;
  }

  .code-preview {
    margin-top: 1.5rem;
    width: 100%;
    background-color: #f9fafb;
    border: 1px solid #e5e7eb;
    border-radius: 0.5rem;
    padding: 1rem;
    text-align: left;
    font-family: monospace;
    font-size: 0.75rem;
    color: #4b5563;
  }

  .drag-preview {
    margin-top: 1.5rem;
    width: 100%;
    height: 6rem;
    background-color: #ffffff;
    border: 1px dashed #e5e7eb;
    border-radius: 0.5rem;
    padding: 1rem;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
  }

  .preview-chip {
    padding: 0.25rem 0.75rem;
    border-radius: 0.25rem;
    font-size: 0.75rem;
    cursor: move;
  }

  .preview-chip.gray {
    background-color: #f3f4f6;
    border: 1px solid #d1d5db;
    color: #6b7280;
  }

  .preview-chip.black {
    background-color: #000000;
    color: #ffffff;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  }

  .pdf-preview {
    margin-top: 1.5rem;
    display: flex;
    justify-content: center;
  }

  .pdf-icon {
    width: 5rem;
    height: 6rem;
    background-color: #ffffff;
    border: 1px solid #e5e7eb;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border-radius: 0.125rem;
    transition: transform 0.3s;
    transform: rotate(3deg);
  }

  .feature-item:hover .pdf-icon {
    transform: rotate(6deg);
  }

  .pdf-label {
    font-size: 8px;
    color: #d1d5db;
    margin-bottom: 0.25rem;
  }

  .check {
    color: #1f2937;
    font-size: 1.125rem;
  }
</style>
