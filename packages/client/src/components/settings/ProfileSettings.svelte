<script lang="ts">
  import { authClient, useSession } from '$lib/auth-client';
  import { toast } from "svelte-sonner";
  import { Loader2, X } from "lucide-svelte";

  const session = useSession();
  
  let name = $state("");
  let organization = $state("");
  let image = $state<string | null>(null);
  let loading = $state(false);
  let imageFile = $state<File | null>(null);

  $effect(() => {
    if ($session.data?.user) {
      name = $session.data.user.name;
      // @ts-ignore - organization is a custom field
      organization = $session.data.user.organization || "";
      image = $session.data.user.image || null;
    }
  });

  async function convertImageToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }

  const handleImageChange = async (e: Event) => {
    const file = (e.target as HTMLInputElement)?.files?.[0];
    if (file) {
      imageFile = file;
      image = await convertImageToBase64(file);
    }
  };

  const handleSave = async () => {
    loading = true;
    try {
      await authClient.user.update({
        name,
        image: image,
        // @ts-ignore - organization is a custom field
        organization, 
      });
      toast.success("Profile updated successfully");
    } catch (e: any) {
      toast.error(e.message || "Failed to update profile");
    } finally {
      loading = false;
    }
  };
</script>

<section class="settings-section">
  <header class="section-header">
    <h2 class="title">Profile Settings</h2>
    <p class="subtitle">Manage your public profile and personal details.</p>
  </header>

  <div class="profile-photo-area">
    <div class="avatar-container">
      {#if image}
        <img src={image} alt="Profile" class="w-full h-full object-cover rounded-full" />
      {:else}
        <span class="material-symbols-outlined avatar-placeholder">person</span>
      {/if}
    </div>
    <div class="photo-actions">
      <h3 class="label">Profile Photo</h3>
      <div class="btn-group items-center">
        <label class="primary-btn-outline cursor-pointer">
          Change Photo
          <input type="file" accept="image/*" class="hidden" onchange={handleImageChange} />
        </label>
        {#if image}
          <button class="danger-text-btn" onclick={() => { image = null; imageFile = null; }}>Remove</button>
        {/if}
      </div>
      <p class="help-text">Recommended size: 400x400px. JPG or PNG.</p>
    </div>
  </div>

  <div class="form-grid">
    <div class="form-group">
      <label for="full-name">Full Name</label>
      <input type="text" id="full-name" bind:value={name} class="input" />
    </div>
    {#if $session.data?.user?.email}
    <div class="form-group">
        <label for="email">Email</label>
        <input type="email" id="email" value={$session.data.user.email} disabled class="input opacity-60 cursor-not-allowed" />
    </div>
    {/if}
    <div class="form-group">
      <label for="organization">Organization</label>
      <input type="text" id="organization" bind:value={organization} class="input" />
    </div>
  </div>

  <div class="footer-actions">
    <button class="save-btn flex items-center gap-2" onclick={handleSave} disabled={loading}>
        {#if loading}
            <Loader2 size={16} class="animate-spin" />
        {/if}
        Save Changes
    </button>
  </div>
</section>

<style>
  .settings-section { margin-bottom: 3rem; }

  .section-header {
    border-bottom: 1px solid #000000;
    padding-bottom: 1rem;
    margin-bottom: 2rem;
  }

  :global(.dark) .section-header { border-bottom-color: #ffffff; }

  .title { font-size: 1.25rem; font-weight: 700; color: #000000; }
  :global(.dark) .title { color: #ffffff; }

  .subtitle { font-size: 0.875rem; color: #6b7280; margin-top: 0.25rem; }

  .profile-photo-area { display: flex; gap: 2rem; margin-bottom: 2rem; }

  .avatar-container {
    width: 6rem;
    height: 6rem;
    border-radius: 50%;
    background-color: #e5e7eb;
    border: 1px solid #d1d5db;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    overflow: hidden;
  }

  :global(.dark) .avatar-container { background-color: #1f2937; border-color: #374151; }

  .avatar-placeholder { font-size: 2.25rem; color: #9ca3af; }

  .photo-actions { padding-top: 0.5rem; }

  .label { font-size: 0.875rem; font-weight: 700; color: #000000; margin-bottom: 0.5rem; }
  :global(.dark) .label { color: #ffffff; }

  .btn-group { display: flex; gap: 0.75rem; }

  .primary-btn-outline {
    padding: 0.5rem 1rem;
    font-size: 0.75rem;
    font-weight: 500;
    background-color: #ffffff;
    border: 1px solid #000000;
    border-radius: 0.125rem;
    cursor: pointer;
    transition: background-color 0.2s;
    color: #000000;
  }

  :global(.dark) .primary-btn-outline { background-color: #000000; border-color: #ffffff; color: #ffffff; }

  .primary-btn-outline:hover { background-color: #f9fafb; }
  :global(.dark) .primary-btn-outline:hover { background-color: #1f2937; }

  .danger-text-btn { font-size: 0.75rem; font-weight: 500; color: #dc2626; border: none; background: none; cursor: pointer; }

  .help-text { font-size: 0.75rem; color: #6b7280; margin-top: 0.5rem; }

  .form-grid { display: grid; gap: 1.5rem; max-width: 36rem; }

  .form-group { display: flex; flex-direction: column; }

  label {
    font-size: 0.75rem;
    font-weight: 700;
    text-transform: uppercase;
    color: #111827;
    margin-bottom: 0.375rem;
  }

  :global(.dark) label { color: #ffffff; }

  .input {
    width: 100%;
    background-color: #ffffff;
    border: 1px solid #000000;
    border-radius: 0.125rem;
    padding: 0.5rem 0.75rem;
    font-size: 0.875rem;
    outline: none;
    transition: all 0.2s;
    color: #000;
  }

  :global(.dark) .input { background-color: #000000; border-color: #ffffff; color: #ffffff; }

  .input:focus { box-shadow: 0 0 0 1px #000000; }
  :global(.dark) .input:focus { box-shadow: 0 0 0 1px #ffffff; }

  .footer-actions {
    margin-top: 2rem;
    padding-top: 1.5rem;
    border-top: 1px solid #e5e7eb;
  }

  :global(.dark) .footer-actions { border-top-color: #1f2937; }

  .save-btn {
    padding: 0.625rem 1.25rem;
    font-size: 0.875rem;
    font-weight: 500;
    background-color: #000000;
    color: #ffffff;
    border-radius: 0.125rem;
    border: none;
    cursor: pointer;
    transition: opacity 0.2s;
  }

  :global(.dark) .save-btn { background-color: #ffffff; color: #000000; }

  .save-btn:hover { opacity: 0.9; }
  .save-btn:disabled { opacity: 0.5; cursor: not-allowed; }
</style>
