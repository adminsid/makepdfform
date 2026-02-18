<script lang="ts">
  import Nav from '../components/home/Nav.svelte';
  import Hero from '../components/home/Hero.svelte';
  import Features from '../components/home/Features.svelte';
  import TemplateShowcase from '../components/home/TemplateShowcase.svelte';
  import Footer from '../components/home/Footer.svelte';
</script>

<svelte:head>
  <title>Make PDF Form - Professional PDF Forms in Minutes</title>
</svelte:head>

<div class="page-wrapper">
  <Nav />
  <main>
    <Hero />
    <Features />
    <TemplateShowcase />
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

  main {
    flex: 1;
  }
</style>
