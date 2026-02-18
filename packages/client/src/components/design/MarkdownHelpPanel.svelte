<script lang="ts">
  interface Props {
    isOpen: boolean;
    onClose: () => void;
  }

  let { isOpen, onClose }: Props = $props();

  const categories = ['All', 'Basics', 'Headers', 'Financial Tables'];
  let activeCategory = $state('All');

  const sections = [
    {
      title: 'Essentials',
      items: [
        { name: 'Headings', desc: 'Use for document structure.', code: '# Heading 1\n## Heading 2\n### Heading 3', prefix: '#' },
        { name: 'Emphasis', desc: 'Bold and italic styling.', code: '**Bold Text**\n*Italic Text*', prefix: '**' }
      ]
    },
    {
      title: 'Layouts',
      items: [
        { name: 'Lists', desc: 'Bulleted and numbered lists.', code: '- Item 1\n- Item 2\n  - Sub-item\n1. First Item\n2. Second Item', prefix: '-' },
        { name: 'Blockquotes', desc: 'Perfect for client testimonials or callouts.', code: '> "This deal was excellent."\n> - Client Name', prefix: '>' }
      ]
    }
  ];

  const proTemplates = [
    {
      name: 'Financial Statement Table',
      desc: 'High-fidelity table for assets and liabilities.',
      preview: true,
      code: '| Category | Amount (USD) |\n| :--- | ---: |\n| Total Assets | $1,200,000 |\n| Liabilities | $450,000 |\n| **Net Worth** | **$750,000** |'
    },
    {
      name: 'Deal Highlights Box',
      desc: 'Callout box for key deal metrics.',
      code: '::: tip 💡 Deal Highlights\n**EBITDA:** $250k  |  **Multiple:** 3.5x  \n**Location:** Remote\n:::'
    }
  ];
</script>

