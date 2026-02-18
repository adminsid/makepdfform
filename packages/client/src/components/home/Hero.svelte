<section class="hero">
  <div class="grid-pattern"></div>
  <div class="container">
    <div class="badge-container">
      <div class="badge">
        <span class="badge-dot"></span>
        <span class="badge-text">v1.0 Now Live</span>
      </div>
    </div>
    <h1 class="hero-title">
      Professional PDF Forms <br class="desktop-br"/> in Minutes
    </h1>
    <p class="hero-description">
      The minimalist builder for high-quality forms. Write in Markdown, drag fields, and export print-ready PDFs instantly.
    </p>
    <div class="cta-container">
      <a href="/dashboard" class="primary-cta">Start for Free</a>
      <a href="/templates" class="secondary-cta">View Examples</a>
    </div>

    <div class="browser-mockup">
      <div class="browser-header">
        <div class="dot"></div>
        <div class="dot"></div>
        <div class="dot"></div>
      </div>
      <div class="browser-content">
        <div class="sidebar">
          <div class="sidebar-item-small"></div>
          <div class="sidebar-list">
            <div class="field-item"># Header 1</div>
            <div class="field-item">**Bold Text**</div>
            <div class="field-item">[ ] Checkbox</div>
          </div>
        </div>
        <div class="editor-area">
          <div class="canvas">
            <div class="canvas-header"></div>
            <div class="canvas-text">
              <div class="line line-full"></div>
              <div class="line line-partial"></div>
            </div>
            <div class="drop-zone">
              <span class="material-symbols-outlined">drag_indicator</span>
              Drag Fields Here
            </div>
            <div class="canvas-footer">
              <div class="footer-field"></div>
              <div class="footer-sign"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

