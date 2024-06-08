<script lang="ts">
  import { getUser, type User } from '$lib/api/auth.api';

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
  <div class="absolute left-0 top-0 flex h-full w-full items-center justify-center">
    <div class="loading loading-spinner"></div>
  </div>
{/if}

{#if user}
  <h1>Welcome, {user.email}</h1>
  <p>Your account was created: {user.created_at}</p>
{/if}
