# @makepdfform/editor-react

A framework-agnostic React island that mounts **pdfme** Designer, Form, and Viewer components
into any DOM element — including a Svelte page — without requiring the host to import React
directly.

This package is part of MakePDFForm (https://makepdfform.com) and is vendored from
[pdfme](https://github.com/pdfme/pdfme) (MIT, Copyright (c) 2020 HandDot).

---

## Installation

Because this is a workspace package you don't need to publish it — just add it as a workspace
dependency:

```json
// packages/client/package.json
{
  "dependencies": {
    "@makepdfform/editor-react": "*"
  }
}
```

---

## Usage from Svelte

```svelte
<script lang="ts">
  import { onMount, onDestroy } from 'svelte';

  let container: HTMLDivElement;
  let handle: { destroy(): void; getTemplate(): unknown } | null = null;

  const defaultTemplate = {
    basePdf: { width: 210, height: 297, padding: [0, 0, 0, 0] },
    schemas: [[]],
  };

  onMount(async () => {
    // Dynamic import keeps React out of all other Svelte routes
    const mod = await import('@makepdfform/editor-react');

    handle = mod.mountDesigner({
      container,
      template: defaultTemplate,
      onSaveTemplate: async (template) => {
        await fetch('/api/templates', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ template }),
        });
      },
    });
  });

  onDestroy(() => {
    handle?.destroy();
  });
</script>

<div bind:this={container} style="width:100%;height:100vh;" />
```

---

## API

### `mountDesigner(options): DesignerHandle`

| Option | Type | Description |
|--------|------|-------------|
| `container` | `HTMLElement` | DOM element to mount into |
| `template` | `Template` | Initial pdfme template |
| `options` | `UIOptions` | pdfme UI options (lang, font, etc.) |
| `onSaveTemplate` | `(tpl: Template) => void` | Called when user clicks Save |
| `onChangeTemplate` | `(tpl: Template) => void` | Called on every template change |

Returns `{ update, destroy, getTemplate, downloadTemplate }`.

### `mountForm(options): FormHandle`

| Option | Type | Description |
|--------|------|-------------|
| `container` | `HTMLElement` | DOM element to mount into |
| `template` | `Template` | pdfme template to render as form |
| `inputs` | `Record<string, string>[]` | Initial input values |
| `options` | `UIOptions` | pdfme UI options |
| `onChange` | `(inputs) => void` | Called on every input change |

Returns `{ getInputs, destroy }`.

### `mountViewer(options): ViewerHandle`

| Option | Type | Description |
|--------|------|-------------|
| `container` | `HTMLElement` | DOM element to mount into |
| `template` | `Template` | pdfme template |
| `inputs` | `Record<string, string>[]` | Values to render |
| `options` | `UIOptions` | pdfme UI options |

Returns `{ destroy }`.

---

## Styles

Import the bundled CSS in your entry point if needed:

```ts
import '@makepdfform/editor-react/dist/style.css';
```

antd v6 uses CSS-in-JS tokens, so a separate stylesheet is generally not required unless
you need the reset baseline.

---

## Attribution

Based on [pdfme](https://github.com/pdfme/pdfme) — MIT License, Copyright (c) 2020 HandDot.
