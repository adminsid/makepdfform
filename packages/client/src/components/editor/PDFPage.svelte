<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  import { PDFRenderer } from '$lib/pdf/renderer';
  import { EditorCanvasManager } from '$lib/editor/canvas';
  import CursorsLayer from './CursorsLayer.svelte';

  interface Props {
    pdfRenderer: PDFRenderer;
    pageNumber: number;
    scale?: number;
    registerManager?: (page: number, manager: EditorCanvasManager) => void;
    interactive?: boolean;
    cursors?: Record<string, { x: number, y: number, color: string }>;
    selectedTool?: string | null;
    brandingConfig?: { logoUrl?: string; primaryColor?: string };
  }

  let { 
    pdfRenderer, 
    pageNumber, 
    scale = 1.0, 
    registerManager, 
    interactive = true, 
    cursors = {},
    selectedTool = null,
    brandingConfig = {}
  }: Props = $props();

  let pdfCanvas: HTMLCanvasElement;
  let fabricCanvasEl: HTMLCanvasElement;
  let container: HTMLDivElement;
  let editorManager: EditorCanvasManager;

  let renderTask: any = null;
  let isRenderPending = false;

  onMount(async () => {
    if (fabricCanvasEl) {
        editorManager = new EditorCanvasManager(fabricCanvasEl);
        // We need to match dimensions
        // Initial init with 0, will be updated in renderPDF
        await editorManager.init(800, 600, scale);
        
        if (registerManager) {
            registerManager(pageNumber, editorManager);
        }
    }
  });

  onDestroy(() => {
    if (editorManager) {
      editorManager.dispose();
    }
  });

  async function renderPDF() {
    if (renderTask) {
        renderTask.cancel();
        renderTask = null;
    }

    try {
      renderTask = pdfRenderer.renderPage(pageNumber, pdfCanvas, scale);
      await renderTask.promise;
      renderTask = null;
      
      // Update Fabric dimensions if it exists
      if (editorManager) {
         const width = pdfCanvas.width / (window.devicePixelRatio || 1);
         const height = pdfCanvas.height / (window.devicePixelRatio || 1);
         editorManager.updateDimensions(width, height, scale);
      }
    } catch (e: any) {
      if (e?.name !== 'RenderingCancelledException') {
        console.error(`Error rendering page ${pageNumber}:`, e);
      }
    }
  }

  function handleDragOver(e: DragEvent) {
    e.preventDefault();
    if (e.dataTransfer) {
      e.dataTransfer.dropEffect = 'copy';
    }
  }

  function handleDrop(e: DragEvent) {
    e.preventDefault();
    if (!editorManager || !e.dataTransfer) return;

    const type = e.dataTransfer.getData('application/makepdfform');
    if (!type) return;

    const rect = container.getBoundingClientRect();
    const x = (e.clientX - rect.left) / scale;
    const y = (e.clientY - rect.top) / scale;

    addField(type, x, y);
  }

  function handleCanvasClick(e: MouseEvent) {
      if (!editorManager || !selectedTool) return;
      
      const rect = container.getBoundingClientRect();
      const x = (e.clientX - rect.left) / scale;
      const y = (e.clientY - rect.top) / scale;
      
      addField(selectedTool, x, y);
  }

  function addField(type: string, x: number, y: number) {
      if (type === 'text') {
        editorManager.addTextField(x, y);
      } else {
         editorManager.addRect(x, y, 100, 30);
      }
  }

  $effect(() => {
    // Re-render when scale changes
    if (pdfCanvas && pdfRenderer && scale) {
        renderPDF();
    }
  });
</script>

<div 
  class="pdf-page-container" 
  bind:this={container}
  ondragover={handleDragOver}
  ondrop={handleDrop}
  onclick={handleCanvasClick}
  role="region"
  aria-label="PDF Page {pageNumber}"
>
  <canvas bind:this={pdfCanvas} class="pdf-canvas"></canvas>
  
  <CursorsLayer {cursors} {scale} />

  {#if brandingConfig.logoUrl}
    <div class="branding-logo" style="transform: scale({scale}); transform-origin: top right;">
        <img src={brandingConfig.logoUrl} alt="Logo" />
    </div>
  {/if}

  {#if interactive}
  <div class="fabric-container">
      <canvas bind:this={fabricCanvasEl} class="fabric-canvas"></canvas>
  </div>
  {/if}
</div>

<style>
  .pdf-page-container {
    position: relative;
    margin-bottom: 20px;
    box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
  }

  .pdf-canvas {
    display: block;
    max-width: 100%;
  }
  
  .fabric-container {
      position: absolute;
      top: 0;
      left: 0;
      z-index: 10;
  }

  .branding-logo {
      position: absolute;
      top: 20px;
      right: 20px;
      z-index: 20;
      width: 100px;
      pointer-events: none;
  }

  .branding-logo img {
      width: 100%;
      height: auto;
      object-fit: contain;
  }
</style>
