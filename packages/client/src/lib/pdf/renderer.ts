import * as pdfjsLib from 'pdfjs-dist';

// Set the worker source
pdfjsLib.GlobalWorkerOptions.workerSrc = '/pdf.worker.min.mjs';

export class PDFRenderer {
  private pdf: pdfjsLib.PDFDocumentProxy | null = null;

  async loadDocument(url: string | Uint8Array): Promise<void> {
    const loadingTask = pdfjsLib.getDocument(url);
    this.pdf = await loadingTask.promise;
    console.log(`PDF loaded. Pages: ${this.pdf.numPages}`);
  }

  renderPage(pageNumber: number, canvas: HTMLCanvasElement, scale: number = 1.5): any {
    if (!this.pdf) {
      throw new Error('PDF not loaded');
    }

    // We can't await here directly if we want to return the task synchronously
    // But we need the page first... 
    // Creating a custom object that mimics the RenderTask structure
    
    let renderTask: any = {
        promise: Promise.resolve(),
        cancel: () => {}
    };

    const taskPromise = (async () => {
        if (!this.pdf) return;
        const page = await this.pdf.getPage(pageNumber);
        const viewport = page.getViewport({ scale });
    
        // Support high DPI screens
        const outputScale = window.devicePixelRatio || 1;
    
        canvas.width = Math.floor(viewport.width * outputScale);
        canvas.height = Math.floor(viewport.height * outputScale);
        canvas.style.width = Math.floor(viewport.width) + "px";
        canvas.style.height = Math.floor(viewport.height) + "px";
    
        const transform = outputScale !== 1
          ? [outputScale, 0, 0, outputScale, 0, 0]
          : null;
    
        const renderContext = {
          canvasContext: canvas.getContext('2d')!,
          transform: transform,
          viewport: viewport,
        };
        
        const internalRenderTask = page.render(renderContext as any);
        renderTask.cancel = () => internalRenderTask.cancel();
        await internalRenderTask.promise;
    })();

    renderTask.promise = taskPromise;
    return renderTask;
  }

  getNumPages(): number {
    return this.pdf ? this.pdf.numPages : 0;
  }

  async getPageDimensions(pageNumber: number, scale: number = 1.0) {
      if (!this.pdf) throw new Error('PDF not loaded');
      const page = await this.pdf.getPage(pageNumber);
      const viewport = page.getViewport({ scale });
      return { width: viewport.width, height: viewport.height };
  }
}
