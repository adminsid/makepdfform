<script lang="ts">
  import { onMount } from 'svelte';
  import { page } from '$app/stores';

  let formId = $page.params.id;
  let submissions: any[] = $state([]);
  let formTitle = $state('Loading...');
  let loading = $state(true);

  onMount(async () => {
    try {
        const formRes = await fetch(`/api/forms/${formId}`);
        if (formRes.ok) {
            const formData = await formRes.json();
            formTitle = formData.title;
        }

        const subRes = await fetch(`/api/submissions/${formId}`);
        if (subRes.ok) {
            submissions = await subRes.json();
        }
    } catch (e) {
        console.error(e);
    } finally {
        loading = false;
    }
  });
</script>

<style>
  .submissions-container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 40px 20px;
    font-family: sans-serif;
  }

  header {
    margin-bottom: 40px;
  }

  h1 {
    font-size: 2rem;
    margin: 0;
  }

  .subtitle {
    color: #666;
    margin-top: 5px;
  }

  .table-container {
    background: white;
    border: 1px solid #eee;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 2px 5px rgba(0,0,0,0.05);
  }

  table {
    width: 100%;
    border-collapse: collapse;
    text-align: left;
  }

  th {
    background: #fdfdfd;
    padding: 15px;
    border-bottom: 2px solid #eee;
    font-size: 14px;
    font-weight: 600;
    color: #333;
  }

  td {
    padding: 15px;
    border-bottom: 1px solid #eee;
    font-size: 14px;
  }

  .empty-state {
    padding: 60px;
    text-align: center;
    color: #888;
  }

  .data-cell {
    max-width: 400px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .btn-back {
      display: inline-block;
      margin-bottom: 20px;
      color: #666;
      text-decoration: none;
      font-size: 14px;
  }

  .btn-back:hover {
      color: #000;
  }
</style>

<div class="submissions-container">
  <a href="/forms" class="btn-back">← Back to Forms</a>
  
  <header>
    <h1>{formTitle}</h1>
    <p class="subtitle">Submissions Dashboard</p>
  </header>

  {#if loading}
    <div>Loading submissions...</div>
  {:else if submissions.length === 0}
    <div class="table-container">
        <div class="empty-state">No submissions yet for this form.</div>
    </div>
  {:else}
    <div class="table-container">
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Submission Data</th>
          </tr>
        </thead>
        <tbody>
          {#each submissions as sub}
            <tr>
              <td>{new Date(sub.createdAt).toLocaleString()}</td>
              <td class="data-cell">
                <pre style="margin: 0; font-family: monospace; font-size: 12px; background: #f9f9f9; padding: 10px; border-radius: 4px;">
                  {JSON.stringify(sub.data, null, 2)}
                </pre>
              </td>
            </tr>
          {/each}
        </tbody>
      </table>
    </div>
  {/if}
</div>
