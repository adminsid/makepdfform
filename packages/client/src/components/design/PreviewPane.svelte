<script lang="ts">
  import { editorState } from '../../lib/editorState.svelte';
  import { marked } from 'marked';
  import { onMount } from 'svelte';

  onMount(() => {
    (window as any).updateFormValue = (key: string, value: string) => {
        editorState.setFormValue(key, value);
    };
  });

  // Parse markdown content
  let parsedContent = $derived.by(() => {
    // 1. Convert markdown to HTML
    let html = marked(editorState.content, { async: false, breaks: true }) as string;
    
    // 2. Parse Layout Tags
    html = html.replace(/<div class="grid([^"]*)">/g, '<div class="grid-form">');
    html = html.replace(/<section title="([^"]*)">/g, (match, title) => `
      <div class="section-block">
        <h2 class="section-title">${title}</h2>
        <div class="section-content">
    `);
    html = html.replace(/<\/section>/g, '</div></div>');
    html = html.replace(/<divider \/>/g, '<div class="divider-line"></div>');

    // 3. Parse Form Component Tags
    const parseAttrs = (tag: string) => {
        const typeMatch = tag.match(/type="([^"]*)"/);
        const labelMatch = tag.match(/label="([^"]*)"/);
        const colsMatch = tag.match(/cols="([^"]*)"/);
        const optionsMatch = tag.match(/options="([^"]*)"/);
        const rowsMatch = tag.match(/rows="([^"]*)"/);
        
        return {
            type: typeMatch ? typeMatch[1] : 'text',
            label: labelMatch ? labelMatch[1] : '',
            cols: colsMatch ? colsMatch[1] : '12',
            options: optionsMatch ? optionsMatch[1].split(',') : [],
            rows: rowsMatch ? rowsMatch[1] : '3'
        };
    };

    // Generic Field Replacer
    html = html.replace(/<field ([^>]*)\/>/g, (match, attrs) => {
        const { type, label, cols, options } = parseAttrs(match);
        const colClass = `col-${cols}`;
        
        let inputHtml = '';
        switch(type) {
            case 'text': 
                inputHtml = `<input type="text" onchange="window.updateFormValue('${label}', this.value)" />`; 
                break;
            case 'number': 
                inputHtml = `<input type="number" onchange="window.updateFormValue('${label}', this.value)" />`; 
                break;
            case 'date': 
                inputHtml = `<input type="date" onchange="window.updateFormValue('${label}', this.value)" />`; 
                break;
            case 'select': 
                 const opts = options.map(o => `<option>${o.trim()}</option>`).join('');
                 inputHtml = `<select onchange="window.updateFormValue('${label}', this.value)">${opts}</select>`; 
                 break;
            default: 
                inputHtml = `<input type="text" onchange="window.updateFormValue('${label}', this.value)" />`;
        }

        return `<div class="cell ${colClass}"><label>${label}</label>${inputHtml}</div>`;
    });

    // Textarea
    html = html.replace(/<textarea ([^>]*)\/>/g, (match, attrs) => {
        const { label, cols, rows } = parseAttrs(match);
        return `<div class="cell col-${cols}" style="grid-row: span ${rows}">
                  <label>${label}</label>
                  <textarea rows="${rows}" onchange="window.updateFormValue('${label}', this.value)"></textarea>
                </div>`;
    });

    // Checkboxes
    html = html.replace(/<checkboxes ([^>]*)\/>/g, (match, attrs) => {
        const { label, cols, options } = parseAttrs(match);
        const checks = options.map(o => `
            <div class="check-item">
                <div class="box"></div>
                <span>${o.trim()}</span>
            </div>
        `).join('');
        return `<div class="cell col-${cols}"><label>${label}</label><div class="check-group">${checks}</div></div>`;
    });

    // Radio Group
    html = html.replace(/<radio-group ([^>]*)\/>/g, (match, attrs) => {
        const { label, cols, options } = parseAttrs(match);
        const radios = options.map(o => `
            <div class="check-item">
                <div class="circle"></div>
                <span>${o.trim()}</span>
            </div>
        `).join('');
        return `<div class="cell col-${cols}"><label>${label}</label><div class="check-group">${radios}</div></div>`;
    });

    // Signature
    html = html.replace(/<signature ([^>]*)\/>/g, (match, attrs) => {
        const { label, cols } = parseAttrs(match);
        return `<div class="cell col-${cols} signature-cell">
                  <label>${label}</label>
                  <div class="signature-line">X __________________________</div>
                </div>`;
    });

    return html;
  });
</script>

<div 
  class="preview-pane"
  role="region"
  ondrop={(e) => {
     e.preventDefault();
     const type = e.dataTransfer?.getData('componentType');
     if (type) editorState.insertComponent(type);
  }}
  ondragover={(e) => e.preventDefault()}
>
  <div class="preview-header">
    <span class="preview-title">Preview (A4)</span>
    <div class="actions">
       <!-- Actions -->
    </div>
  </div>

  <div class="preview-scroll">
    <div class="page-container">
      <div class="page">
        {@html parsedContent}
      </div>
    </div>
  </div>
</div>

<style>
  /* ... Existing Layout Styles ... */
  .preview-pane { flex: 1; background-color: #F3F4F6; display: flex; flex-direction: column; overflow: hidden; role: region; }
  :global(.dark) .preview-pane { background-color: #0a0a0a; }
  .preview-header { padding: 8px 16px; background-color: rgba(243,244,246,0.9); border-bottom: 1px solid #E5E7EB; display: flex; justify-content: space-between; }
  :global(.dark) .preview-header { background-color: rgba(10,10,10,0.9); border-bottom-color: #1F2937; }
  .preview-scroll { flex: 1; overflow-y: auto; display: flex; justify-content: center; padding: 32px; }
  .page { width: 210mm; min-height: 297mm; background: #fff; padding: 15mm; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1); color: #000; }
  
  /* Grid & DSL Styles */
  :global(.grid-form) { display: grid; grid-template-columns: repeat(12, 1fr); border: 1px solid #000; margin-bottom: 1em; }
  :global(.cell) { border-right: 1px solid #000; border-bottom: 1px solid #000; padding: 4px; display: flex; flex-direction: column; min-height: 48px; }
  :global(.cell label) { font-size: 9px; font-weight: 700; text-transform: uppercase; margin-bottom: 4px; color: #000; }
  :global(.cell input), :global(.cell textarea), :global(.cell select) { border: none; background: transparent; outline: none; width: 100%; font-family: inherit; font-size: 12px; }
  :global(.cell textarea) { resize: none; }
  
  :global(.col-12) { grid-column: span 12; }
  :global(.col-6) { grid-column: span 6; }
  :global(.col-4) { grid-column: span 4; }
  :global(.col-3) { grid-column: span 3; }
  :global(.col-2) { grid-column: span 2; }
  :global(.col-1) { grid-column: span 1; }
  :global(.col-8) { grid-column: span 8; }

  /* Checkboxes / Radios */
  :global(.check-group) { display: flex; flex-direction: column; gap: 4px; }
  :global(.check-item) { display: flex; align-items: center; gap: 6px; font-size: 11px; }
  :global(.box) { width: 12px; height: 12px; border: 1px solid #000; }
  :global(.circle) { width: 12px; height: 12px; border: 1px solid #000; border-radius: 50%; }

  /* Signature */
  :global(.signature-cell) { height: 80px; justify-content: space-between; }
  :global(.signature-line) { font-size: 12px; color: #555; align-self: flex-start; margin-top: auto; }

  /* Sections */
  :global(.section-title) { font-size: 14px; font-weight: bold; text-transform: uppercase; border-bottom: 2px solid #000; margin: 16px 0 8px 0; padding-bottom: 4px; }
  :global(.divider-line) { height: 1px; background: #000; margin: 16px 0; }
</style>
