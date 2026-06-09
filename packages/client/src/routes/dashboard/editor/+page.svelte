<script lang="ts">
  import DocumentEditor from '../../../components/editor/DocumentEditor.svelte';
</script>

<svelte:head>
  <title>Document Editor - Prime America Real Estate</title>
</svelte:head>

<div class="h-full flex flex-col p-4 md:p-6 lg:p-8 bg-neutral-50 min-h-[calc(100vh-4rem)]">
  <div class="mb-4 flex justify-between items-center">
    <div>
      <h1 class="text-2xl font-bold text-neutral-900 tracking-tight">Document Editor</h1>
      <p class="text-sm text-neutral-500 mt-1">Create and format rich documents compatible with standard formats.</p>
    </div>
  </div>
  
  <div class="flex-1 bg-white border border-neutral-200 shadow-sm rounded-xl overflow-hidden flex flex-col h-full min-h-[600px]">
    <DocumentEditor />
  </div>
</div>
