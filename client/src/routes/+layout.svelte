<script lang="ts">
  import '../app.postcss';
  import { onMount } from 'svelte';

  import { Notifications, Button } from '$lib/components';
  import { logout } from '$lib/api/auth';
  import { auth } from '$lib/stores/auth';
  import { supabase } from '$lib/api';

  let loading = false;

  async function handleLogout() {
    loading = true;

    try {
      await logout();
      location.reload();
    } catch (e) {
      console.error('Failed to log out...');
    }

    loading = false;
  }

  /**
   * TODO: Need to check if it's always congruent with the $auth
   * store. May be potentially a source of strange auth-related bugs.
   */
  onMount(() => {
    const { data } = supabase.auth.onAuthStateChange((_, session) => {
      if (session?.user) {
        $auth = {
          user_id: session.user.id,
          email: session.user?.email
        };
      } else {
        $auth = null;
      }
    });

    return () => {
      data.subscription.unsubscribe();
    };
  });
</script>

<div class="user-data">
  <p>User id: {$auth?.user_id}</p>
  <p>User email: {$auth?.email}</p>
</div>

<!-- Container for the toast notifications -->
<Notifications />

<Button class="btn-primary mb-8" on:click={handleLogout} {loading}>Logout</Button>

<slot />
