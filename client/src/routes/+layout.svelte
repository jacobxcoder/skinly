<script lang="ts">
  import '../app.postcss';
  import { theme } from '$lib/stores/theme';

  $: document.documentElement.setAttribute('data-theme', $theme);
</script>

<slot />
