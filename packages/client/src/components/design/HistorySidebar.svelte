<script lang="ts">
  import { editorState } from '../../lib/editorState.svelte';
</script>

<aside class="history-sidebar">
  <div class="header">
    <h2>Document Activity</h2>
    <button>
      <span class="material-symbols-outlined">filter_list</span>
    </button>
  </div>

  <div class="timeline">
    {#each editorState.history as item, index}
        <div class="timeline-item">
          <div class="marker-container">
            <div class="marker" class:current={index === editorState.history.length - 1}></div>
            {#if index < editorState.history.length - 1}
                <div class="line"></div>
            {/if}
          </div>
          <div class="content">
            <div class="top-row">
              <span class="version-name" class:current-text={index === editorState.history.length - 1}>
                {index === 0 ? 'Document Created' : `Version ${index}`}
              </span>
              <span class="time">{index === editorState.history.length - 1 ? 'Current' : ''}</span>
            </div>
            <p class="description">
                {index === 0 ? 'Initial draft created.' : 'Modifications saved to history.'}
            </p>
            {#if index !== editorState.history.length - 1}
                <div class="actions">
                <button class="action-btn" onclick={() => editorState.updateContent(item)}>Restore</button>
                </div>
            {/if}
          </div>
        </div>
    {/each}
  </div>
</aside>

<style>
/* ... styles remain unchanged ... */
.history-sidebar { width: 288px; background-color: var(--color-surface-light); border-left: 1px solid var(--color-border-light); display: flex; flexDirection: column; flex-shrink: 0; z-index: 10; height: 100%; overflow-y: auto; }
:global(.dark) .history-sidebar { background-color: var(--color-surface-dark); border-left-color: var(--color-border-dark); }
.header { padding: 16px; border-bottom: 1px solid var(--color-border-light); display: flex; justify-content: space-between; align-items: center; }
:global(.dark) .header { border-bottom-color: var(--color-border-dark); }
h2 { font-size: 0.875rem; font-weight: 700; color: #111827; margin: 0; }
:global(.dark) h2 { color: #fff; }
.header button { border: none; background: none; color: #9CA3AF; cursor: pointer; padding: 0; }
.header button:hover { color: #000; }
:global(.dark) .header button:hover { color: #fff; }
.timeline { padding: 24px 16px; position: relative; }
.timeline-item { display: flex; margin-bottom: 8px; position: relative; padding-bottom: 32px; }
.timeline-item:last-child { padding-bottom: 0; }
.marker-container { width: 32px; position: relative; display: flex; justify-content: center; flex-shrink: 0; }
.marker { width: 12px; height: 12px; background-color: #D1D5DB; border-radius: 50%; z-index: 10; box-shadow: 0 0 0 4px #fff; }
:global(.dark) .marker { background-color: #4B5563; box-shadow: 0 0 0 4px var(--color-surface-dark); }
.marker.current { background-color: #000; }
:global(.dark) .marker.current { background-color: #fff; }
.line { position: absolute; top: 12px; bottom: -32px; width: 1px; background-color: #E5E7EB; left: 50%; transform: translateX(-50%); z-index: 0; }
:global(.dark) .line { background-color: #404040; }
/* .timeline-item:last-child .line { display: none; } logic moved to template */
.content { flex: 1; display: flex; flex-direction: column; gap: 4px; padding-left: 8px; }
.top-row { display: flex; justify-content: space-between; align-items: flex-start; }
.version-name { font-size: 0.75rem; font-weight: 600; color: #374151; }
:global(.dark) .version-name { color: #D1D5DB; }
.current-text { font-weight: 700; color: #000; }
:global(.dark) .current-text { color: #fff; }
.time { font-size: 10px; color: #9CA3AF; font-family: var(--font-mono); }
.description { font-size: 11px; color: #6B7280; margin: 0; line-height: 1.4; }
:global(.dark) .description { color: #9CA3AF; }
.actions { display: flex; gap: 8px; margin-top: 8px; }
.action-btn { padding: 2px 8px; font-size: 10px; border: 1px solid #D1D5DB; border-radius: 2px; background: transparent; color: #374151; cursor: pointer; }
.action-btn:hover { background-color: #F3F4F6; }
:global(.dark) .action-btn { border-color: #374151; color: #E5E5E5; }
:global(.dark) .action-btn:hover { background-color: #1F2937; }
</style>
