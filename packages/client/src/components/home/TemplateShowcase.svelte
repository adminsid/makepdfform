<section class="templates">
  <div class="container">
    <div class="header">
      <div>
        <h2 class="title">Start with a Template</h2>
        <p class="subtitle">Don't start from scratch. Clone a professional template.</p>
      </div>
      <a href="/templates" class="browse-link desktop-only">
        Browse all templates
        <span class="material-symbols-outlined arrow">arrow_forward</span>
      </a>
    </div>

    <div class="template-grid">
      <!-- Template 1 -->
      <div class="template-card">
        <div class="preview-container">
          <div class="doc-preview">
            <div class="doc-title">RENTAL AGREEMENT</div>
            <div class="doc-line black"></div>
            <p class="doc-text">This agreement is made on this day between Landlord and Tenant.</p>
            <div class="doc-bar gray"></div>
            <div class="doc-bar gray short"></div>
            <div class="doc-footer">
              <div class="doc-sign"></div>
              <div class="doc-sign"></div>
            </div>
          </div>
          <div class="overlay">
            <button class="use-btn">Use Template</button>
          </div>
        </div>
        <h3 class="card-title">Residential Lease</h3>
        <p class="card-category">Real Estate</p>
      </div>

      <!-- Template 2 -->
      <div class="template-card">
        <div class="preview-container">
          <div class="doc-preview">
            <div class="doc-title left">CLIENT INTAKE</div>
            <div class="doc-grid">
              <div class="doc-bar gray"></div>
              <div class="doc-bar gray"></div>
            </div>
            <div class="doc-bar gray full"></div>
            <div class="doc-bar gray full"></div>
            <div class="doc-checkbox-row">
              <div class="checkbox"></div>
              <span>I agree to terms</span>
            </div>
          </div>
          <div class="overlay">
            <button class="use-btn">Use Template</button>
          </div>
        </div>
        <h3 class="card-title">Client Intake Form</h3>
        <p class="card-category">Business</p>
      </div>

      <!-- Template 3 -->
      <div class="template-card">
        <div class="preview-container">
          <div class="doc-preview">
            <div class="doc-title center">INVOICE</div>
            <div class="doc-id">#00123</div>
            <div class="doc-line light"></div>
            <div class="doc-row">
              <div class="bar-long"></div>
              <div class="bar-short"></div>
            </div>
            <div class="doc-row">
              <div class="bar-long"></div>
              <div class="bar-short"></div>
            </div>
            <div class="doc-total">Total: $0.00</div>
          </div>
          <div class="overlay">
            <button class="use-btn">Use Template</button>
          </div>
        </div>
        <h3 class="card-title">Simple Invoice</h3>
        <p class="card-category">Finance</p>
      </div>

      <!-- Template 4 -->
      <div class="template-card">
        <div class="preview-container">
          <div class="doc-preview">
            <div class="doc-title center">NDA</div>
            <div class="doc-tagline">NON-DISCLOSURE AGREEMENT</div>
            <div class="doc-bar gray full dot"></div>
            <div class="doc-bar gray full dot"></div>
            <div class="doc-bar gray full dot"></div>
            <div class="doc-sign-box">Sign Here</div>
          </div>
          <div class="overlay">
            <button class="use-btn">Use Template</button>
          </div>
        </div>
        <h3 class="card-title">Standard NDA</h3>
        <p class="card-category">Legal</p>
      </div>
    </div>

    <div class="mobile-only footer-link">
      <a href="/templates" class="browse-link">Browse all templates →</a>
    </div>
  </div>
</section>

