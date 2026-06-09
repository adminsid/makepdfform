<script lang="ts">
  import { Editor } from '@tiptap/core';
  import { 
    Bold, Italic, Strikethrough, Heading1, Heading2, 
    List, ListOrdered, Quote, Undo, Redo,
    AlignLeft, AlignCenter, AlignRight, AlignJustify,
    Table as TableIcon, Trash2, PlusCircle, Square, PenTool
  } from 'lucide-svelte';

  let { editor }: { editor: Editor } = $props();

  function toggleFormat(format: string, level?: number) {
    if (format === 'bold') editor.chain().focus().toggleBold().run();
    if (format === 'italic') editor.chain().focus().toggleItalic().run();
    if (format === 'strike') editor.chain().focus().toggleStrike().run();
    if (format === 'heading' && level) editor.chain().focus().toggleHeading({ level: level as any }).run();
    if (format === 'bulletList') editor.chain().focus().toggleBulletList().run();
    if (format === 'orderedList') editor.chain().focus().toggleOrderedList().run();
    if (format === 'blockquote') editor.chain().focus().toggleBlockquote().run();
    if (format === 'undo') editor.chain().focus().undo().run();
    if (format === 'redo') editor.chain().focus().redo().run();
    
    // Alignments
    if (format === 'alignLeft') editor.chain().focus().setTextAlign('left').run();
    if (format === 'alignCenter') editor.chain().focus().setTextAlign('center').run();
    if (format === 'alignRight') editor.chain().focus().setTextAlign('right').run();
    if (format === 'alignJustify') editor.chain().focus().setTextAlign('justify').run();
    
    // Tables
    if (format === 'insertTable') editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run();
    if (format === 'deleteTable') editor.chain().focus().deleteTable().run();
    if (format === 'addRow') editor.chain().focus().addRowAfter().run();
    if (format === 'addColumn') editor.chain().focus().addColumnAfter().run();
    
    // Custom Nodes
    if (format === 'signature') editor.chain().focus().insertContent({ type: 'signaturePlaceholder', attrs: { label: 'Sign Here' } }).run();
    if (format === 'textBox') editor.chain().focus().insertContent({ type: 'textBox', content: [{ type: 'paragraph' }] }).run();
  }

  const isActive = (name: string, options?: any) => editor.isActive(name, options);
  
  let isBold = $derived(isActive('bold'));
  let isItalic = $derived(isActive('italic'));
  let isStrike = $derived(isActive('strike'));
  let isH1 = $derived(isActive('heading', { level: 1 }));
  let isH2 = $derived(isActive('heading', { level: 2 }));
  let isBullet = $derived(isActive('bulletList'));
  let isOrdered = $derived(isActive('orderedList'));
  let isQuote = $derived(isActive('blockquote'));
  let isAlignLeft = $derived(isActive({ textAlign: 'left' }));
  let isAlignCenter = $derived(isActive({ textAlign: 'center' }));
  let isAlignRight = $derived(isActive({ textAlign: 'right' }));
  let isAlignJustify = $derived(isActive({ textAlign: 'justify' }));
  let isTable = $derived(isActive('table'));
  
  let canUndo = $derived(editor.can().undo());
  let canRedo = $derived(editor.can().redo());
</script>

