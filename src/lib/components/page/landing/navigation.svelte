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
  class="fixed left-0 top-0 w-full border-b border-base-300 bg-base-200 bg-opacity-10 px-6 py-6 shadow-sm backdrop-blur-sm">
  <div class="mx-auto flex max-w-3xl items-center justify-between">
    <!-- Here should be a logo -->
    <div id="logo">
      <p class="font-semibold tracking-wide text-primary">skinly</p>
    </div>

    <ul class="flex items-center justify-end gap-8">
      {#each links as link}
        <li>
          <a
            href={link.href}
            class={link.cta
              ? 'rounded-btn bg-primary px-3 py-2.5 font-semibold text-primary-content'
              : 'text-base-content-secondary hover:text-primary'}>
            {link.name}
          </a>
        </li>
      {/each}
    </ul>
  </div>
</nav>
