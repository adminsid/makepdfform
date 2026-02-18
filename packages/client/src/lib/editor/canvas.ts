import { Canvas, Rect, IText } from 'fabric';
import type { FormField } from '$lib/types';

export class EditorCanvasManager {
  private fabricCanvas: Canvas | null = null;
  private canvasElement: HTMLCanvasElement;
  private pdfWidth: number = 0;
  private pdfHeight: number = 0;
  private scale: number = 1;

  public onUpdate: (() => void) | null = null;

  constructor(canvasElement: HTMLCanvasElement) {
    this.canvasElement = canvasElement;
  }

  async init(width: number, height: number, scale: number) {
    this.pdfWidth = width;
    this.pdfHeight = height;
    this.scale = scale;

    if (this.fabricCanvas) {
      this.fabricCanvas.dispose();
    }

    this.fabricCanvas = new Canvas(this.canvasElement, {
      width: width,
      height: height,
      selection: true
    });

    this.fabricCanvas.on('object:modified', () => this.onUpdate?.());
    this.fabricCanvas.on('object:added', () => this.onUpdate?.());
    this.fabricCanvas.on('object:removed', () => this.onUpdate?.());

    console.log('Fabric canvas initialized', width, height);
  }

  updateDimensions(width: number, height: number, scale: number) {
    if (!this.fabricCanvas) return;
    
    this.scale = scale;
    this.fabricCanvas.setDimensions({ width, height });
    this.fabricCanvas.setZoom(scale); // Adjust if needed depending on how PDF renders
  }



  addRect(x: number, y: number, width: number, height: number) {
      if (!this.fabricCanvas) return;
      
      const rect = new Rect({
          left: x,
          top: y,
          width: width,
          height: height,
          fill: 'rgba(0,0,255,0.1)',
          stroke: 'blue',
          strokeWidth: 1
      });
      
      this.fabricCanvas.add(rect);
  }
  
  dispose() {
      if (this.fabricCanvas) {
          this.fabricCanvas.dispose();
      }
  }

  getFields(pageNumber: number): FormField[] {
    if (!this.fabricCanvas) return [];

    const objects = this.fabricCanvas.getObjects();
    const fields: FormField[] = [];

    objects.forEach((obj, index) => {
      // Skip utility objects if any
      const { left, top, width, height, type, scaleX, scaleY } = obj;
      
      // Fabric coords are visual (scaled by canvas zoom/scale)
      // We need to export logical PDF coordinates (points)
      // The canvas was initialized with width/height matching the PDF * scale
      // So to get back to PDF points, we divide by this.scale
      
      const logicalX = (left || 0) / this.scale;
      const logicalY = (top || 0) / this.scale;
      const logicalWidth = (width || 0) * (scaleX || 1) / this.scale;
      const logicalHeight = (height || 0) * (scaleY || 1) / this.scale;

      // Determine type based on object type
      let fieldType: FormField['type'] = 'text'; // default
      if (type === 'rect') {
          fieldType = 'checkbox';
      } else if (type === 'i-text' || type === 'text') {
          fieldType = 'text';
      }
      
      let value = '';
      if (type === 'i-text' || type === 'text') {
          value = (obj as any).text || '';
      }

      fields.push({
        id: `field_${pageNumber}_${index}`,
        type: fieldType,
        x: logicalX,
        y: logicalY,
        width: logicalWidth,
        height: logicalHeight,
        page: pageNumber,
        value: value,
        name: `Field ${index + 1}`
      });
    });

    return fields;
  }

  setFields(fields: FormField[]) {
      if (!this.fabricCanvas) return;
      
      // Prevent onUpdate from being called while we are setting fields programmatically
      const savedOnUpdate = this.onUpdate;
      this.onUpdate = null;
      
      try {
          this.fabricCanvas.clear();
          
          fields.forEach(field => {
              const visualX = field.x * this.scale;
              const visualY = field.y * this.scale;
              
              if (field.type === 'text') {
                  this.addTextField(visualX, visualY, field.value as string);
              } else {
                  this.addRect(visualX, visualY, field.width * this.scale, field.height * this.scale);
              }
          });
      } finally {
          this.onUpdate = savedOnUpdate;
          // Optionally call once at the end if we want to sync the "cleared and re-added" state
          // but usually setFields is called because of a sync, so we don't want to sync back.
      }
  }

  // Overload addTextField to accept value
  addTextField(x: number, y: number, textValue = 'Text Field') {
    if (!this.fabricCanvas) return;

    const text = new IText(textValue, {
      left: x,
      top: y,
      fontFamily: 'Helvetica',
      fontSize: 16,
      fill: '#000'
    });

    this.fabricCanvas.add(text);
    // Only set active if user initiated? 
    // If coming from remote, maybe don't set active.
    // For now, this method is used by both dragging (active) and setFields (should probably not be active).
    // Let's rely on caller to set active if needed, or just default behavior.
  }
}
