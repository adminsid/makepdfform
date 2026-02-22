import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import type { FormField } from '$lib/types';

function hexToRgb(hex: string) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16) / 255,
    g: parseInt(result[2], 16) / 255,
    b: parseInt(result[3], 16) / 255
  } : { r: 0, g: 0, b: 0 };
}

export class PDFGenerator {
  
  async embedFields(originalPdfBytes: Uint8Array, fields: FormField[]): Promise<Uint8Array> {
    const pdfDoc = await PDFDocument.load(originalPdfBytes);
    const form = pdfDoc.getForm();

    for (const field of fields) {
      const page = pdfDoc.getPage(field.page - 1);
      const { height } = page.getSize();
      
      const pdfX = field.x;
      const pdfY = height - field.y - field.height;

      const name = field.name || field.id;

      try {
        if (field.type === 'text') {
           const textField = form.createTextField(name);
           textField.setText(typeof field.value === 'string' ? field.value : '');
           
           let fontColor = rgb(0, 0, 0);
           if (field.color && field.color.startsWith('#')) {
               const parsed = hexToRgb(field.color);
               fontColor = rgb(parsed.r, parsed.g, parsed.b);
           }
           
           let font = await pdfDoc.embedFont(StandardFonts.Helvetica);
           if (field.fontFamily === 'Times New Roman') font = await pdfDoc.embedFont(StandardFonts.TimesRoman);
           else if (field.fontFamily === 'Courier') font = await pdfDoc.embedFont(StandardFonts.Courier);

           textField.addToPage(page, {
               x: pdfX,
               y: pdfY,
               width: field.width,
               height: field.height,
               textColor: fontColor,
               font: font,
               borderWidth: 0,
           });
           
           if (field.fontSize) {
               textField.setFontSize(field.fontSize);
           }
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
        } else if (field.type === 'radio') {
            const radioGroup = form.createRadioGroup(name);
            radioGroup.addOptionToPage('Option1', page, {
                x: pdfX,
                y: pdfY,
                width: field.width,
                height: field.height,
            });
            if (field.value === true) {
                radioGroup.select('Option1');
            }
        }
      } catch (e) {
          console.error(`Failed to add field ${field.id}:`, e);
      }
    }

    return await pdfDoc.save();
  }
}
