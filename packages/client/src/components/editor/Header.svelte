<script lang="ts">
  interface Props {
    onSave: () => void;
    onDownload: () => void;
    onUpgrade?: () => void;
    onSaveTemplate?: () => void;
    isSaving?: boolean;
    isPro?: boolean;
    brandingConfig?: { primaryColor?: string };
  }

  let { onSave, onDownload, onUpgrade, onSaveTemplate, isSaving = false, isPro = false, brandingConfig = {} }: Props = $props();
</script>

<header class="editor-header">
  <div class="logo">
    MakePDFForm
    {#if isPro}
      <span class="pro-badge" style="background: {brandingConfig.primaryColor || '#000'}">PRO</span>
    {/if}
  </div>
  
  <div class="actions">
    {#if !isPro && onUpgrade}
      <button class="btn-upgrade" onclick={onUpgrade}>
        Upgrade to Pro
      </button>
    {/if}
    {#if onSaveTemplate}
      <button class="btn-secondary" onclick={onSaveTemplate}>
        Save as Template
      </button>
    {/if}
    <button class="btn-secondary" onclick={onSave} disabled={isSaving}>
      {isSaving ? 'Saving...' : 'Save Draft'}
    </button>
    <button class="btn-primary" onclick={onDownload}>
      Download PDF
    </button>
  </div>
</header>

<style>
  .editor-header {
    height: 60px;
    background: white;
    border-bottom: 1px solid #e0e0e0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 20px;
    position: sticky;
    top: 0;
    z-index: 200;
  }

  .logo {
    font-weight: 700;
    font-size: 18px;
    color: #333;
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .pro-badge {
    background: #000;
    color: #fff;
    font-size: 10px;
    padding: 2px 6px;
    border-radius: 4px;
    font-weight: 800;
  }

  .actions {
    display: flex;
    gap: 10px;
  }

  button {
    padding: 8px 16px;
    border-radius: 6px;
    font-size: 14px;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s;
  }

  .btn-upgrade {
    background: #fff;
    color: #000;
    border: 1px solid #000;
  }

  .btn-upgrade:hover {
    background: #000;
    color: #fff;
  }

  .btn-primary {
    background: #000;
    color: white;
    border: 1px solid #000;
  }

  .btn-primary:hover {
    background: #333;
  }

  .btn-secondary {
    background: white;
    color: #333;
    border: 1px solid #ddd;
  }

  .btn-secondary:hover {
    background: #f5f5f5;
  }
  
  button:disabled {
      opacity: 0.7;
      cursor: not-allowed;
  }
</style>
