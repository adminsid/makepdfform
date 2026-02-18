<script lang="ts">
  interface Props {
    title: string;
    category: string;
    previewType?: 'lease' | 'tax' | 'invoice' | 'checklist' | 'notice' | 'application';
  }

  let { title, category, previewType = 'lease' }: Props = $props();
</script>

<div class="card group">
  <div class="thumbnail">
    <div class="overlay">
      <button class="preview-btn">Preview</button>
    </div>
    <div class="doc-preview">
      {#if previewType === 'lease'}
        <div class="lease-preview">
           <div class="preview-title black"></div>
           <div class="preview-line-full"></div>
           <div class="preview-row">
             <div class="preview-bar-quarter gray"></div>
             <div class="preview-bar-quarter light"></div>
           </div>
           <div class="preview-line-full light mt-2"></div>
           <div class="preview-line-full light"></div>
           <div class="preview-line-half light"></div>
           <div class="preview-grid mt-4">
             <div class="preview-box"></div>
             <div class="preview-box"></div>
           </div>
           <div class="preview-footer mt-auto">
             <div class="preview-bar-half gray"></div>
           </div>
        </div>
      {:else if previewType === 'tax'}
        <div class="tax-preview">
          <div class="preview-header center">
            <div class="preview-title-centered gray"></div>
          </div>
          <div class="preview-lines mt-4">
            <div class="preview-line-full light"></div>
            <div class="preview-line-full light"></div>
            <div class="preview-line-half light"></div>
          </div>
          <div class="preview-box-large mt-4"></div>
          <div class="preview-footer flex-end mt-auto">
            <div class="preview-line-quarter border-bottom"></div>
          </div>
        </div>
      {:else if previewType === 'invoice'}
        <div class="invoice-preview">
          <div class="preview-header flex-between mb-4">
             <div class="preview-title-small gray"></div>
             <div class="preview-title-tiny light"></div>
          </div>
          <div class="preview-grid-2 mb-4">
             <div class="preview-cell"></div>
             <div class="preview-cell"></div>
             <div class="preview-cell-full"></div>
          </div>
          <div class="preview-lines">
             <div class="preview-line-full light"></div>
             <div class="preview-line-full light"></div>
          </div>
        </div>
      {:else if previewType === 'notice'}
        <div class="notice-preview">
          <div class="tiny-label">NOTICE TO VACATE</div>
          <div class="preview-title-large black mb-4"></div>
          <div class="preview-lines mb-4">
            <div class="preview-line-full gray"></div>
            <div class="preview-line-full gray"></div>
            <div class="preview-line-3-4 gray"></div>
          </div>
          <div class="preview-footer mt-auto">
            <div class="preview-box-small"></div>
          </div>
        </div>
      {:else if previewType === 'checklist'}
        <div class="checklist-preview">
          <div class="preview-title-centered gray mb-6"></div>
          <div class="preview-grid-2 mb-4">
             <div class="preview-box-dashed"></div>
             <div class="preview-box-dashed"></div>
          </div>
          <div class="preview-line-full light"></div>
          <div class="preview-line-2-3 light"></div>
        </div>
      {:else}
        <div class="application-preview">
           <div class="preview-title black mb-2"></div>
           <div class="preview-line-full gray mb-1"></div>
           <div class="preview-line-full gray mb-4"></div>
           <div class="preview-box-content h-24 mb-4">
              <div class="preview-line-full light"></div>
              <div class="preview-line-3-4 light"></div>
           </div>
           <div class="preview-line-half border-bottom"></div>
        </div>
      {/if}
    </div>
  </div>
  <div class="info">
    <div class="text-group">
      <h3 class="card-title">{title}</h3>
      <p class="card-category">{category}</p>
    </div>
    <button class="bookmark-btn">
      <span class="material-symbols-outlined icon">bookmark</span>
    </button>
  </div>
</div>

<style>
  .card {
    cursor: pointer;
  }

  .thumbnail {
    background-color: #f3f4f6;
    border-radius: 0.5rem;
    padding: 1.5rem;
    border: 1px solid #e5e7eb;
    aspect-ratio: 3 / 4;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    overflow: hidden;
    margin-bottom: 0.75rem;
    transition: all 0.2s;
  }

  .card:hover .thumbnail {
    transform: translateY(-2px);
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
  }

  .overlay {
    position: absolute;
    inset: 0;
    background-color: rgba(0, 0, 0, 0);
    z-index: 10;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: background-color 0.2s;
  }

  .card:hover .overlay {
    background-color: rgba(0, 0, 0, 0.05);
  }

  .preview-btn {
    background-color: #ffffff;
    color: #000000;
    font-weight: 600;
    padding: 0.5rem 1rem;
    border-radius: 0.5rem;
    border: 1px solid #e5e7eb;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
    opacity: 0;
    transform: translateY(0.5rem);
    transition: all 0.2s;
    cursor: pointer;
  }

  .card:hover .preview-btn {
    opacity: 1;
    transform: translateY(0);
  }

  .doc-preview {
    width: 100%;
    height: 100%;
    background-color: #ffffff;
    box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
    border: 1px solid #f3f4f6;
    padding: 1rem;
    display: flex;
    flex-direction: column;
  }

  /* Preview Common Elements */
  .preview-title { height: 1rem; width: 33.333333%; background-color: #000; margin-bottom: 0.5rem; }
  .preview-title.black { background-color: #000; }
  .preview-title.gray { background-color: #1f2937; }
  .preview-line-full { height: 4px; width: 100%; background-color: #e5e7eb; margin-bottom: 0.5rem; }
  .preview-line-half { height: 4px; width: 50%; background-color: #f3f4f6; }
  .preview-line-3-4 { height: 4px; width: 75%; background-color: #e5e7eb; }
  .preview-line-quarter { height: 4px; width: 25%; background-color: #e5e7eb; }
  .preview-row { display: flex; justify-content: space-between; margin-top: 0.5rem; }
  .preview-bar-quarter { height: 8px; width: 25%; background-color: #d1d5db; }
  .preview-bar-half { height: 8px; width: 50%; background-color: #d1d5db; }
  .preview-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 0.5rem; }
  .preview-box { height: 2rem; border: 1px solid #e5e7eb; border-radius: 0.25rem; }
  .preview-box-large { height: 5rem; border: 1px solid #e5e7eb; border-radius: 0.25rem; background-color: #f9fafb; }
  .preview-box-small { height: 1.5rem; width: 2rem; border: 1px solid #e5e7eb; border-radius: 0.125rem; }
  .preview-box-dashed { height: 4rem; border: 1px dashed #d1d5db; border-radius: 0.25rem; background-color: #fafafa; }
  .preview-cell { height: 1.5rem; background-color: #f9fafb; border: 1px solid #e5e7eb; border-radius: 0.125rem; }
  .preview-cell-full { grid-column: span 2; height: 1.5rem; background-color: #f9fafb; border: 1px solid #e5e7eb; border-radius: 0.125rem; }
  .preview-grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 0.75rem; }
  .preview-header.center { display: flex; justify-content: center; }
  .preview-header.flex-between { display: flex; justify-content: space-between; }
  .preview-title-centered { height: 1.5rem; width: 6rem; background-color: #1f2937; border-radius: 0.125rem; }
  .preview-title-small { height: 0.75rem; width: 5rem; background-color: #1f2937; }
  .preview-title-tiny { height: 0.75rem; width: 2.5rem; background-color: #d1d5db; }
  .preview-title-large { height: 0.75rem; width: 66.666667%; background-color: #000; }
  .tiny-label { font-size: 6px; color: #9ca3af; margin-bottom: 2px; }
  .border-bottom { border-bottom: 1px solid #000; height: 1.5rem; }
  .preview-box-content { background-color: #fafafa; padding: 0.5rem; border: 1px solid #f3f4f6; border-radius: 0.25rem; display: flex; flex-direction: column; gap: 0.5rem; }

  .info {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
  }

  .card-title {
    font-size: 0.875rem;
    font-weight: 600;
    color: #111111;
    transition: color 0.2s;
  }

  .card:hover .card-title {
    color: #2563eb;
  }

  .card-category {
    font-size: 0.875rem;
    color: #6b7280;
  }

  .bookmark-btn {
    color: #d1d5db;
    background: none;
    border: none;
    cursor: pointer;
    transition: color 0.2s;
  }

  .bookmark-btn:hover {
    color: #111111;
  }

  .icon { font-size: 20px; }
</style>
