<script lang="ts">
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';

  let forms: any[] = $state([]);
  let loading = $state(true);

  onMount(async () => {
    try {
      // Create a new endpoint to list forms? 
      // Wait, I only made GET /api/forms/:id and POST /api/forms
      // I need GET /api/forms to list all forms (or user's forms).
      // For now, let's implement GET /api/forms in the backend too.
      // But first, let's assume it exists or I'll add it.
      
      const res = await fetch('/api/forms');
      if (res.ok) {
          forms = await res.json();
      } else {
          // If endpoint doesn't exist yet, we might get 404.
          console.error('Failed to fetch forms');
      }
    } catch (e) {
      console.error(e);
    } finally {
      loading = false;
    }
  });

  function createNew() {
      goto('/editor');
  }

  function viewSubmissions(id: string) {
      goto(`/forms/${id}/submissions`);
  }
  
  function copyPublicLink(id: string) {
      const url = `${window.location.origin}/submit/${id}`;
      navigator.clipboard.writeText(url);
      alert('Link copied to clipboard!');
  }
</script>

<div class="dashboard-container">
  <header>
    <h1>My Forms</h1>
    <button class="btn-primary" onclick={createNew}>+ New Form</button>
  </header>

  {#if loading}
    <div>Loading...</div>
  {:else if forms.length === 0}
    <div class="empty-state">
        <p>You haven't created any forms yet.</p>
        <button class="btn-secondary" onclick={createNew}>Create your first form</button>
    </div>
  {:else}
    <div class="forms-grid">
      {#each forms as form}
        <div class="form-card">
            <h3>{form.title}</h3>
            <p class="date">Created: {new Date(form.createdAt).toLocaleDateString()}</p>
            <div class="actions">
                <button onclick={() => goto(`/editor?id=${form.id}`)}>Edit</button>
                <button onclick={() => viewSubmissions(form.id)}>Submissions</button>
                <button onclick={() => copyPublicLink(form.id)}>Share</button>
            </div>
        </div>
      {/each}
    </div>
  {/if}
</div>

<style>
  .dashboard-container {
      max-width: 1000px;
      margin: 0 auto;
      padding: 40px 20px;
      font-family: sans-serif;
  }
  
  header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 40px;
  }

  .btn-primary {
      background: black;
      color: white;
      border: none;
      padding: 10px 20px;
      border-radius: 4px;
      cursor: pointer;
      font-size: 16px;
  }

  .btn-secondary {
      background: white;
      color: black;
      border: 1px solid black;
      padding: 10px 20px;
      border-radius: 4px;
      cursor: pointer;
  }

  .forms-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      gap: 20px;
  }

  .form-card {
      border: 1px solid #eee;
      border-radius: 8px;
      padding: 20px;
      box-shadow: 0 2px 5px rgba(0,0,0,0.05);
  }

  .form-card h3 {
      margin-top: 0;
  }
  
  .date {
      color: #666;
      font-size: 0.9em;
  }

  .actions {
      display: flex;
      gap: 10px;
      margin-top: 20px;
  }

  .actions button {
      padding: 5px 10px;
      border: 1px solid #ddd;
      background: white;
      border-radius: 4px;
      cursor: pointer;
  }
  
  .actions button:hover {
      background: #f9f9f9;
  }
</style>