<style>
  .templates {
    padding-top: 6rem;
    padding-bottom: 6rem;
    background-color: #f9fafb;
    border-top: 1px solid #f3f4f6;
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
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    margin-bottom: 3rem;
  }

  .title {
    font-size: 1.875rem;
    font-weight: 700;
    letter-spacing: -0.025em;
    color: #000000;
  }

  .subtitle {
    margin-top: 0.5rem;
    color: #6b7280;
  }

  .browse-link {
    display: flex;
    align-items: center;
    font-size: 0.875rem;
    font-weight: 600;
    color: #000000;
    text-decoration: none;
  }

  .browse-link:hover {
    text-decoration: underline;
  }

  .arrow {
    font-size: 1.125rem;
    margin-left: 0.25rem;
    transition: transform 0.2s;
  }

  .browse-link:hover .arrow {
    transform: translateX(0.25rem);
  }

  .desktop-only {
    display: none;
  }

  @media (min-width: 640px) {
    .desktop-only {
      display: flex;
    }
  }

  .template-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 2rem;
  }

  @media (min-width: 640px) {
    .template-grid {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  @media (min-width: 1024px) {
    .template-grid {
      grid-template-columns: repeat(4, 1fr);
    }
  }

  .template-card {
    display: block;
    text-decoration: none;
  }

  .preview-container {
    background-color: #ffffff;
    padding: 1.5rem;
    border-radius: 0.5rem;
    border: 1px solid #e5e7eb;
    box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
    position: relative;
    overflow: hidden;
    transition: box-shadow 0.2s;
  }

  .template-card:hover .preview-container {
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  }

  /* Doc Preview Styles */
  .doc-preview {
    aspect-ratio: 1 / 1.414;
    background-color: #ffffff;
    border: 1px solid #f9fafb;
    display: flex;
    flex-direction: column;
    padding: 1rem;
    font-size: 6px;
    color: #9ca3af;
    user-select: none;
  }

  .doc-title {
    font-weight: 700;
    color: #000000;
    font-size: 8px;
    margin-bottom: 0.5rem;
  }

  .doc-title.center { text-align: center; }
  .doc-title.left { text-align: left; }

  .doc-line {
    width: 100%;
    height: 1px;
    margin-bottom: 0.5rem;
  }

  .doc-line.black { background-color: #000; }
  .doc-line.light { background-color: #e5e7eb; }

  .doc-text {
    margin-bottom: 0.25rem;
    text-align: justify;
  }

  .doc-bar {
    height: 0.5rem;
    background-color: #f3f4f6;
    margin-bottom: 0.25rem;
  }

  .doc-bar.short { width: 75%; }
  .doc-bar.full { width: 100%; }

  .doc-footer {
    display: flex;
    justify-content: space-between;
    margin-top: auto;
    padding-top: 0.5rem;
    border-top: 1px solid #f9fafb;
  }

  .doc-sign {
    width: 2.5rem;
    height: 0.5rem;
    border-bottom: 1px solid #000000;
  }

  .doc-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 0.5rem;
    margin-bottom: 0.5rem;
  }

  .doc-checkbox-row {
    display: flex;
    align-items: center;
    gap: 0.25rem;
    margin-top: auto;
  }

  .checkbox {
    width: 1rem;
    height: 1rem;
    border: 1px solid #000000;
  }

  .doc-id { text-align: right; font-size: 5px; margin-bottom: 0.5rem; }

  .doc-row { display: flex; justify-content: space-between; margin-bottom: 0.25rem; }
  .bar-long { width: 50%; height: 0.25rem; background-color: #f3f4f6; }
  .bar-short { width: 1rem; height: 0.25rem; background-color: #f3f4f6; }

  .doc-total { margin-top: auto; text-align: right; font-weight: 700; color: #000000; font-size: 7px; }

  .doc-tagline { text-align: center; margin-bottom: 0.25rem; letter-spacing: -0.05em; }

  .doc-sign-box {
    margin-top: auto;
    border: 1px dashed #d1d5db;
    padding: 0.25rem;
    text-align: center;
    font-size: 4px;
  }

  .overlay {
    position: absolute;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: rgba(0, 0, 0, 0);
    transition: background-color 0.2s;
  }

  .template-card:hover .overlay {
    background-color: rgba(0, 0, 0, 0.05);
  }

  .use-btn {
    background-color: #ffffff;
    color: #000000;
    padding: 0.5rem 1rem;
    border-radius: 9999px;
    font-size: 0.875rem;
    font-weight: 500;
    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
    border: none;
    cursor: pointer;
    opacity: 0;
    transform: translateY(0.5rem);
    transition: all 0.2s;
  }

  .template-card:hover .use-btn {
    opacity: 1;
    transform: translateY(0);
  }

  .card-title {
    margin-top: 1rem;
    font-size: 0.875rem;
    font-weight: 600;
    color: #000000;
  }

  .card-category {
    font-size: 0.75rem;
    color: #6b7280;
  }

  .mobile-only {
    display: flex;
    margin-top: 2rem;
    justify-content: center;
  }

  @media (min-width: 640px) {
    .mobile-only {
      display: none;
    }
  }
</style>
