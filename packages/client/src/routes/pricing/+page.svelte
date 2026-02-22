<script lang="ts">
  import Nav from '../../components/home/Nav.svelte';
  import Footer from '../../components/home/Footer.svelte';
  import PricingCard from '../../components/pricing/PricingCard.svelte';
  import FAQ from '../../components/pricing/FAQ.svelte';

  const plans = [
    {
      name: 'Free',
      description: 'Perfect for trying out the editor and simple personal forms.',
      price: '0',
      ctaText: 'Get Started Free',
      features: ['3 active forms', '50 submissions / mo', 'Basic field types', '"Made with MakePDFForm" watermark'],
      productId: "040c9d6f-ac27-448f-a441-d0625d1e7bf2"
    },
    {
      name: 'Pro',
      description: 'For professionals who need unlimited forms and clean exports.',
      price: '9',
      ctaText: 'Start Free Trial',
      isPopular: true,
      buttonVariant: 'primary' as const,
      features: ['Unlimited forms', '1,000 submissions / mo', 'No watermark', 'All field types (Signature, Date)', 'Export to Google Drive'],
      productId: "50f2f190-59ca-481d-9a4c-305c7a10fa67"
    },
    {
      name: 'Team',
      description: 'Collaborate with your team in real-time on complex forms.',
      price: '25',
      ctaText: 'Upgrade to Team',
      features: ['Real-time collaboration', '5 team members', 'Shared workspace', 'Field locking & history'],
      productId: "562b02bf-13f1-4aad-b316-b36e565b1642"
    },
    {
      name: 'Business',
      description: 'For scaling organizations requiring automation and branding.',
      price: '59',
      ctaText: 'Contact Sales',
      features: ['Custom Branding', 'API Access & Webhooks', 'Unlimited team members', 'Priority Support'],
      productId: "db14d3f1-59eb-4192-83aa-340c9d08091e"
    }
  ];
</script>

<svelte:head>
  <title>Pricing - Make PDF Form</title>
</svelte:head>

<div class="page-wrapper">
  <Nav />
  
  <main>
    <header class="page-header">
      <div class="header-content">
        <h1 class="title">Simple, transparent pricing</h1>
        <p class="subtitle">
          Start for free, upgrade when you need more power. No hidden fees, cancel anytime.
        </p>
      </div>
    </header>

    <section class="pricing-section">
      <div class="container">
        <div class="pricing-grid">
          {#each plans as plan}
            <PricingCard {...plan} />
          {/each}
        </div>
      </div>
    </section>

    <FAQ />
  </main>
  
  <Footer />
</div>

<style>
  .page-wrapper {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    background-color: #ffffff;
  }

  main { flex: 1; }

  .page-header { padding: 6rem 1rem 3rem; text-align: center; }

  .header-content { max-width: 56rem; margin-left: auto; margin-right: auto; }

  .title { font-size: 2.25rem; font-weight: 700; letter-spacing: -0.025em; margin-bottom: 1.5rem; color: #000000; }
  @media (min-width: 768px) { .title { font-size: 3.75rem; } }

  .subtitle { font-size: 1.25rem; color: #4b5563; font-weight: 300; max-width: 42rem; margin-left: auto; margin-right: auto; }

  .pricing-section { padding-bottom: 6rem; padding-left: 1rem; padding-right: 1rem; }

  .container { max-width: 80rem; margin-left: auto; margin-right: auto; }

  .pricing-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 2rem;
    align-items: flex-start;
  }

  @media (min-width: 768px) {
    .pricing-grid { grid-template-columns: repeat(2, 1fr); padding-top: 2rem; }
  }

  @media (min-width: 1024px) {
    .pricing-grid { grid-template-columns: repeat(4, 1fr); gap: 2rem; }
  }
</style>
