<div class="distribution-grid">
  <div class="dist-card">
    <div class="header">
      <div class="icon-box">
        <span class="material-symbols-outlined">code</span>
      </div>
      <div class="text">
        <h3 class="title">Embed on Website</h3>
        <p class="desc">Display this form directly on your website. The form will automatically adapt to your container's width.</p>
      </div>
    </div>
    <div class="code-container">
      <pre class="code"><code>&lt;iframe src="https://makepdfform.com/e/x8k2" width="100%" height="800" frameborder="0"&gt;&lt;/iframe&gt;</code></pre>
      <button class="copy-btn">
        <span class="material-symbols-outlined">content_copy</span>
      </button>
    </div>
  </div>

  <div class="dist-card">
    <div class="header">
      <div class="icon-box">
        <span class="material-symbols-outlined">qr_code_2</span>
      </div>
      <div class="text">
        <h3 class="title">QR Code</h3>
        <p class="desc">Download a high-resolution QR code for print materials, posters, or business cards.</p>
      </div>
    </div>
    <div class="qr-area">
      <div class="qr-box">
        <div class="qr-mock">
          <div class="qr-pattern">
            <div class="p-1"></div>
            <div class="p-2"></div>
            <div class="p-3"></div>
            <div class="p-4"></div>
          </div>
        </div>
      </div>
      <div class="qr-actions">
        <button class="outline-btn">Download SVG</button>
        <button class="outline-btn">Download PNG</button>
      </div>
    </div>
  </div>
</div>

<style>
  .distribution-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 2rem;
  }

  @media (min-width: 1024px) {
    .distribution-grid { grid-template-columns: 1fr 1fr; }
  }

  .dist-card {
    background-color: #ffffff;
    border: 1px solid #e5e7eb;
    border-radius: 0.125rem;
    padding: 1.5rem;
  }

  :global(.dark) .dist-card { background-color: #171717; border-color: #404040; }

  .header { display: flex; gap: 1rem; margin-bottom: 1rem; }

  .icon-box {
    padding: 0.75rem;
    background-color: #f3f4f6;
    border-radius: 0.125rem;
    color: #000000;
  }

  :global(.dark) .icon-box { background-color: #262626; color: #ffffff; }

  .title { font-size: 0.875rem; font-weight: 700; color: #111827; margin-bottom: 0.25rem; }
  :global(.dark) .title { color: #ffffff; }

  .desc { font-size: 0.75rem; color: #6b7280; line-height: 1.5; }

  .code-container {
    position: relative;
    background-color: #f9fafb;
    border: 1px solid #e5e7eb;
    border-radius: 0.125rem;
    padding: 0.75rem;
  }

  :global(.dark) .code-container { background-color: #0a0a0a; border-color: #404040; }

  .code {
    font-family: monospace;
    font-size: 0.625rem;
    color: #4b5563;
    white-space: pre-wrap;
    word-break: break-all;
  }

  :global(.dark) .code { color: #a3a3a3; }

  .copy-btn {
    position: absolute;
    top: 0.5rem;
    right: 0.5rem;
    padding: 0.375rem;
    background-color: #ffffff;
    border: 1px solid #e5e7eb;
    border-radius: 0.125rem;
    cursor: pointer;
    opacity: 0;
    transition: opacity 0.2s;
  }

  .code-container:hover .copy-btn { opacity: 1; }

  .qr-area { display: flex; align-items: center; gap: 1rem; }

  .qr-box {
    background-color: #ffffff;
    border: 1px solid #e5e7eb;
    padding: 0.5rem;
    border-radius: 0.125rem;
  }

  .qr-mock { width: 4rem; height: 4rem; background-color: #000000; display: flex; align-items: center; justify-content: center; }

  .qr-pattern {
    width: 3.5rem;
    height: 3.5rem;
    background-color: #ffffff;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-template-rows: repeat(4, 1fr);
    gap: 1px;
    padding: 1px;
  }

  .p-1 { background-color: #000; grid-column: span 2; grid-row: span 2; }
  .p-2 { background-color: #000; grid-column: 4; grid-row: 1; }
  .p-3 { background-color: #000; grid-column: 1; grid-row: span 2 / 5; }
  .p-4 { background-color: #000; grid-column: span 2 / 5; grid-row: 4; }

  .qr-actions { display: flex; flex-direction: column; gap: 0.5rem; }

  .outline-btn {
    padding: 0.5rem 1rem;
    font-size: 0.75rem;
    font-weight: 700;
    color: #4b5563;
    background: transparent;
    border: 1px solid #d1d5db;
    border-radius: 0.125rem;
    cursor: pointer;
    transition: all 0.2s;
  }

  :global(.dark) .outline-btn { color: #d1d5db; border-color: #404040; }

  .outline-btn:hover { border-color: #000000; color: #000000; }
  :global(.dark) .outline-btn:hover { border-color: #ffffff; color: #ffffff; }
</style>
