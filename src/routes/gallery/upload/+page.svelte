<script lang="ts">
  import { goto } from '$app/navigation';
  import { type User } from '$lib/api/auth';
  import { getSelfiesURLsByDate, uploadSelfie } from '$lib/api/selfies/selfies.api';
  import { Button, notify } from '$lib/components';
  import { authorize } from '$lib/hooks';

  let user: User | undefined | null;

  let files: FileList | undefined;

  let selfies: { signedUrl: string }[] = [];

  async function uploadFiles() {
    if (!user) {
      notify('error', 'Please log in first!', 'You need to be logged in ');
      goto('/auth/login');
      return;
    }

    const filteredFiles = files?.filter((file) => file);

    if (filteredFiles.length === 0) {
      alert('Please select a file first!');
      return;
    }

    const now = new Date();
    const uploadPromises = filteredFiles.map(
      (file) => file && uploadSelfie(user, file, now)
    );

    try {
      const results = await Promise.all(uploadPromises);
      console.log('results: ', results);
    } catch (e) {
      notify(
        'error',
        'Upload failed.',
        'An error occurred while uploading the file. Please try again later.'
      );
    }
  }

  async function fetchSelfies() {
    selfies = await getSelfiesURLsByDate(new Date());
  }

  // Custom hooks
  authorize().then((u) => (user = u));
</script>

<div class="mb-10 flex flex-col gap-4">
  <input type="file" multiple accept="image/*" bind:files />

  <Button class="btn-primary" on:click={uploadFiles}>Upload photos</Button>
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
