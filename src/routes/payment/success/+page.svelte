<script lang="ts">
  import { Icon, CursorArrowRipple } from 'svelte-hero-icons';
</script>

<div class="mx-auto max-w-xl px-6 py-12">
  <h1 class="text-center text-2xl font-bold">Welcome to Skinly!</h1>
  <p class="text-base-content-secondary mt-3 text-center">
    Your payment has been successful. You now have full access to the application.
  </p>
  <div class="mt-6 flex justify-center">
    <a href="/payment" class="btn btn-primary">
      Let's clear your skin <Icon src={CursorArrowRipple} class="h-4 w-4" />
    </a>
  </div>
</div>
