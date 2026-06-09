# MakePDFForm

A full-stack PDF form builder running on Cloudflare Workers.

## Architecture

```
makepdfform/
├── packages/
│   ├── client/          SvelteKit + Svelte 5 frontend (static export)
│   ├── server/          Hono API server (Cloudflare Worker)
│   ├── admin/           Admin UI
│   │
│   │  ── @makepdfform/* PDF Engine (vendored from pdfme MIT) ──
│   ├── common/          Types, utils, schema validation
│   ├── pdf-lib/         Low-level PDF manipulation (fork of pdf-lib)
│   ├── schemas/         Built-in field schemas (text, image, table, …)
│   ├── converter/       PDF ↔ other-format conversion
│   ├── jsx/             JSX rendering helpers
│   ├── generator/       Server-side PDF generation from templates
│   ├── manipulator/     PDF page manipulation (merge, split, rotate)
│   ├── ui/              React-based Designer / Form / Viewer UI
│   └── editor-react/    Framework-agnostic island that mounts pdfme UI
│                        into the Svelte client without polluting other routes
```

## Infrastructure (Cloudflare)

| Binding | Purpose |
|---------|---------|
| **D1** | SQLite database (forms, submissions, templates, auth) |
| **R2** | File storage (uploaded PDFs, images) |
| **KV** | Cache namespace |
| **Durable Objects** | Real-time collaborative form sessions (`FormRoom`) |
| **Static Assets** | SvelteKit build output |

## Hybrid React Island

The PDF editor (`/editor/[id]/pdf`) loads a React island **lazily** with a dynamic
`import('@makepdfform/editor-react')`. This means React and all pdfme UI code are only
bundled for the editor route and never loaded by other Svelte pages.

The island exposes three imperative mount functions:

```ts
mountDesigner({ container, template, onSaveTemplate }) → DesignerHandle
mountForm({ container, template, inputs, onChange })    → FormHandle
mountViewer({ container, template, inputs })            → ViewerHandle
```

## Key API Routes

| Route | Description |
|-------|-------------|
| `POST /api/pdf/generate` | Generate PDF bytes from a pdfme template + inputs |
| `POST /api/templates` | Save (upsert) a pdfme template |
| `GET /api/templates` | List user templates |
| `GET /api/templates/:id` | Get a single template + pdfme data |
| `POST /api/forms` | Create a form |
| `GET /api/forms` | List user forms |
| `POST /api/submissions` | Submit form data |

## PDF Engine Attribution

The packages under `packages/{common,pdf-lib,schemas,converter,jsx,generator,manipulator,ui}`
are derived from **[pdfme](https://github.com/pdfme/pdfme)** and renamed to the
`@makepdfform/*` namespace for full ownership.

- **Original project:** https://github.com/pdfme/pdfme
- **License:** MIT
- **Copyright:** Copyright (c) 2020 HandDot

See [NOTICE.md](./NOTICE.md) for the full attribution and MIT license text.

## Development

```bash
# Build the pdfme packages first (in dependency order), then all other packages
npm run build

# Build only the PDF engine packages
npm run build:pdf

# Start all dev servers in parallel
npm run dev
```

## Deployment

```bash
npm run deploy:prod   # builds + deploys to production Worker
npm run deploy:dev    # builds + deploys to dev Worker
```
