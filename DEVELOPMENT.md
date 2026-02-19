# Development Workflow & Architecture

## Why are there two "websites"?

You might notice two URLs running locally, for example:
1.  `http://localhost:5173` (or `5177`, etc.)
2.  `http://localhost:8787`

This is normal for modern "monorepo" development with Cloudflare Workers + SvelteKit.

### 1. The Frontend (Vite) - `http://localhost:5173`
**ALWAYS use this URL for development.**

*   **What it is**: The SvelteKit/Vite development server.
*   **What it does**: Serves your Svelte files with **Hot Module Reloading (HMR)**. When you save a file, this updates instantly.
*   **API Calls**: It talks to your Backend Server (`localhost:8787`) to get data.

### 2. The Backend (Wrangler) - `http://localhost:8787`
**Ignore this URL for UI.**

*   **What it is**: The Cloudflare Worker development server (Wrangler).
*   **What it does**: Runs your API logic (`/api/*`, `auth`, `database`).
*   **Why it serves a website too**: Cloudflare Workers are configured to serve your *static assets* (the built frontend). However, locally, this serves the **stale, previously built version** of your client (from `packages/client/build`). usage of this URL for UI will confuse you because it won't reflect your latest code changes until you run `npm run build`.

## How to Develop

1.  **Start Everything**:
    ```bash
    npm run dev
    ```
    This starts both servers in parallel.

2.  **Open your Browser**:
    Go to the **Vite** URL (e.g., `http://localhost:5173`).

3.  **Authentication & API**:
    Your Frontend (`5173`) will automatically talk to your Backend (`8787`) for things like logging in or saving forms.

## Troubleshooting

### "CORS Error" or "Network Error"
If your frontend can't talk to the backend, ensure:
*   The backend is running (`npm run dev` in `packages/server`).
*   You are on `localhost` (not an IP address).

### "I don't see my changes"
You are likely looking at `localhost:8787` (Wrangler). Switch to `localhost:5173` (Vite).
