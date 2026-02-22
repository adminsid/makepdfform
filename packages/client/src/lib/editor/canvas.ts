import { Canvas, Rect, Textbox, Circle } from 'fabric';
import type { FormField } from '$lib/types';

export class EditorCanvasManager {
  private fabricCanvas: Canvas | null = null;
  private canvasElement: HTMLCanvasElement;
  private pdfWidth: number = 0;
  private pdfHeight: number = 0;
  private scale: number = 1;

  public onUpdate: (() => void) | null = null;
  public onSelectionChanged: ((props: any) => void) | null = null;

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
    
    this.fabricCanvas.on('selection:created', () => this._emitSelection());
    this.fabricCanvas.on('selection:updated', () => this._emitSelection());
    this.fabricCanvas.on('selection:cleared', () => {
        if (this.onSelectionChanged) this.onSelectionChanged(null);
    });

    console.log('Fabric canvas initialized', width, height);
  }

  private _emitSelection() {
      if (!this.fabricCanvas || !this.onSelectionChanged) return;
      
      const activeObjects = this.fabricCanvas.getActiveObjects();
      if (activeObjects.length === 1) {
          const obj = activeObjects[0];
          this.onSelectionChanged({
              type: obj.type,
              fontFamily: (obj as any).fontFamily,
              fontSize: (obj as any).fontSize,
              fill: obj.fill
          });
      } else {
          this.onSelectionChanged(null);
      }
  }

  updateDimensions(width: number, height: number, scale: number) {
    if (!this.fabricCanvas) return;
    
    this.scale = scale;
    this.fabricCanvas.setDimensions({ width, height });
    this.fabricCanvas.setZoom(scale); 
  }

  updateSelectedField(props: any) {
      if (!this.fabricCanvas) return;
      const activeObjects = this.fabricCanvas.getActiveObjects();
      if (activeObjects.length === 1) {
          const obj = activeObjects[0];
          if (props.fontFamily) obj.set('fontFamily', props.fontFamily);
          if (props.fontSize) obj.set('fontSize', props.fontSize);
          if (props.fill) obj.set('fill', props.fill);
          this.fabricCanvas.requestRenderAll();
          this.onUpdate?.(); // notify collab logic of changes
      }
  }

  addCheckbox(x: number, y: number, width: number = 20, height: number = 20) {
      if (!this.fabricCanvas) return;
      
      const rect = new Rect({
          left: x,
          top: y,
          width: width,
          height: height,
          fill: 'transparent',
          stroke: '#000',
          strokeWidth: 2,
          // Attach custom data so we know it's a checkbox
          customType: 'checkbox'
      } as any);
      
      this.fabricCanvas.add(rect);
  }

  addRadio(x: number, y: number, radius: number = 10) {
      if (!this.fabricCanvas) return;
      
      const circle = new Circle({
          left: x,
          top: y,
          radius: radius,
          fill: 'transparent',
          stroke: '#000',
          strokeWidth: 2,
          // Attach custom data
          customType: 'radio'
      } as any);
      
      this.fabricCanvas.add(circle);
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
      const { left, top, width, height, type, scaleX, scaleY, fill } = obj;
      
      const logicalX = (left || 0) / this.scale;
      const logicalY = (top || 0) / this.scale;
      const logicalWidth = (width || 0) * (scaleX || 1) / this.scale;
      const logicalHeight = (height || 0) * (scaleY || 1) / this.scale;

      const customType = (obj as any).customType;
      let fieldType: FormField['type'] = 'text';

      if (customType === 'checkbox') {
          fieldType = 'checkbox';
      } else if (customType === 'radio') {
          fieldType = 'radio';
      } else if (type === 'rect') {
          fieldType = 'checkbox'; // Fallback for old fields
      } else if (type === 'circle') {
          fieldType = 'radio';
      } else if (type === 'textbox' || type === 'i-text' || type === 'text') {
          fieldType = 'text';
      }
      
      let value = '';
      if (fieldType === 'text') {
          value = (obj as any).text || '';
      }

      const field: FormField = {
        id: `field_${pageNumber}_${index}`,
        type: fieldType,
        x: logicalX,
        y: logicalY,
        width: logicalWidth,
        height: logicalHeight,
        page: pageNumber,
        value: value,
        name: `Field ${index + 1}`
      };

      if (fieldType === 'text') {
          field.fontFamily = (obj as any).fontFamily;
          field.fontSize = (obj as any).fontSize;
          field.color = fill as string;
      }

      fields.push(field);
    });

    return fields;
  }

  setFields(fields: FormField[]) {
      if (!this.fabricCanvas) return;
      
      const savedOnUpdate = this.onUpdate;
      this.onUpdate = null;
      
      try {
          this.fabricCanvas.clear();
          
          fields.forEach(field => {
              const visualX = field.x * this.scale;
              const visualY = field.y * this.scale;
              
              if (field.type === 'text') {
                  this.addTextField(
                      visualX, 
                      visualY, 
                      field.value as string, 
                      field.width * this.scale,
                      field.fontFamily,
                      field.fontSize,
                      field.color
                  );
              } else if (field.type === 'checkbox') {
                  this.addCheckbox(visualX, visualY, field.width * this.scale, field.height * this.scale);
              } else if (field.type === 'radio') {
                  this.addRadio(visualX, visualY, (field.width * this.scale) / 2);
              }
          });
      } finally {
          this.onUpdate = savedOnUpdate;
      }
  }

  addTextField(x: number, y: number, textValue = 'Text Field', width = 150, fontFamily = 'Helvetica', fontSize = 16, fill = '#000000') {
    if (!this.fabricCanvas) return;

    const text = new Textbox(textValue, {
      left: x,
      top: y,
      width: width,
      fontFamily: fontFamily,
      fontSize: fontSize,
      fill: fill
    });

    this.fabricCanvas.add(text);
  }
}
