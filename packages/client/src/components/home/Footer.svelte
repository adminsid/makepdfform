<footer class="footer">
  <div class="container">
    <div class="footer-content">
      <div class="footer-links">
        <a href="/templates" class="footer-link">Templates</a>
        <a href="/pricing" class="footer-link">Pricing</a>
        <a href="/settings" class="footer-link">Settings</a>
      </div>
      <div class="copyright-container">
        <p class="copyright">© 2025 MakePDFForm. All rights reserved.</p>
      </div>
    </div>
  </div>
</footer>

<style>
  .footer {
    background-color: #ffffff;
    border-top: 1px solid #f3f4f6;
    margin-top: auto;
  }

  :global(.dark) .footer {
    background-color: #111827;
    border-top-color: #1f2937;
  }

  .container {
    max-width: 80rem;
    margin-left: auto;
    margin-right: auto;
    padding: 2rem 1rem;
  }

  @media (min-width: 640px) { .container { padding-left: 1.5rem; padding-right: 1.5rem; } }
  @media (min-width: 1024px) { .container { padding-left: 2rem; padding-right: 2rem; } }

  .footer-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
  }

  @media (min-width: 768px) {
    .footer-content { flex-direction: row; justify-content: space-between; }
  }

  .footer-links {
    display: flex;
    gap: 1.5rem;
  }

  .footer-link {
    font-size: 0.875rem;
    color: #6b7280;
    text-decoration: none;
    transition: color 0.2s;
  }

  :global(.dark) .footer-link { color: #9ca3af; }
  .footer-link:hover { color: #000; }
  :global(.dark) .footer-link:hover { color: #fff; }

  .copyright {
    font-size: 0.875rem;
    color: #6b7280;
    text-align: center;
    margin: 0;
  }

  :global(.dark) .copyright { color: #9ca3af; }
</style>