{#if isOpen}
  <div class="panel-backdrop" onclick={onClose}>
    <div class="markdown-panel" onclick={e => e.stopPropagation()}>
      <header class="panel-header">
        <div class="header-top">
          <div class="header-text">
            <h1 class="panel-title">Markdown Guide</h1>
            <p class="panel-subtitle">Formatting reference for client documents</p>
          </div>
          <button class="close-btn" onclick={onClose}>
            <span class="material-symbols-outlined">close</span>
          </button>
        </div>
        
        <div class="search-wrap">
          <span class="material-symbols-outlined search-icon">search</span>
          <input type="text" placeholder="Search syntax (e.g., Table, Bold)..." class="search-input" />
        </div>

        <div class="category-chips">
          {#each categories as cat}
            <button 
              class="chip" 
              class:active={activeCategory === cat}
              onclick={() => activeCategory = cat}
            >
              {cat}
            </button>
          {/each}
        </div>
      </header>

      <div class="panel-content custom-scrollbar">
        {#each sections as section}
          <section class="content-section">
            <h2 class="section-title">{section.title}</h2>
            <div class="items-grid">
              {#each section.items as item}
                <div class="card">
                  <div class="card-header">
                    <div class="card-title-wrap">
                      <h3 class="card-title">{item.name}</h3>
                      <p class="card-desc">{item.desc}</p>
                    </div>
                    <button class="copy-small">
                      <span class="material-symbols-outlined">content_copy</span>
                      Copy
                    </button>
                  </div>
                  <div class="card-code">
                    <pre><code>{item.code}</code></pre>
                  </div>
                </div>
              {/each}
            </div>
          </section>
        {/each}

        <section class="content-section">
          <div class="section-title-wrap">
            <h2 class="section-title">Broker Templates</h2>
            <span class="pro-badge">Pro</span>
          </div>

          {#each proTemplates as template}
            <div class="template-card" class:pro={template.preview}>
              {#if template.preview}
                <div class="preview-area">
                  <div class="preview-header">
                    <h3 class="card-title">{template.name}</h3>
                    <span class="preview-tag">Preview</span>
                  </div>
                  <div class="rendered-mock">
                    <table class="mock-table">
                      <thead>
                        <tr>
                          <th>Category</th>
                          <th class="text-right">Amount (USD)</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr><td>Total Assets</td><td class="text-right">$1,200,000</td></tr>
                        <tr><td>Liabilities</td><td class="text-right">$450,000</td></tr>
                        <tr class="bold-row"><td>Net Worth</td><td class="text-right">$750,000</td></tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              {:else}
                <div class="card-header">
                   <div class="card-title-wrap">
                    <h3 class="card-title">{template.name}</h3>
                    <p class="card-desc">{template.desc}</p>
                  </div>
                  <button class="copy-small">
                    <span class="material-symbols-outlined">content_copy</span>
                    Copy
                  </button>
                </div>
              {/if}
              
              <div class="code-snippet-area">
                <button class="copy-snippet-btn">
                  <span class="material-symbols-outlined">content_copy</span>
                  Copy Snippet
                </button>
                <div class="snippet-code">
                  <pre><code>{template.code}</code></pre>
                </div>
              </div>
            </div>
          {/each}
        </section>

        <footer class="panel-footer">
          <a href="#" class="docs-link">
            View Full Documentation
            <span class="material-symbols-outlined">open_in_new</span>
          </a>
        </footer>
      </div>
    </div>
  </div>
{/if}

<style>
  .panel-backdrop {
    position: fixed;
    inset: 0;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 1000;
    display: flex;
    justify-content: flex-end;
  }

  .markdown-panel {
    width: 100%;
    max-width: 32.5rem;
    height: 100%;
    background-color: #f9fafb;
    display: flex;
    flex-direction: column;
    box-shadow: -20px 0 25px -5px rgba(0, 0, 0, 0.1);
    animation: slideIn 0.3s ease-out;
  }

  :global(.dark) .markdown-panel { background-color: #111827; }

  @keyframes slideIn {
    from { transform: translateX(100%); }
    to { transform: translateX(0); }
  }

  .panel-header {
    padding: 1.5rem;
    background-color: #f9fafb;
    border-bottom: 1px solid #e5e7eb;
    flex-shrink: 0;
  }

  :global(.dark) .panel-header { background-color: #111827; border-bottom-color: #1f2937; }

  .header-top { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 1rem; }

  .panel-title { font-size: 1.5rem; font-weight: 700; color: #111827; letter-spacing: -0.025em; }
  :global(.dark) .panel-title { color: #ffffff; }

  .panel-subtitle { font-size: 0.875rem; color: #6b7280; margin-top: 0.25rem; }

  .close-btn {
    width: 2rem;
    height: 2rem;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    border: none;
    background: transparent;
    color: #6b7280;
    cursor: pointer;
    transition: background-color 0.2s;
  }

  .close-btn:hover { background-color: #e5e7eb; color: #111827; }
  :global(.dark) .close-btn:hover { background-color: #1f2937; color: #ffffff; }

  .search-wrap { position: relative; margin-bottom: 1rem; }

  .search-icon { position: absolute; left: 0.75rem; top: 50%; transform: translateY(-50%); color: #9ca3af; font-size: 1.25rem; }

  .search-input {
    width: 100%;
    padding: 0.625rem 1rem 0.625rem 2.5rem;
    border: 1px solid #e5e7eb;
    border-radius: 0.5rem;
    font-size: 0.875rem;
    outline: none;
    background-color: #ffffff;
  }

  :global(.dark) .search-input { background-color: #1f2937; border-color: #374151; color: #ffffff; }

  .category-chips { display: flex; gap: 0.5rem; overflow-x: auto; padding-bottom: 0.25rem; }

  .chip {
    white-space: nowrap;
    padding: 0.375rem 0.75rem;
    background-color: #e5e7eb;
    border: none;
    border-radius: 9999px;
    font-size: 0.75rem;
    font-weight: 500;
    color: #4b5563;
    cursor: pointer;
    transition: all 0.2s;
  }

  :global(.dark) .chip { background-color: #1f2937; color: #9ca3af; }

  .chip.active { background-color: #195de6; color: #ffffff; }

  .panel-content { flex: 1; overflow-y: auto; padding: 1.5rem; display: flex; flex-direction: column; gap: 2rem; }

  .section-title { font-size: 0.75rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em; color: #6b7280; margin-bottom: 1rem; }

  .items-grid { display: flex; flex-direction: column; gap: 1rem; }

  .card { background-color: #ffffff; border: 1px solid #e5e7eb; border-radius: 0.5rem; overflow: hidden; }
  :global(.dark) .card { background-color: #1f2937; border-color: #374151; }

  .card-header { padding: 1rem; border-bottom: 1px solid #e5e7eb; display: flex; justify-content: space-between; align-items: flex-start; }
  :global(.dark) .card-header { border-bottom-color: #374151; }

  .card-title { font-size: 0.875rem; font-weight: 700; color: #111827; }
  :global(.dark) .card-title { color: #ffffff; }

  .card-desc { font-size: 0.75rem; color: #6b7280; margin-top: 0.25rem; }

  .copy-small {
    display: flex;
    align-items: center;
    gap: 0.25rem;
    padding: 0.25rem 0.5rem;
    background-color: rgba(25, 93, 230, 0.1);
    color: #195de6;
    border: none;
    border-radius: 0.25rem;
    font-size: 0.75rem;
    font-weight: 700;
    cursor: pointer;
    transition: background-color 0.2s;
  }

  .copy-small:hover { background-color: rgba(25, 93, 230, 0.2); }
  .copy-small .material-symbols-outlined { font-size: 0.875rem; }

  .card-code { padding: 1rem; background-color: #f9fafb; font-family: monospace; font-size: 0.75rem; color: #4b5563; }
  :global(.dark) .card-code { background-color: #161b26; color: #d1d5db; }

  .section-title-wrap { display: flex; align-items: center; gap: 0.5rem; margin-bottom: 1rem; }

  .pro-badge { padding: 0.125rem 0.375rem; background-color: #195de6; color: #ffffff; font-size: 0.625rem; font-weight: 700; text-transform: uppercase; border-radius: 0.125rem; }

  .template-card { 
    background-color: #ffffff; 
    border: 1px solid #e5e7eb; 
    border-radius: 0.5rem; 
    overflow: hidden; 
    margin-bottom: 1rem;
    transition: box-shadow 0.2s;
  }
  :global(.dark) .template-card { background-color: #1f2937; border-color: #374151; }

  .template-card.pro { border-color: rgba(25, 93, 230, 0.3); box-shadow: 0 4px 6px -1px rgba(25, 93, 230, 0.1); }

  .preview-area { padding: 1rem; background: linear-gradient(135deg, #ffffff 0%, #f9fafb 100%); }
  :global(.dark) .preview-area { background: linear-gradient(135deg, #1f2937 0%, #161b26 100%); }

  .preview-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.75rem; }

  .preview-tag { font-size: 0.625rem; font-weight: 700; color: #9ca3af; text-transform: uppercase; letter-spacing: 0.05em; }

  .rendered-mock { background-color: #ffffff; border: 1px solid #e5e7eb; border-radius: 0.25rem; padding: 0.75rem; }
  :global(.dark) .rendered-mock { background-color: #111827; border-color: #374151; }

  .mock-table { width: 100%; font-size: 0.625rem; border-collapse: collapse; }
  .mock-table th { border-bottom: 1px solid #e5e7eb; padding-bottom: 0.25rem; font-weight: 700; color: #111827; }
  :global(.dark) .mock-table th { border-bottom-color: #374151; color: #ffffff; }
  .mock-table td { padding-top: 0.25rem; color: #4b5563; }
  :global(.dark) .mock-table td { color: #d1d5db; }
  .bold-row { font-weight: 700; border-top: 1px solid #f3f4f6; color: #111827 !important; }

  .code-snippet-area { padding: 1rem; background-color: #f3f4f6; position: relative; }
  :global(.dark) .code-snippet-area { background-color: #0f131a; }

  .copy-snippet-btn { 
    position: absolute; 
    top: 0.75rem; 
    right: 1rem; 
    background-color: #195de6; 
    color: #ffffff; 
    border: none; 
    padding: 0.375rem 0.75rem; 
    border-radius: 0.25rem; 
    font-size: 0.625rem; 
    font-weight: 700; 
    display: flex; 
    align-items: center; 
    gap: 0.375rem;
    cursor: pointer;
    box-shadow: 0 4px 6px -1px rgba(25, 93, 230, 0.2);
  }

  .snippet-code { font-family: monospace; font-size: 0.75rem; color: #4b5563; }
  :global(.dark) .snippet-code { color: #9ca3af; }

  .panel-footer { padding-top: 1rem; border-top: 1px solid #e5e7eb; display: flex; justify-content: center; margin-top: auto; }
  :global(.dark) .panel-footer { border-top-color: #1f2937; }

  .docs-link { display: flex; align-items: center; gap: 0.25rem; color: #195de6; font-size: 0.875rem; font-weight: 500; text-decoration: none; }
  .docs-link:hover { text-decoration: underline; }

  .custom-scrollbar::-webkit-scrollbar { width: 6px; }
  .custom-scrollbar::-webkit-scrollbar-thumb { background-color: #d1d5db; border-radius: 20px; }
</style>
