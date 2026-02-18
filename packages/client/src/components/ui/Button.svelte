<script lang="ts">
  import type { Snippet } from 'svelte';

  interface Props {
    variant?: 'primary' | 'outline' | 'ghost' | 'danger';
    size?: 'sm' | 'md' | 'lg' | 'icon';
    type?: 'button' | 'submit' | 'reset';
    disabled?: boolean;
    onclick?: () => void;
    children?: Snippet;
    class?: string;
  }

  let { 
    variant = 'primary', 
    size = 'md', 
    type = 'button', 
    disabled = false, 
    onclick, 
    children,
    class: className = '' 
  }: Props = $props();
</script>

<button 
  {type} 
  {disabled} 
  {onclick}
  class="btn {variant} {size} {className}"
>
  {#if children}
    {@render children()}
  {/if}
</button>

<style>
  .btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    cursor: pointer;
    transition: all 0.2s;
    border-radius: 0.125rem;
    border: 1px solid transparent;
    font-size: 0.75rem;
  }

  .btn:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  /* Variants */
  .primary {
    background-color: #000000;
    color: #ffffff;
    border-color: #000000;
  }
  :global(.dark) .primary { background-color: #ffffff; color: #000000; border-color: #ffffff; }
  .primary:hover:not(:disabled) { opacity: 0.8; }

  .outline {
    background-color: transparent;
    color: #000000;
    border-color: #d1d5db;
  }
  :global(.dark) .outline { color: #ffffff; border-color: #404040; }
  .outline:hover:not(:disabled) { border-color: #000000; }
  :global(.dark) .outline:hover:not(:disabled) { border-color: #ffffff; }

  .ghost {
    background-color: transparent;
    color: #4b5563;
    border: none;
  }
  :global(.dark) .ghost { color: #a3a3a3; }
  .ghost:hover:not(:disabled) { background-color: #f3f4f6; color: #000000; }
  :global(.dark) .ghost:hover:not(:disabled) { background-color: #262626; color: #ffffff; }

  .danger {
    background-color: transparent;
    color: #dc2626;
    border-color: #fee2e2;
  }
  .danger:hover:not(:disabled) { background-color: #fef2f2; border-color: #fca5a5; }

  /* Sizes */
  .sm { padding: 0.375rem 0.75rem; font-size: 0.625rem; }
  .md { padding: 0.5rem 1rem; }
  .lg { padding: 0.75rem 1.5rem; font-size: 0.875rem; }
  .icon { padding: 0.5rem; border-radius: 50%; width: 2.25rem; height: 2.25rem; text-transform: none; }
</style>
