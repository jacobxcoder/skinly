<script lang="ts">
  const links = [
    {
      name: 'What is it?',
      href: '/#features',
      cta: false
    },
    {
      name: 'Sign in',
      href: '/auth/login',
      cta: false
    },
    {
      name: 'Get access',
      href: '/#access',
      cta: true
    }
  ] as const;
</script>

<nav
  class="fixed left-0 top-0 w-full border-b border-base-300 bg-white bg-opacity-90 px-8 py-6 shadow-sm backdrop-blur-sm">
  <div class="mx-auto flex max-w-3xl items-center justify-between">
    <!-- Here should be a logo -->
    <div id="logo">
      <p class="font-semibold tracking-wide text-primary">skinly</p>
    </div>

    <ul class="flex items-center justify-end gap-8 text-sm lg:text-base">
      {#each links as link}
        <li>
          <a
            href={link.href}
            class={link.cta
              ? 'font-bold text-primary underline underline-offset-2 hover:text-green-500'
              : 'text-base-content-secondary hover:text-primary'}>
            {link.name}
          </a>
        </li>
      {/each}
    </ul>
  </div>
</nav>
