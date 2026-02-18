<script lang="ts">
  interface Props {
    size?: 'sm' | 'md' | 'lg';
    class?: string;
  }
  let { size = 'md', class: className = '' }: Props = $props();
  
  const sizes = {
    sm: 'w-6 h-6 text-xs',
    md: 'w-8 h-8 text-lg',
    lg: 'w-10 h-10 text-xl'
  };
</script>

<div class="logo {sizes[size]} {className}">
  MP
</div>

<style>
  .logo {
    background-color: #000000;
    color: #ffffff;
    border-radius: 0.125rem;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 700;
    tracking-tighter: -0.05em;
  }

  :global(.dark) .logo {
    background-color: #ffffff;
    color: #000000;
  }
</style>
