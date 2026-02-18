<script lang="ts">
  const faqs = [
    {
      q: 'What happens if I hit my submission limit?',
      a: "If you reach your monthly submission limit, we'll notify you via email. Your forms will continue to work for a grace period of 48 hours, giving you time to upgrade to the next tier without interrupting your data collection."
    },
    {
      q: 'Can I remove the watermark on the Free plan?',
      a: 'The "Made with MakePDFForm" watermark is mandatory on the Free plan. To remove it and present a fully professional look to your clients, you\'ll need to upgrade to the Pro plan or higher.'
    },
    {
      q: 'How does the real-time collaboration work?',
      a: 'Similar to Google Docs, our Team and Business plans allow multiple users to edit a PDF form simultaneously. You can see your team members\' cursors and changes in real-time, preventing version conflicts.'
    },
    {
      q: 'Do you offer refunds?',
      a: "Yes. If you're not satisfied with MakePDFForm for any reason within the first 14 days of your subscription, simply contact support for a full refund—no questions asked."
    }
  ];
</script>

<section class="faq-section">
  <div class="container">
    <h2 class="title">Frequently Asked Questions</h2>
    <div class="faq-list">
      {#each faqs as faq}
        <div class="faq-item">
          <h3 class="question">{faq.q}</h3>
          <p class="answer">{faq.a}</p>
        </div>
      {/each}
    </div>
  </div>
</section>

<style>
  .faq-section {
    background-color: #f9fafb;
    border-top: 1px solid #e5e7eb;
    padding: 6rem 1rem;
  }

  .container {
    max-width: 48rem; /* 3xl */
    margin-left: auto;
    margin-right: auto;
  }

  .title {
    font-size: 1.875rem;
    font-weight: 700;
    letter-spacing: -0.025em;
    text-align: center;
    margin-bottom: 3rem;
    color: #000000;
  }

  .faq-list { display: flex; flex-direction: column; gap: 2rem; }

  .faq-item { border-bottom: 1px solid #e5e7eb; padding-bottom: 2rem; }
  .faq-item:last-child { border-bottom: none; }

  .question { font-size: 1.125rem; font-weight: 600; color: #000000; margin-bottom: 0.5rem; }

  .answer { font-size: 1rem; color: #4b5563; line-height: 1.6; }
</style>
