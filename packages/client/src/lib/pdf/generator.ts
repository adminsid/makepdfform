import { PDFDocument, rgb } from 'pdf-lib';
import type { FormField } from '$lib/types';

export class PDFGenerator {
  
  async embedFields(originalPdfBytes: Uint8Array, fields: FormField[]): Promise<Uint8Array> {
    const pdfDoc = await PDFDocument.load(originalPdfBytes);
    const form = pdfDoc.getForm();

    for (const field of fields) {
      const page = pdfDoc.getPage(field.page - 1);
      const { height } = page.getSize();
      
      // Convert web coordinates (top-left origin) to PDF coordinates (bottom-left origin)
      // Note: We need to handle scaling if the web coordinates are scaled. 
      // Assuming fields passed here are in PDF "point" units (unscaled).
      const pdfX = field.x;
      const pdfY = height - field.y - field.height;

      const name = field.name || field.id; // Fallback to ID if name not set

      try {
        if (field.type === 'text') {
           const textField = form.createTextField(name);
           textField.setText(typeof field.value === 'string' ? field.value : '');
           textField.addToPage(page, {
               x: pdfX,
               y: pdfY,
               width: field.width,
               height: field.height,
           });
        } else if (field.type === 'checkbox') {
            const checkbox = form.createCheckBox(name);
            if (field.value === true) {
                checkbox.check();
            }
            checkbox.addToPage(page, {
                x: pdfX,
                y: pdfY,
                width: field.width,
                height: field.height,
            });
        }
        // Handle other types as needed
      } catch (e) {
          console.error(`Failed to add field ${field.id}:`, e);
      }
    }

    return await pdfDoc.save();
  }
}
