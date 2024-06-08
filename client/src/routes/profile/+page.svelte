<script lang="ts">
  import { getUser, type User } from '$lib/api/auth.api';
  import Loader from '$lib/components/common/loader/loader.svelte';

  let loading = false;
  let user: User | null = null;

  async function fetchUser() {
    loading = true;

    try {
      const response = await getUser();
      user = response.user;

      console.log('user: ', user);
    } catch (e) {
      console.error(e);
    }

    loading = false;
  }

  fetchUser();
</script>

{#if loading}
  <Loader />
{/if}

{#if user}
  <h1>Welcome, {user.email}</h1>
  <p>Your account was created: {user.created_at}</p>
{/if}