<div class="flex flex-wrap items-center gap-1 p-2">
  <div class="flex items-center space-x-1 border-r border-neutral-200 pr-2 mr-1">
    <button
      onclick={() => toggleFormat('undo')}
      disabled={!canUndo}
      class="p-1.5 rounded-md hover:bg-neutral-100 text-neutral-600 disabled:opacity-50 disabled:hover:bg-transparent transition-colors"
      title="Undo"
    >
      <Undo size={18} />
    </button>
    <button
      onclick={() => toggleFormat('redo')}
      disabled={!canRedo}
      class="p-1.5 rounded-md hover:bg-neutral-100 text-neutral-600 disabled:opacity-50 disabled:hover:bg-transparent transition-colors"
      title="Redo"
    >
      <Redo size={18} />
    </button>
  </div>

  <div class="flex items-center space-x-1 border-r border-neutral-200 pr-2 mr-1">
    <button
      onclick={() => toggleFormat('heading', 1)}
      class="p-1.5 rounded-md text-neutral-600 transition-colors {isH1 ? 'bg-neutral-200 text-neutral-900' : 'hover:bg-neutral-100'}"
      title="Heading 1"
    >
      <Heading1 size={18} />
    </button>
    <button
      onclick={() => toggleFormat('heading', 2)}
      class="p-1.5 rounded-md text-neutral-600 transition-colors {isH2 ? 'bg-neutral-200 text-neutral-900' : 'hover:bg-neutral-100'}"
      title="Heading 2"
    >
      <Heading2 size={18} />
    </button>
  </div>

  <div class="flex items-center space-x-1 border-r border-neutral-200 pr-2 mr-1">
    <button
      onclick={() => toggleFormat('bold')}
      class="p-1.5 rounded-md text-neutral-600 transition-colors {isBold ? 'bg-neutral-200 text-neutral-900' : 'hover:bg-neutral-100'}"
      title="Bold"
    >
      <Bold size={18} />
    </button>
    <button
      onclick={() => toggleFormat('italic')}
      class="p-1.5 rounded-md text-neutral-600 transition-colors {isItalic ? 'bg-neutral-200 text-neutral-900' : 'hover:bg-neutral-100'}"
      title="Italic"
    >
      <Italic size={18} />
    </button>
    <button
      onclick={() => toggleFormat('strike')}
      class="p-1.5 rounded-md text-neutral-600 transition-colors {isStrike ? 'bg-neutral-200 text-neutral-900' : 'hover:bg-neutral-100'}"
      title="Strikethrough"
    >
      <Strikethrough size={18} />
    </button>
  </div>
  
  <div class="flex items-center space-x-1 border-r border-neutral-200 pr-2 mr-1">
    <button
      onclick={() => toggleFormat('alignLeft')}
      class="p-1.5 rounded-md text-neutral-600 transition-colors {isAlignLeft ? 'bg-neutral-200 text-neutral-900' : 'hover:bg-neutral-100'}"
      title="Align Left"
    >
      <AlignLeft size={18} />
    </button>
    <button
      onclick={() => toggleFormat('alignCenter')}
      class="p-1.5 rounded-md text-neutral-600 transition-colors {isAlignCenter ? 'bg-neutral-200 text-neutral-900' : 'hover:bg-neutral-100'}"
      title="Align Center"
    >
      <AlignCenter size={18} />
    </button>
    <button
      onclick={() => toggleFormat('alignRight')}
      class="p-1.5 rounded-md text-neutral-600 transition-colors {isAlignRight ? 'bg-neutral-200 text-neutral-900' : 'hover:bg-neutral-100'}"
      title="Align Right"
    >
      <AlignRight size={18} />
    </button>
    <button
      onclick={() => toggleFormat('alignJustify')}
      class="p-1.5 rounded-md text-neutral-600 transition-colors {isAlignJustify ? 'bg-neutral-200 text-neutral-900' : 'hover:bg-neutral-100'}"
      title="Justify"
    >
      <AlignJustify size={18} />
    </button>
  </div>

  <div class="flex items-center space-x-1 border-r border-neutral-200 pr-2 mr-1">
    <button
      onclick={() => toggleFormat('bulletList')}
      class="p-1.5 rounded-md text-neutral-600 transition-colors {isBullet ? 'bg-neutral-200 text-neutral-900' : 'hover:bg-neutral-100'}"
      title="Bullet List"
    >
      <List size={18} />
    </button>
    <button
      onclick={() => toggleFormat('orderedList')}
      class="p-1.5 rounded-md text-neutral-600 transition-colors {isOrdered ? 'bg-neutral-200 text-neutral-900' : 'hover:bg-neutral-100'}"
      title="Ordered List"
    >
      <ListOrdered size={18} />
    </button>
    <button
      onclick={() => toggleFormat('blockquote')}
      class="p-1.5 rounded-md text-neutral-600 transition-colors {isQuote ? 'bg-neutral-200 text-neutral-900' : 'hover:bg-neutral-100'}"
      title="Blockquote"
    >
      <Quote size={18} />
    </button>
  </div>
  
  <div class="flex items-center space-x-1 border-r border-neutral-200 pr-2 mr-1">
    <button
      onclick={() => toggleFormat('insertTable')}
      class="p-1.5 rounded-md text-neutral-600 transition-colors hover:bg-neutral-100"
      title="Insert Table"
    >
      <TableIcon size={18} />
    </button>
    
    {#if isTable}
      <button
        onclick={() => toggleFormat('addRow')}
        class="p-1.5 rounded-md text-neutral-600 transition-colors hover:bg-neutral-100"
        title="Add Row"
      >
        <PlusCircle size={18} /> Row
      </button>
      <button
        onclick={() => toggleFormat('addColumn')}
        class="p-1.5 rounded-md text-neutral-600 transition-colors hover:bg-neutral-100"
        title="Add Column"
      >
        <PlusCircle size={18} /> Col
      </button>
      <button
        onclick={() => toggleFormat('deleteTable')}
        class="p-1.5 rounded-md text-red-600 transition-colors hover:bg-red-50"
        title="Delete Table"
      >
        <Trash2 size={18} />
      </button>
    {/if}
  </div>
  
  <div class="flex items-center space-x-1 pr-2">
    <button
      onclick={() => toggleFormat('textBox')}
      class="p-1.5 rounded-md text-neutral-600 transition-colors hover:bg-neutral-100"
      title="Insert Text Box"
    >
      <Square size={18} />
    </button>
    <button
      onclick={() => toggleFormat('signature')}
      class="p-1.5 rounded-md text-neutral-600 transition-colors hover:bg-neutral-100"
      title="Insert Signature Line"
    >
      <PenTool size={18} />
    </button>
  </div>
</div>
