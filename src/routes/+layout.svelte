<script lang="ts">
  import '../app.postcss';
  import { onMount } from 'svelte';

  import Navigation from '$lib/components/page/navigation/navigation.svelte';
  import Breadcrumbs from '$lib/components/page/breadcrumbs/breadcrumbs.svelte';

  import { Notifications } from '$lib/components';
  import { auth } from '$lib/stores/auth';
  import { supabase } from '$lib/api';

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

<!-- Container for the toast notifications -->
<Notifications />

<Breadcrumbs />

<slot />

<Navigation />
