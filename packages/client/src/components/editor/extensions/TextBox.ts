import { Node, mergeAttributes } from '@tiptap/core';

export const TextBox = Node.create({
  name: 'textBox',
  group: 'block',
  content: 'block+',

  parseHTML() {
    return [
      {
        tag: 'div[data-type="textbox"]',
      },
    ]
  },

  renderHTML({ HTMLAttributes }) {
    return ['div', mergeAttributes(HTMLAttributes, { 'data-type': 'textbox', class: 'p-4 border border-neutral-300 shadow-sm rounded-md my-4 bg-white' }), 0]
  },
})
