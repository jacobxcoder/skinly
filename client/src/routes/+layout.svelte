<script lang="ts">
  import '../app.postcss';

  import { Notifications, Button } from '$lib/components';
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

<!-- Container for the toast notifications -->
<Notifications />

<Button class="btn-primary mb-8" on:click={handleLogout} {loading}>Logout</Button>

<slot />
