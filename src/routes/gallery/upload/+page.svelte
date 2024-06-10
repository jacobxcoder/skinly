<script lang="ts">
  import { Button } from '$lib/components';
  import {
    getSelfiesByDate,
    getSelfiesURLsByDate,
    uploadSelfie
  } from '$lib/api/selfies/selfies.api';

  let file: File | null = null;
  let selfies: { signedUrl: string }[] = [];

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

    try {
      const response = await uploadSelfie(file, new Date());
      console.log('response: ', response);
    } catch (error: any) {
      console.log('error: ', error);
    }
  }

  async function fetchSelfies() {
    selfies = await getSelfiesURLsByDate(new Date());
    console.log('selfies: ', selfies);
  }
</script>

<div>
  <input type="file" on:change={handleFileChange} />
  <button on:click={uploadFile} disabled={!file}>Upload File</button>
</div>

<p>List of selfies from today:</p>
<ul>
  {#each selfies as selfie}
    <li>
      {selfie.signedUrl}
      <img src={selfie.signedUrl} alt="" />
    </li>
  {/each}
</ul>

<Button on:click={fetchSelfies}>Fetch selfies</Button>
