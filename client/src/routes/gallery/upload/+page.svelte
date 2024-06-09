<script lang="ts">
  import { browser } from '$app/environment';
  import { uploadSelfie } from '$lib/api/selfies/selfies.api';
  import { auth } from '$lib/stores/auth';

  let file: File | null = null;

  // Function to handle file changes
  function handleFileChange(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      file = input.files[0];
    }
  }

  // Function to upload the file
  async function uploadFile() {
    if (!file) {
      alert('Please select a file first!');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);
    formData.append('date', new Date().toISOString());
    formData.append('user_id', $auth?.user_id || '');

    try {
      const response = await uploadSelfie(formData);

      alert(`Upload successful: ${JSON.stringify(response.data)}`);
    } catch (error: any) {
      alert(`Upload failed: ${error.response?.data || error.message}`);
    }
  }
</script>

{#if browser}
  <div>
    <input type="file" on:change={handleFileChange} />
    <button on:click={uploadFile} disabled={!file}>Upload File</button>
  </div>
{:else}
  <p>This feature is only available in the browser.</p>
{/if}
