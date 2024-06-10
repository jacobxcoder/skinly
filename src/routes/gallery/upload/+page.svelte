<script lang="ts">
  import { goto } from '$app/navigation';
  import { type User } from '$lib/api/auth';
  import { getSelfiesURLsByDate, uploadSelfie } from '$lib/api/selfies/selfies.api';
  import { Loader, Button, notify } from '$lib/components';
  import { authorize } from '$lib/hooks';

  let user: User | undefined | null;

  let files: FileList | undefined;

  let selfies: { signedUrl: string }[] = [];

  let loading: boolean = false;

  async function uploadFiles() {
    if (!user) {
      notify('error', 'Please log in first!', 'You need to be logged in ');
      goto('/auth/login');
      return;
    }

    if (!files || files?.length === 0) {
      notify('error', 'No files selected!', 'Please select at least one file to upload.');
      return;
    }

    if (files.length > 3) {
      notify(
        'error',
        'Too many files selected!',
        'Please select maximum 3 files to upload.'
      );
      return;
    }

    loading = true;

    const now = new Date();

    const uploadPromises = [];
    for (const file of files) {
      uploadPromises.push(uploadSelfie(user, file, now));
    }

    try {
      const results = await Promise.all(uploadPromises);
      console.log('results: ', results);
    } catch (e) {
      notify(
        'error',
        'Upload failed.',
        'An error occurred while uploading the file. Please try again later.'
      );
    } finally {
      loading = false;
    }
  }

  async function fetchSelfies() {
    selfies = await getSelfiesURLsByDate(new Date());
  }

  // Custom hooks
  authorize().then((u) => (user = u));
</script>

{#if loading}
  <Loader full class="bg-base-200 bg-opacity-50" />
{/if}

<div class="mb-10">
  <h1 class="mb-2 text-3xl font-semibold md:text-5xl">Upload photos</h1>
  <p class="text-base-content-secondary mb-8">
    In order to track your progress, it's recommended that you upload a selfie every day.
    This way, you can see how your body changes over time based on your habits &
    consumption.
  </p>

  <div class="flex flex-col gap-4">
    <h2 class="text-lg font-semibold">Pick 3 selfies.</h2>

    <label class="form-control w-full">
      <div class="label">
        <span class="label-text">Pick a file</span>
      </div>

      <input
        type="file"
        class="file-input file-input-bordered file-input-primary w-full"
        multiple
        accept="image/*"
        bind:files />

      <div class="label">
        <span class="label-text-alt">
          These images will be used for tracking the progress of the quality of your skin.
        </span>
      </div>
    </label>

    <Button class="btn-primary" on:click={uploadFiles}>Upload photos</Button>
  </div>
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
