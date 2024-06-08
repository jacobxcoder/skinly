<script lang="ts">
  import '../app.postcss';

  import { Button } from '$lib/components';
  import { logout } from '$lib/api/auth.api';

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
</script>

<Button class="btn-primary mb-8" on:click={handleLogout} {loading}>Logout</Button>

<slot />
