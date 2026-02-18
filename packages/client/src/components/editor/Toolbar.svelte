<script lang="ts">
  interface Props {
    selectedTool?: string | null;
    isPro?: boolean;
    brandingConfig?: { logoUrl?: string; primaryColor?: string };
    onSelect?: (type: string | null) => void;
    onLogoUpload?: (file: File) => void;
    onBrandingUpdate?: (config: any) => void;
  }

  let { 
    selectedTool = null, 
    isPro = false, 
    brandingConfig = {}, 
    onSelect, 
    onLogoUpload, 
    onBrandingUpdate 
  }: Props = $props();

  const tools = [
    { type: 'text', label: 'Text Field', icon: 'T' },
    { type: 'checkbox', label: 'Checkbox', icon: '☑' },
    { type: 'signature', label: 'Signature', icon: '✎' },
    { type: 'date', label: 'Date', icon: '📅' }
  ];

  function handleDragStart(event: DragEvent, type: string) {
    if (event.dataTransfer) {
      event.dataTransfer.setData('application/makepdfform', type);
      event.dataTransfer.effectAllowed = 'copy';
    }
  }

  function handleClick(type: string) {
      if (onSelect) {
          onSelect(selectedTool === type ? null : type);
      }
  }

  function handleFileChange(e: Event) {
      const target = e.target as HTMLInputElement;
      if (target.files?.[0] && onLogoUpload) {
          onLogoUpload(target.files[0]);
      }
  }

  function handleColorChange(e: Event) {
      const target = e.target as HTMLInputElement;
      if (onBrandingUpdate) {
          onBrandingUpdate({ ...brandingConfig, primaryColor: target.value });
      }
  }
</script>

<div class="toolbar-container">
  <div class="section">
    <h3>Fields</h3>
    <div class="tools-list">
      {#each tools as tool}
        <div 
          class="tool-item" 
          class:active={selectedTool === tool.type}
          draggable="true" 
          ondragstart={(e) => handleDragStart(e, tool.type)}
          onclick={() => handleClick(tool.type)}
          role="button"
          tabindex="0"
        >
          <span class="icon">{tool.icon}</span>
          <span class="label">{tool.label}</span>
        </div>
      {/each}
    </div>
  </div>

  <div class="section branding">
    <div class="section-header">
        <h3>Design</h3>
        {#if !isPro}
            <span class="pro-tag">PRO</span>
        {/if}
    </div>

    <div class="branding-tools" class:disabled={!isPro}>
        <div class="tool-group">
            <label for="logo">Logo</label>
            {#if brandingConfig.logoUrl}
                <div class="logo-preview">
                    <img src={brandingConfig.logoUrl} alt="Logo" />
                </div>
            {/if}
            <input 
                type="file" 
                id="logo" 
                accept="image/*" 
                onchange={handleFileChange} 
                disabled={!isPro}
            />
        </div>

        <div class="tool-group">
            <label for="color">Primary Color</label>
            <input 
                type="color" 
                id="color" 
                value={brandingConfig.primaryColor || '#000000'} 
                onchange={handleColorChange}
                disabled={!isPro}
            />
        </div>
    </div>
  </div>
</div>

<style>
  .toolbar-container {
    width: 200px;
    background: white;
    padding: 20px;
    border-right: 1px solid #e0e0e0;
    height: 100vh;
    overflow-y: auto;
  }

  h3 {
    margin-top: 0;
    margin-bottom: 20px;
    font-size: 16px;
    font-weight: 600;
    color: #333;
  }

  .tools-list {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .tool-item {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 4px;
    cursor: grab;
    background: #fff;
    transition: all 0.2s;
  }

  .tool-item:hover, .tool-item.active {
    background: #f9f9f9;
    border-color: #000;
    transform: translateY(-1px);
    box-shadow: 0 2px 4px rgba(0,0,0,0.05);
  }

  .tool-item.active {
      border-width: 2px;
      margin: -1px; /* Offset for border width increase */
  }

  .tool-item:active {
    cursor: grabbing;
  }

  .icon {
    font-size: 18px;
    width: 24px;
    text-align: center;
  }

  .label {
    font-size: 14px;
  }

  .section {
      margin-bottom: 30px;
  }

  .section-header {
      display: flex;
      align-items: center;
      gap: 10px;
      margin-bottom: 20px;
  }

  .section-header h3 {
      margin-bottom: 0;
  }

  .pro-tag {
      font-size: 10px;
      background: #000;
      color: #fff;
      padding: 2px 6px;
      border-radius: 4px;
      font-weight: 800;
  }

  .branding-tools {
      display: flex;
      flex-direction: column;
      gap: 20px;
  }

  .branding-tools.disabled {
      opacity: 0.5;
      pointer-events: none;
      filter: grayscale(1);
  }

  .tool-group {
      display: flex;
      flex-direction: column;
      gap: 8px;
  }

  .tool-group label {
      font-size: 12px;
      font-weight: 600;
      color: #666;
      text-transform: uppercase;
  }

  .logo-preview {
      width: 100%;
      height: 60px;
      border: 1px solid #eee;
      border-radius: 4px;
      display: flex;
      align-items: center;
      justify-content: center;
      overflow: hidden;
      background: #fdfdfd;
  }

  .logo-preview img {
      max-width: 90%;
      max-height: 90%;
      object-fit: contain;
  }

  input[type="file"] {
      font-size: 12px;
  }

  input[type="color"] {
      width: 100%;
      height: 40px;
      padding: 2px;
      border: 1px solid #ddd;
      border-radius: 4px;
      cursor: pointer;
  }
</style>
