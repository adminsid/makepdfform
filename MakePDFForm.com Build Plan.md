# MakePDFForm.com — Revised Build Plan

## Domain &amp; Hosting Decisions

**Domain:** makepdfform.com — available and secured. Clean, descriptive, SEO-friendly. Directly tells users what the product does.[^1]

**Hosting:** 100% Cloudflare ecosystem. Workers is now the primary full-stack platform — Pages is being deprecated and all investment is going into Workers going forward.[^2][^3]

***

## Revised Tech Stack (No React)

### Why Drop React?

Your instinct is correct. In the AI-coding era (especially with Google Antigravity's agentic IDE ), React's complexity works against you:[^4][^5]

- React's virtual DOM, hooks rules, and re-render mental model create more surface area for AI-generated bugs
- React's bundle size is larger than alternatives — Svelte compiles to vanilla JS with no runtime[^6]
- Svelte's syntax is closer to vanilla HTML/CSS/JS, meaning Antigravity's Gemini 3 agents can reason about it more directly[^7]
- Hono builds to just 18KB vs. SvelteKit's 132KB — both are drastically smaller than React-based frameworks[^8]

### Recommended Stack: Svelte 5 + Hono on Cloudflare Workers

| Layer | Technology | Rationale |
|-------|-----------|-----------|
| **Backend API** | **Hono** | Ultra-lightweight (18KB), first-class Cloudflare Workers support, native bindings to D1/R2/KV/Durable Objects, type-safe RPC [^9][^8] |
| **Frontend** | **Svelte 5** (SvelteKit with static adapter) | Compiles to vanilla JS, no virtual DOM, native DOM access via `bind:this`, works seamlessly with any vanilla JS library [^6][^10] |
| **Database** | **Cloudflare D1** | Serverless SQLite, 5GB free, 25 billion reads/month on paid plan, point-in-time recovery via Time Travel [^11][^12] |
| **File Storage** | **Cloudflare R2** | Zero egress fees, 10GB free, $0.015/GB-month after, perfect for storing PDF files [^13][^14] |
| **Real-Time Collab** | **Cloudflare Durable Objects** + WebSockets | Native WebSocket support, hibernation API for cost savings, thousands of clients per instance, purpose-built for collaborative editing [^15][^16] |
| **PDF Engine** | **pdf-lib** + **PDF.js** | pdf-lib for creating/editing PDFs (works in browser + server, no native deps) [^17][^18]; PDF.js for rendering PDFs in browser [^19] |
| **Drag &amp; Drop** | **Vanilla JS** or **SortableJS** | Svelte works natively with vanilla JS drag-and-drop — no need for React-specific libraries like dnd-kit [^6] |
| **Canvas Layer** | **Fabric.js** or **Konva.js** | For the visual form field overlay on rendered PDF pages — both are vanilla JS libraries that work directly with Svelte [^6] |
| **Auth** | **Better Auth** or Hono JWT middleware | Better Auth has proven Cloudflare compatibility [^20]; Hono's built-in JWT middleware is simpler for MVP [^8] |
| **Payments** | **Stripe** | Your existing processor |
| **AI IDE** | **Google Antigravity** | Agentic development with Gemini 3, multi-agent parallel tasks, Chrome extension for live testing [^4][^5] |

### Reference Architecture: Hono + Svelte 5 on Cloudflare

There's a proven reference implementation for exactly this stack — Hono as backend with Svelte 5 frontend, deployed to Cloudflare Workers with D1:[^21]

```
makepdfform/
├── packages/
│   ├── server/          # Hono API (Workers)
│   │   ├── src/
│   │   │   ├── index.ts           # Hono entry point
│   │   │   ├── routes/
│   │   │   │   ├── forms.ts       # CRUD for forms
│   │   │   │   ├── submissions.ts # Form submission handling
│   │   │   │   ├── auth.ts        # Authentication
│   │   │   │   └── export.ts      # PDF export endpoints
│   │   │   ├── middleware/
│   │   │   ├── db/
│   │   │   │   └── schema.ts      # Drizzle ORM schema for D1
│   │   │   └── lib/
│   │   │       ├── pdf.ts         # pdf-lib utilities
│   │   │       └── r2.ts          # R2 storage helpers
│   │   └── wrangler.toml
│   └── client/          # Svelte 5 (SvelteKit static)
│       ├── src/
│       │   ├── routes/
│       │   │   ├── +page.svelte         # Landing page
│       │   │   ├── editor/+page.svelte  # PDF form editor
│       │   │   ├── forms/+page.svelte   # Forms dashboard
│       │   │   └── submit/[id]/         # Public form fill
│       │   ├── lib/
│       │   │   ├── pdf-renderer.ts    # PDF.js canvas rendering
│       │   │   ├── form-fields.ts     # Drag-and-drop fields
│       │   │   ├── collaboration.ts   # WebSocket client
│       │   │   └── fabric-overlay.ts  # Fabric.js form layer
│       │   └── components/
│       │       ├── PDFCanvas.svelte
│       │       ├── FieldToolbar.svelte
│       │       ├── FormField.svelte
│       │       └── ExportMenu.svelte
│       └── svelte.config.js
└── drizzle/                # D1 migrations
```

The architecture pattern: Hono sits in front, handles all API routes and Cloudflare bindings, then forwards unmatched routes to Svelte's static build for the frontend:[^8]

```typescript
// packages/server/src/index.ts
import { Hono } from 'hono'

const app = new Hono<{ Bindings: Env }>()

// API routes
app.route('/api/forms', formsRouter)
app.route('/api/submissions', submissionsRouter)
app.route('/api/export', exportRouter)

// Forward everything else to Svelte static assets
app.all('*', (c) => c.env.ASSETS.fetch(c.req.raw))

export default app
```

***

## Cloudflare Pricing Breakdown

Your entire infrastructure runs on Cloudflare's $5/month Workers Paid plan, with usage-based costs on top:[^22]

| Service | Free Tier | Paid Plan (after free) | Your Likely Early Cost |
|---------|-----------|----------------------|----------------------|
| **Workers** | 100K req/day | 10M req/month included, +$0.30/M | $0/mo (within free) |
| **D1 Database** | 5M reads/day, 100K writes/day, 5GB | 25B reads/month, 50M writes/month, +$0.75/GB | $0/mo (within free) [^12] |
| **R2 Storage** | 10GB, 1M Class A, 10M Class B | $0.015/GB-month, zero egress | ~$1-5/mo early [^13][^14] |
| **Durable Objects** | N/A (paid only) | 1M requests + 400K GB-s included | ~$0-2/mo early [^22] |
| **Workers KV** | 100K reads/day, 1GB | 10M reads/month, +$0.50/M | $0/mo (within free) |
| **Base Plan** | — | $5/month minimum | **$5/month** |

**Total estimated cost at launch: ~$5-12/month** — this is absurdly cheap infrastructure for a full SaaS.

For comparison, a similar setup on AWS (Lambda + S3 + RDS + API Gateway) would cost $50-200+/month and have egress fees on every PDF download. R2's zero egress is a massive advantage for a PDF product where users constantly download files.[^23]

***

## Real-Time Collaboration Architecture

Cloudflare Durable Objects are purpose-built for your collaboration feature:[^16]

**How it works:**
1. Each form gets its own Durable Object instance
2. When multiple users open the same form, they connect via WebSockets to that instance
3. The Durable Object broadcasts field changes to all connected users in real-time
4. The Hibernation API means you only pay when users are actively editing — idle connections hibernate for free[^15]

This is the same architecture Cloudflare uses for their own chat demo app, handling thousands of simultaneous connections per room.[^24][^15]

**Operational Transform (OT) or CRDT:**
For the collaboration layer, you'll want **Yjs** — it's a CRDT library that works with vanilla JS (no React dependency), supports WebSocket transport, and handles conflict resolution automatically. It's been battle-tested with Cloudflare Durable Objects.

***

## PDF Engine Strategy

The PDF engine is the core of MakePDFForm. Here's the two-library approach:[^18]

**pdf-lib (creation &amp; editing):**
- Creates PDF documents from scratch
- Adds form fields (text, checkbox, radio, dropdown) to PDFs
- Modifies existing PDFs
- Works in both browser and Cloudflare Workers (no native dependencies)[^17]
- Open source, Apache 2.0 license

**PDF.js (rendering):**
- Renders PDF pages as canvas elements in the browser
- Users see the actual PDF while editing — this is what makes it "look like Adobe Acrobat"
- Mozilla-maintained, widely used[^19]

**Fabric.js (interactive overlay):**
- Sits on top of the PDF.js canvas
- Handles drag-and-drop form field placement
- Provides selection, resizing, snapping, and alignment
- Works natively with vanilla JS and Svelte[^6]

The flow: PDF.js renders the document → Fabric.js overlays interactive form fields → User drags/drops/configures fields → pdf-lib generates the final PDF with embedded form fields.

***

## Why Svelte 5 + Antigravity Is the Right Call

Svelte 5 compiles to vanilla JavaScript — there's no runtime framework shipped to the browser. This means:[^6]

1. **AI agents write better Svelte code** — it's closer to standard HTML/JS, so Antigravity's Gemini 3 agents produce cleaner, more predictable output[^5]
2. **Vanilla JS libraries work directly** — no wrappers needed for pdf-lib, PDF.js, Fabric.js, or SortableJS. Just `import` and use with `bind:this`[^10][^6]
3. **Smaller bundles** — critical for a tool that renders PDFs in the browser; you don't want framework overhead competing with PDF rendering
4. **Agent Manager in Antigravity** — you can run one agent on the Hono API, another on the Svelte frontend, and a third on the PDF engine simultaneously[^7][^5]

The DuneTools project proves this exact thesis — a vanilla JS PDF editor with zero framework overhead, achieving Lighthouse 100/100 scores. Your architecture follows the same philosophy but adds Svelte for reactivity where needed and Hono for structured backend APIs.[^25]

***

## Revised Development Roadmap

| Phase | Duration | What Ships |
|-------|----------|-----------|
| **Phase 0: Scaffold** | 1 week | Hono + Svelte 5 + D1 + R2 on Workers. Auth. Landing page at makepdfform.com. CI/CD via Workers Builds + GitHub [^2] |
| **Phase 1: PDF Canvas Editor** | 4-5 weeks | PDF.js rendering, Fabric.js overlay, drag-and-drop form fields (text, checkbox, radio, dropdown, signature, date), black-and-white minimal UI |
| **Phase 2: Save, Export, Share** | 3-4 weeks | pdf-lib export to real PDF, save to R2, shareable public links, print, download, Google Drive integration |
| **Phase 3: Form Submissions** | 2-3 weeks | Public form filling view, submission collection in D1, dashboard to view/export responses as CSV |
| **Phase 4: Real-Time Collaboration** | 3-4 weeks | Durable Objects + WebSocket collab, cursor presence, field locking, version history |
| **Phase 5: Monetization &amp; Polish** | 2-3 weeks | Stripe billing, plan limits, template library (lease forms, W-9s, intake forms), onboarding flow |

**Total: ~15-20 weeks to production launch**

***

## Monetization (Updated)

| Plan | Price | Limits |
|------|-------|--------|
| **Free** | $0/mo | 3 forms, 50 submissions/mo, "Made with MakePDFForm" watermark |
| **Pro** | $9/mo | Unlimited forms, 1,000 submissions/mo, no watermark, all field types, export to Drive |
| **Team** | $25/mo | Everything in Pro + real-time collaboration, 5 team members, shared workspace |
| **Business** | $59/mo | Everything in Team + custom branding, API access, webhooks, unlimited team members, priority support |

At just $5-12/month in infrastructure costs, you hit profitability with your **first paying customer**.

***

## Quick Wins for SEO &amp; Launch

- **makepdfform.com** is extremely keyword-rich — "make PDF form" is a high-intent search query
- Target long-tail keywords: "create fillable PDF free," "PDF form builder online," "free fillable PDF creator"[^26]
- Build a free tier with generous limits to drive organic traffic and word-of-mouth
- Create template gallery pages (e.g., makepdfform.com/templates/rental-application) — each is an SEO landing page
- Leverage your real estate network at Prime America for initial beta users and testimonials

---

## References

1. [How to Setup a Domain | MakeForms](https://www.youtube.com/watch?v=YY8Z3HBw8iw) - How to Setup a Domain
Follow the steps to setup a domain to your MakeForms account
Step 01: Click on...

2. [Your frontend, backend, and database — now in one Cloudflare ...](https://blog.cloudflare.com/full-stack-development-on-cloudflare-workers/) - You can now deploy static sites and full-stack applications on Cloudflare Workers – the primitives a...

3. [Full-stack frameworks are now Generally Available on Cloudflare ...](https://developers.cloudflare.com/changelog/2025-04-08-fullstack-on-workers/) - Cloudflare Workers now provides production ready, generally available (GA) support for React Router ...

4. [Google Antigravity - Experience Liftoff with the Next ...](https://antigravityide.org) - Google Antigravity - Build the new way

5. [Google Antigravity IDE - Free AI Development Platform](https://www.antigravity-ide.com) - Experience liftoff with Google's next-generation IDE powered by Gemini 3

6. [Svelte's Compatibility with Regular JavaScript Packages - How Does It Compare?](https://www.reddit.com/r/sveltejs/comments/16up95w/sveltes_compatibility_with_regular_javascript/)

7. [Google Anti-Gravity IDE - AI Based Code Editor](https://www.youtube.com/watch?v=vjMqV5awh80) - Anti-Gravity is Google new IDE that is made for AI agents and a fork of VS Code. In this video I exp...

8. [Practice: Building Full-Stack Applications with Hono - rxliuli](https://rxliuli.com/blog/practice-building-full-stack-applications-with-hono/) - Starting with Next.js, then moving to SvelteKit, and finally to Tanstack Router, none have proven as...

9. [Hono · Cloudflare Workers docs](https://developers.cloudflare.com/workers/framework-guides/web-apps/more-web-frameworks/hono/) - Hono is an ultra-fast, lightweight framework for building web applications, and works fantastically ...

10. [Use any JavaScript or TypeScript Library in Svelte 5 (The Right Way)](https://www.youtube.com/watch?v=R82Ptutku0M) - 00:00:00 Introduction to using vanilla JS libraries in Svelte
00:02:37 Quick and dirty implementatio...

11. [Build a natively serverless SQL database with Cloudflare D1](https://www.cloudflare.com/developer-platform/products/d1/) - Create a natively serverless SQL database in seconds with D1. With a familiar query language, point-...

12. [Pricing · Cloudflare D1 docs](https://developers.cloudflare.com/d1/platform/pricing/) - D1 bills based on:

13. [Pricing · Cloudflare R2 docs](https://developers.cloudflare.com/r2/pricing/) - R2 charges based on the total volume of data stored, along with two classes of operations on that da...

14. [Cloudflare R2 Storage Cost Calculator - theserverless.dev](https://theserverless.dev/calculators/r2/) - Calculate your object storage costs with Cloudflare R2.

15. [GitHub - cloudflare/workers-chat-demo](https://github.com/cloudflare/workers-chat-demo) - Contribute to cloudflare/workers-chat-demo development by creating an account on GitHub.

16. [Use WebSockets - Durable Objects - Cloudflare Docs](https://developers.cloudflare.com/durable-objects/best-practices/websockets/) - Durable Objects can act as WebSocket servers that connect thousands of clients per instance. You can...

17. [rivy/js.pdf-lib: Create and modify PDF documents in any ...](https://github.com/rivy/js.pdf-lib) - Create and modify PDF documents in any JavaScript environment - rivy/js.pdf-lib

18. [Comparing open source PDF libraries (2025 edition) - Joyfilljoyfill.io › blog › comparing-open-source-pdf-libraries-2025-edition](https://joyfill.io/blog/comparing-open-source-pdf-libraries-2025-edition) - Comparing the most popular open source JavaScript PDF libraries and how to choose the best open sour...

19. [How show PDF in vanilla JavaScript in Browser🤯](https://dev.to/patik123/how-show-pdf-in-vanilla-javascript-in-browser-2o10?comments_sort=latest) - Yesterday I wondered how to display a PDF document on a website. I tried with iframe to display the ...

20. [A Full Stack App in 3 Prompts??? Cloudflare Workers w/Vite and BetterAuth is GOATED!](https://www.youtube.com/watch?v=RT8OHQBNUb0) - Watch a live coding session where I take a popular Admin template and turn it into a real, full-stac...

21. [GitHub - MosheRivkin/hono-svelte-5: A reference for building full stack web app using🔥Hono as the backend framework and Svelte 5 for the frontend.](https://github.com/MosheRivkin/hono-svelte-5) - A reference for building full stack web app using🔥Hono as the backend framework and Svelte 5 for the...

22. [Durable Objects](https://developers.cloudflare.com/workers/platform/pricing/) - Workers plans and pricing information.

23. [Google Cloud Storage vs Cloudflare R2: Pricing Comparison](https://www.vantage.sh/blog/gcs-vs-r2-cost) - For frequently accessed data, R2 is always less expensive than GCS, while GCS is much more cost-effe...

24. [Building Real-Time Applications with Cloudflare Durable Objects](https://www.youtube.com/watch?v=zDo3qbikeLo) - Hello, developers and architects! In this video, you’ll discover the power of Cloudflare Durable Obj...

25. [How I built a Serverless PDF Editor with Vanilla JS (and $0 ...](https://dev.to/remolinator/how-i-built-a-serverless-pdf-editor-with-vanilla-js-and-0-cloud-bills-554b) - We all have that moment. You need to merge two PDF contracts or compress a video file, and you searc...

26. [How to make a fillable PDF form without Acrobat | The Jotform Blog](https://www.jotform.com/blog/how-to-make-a-fillable-pdf-form-without-acrobat/) - You can quickly and easily make a fillable PDF form online, without downloading software or paying m...

