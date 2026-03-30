<script lang="ts">
  import EditorCanvas from '../../../../components/editor/EditorCanvas.svelte';

  let { data } = $props();
  const formId = $derived(data.form?.id as string);
  const formTitle = $derived(data.form?.title || 'Field Editor');
</script>

<svelte:head>
  <title>{formTitle} — MakePDFForm</title>
</svelte:head>

<div class="fields-editor">
  <div class="step-breadcrumb">
    <a href="/editor/{formId}" class="step-link">
      <span class="step-num">1</span>
      <span>Create Document</span>
    </a>
    <span class="step-sep">›</span>
    <span class="step-link active">
      <span class="step-num">2</span>
      <span>Add Form Fields</span>
    </span>
  </div>

  <EditorCanvas {formId} />
</div>

<style>
  .fields-editor {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
  }

  .step-breadcrumb {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 8px 16px;
    background: #fff;
    border-bottom: 1px solid #e5e7eb;
    font-size: 0.75rem;
    flex-shrink: 0;
    z-index: 200;
    position: relative;
  }

  .step-link {
    display: flex;
    align-items: center;
    gap: 6px;
    color: #6b7280;
    text-decoration: none;
    font-weight: 500;
    transition: color 0.15s;
  }

  .step-link:hover {
    color: #000;
  }

  .step-link.active {
    color: #000;
    font-weight: 700;
  }

  .step-num {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 18px;
    height: 18px;
    border-radius: 50%;
    background: #e5e7eb;
    font-size: 10px;
    font-weight: 700;
    color: #6b7280;
  }

  .step-link.active .step-num {
    background: #000;
    color: #fff;
  }

  .step-sep {
    color: #d1d5db;
    font-size: 14px;
  }
</style>
