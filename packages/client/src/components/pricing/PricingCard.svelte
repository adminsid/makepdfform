<script lang="ts">
  interface Props {
    name: string;
    description: string;
    price: string;
    ctaText: string;
    features: string[];
    isPopular?: boolean;
    isComingSoon?: boolean;
    buttonVariant?: 'primary' | 'secondary';
  }

  let { name, description, price, ctaText, features, isPopular = false, isComingSoon = false, buttonVariant = 'secondary' }: Props = $props();
</script>

<div class="pricing-card" class:popular={isPopular}>
  {#if isPopular}
    <div class="popular-badge">Most Popular</div>
  {/if}
  
  <div class="header">
    <h3 class="plan-name">{name}</h3>
    <p class="plan-desc">{description}</p>
  </div>
  
  <div class="price-section">
    <span class="currency">$</span>
    <span class="amount">{price}</span>
    <span class="period">/month</span>
  </div>
  
  <a href="#" class="cta-btn" class:primary={buttonVariant === 'primary'}>
    {ctaText}
  </a>
  
  {#if name === 'Team' || name === 'Business'}
    <div class="separator-text">Everything in {name === 'Team' ? 'Pro' : 'Team'}, plus:</div>
  {/if}
  
  <ul class="features-list">
    {#each features as feature}
      <li class="feature-item">
        <span class="material-symbols-outlined check">check</span>
        <span class="feature-text" class:bold={feature.includes('Unlimited') || feature.includes('branding') || feature.includes('collaboration')}>{feature}</span>
      </li>
    {/each}
  </ul>
</div>

<style>
  .pricing-card {
    border: 1px solid #e5e7eb;
    border-radius: 0.75rem;
    padding: 2rem;
    display: flex;
    flex-direction: column;
    height: 100%;
    transition: border-color 0.3s, transform 0.3s;
    background-color: #ffffff;
    position: relative;
  }

  .pricing-card:hover:not(.popular) {
    border-color: rgba(0, 0, 0, 0.3);
  }

  .pricing-card.popular {
    border: 2px solid #000000;
    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
    transform: scale(1.05);
    z-index: 10;
  }

  .popular-badge {
    position: absolute;
    top: 0;
    right: 0;
    transform: translate(0.5rem, -50%);
    background-color: #000000;
    color: #ffffff;
    font-size: 0.75rem;
    font-weight: 700;
    padding: 0.25rem 0.75rem;
    border-radius: 9999px;
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }

  .header { margin-bottom: 1.5rem; }

  .plan-name { font-size: 1.125rem; font-weight: 600; margin-bottom: 0.5rem; color: #000000; }

  .plan-desc { font-size: 0.875rem; color: #6b7280; height: 2.5rem; }

  .price-section { margin-bottom: 2rem; display: flex; align-items: baseline; }

  .amount { font-size: 2.25rem; font-weight: 700; color: #000000; }

  .currency { font-size: 1.5rem; font-weight: 700; color: #000000; margin-right: 0.125rem; }

  .period { font-size: 0.875rem; color: #6b7280; margin-left: 0.25rem; }

  .cta-btn {
    display: block;
    width: 100%;
    padding: 0.625rem 1rem;
    text-align: center;
    font-size: 0.875rem;
    font-weight: 500;
    border-radius: 0.375rem;
    text-decoration: none;
    transition: all 0.2s;
    margin-bottom: 2rem;
  }

  .cta-btn:not(.primary) {
    background-color: #ffffff;
    color: #000000;
    border: 1px solid #000000;
  }

  .cta-btn:not(.primary):hover { background-color: #f9fafb; }

  .cta-btn.primary {
    background-color: #000000;
    color: #ffffff;
    border: 1px solid #000000;
  }

  .cta-btn.primary:hover { background-color: #1f2937; }

  .separator-text {
    font-size: 0.75rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    color: #9ca3af;
    margin-bottom: 1rem;
  }

  .features-list { list-style: none; padding: 0; margin: 0; flex-grow: 1; }

  .feature-item { display: flex; align-items: flex-start; margin-bottom: 1rem; }

  .check { font-size: 1.125rem; color: #000000; margin-right: 0.5rem; flex-shrink: 0; }

  .feature-text { font-size: 0.875rem; color: #4b5563; }

  .feature-text.bold { font-weight: 600; color: #000000; }
</style>