<style>
  .hero {
    position: relative;
    background-color: #ffffff;
    overflow: hidden;
    border-bottom: 1px solid #f3f4f6;
  }

  .grid-pattern {
    position: absolute;
    inset: 0;
    opacity: 0.6;
    pointer-events: none;
    background-image: linear-gradient(#f3f4f6 1px, transparent 1px),
      linear-gradient(90deg, #f3f4f6 1px, transparent 1px);
    background-size: 24px 24px;
  }

  .container {
    max-width: 80rem;
    margin-left: auto;
    margin-right: auto;
    padding-left: 1rem;
    padding-right: 1rem;
    padding-top: 5rem;
    padding-bottom: 6rem;
    position: relative;
    z-index: 10;
    text-align: center;
  }

  @media (min-width: 1024px) {
    .container {
      padding-top: 8rem;
      padding-bottom: 10rem;
    }
  }

  .badge-container {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.25rem 0.75rem;
    border-radius: 9999px;
    background-color: #f9fafb;
    border: 1px solid #e5e7eb;
    margin-bottom: 2rem;
  }

  .badge {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  .badge-dot {
    display: block;
    height: 0.5rem;
    width: 0.5rem;
    border-radius: 50%;
    background-color: #000000;
  }

  .badge-text {
    font-size: 0.75rem;
    font-weight: 500;
    color: #4b5563;
  }

  .hero-title {
    font-size: 3rem;
    font-weight: 700;
    letter-spacing: -0.025em;
    color: #000000;
    margin-bottom: 1.5rem;
    max-width: 56rem;
    margin-left: auto;
    margin-right: auto;
    line-height: 1.1;
  }

  @media (min-width: 768px) {
    .hero-title {
      font-size: 3.75rem;
    }
  }

  @media (min-width: 1024px) {
    .hero-title {
      font-size: 4.5rem;
    }
  }

  .desktop-br {
    display: none;
  }

  @media (min-width: 768px) {
    .desktop-br {
      display: block;
    }
  }

  .hero-description {
    margin-top: 1rem;
    font-size: 1.25rem;
    color: #6b7280;
    max-width: 42rem;
    margin-left: auto;
    margin-right: auto;
    margin-bottom: 2.5rem;
    font-weight: 300;
  }

  .cta-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 1rem;
  }

  @media (min-width: 640px) {
    .cta-container {
      flex-direction: row;
    }
  }

  .primary-cta {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding-left: 2rem;
    padding-right: 2rem;
    padding-top: 0.75rem;
    padding-bottom: 0.75rem;
    border: 1px solid transparent;
    font-size: 1rem;
    font-weight: 500;
    border-radius: 0.5rem;
    color: #ffffff;
    background-color: #000000;
    text-decoration: none;
    transition: all 0.2s;
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
  }

  .primary-cta:hover {
    background-color: #1f2937;
    box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  }

  .secondary-cta {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding-left: 2rem;
    padding-right: 2rem;
    padding-top: 0.75rem;
    padding-bottom: 0.75rem;
    border: 1px solid #e5e7eb;
    font-size: 1rem;
    font-weight: 500;
    border-radius: 0.5rem;
    color: #000000;
    background-color: #ffffff;
    text-decoration: none;
    transition: all 0.2s;
  }

  .secondary-cta:hover {
    background-color: #f9fafb;
  }

  .browser-mockup {
    margin-top: 4rem;
    margin-left: auto;
    margin-right: auto;
    max-width: 64rem;
    border-radius: 0.75rem;
    background-color: #ffffff;
    border: 1px solid #e5e7eb;
    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
    overflow: hidden;
  }

  .browser-header {
    background-color: #f9fafb;
    border-bottom: 1px solid #f3f4f6;
    height: 2rem;
    display: flex;
    align-items: center;
    padding-left: 1rem;
    gap: 0.5rem;
  }

  .dot {
    width: 0.75rem;
    height: 0.75rem;
    border-radius: 50%;
    background-color: #e5e7eb;
  }

  .browser-content {
    display: flex;
    height: 400px;
  }

  @media (min-width: 768px) {
    .browser-content {
      height: 500px;
    }
  }

  .sidebar {
    display: none;
    width: 16rem;
    border-right: 1px solid #f3f4f6;
    padding: 1.5rem;
    background-color: rgba(249, 250, 251, 0.5);
  }

  @media (min-width: 768px) {
    .sidebar {
      display: block;
    }
  }

  .sidebar-item-small {
    height: 1rem;
    width: 75%;
    background-color: #e5e7eb;
    border-radius: 0.25rem;
    margin-bottom: 1rem;
  }

  .sidebar-list {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  }

  .field-item {
    height: 2rem;
    width: 100%;
    background-color: #ffffff;
    border: 1px solid #e5e7eb;
    border-radius: 0.25rem;
    display: flex;
    align-items: center;
    padding-left: 0.75rem;
    font-size: 0.75rem;
    color: #9ca3af;
  }

  .editor-area {
    flex: 1;
    background-color: #f3f4f6;
    padding: 2rem;
    display: flex;
    justify-content: center;
    overflow: hidden;
  }

  .canvas {
    background-color: #ffffff;
    box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
    width: 100%;
    max-width: 500px;
    height: 100%;
    padding: 2rem;
    border: 1px solid #e5e7eb;
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }

  .canvas-header {
    height: 2rem;
    width: 50%;
    background-color: rgba(0, 0, 0, 0.05);
    border-radius: 0.25rem;
  }

  .canvas-text {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .line {
    height: 1rem;
    border-radius: 0.25rem;
    background-color: #f3f4f6;
  }

  .line-full { width: 100%; }
  .line-partial { width: 83.333333%; }

  .drop-zone {
    margin-top: 1rem;
    padding: 1rem;
    border: 1px dashed #d1d5db;
    border-radius: 0.5rem;
    background-color: #f9fafb;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    justify-content: center;
    align-items: center;
    color: #9ca3af;
    font-size: 0.875rem;
  }

  .canvas-footer {
    margin-top: auto;
    border-top: 1px solid #000000;
    padding-top: 1rem;
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
  }

  .footer-field {
    height: 2rem;
    width: 8rem;
    background-color: #f3f4f6;
    border-radius: 0.25rem;
    border-bottom: 1px solid #000000;
  }

  .footer-sign {
    height: 1rem;
    width: 6rem;
    background-color: #f3f4f6;
    border-radius: 0.25rem;
  }
</style>
