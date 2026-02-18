<script lang="ts">
  import { onMount } from 'svelte';
  import { page } from '$app/stores';
  
  let formId = $page.url.searchParams.get('id');
</script>

<style>
  :global(body) {
    background-color: #000;
    color: #fff;
    margin: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    font-family: sans-serif;
  }

  .container {
    text-align: center;
    max-width: 500px;
    padding: 40px;
    background: #0a0a0a;
    border: 1px solid #222;
    border-radius: 20px;
  }

  .success-icon {
    font-size: 4rem;
    margin-bottom: 20px;
    color: #fff;
  }

  h1 {
    font-size: 2.5rem;
    margin: 0 0 10px;
  }

  p {
    color: #888;
    line-height: 1.6;
    margin-bottom: 30px;
  }

  .btn {
    display: inline-block;
    padding: 12px 30px;
    background: #fff;
    color: #000;
    text-decoration: none;
    font-weight: 600;
    border-radius: 5px;
    transition: opacity 0.2s;
  }

  .btn:hover {
    opacity: 0.8;
  }
</style>

<div class="container">
  <div class="success-icon">✓</div>
  <h1>Upgrade Successful</h1>
  <p>Your form is now Pro! Enjoy custom branding, unlimited submissions, and all other exclusive features.</p>
  
  <a href={formId ? `/editor?id=${formId}` : '/forms'} class="btn">
    Back to Editor
  </a>
</div>
