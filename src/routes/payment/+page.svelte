<script lang="ts">
  import { supabase } from '$lib/api';
  import { type User } from '$lib/api/auth';
  import { authorize } from '$lib/hooks';
  import { Icon, CheckCircle } from 'svelte-hero-icons';

  let user: User | undefined | null;

  // Function to handle the payment process
  async function handlePayment() {
    if (!user) {
      alert('Please login to proceed with the payment.');
      return;
    }

    try {
      const { data, error } = await supabase.functions.invoke(
        'create-checkout-session',
        {}
      );

      const _data = JSON.parse(data);

      if (error) {
        console.error('Error during payment process:', error);
        alert('Error during payment process. Please try again.');
        return;
      }

      if (_data.url) {
        window.location.href = _data.url;
      }
    } catch (error) {
      console.error('Error during payment process:', error);
      alert('Error during payment process. Please try again.');
    }
  }

  const features = [
    'Access to premium content',
    'Personalized habit tracker',
    'Journaling & meditation',
    'Community & chats'
  ];

  // Custom hooks
  authorize().then((u) => (user = u));
</script>

<div
  class="mx-auto flex max-w-md flex-col rounded-box border border-base-300 px-6 py-6 text-center">
  <h1 class="mb-2 text-2xl font-semibold">Get rid of pimples</h1>
  <p class="text-base-content-secondary mx-auto mb-3 max-w-md">
    Get full access to all our premium features that will help you clear your skin.
  </p>
  <ul class="mb-6 flex flex-col gap-1">
    {#each features as feature}
      <li class="flex items-center justify-center">
        <Icon src={CheckCircle} class="h-4 w-4 text-green-500" />
        <span class="ml-1">{feature}</span>
      </li>
    {/each}
  </ul>
  <button class="btn btn-primary" on:click={handlePayment}>Access for $4.99/m</button>
  <p class="mt-3 text-sm font-semibold">
    only for the next 29 users - then increases to $15.99/m
  </p>
</div>

<!-- TODO: Get rid of this and move this to the landing page. -->
<p class="text-base-content-secondary mx-auto mt-6 max-w-md px-6 text-center">
  A lot of features are coming to the application in the upcoming days: AI skin quality
  test, meditation sessions, recommended dermatologists. This will be a full roadmap of
  your skin solution.
</p>
