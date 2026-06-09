import { Node, mergeAttributes } from '@tiptap/core';

export const SignaturePlaceholder = Node.create({
  name: 'signaturePlaceholder',
  group: 'block',
  atom: true,

  addAttributes() {
    return {
      label: {
        default: 'Signature',
      },
    }
  },

  parseHTML() {
    return [
      {
        tag: 'div[data-type="signature"]',
      },
    ]
  },

  renderHTML({ HTMLAttributes }) {
    return ['div', mergeAttributes(HTMLAttributes, { 'data-type': 'signature', class: 'signature-line' }), 
      ['div', { class: 'line' }],
      ['span', { class: 'label' }, HTMLAttributes.label]
    ]
  },

  addNodeView() {
    return ({ HTMLAttributes }) => {
      const dom = document.createElement('div')
      dom.classList.add('signature-placeholder-node', 'my-8', 'inline-block')
      dom.contentEditable = 'false'
      
      const line = document.createElement('div')
      line.classList.add('border-b', 'border-neutral-800', 'w-64', 'mb-2', 'h-[2px]')
      
      const label = document.createElement('div')
      label.classList.add('text-sm', 'text-neutral-500', 'text-center', 'w-64', 'font-sans')
      label.innerText = HTMLAttributes.label

      dom.append(line, label)
      return { dom }
    }
  },
})
