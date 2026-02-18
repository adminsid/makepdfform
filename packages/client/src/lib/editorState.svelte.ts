import { PDFDocument, StandardFonts, rgb } from 'pdf-lib';

export function createEditorState() {
  let content = $state('');
  let history = $state<string[]>([]);
  let historyIndex = $state(-1);
  let selection = $state({ start: 0, end: 0 });
  let isMarkdownOpen = $state(false); 
  let formValues = $state<Record<string, string>>({});

  // Initialize with empty content
  content = '';
  history = [''];
  historyIndex = 0;

  function addToHistory(newContent: string) {
    if (newContent === history[historyIndex]) return;
    const newHistory = history.slice(0, historyIndex + 1);
    newHistory.push(newContent);
    history = newHistory;
    historyIndex = newHistory.length - 1;
  }

  return {
    get content() { return content; },
    get history() { return history; },
    get canUndo() { return historyIndex > 0; },
    get canRedo() { return historyIndex < history.length - 1; },
    get isMarkdownOpen() { return isMarkdownOpen; },
    
    toggleMarkdown() {
      isMarkdownOpen = !isMarkdownOpen;
    },

    updateContent(newContent: string) {
      content = newContent;
    },
    
    loadTemplate(templateContent: string) {
        content = templateContent;
        history = [templateContent];
        historyIndex = 0;
        formValues = {};
    },

    clear() {
        content = '';
        history = [''];
        historyIndex = 0;
        formValues = {};
    },

    get formValues() { return formValues; },
    setFormValue(key: string, value: string) {
        formValues[key] = value;
    },

    saveSnapshot() {
      addToHistory(content);
    },

    undo() {
      if (this.canUndo) {
        historyIndex--;
        content = history[historyIndex];
      }
    },

    redo() {
      if (this.canRedo) {
        historyIndex++;
        content = history[historyIndex];
      }
    },

    insertComponent(componentType: string) {
      let snippet = '';
      switch (componentType) {
        case 'section': snippet = '\n<section title="Section Title">\n  Content...\n</section>\n'; break;
        case 'grid-row': snippet = '\n<div class="grid grid-cols-12 gap-0 border border-black">\n  <!-- Fields go here -->\n</div>\n'; break;
        case 'text-input': snippet = '<field type="text" label="LABEL" cols="12" />'; break;
        case 'textarea': snippet = '<textarea label="LABEL" rows="4" cols="12" />'; break;
        case 'checkbox': snippet = '<checkboxes label="Options" options="A,B,C" cols="12" />'; break;
        case 'radio': snippet = '<radio-group label="Choose One" options="A,B,C" cols="12" />'; break;
        case 'signature': snippet = '<signature label="Signature" cols="12" />'; break;
        case 'divider': snippet = '<divider />'; break;
        case 'table': snippet = '\n| Header 1 | Header 2 |\n| -------- | -------- |\n| Cell 1   | Cell 2   |\n'; break;
        default: snippet = `\n<field type="${componentType}" label="LABEL" cols="12" />\n`;
      }
      
      const padding = content.length > 0 && !content.endsWith('\n') ? '\n' : '';
      const newContent = content + padding + snippet;
      this.updateContent(newContent);
    },

    async generatePDF() {
      const pdfDoc = await PDFDocument.create();
      const page = pdfDoc.addPage();
      const { width, height } = page.getSize();
      const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
      const boldFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
      const form = pdfDoc.getForm();

      const lines = content.split('\n');
      let y = height - 50;
      const margin = 50;
      const contentWidth = width - (margin * 2);
      
      // Simple parse state
      let inGrid = false;
      let gridCols = 1;
      let gridYStart = 0;
      let gridRowHeight = 0;
      let currentRowY = 0; // Tracks Y for current row in grid
      let colIndex = 0;

      // Helper to parse attributes
      const parseAttrs = (tag: string) => {
        const typeMatch = tag.match(/type="([^"]*)"/);
        const labelMatch = tag.match(/label="([^"]*)"/);
        const colsMatch = tag.match(/cols="([^"]*)"/);
        const optionsMatch = tag.match(/options="([^"]*)"/);
        const rowsMatch = tag.match(/rows="([^"]*)"/);
        return {
          type: typeMatch ? typeMatch[1] : 'text',
          label: labelMatch ? labelMatch[1] : '',
          cols: colsMatch ? parseInt(colsMatch[1], 10) : 12,
          options: optionsMatch ? optionsMatch[1].split(',') : [],
          rows: rowsMatch ? parseInt(rowsMatch[1], 10) : 1
        };
      };

      for (let i = 0; i < lines.length; i++) {
        const line = lines[i].trim();
        
        // Page break check (simplified)
        if (y < 50) {
           pdfDoc.addPage();
           y = height - 50;
        }

        if (line.startsWith('# ')) {
          const text = line.replace('# ', '');
          page.drawText(text, { x: margin, y, size: 18, font: boldFont });
          y -= 30;
        } else if (line.startsWith('## ')) {
          const text = line.replace('## ', '');
          page.drawText(text, { x: margin, y, size: 14, font: boldFont });
          y -= 25;
        } else if (line.startsWith('**INSTRUCTIONS:**')) {
          page.drawText(line.replace(/\*\*/g, ''), { x: margin, y, size: 10, font, lineHeight: 14, maxWidth: contentWidth });
          y -= 40; // rough visual estimate
        } else if (line.startsWith('*')) {
          page.drawText(line.replace(/\*/g, ''), { x: margin, y, size: 10, font: font, opacity: 0.7 });
          y -= 20;
        } else if (line.includes('<div class="grid')) {
          inGrid = true;
          gridCols = 12; // Assuming 12 col grid based on content
          gridYStart = y;
          currentRowY = y;
          colIndex = 0;
          // Don't decrement Y yet, fields will consume it
        } else if (line.includes('</div>') && inGrid) {
          inGrid = false;
          // Draw grid border if needed, or just let fields handling it
          // Move Y down by the total height of the grid block
          // For now, let's say we moved down; current implementation moves Y per row
        } else if (inGrid && (line.includes('<field') || line.includes('<textarea') || line.includes('<checkboxes') || line.includes('<radio-group') || line.includes('<signature'))) {
           // Parse Field
           const attrs = parseAttrs(line);
           const colSpan = attrs.cols;
           const colWidth = contentWidth / 12;
           const fieldWidth = colWidth * colSpan;
           const fieldHeight = attrs.rows > 1 ? attrs.rows * 20 : 40; // Base height
           
           // Check if we fit in current row
           if (colIndex + colSpan > 12) {
             colIndex = 0;
             y -= 40; // Standard row height drop
             currentRowY = y;
           }

           const x = margin + (colIndex * colWidth);
           
           // Draw Box
           page.drawRectangle({
             x,
             y: currentRowY - fieldHeight,
             width: fieldWidth,
             height: fieldHeight,
             borderColor: rgb(0, 0, 0),
             borderWidth: 1,
           });

           // Draw Label
           page.drawText(attrs.label, {
             x: x + 4,
             y: currentRowY - 10,
             size: 8,
             font: boldFont
           });

           // Add AcroForm Field
           const fieldName = attrs.label; // Use label as key for matching
           const fieldValue = formValues[fieldName] || '';

           if (line.includes('<textarea')) {
              const textField = form.createTextField(fieldName);
              textField.setText(fieldValue);
              textField.addToPage(page, { x: x+4, y: currentRowY - fieldHeight + 4, width: fieldWidth - 8, height: fieldHeight - 16 });
              textField.enableMultiline();
           } else if (attrs.type === 'checkbox' || line.includes('<checkboxes')) {
               const checkBox = form.createCheckBox(fieldName);
               if (fieldValue === 'true') checkBox.check();
               checkBox.addToPage(page, { x: x + 10, y: currentRowY - 30, width: 20, height: 20 });
           } else if (line.includes('<signature')) {
               page.drawLine({
                   start: { x: x + 10, y: currentRowY - 30 },
                   end: { x: x + fieldWidth - 10, y: currentRowY - 30 },
                   thickness: 1
               });
               page.drawText('X', { x: x + 5, y: currentRowY - 30, size: 12, font });
           } else {
               const textField = form.createTextField(fieldName);
               textField.setText(fieldValue);
               textField.addToPage(page, { x: x + 4, y: currentRowY - 35, width: fieldWidth - 8, height: 20 });
               textField.setBorderWidth(0);
           }

           colIndex += colSpan;
           
           // If signature or multiline, might need to push Y down more if it's the tallest in row
           // Simplified: assume standard flow for prototype
        } else if (line.includes('<signature') && !inGrid) {
             // Standalone signature
             y -= 60;
             page.drawText('Signature', { x: margin, y: y + 40, size: 10, font: boldFont });
             page.drawLine({ start: { x: margin, y: y + 10 }, end: { x: width - margin, y: y + 10 }, thickness: 1 });
             y -= 20;
        }
      }

      const pdfBytes = await pdfDoc.save();
      const blob = new Blob([pdfBytes], { type: 'application/pdf' });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = 'form.pdf';
      link.click();
    },

    async importPDF(file: File) {
      const arrayBuffer = await file.arrayBuffer();
      const pdfDoc = await PDFDocument.load(arrayBuffer);
      const form = pdfDoc.getForm();
      const fields = form.getFields();
      
      let importedDSL = `# Imported Form\n\n<div class="grid grid-cols-12 gap-0 border border-black">\n`;
      
      fields.forEach(field => {
        const name = field.getName();
        // Since we can't easily extract layout coordinates back to grid without complex logic,
        // we will dump them as a sequential list of fields for the user to arrange.
        // But we try to guess based on name (if we generated it).
        // For standard "Import", we just list them.
        const type = field.constructor.name === 'PDFTextField' ? 'text' : 'checkbox';
        importedDSL += `  <field type="${type}" label="${name.split('_')[0]}" cols="12" />\n`;
      });
      
      importedDSL += `</div>\n`;
      
      this.updateContent(importedDSL);
    }
  };
}

export const editorState = createEditorState();
