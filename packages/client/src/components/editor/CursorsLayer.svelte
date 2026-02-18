<script lang="ts">
  interface Cursor {
      x: number;
      y: number;
      color: string;
      label?: string;
  }

  interface Props {
      cursors: Record<string, Cursor>;
      scale: number;
  }

  let { cursors, scale }: Props = $props();

  function getColor(id: string) {
      // Consistent color hashing
      const colors = ['#FF5733', '#33FF57', '#3357FF', '#FF33A1', '#33FFF5', '#F5FF33'];
      let hash = 0;
      for (let i = 0; i < id.length; i++) {
          hash = id.charCodeAt(i) + ((hash << 5) - hash);
      }
      return colors[Math.abs(hash) % colors.length];
  }
</script>

<div class="cursors-layer">
  {#each Object.entries(cursors) as [id, cursor]}
     <div 
        class="cursor"
        style="
            left: {cursor.x * scale}px; 
            top: {cursor.y * scale}px;
            background-color: {getColor(id)};
        "
     >
       <div class="cursor-pointer"></div>
       <div class="cursor-label" style="background-color: {getColor(id)}">User {id.slice(0, 4)}</div>
     </div>
  {/each}
</div>

<style>
  .cursors-layer {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
      z-index: 999;
      overflow: hidden;
  }

  .cursor {
      position: absolute;
      width: 10px;
      height: 10px;
      border-radius: 50%;
      transition: all 0.1s ease;
  }

  .cursor-label {
      position: absolute;
      top: 12px;
      left: 0;
      padding: 2px 4px;
      border-radius: 3px;
      color: white;
      font-size: 10px;
      white-space: nowrap;
  }
</style>
