<script lang="ts">
  import { fade } from 'svelte/transition';
  import { page } from '$app/stores';
  import { Bars3, Icon, Plus, XMark, Sun, Moon } from 'svelte-hero-icons';
  import { Button } from '$lib/components';

  // @DO: Replace those links with your own
  const links = [
    {
      name: 'What is it?',
      href: '/',
      external: false
    },
    {
      name: 'Documentation',
      href: '/docs',
      external: false
    },
    {
      name: 'Examples',
      href: '/#examples',
      external: false
    },
    {
      name: 'GitHub',
      href: 'https://github.com/jacobxcoder/sveltekit-ultrafast/',
      external: true
    }
  ] as const;

  let mobileMenuOpen = false;
</script>

<nav>
  <div class="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
    <div class="flex h-16 justify-between">
      <div class="flex">
        <div class="-ml-2 mr-4 flex items-center md:hidden">
          <!-- Mobile menu button -->
          <Button
            type="button"
            class="btn-ghost bg-transparent shadow-none"
            on:click={() => (mobileMenuOpen = !mobileMenuOpen)}
            aria-controls="mobile-menu"
            aria-expanded="false">
            <Icon
              src={Bars3}
              class="h-6 w-6 {mobileMenuOpen ? 'hidden' : 'block'}"
              stroke-width="1.5"
              stroke="currentColor"
              aria-hidden="true" />

            <Icon
              src={XMark}
              class="h-6 w-6 {mobileMenuOpen ? 'block' : 'hidden'}"
              fill="currentColor"
              aria-hidden="true" />
          </Button>
        </div>
        <div class="text-primary flex flex-shrink-0 items-center">
          <a href="/">
            <!-- @DO: Your logo here
                        <enhanced:img
                            class="h-6 w-auto"
                            src="$lib/assets/logo.svg"
                            alt="@DO: Fill your company name" />
                        -->
            <!-- @DO: Remove temporary logo -->
            <span class="block font-mono text-sm font-semibold"> ultrafast </span>
          </a>
        </div>
        <div class="hidden md:ml-6 md:flex md:items-center md:space-x-4">
          {#each links as link}
            <a
              href={link.href}
              class="hover:bg-base-300 rounded-md px-3 py-2 text-sm font-medium
                                {link.href === '/'
                ? $page.url.pathname === '/'
                : $page.url.pathname.startsWith(link.href)
                  ? 'text-primary'
                  : ''}"
              target={link?.external ? '_blank' : '_self'}>
              {link.name}
            </a>
          {/each}
        </div>
      </div>
      <div class="flex items-center gap-2">
        <!-- @DO: This is a space for your CTA -->
        <a
          href="https://github.com/gillbatesdev/sveltekit-ultrafast/"
          class="btn btn-primary rounded-full text-xs"
          target="_blank">
          Clone from GitHub
        </a>

        <!--
                    @DO: Replace those social media links with your own.
                    You can also add more social media links here.
                    Or completely get rid of this section.
				<a
					href="@DO:your-facebook-link"
					class="btn btn-outline border-base-300"
					target="_blank">
					<enhanced:img src="$lib/assets/icons/facebook.svg" class="h-5 w-5" />
				</a>

				<a
					href="@DO:your-twitter-link"
					class="btn btn-outline border-base-300"
					target="_blank">
					<enhanced:img src="$lib/assets/icons/twitter.svg" class="h-5 w-5" />
				</a>

				<a
					href="@DO:your-github-link"
					class="btn btn-outline border-base-300"
					target="_blank">
					<enhanced:img src="$lib/assets/icons/github.svg" class="h-6 w-6" />
				</a>
                -->
      </div>
    </div>
  </div>

  <!-- Mobile menu, show/hide based on menu state. -->
  {#if mobileMenuOpen}
    <div class="absolute z-50 w-full md:hidden" id="mobile-menu" transition:fade>
      <div class="bg-base-100 space-y-1 px-2 pb-3 pt-2 shadow sm:px-3">
        {#each links as link}
          <a
            href={link.href}
            class="hover:bg-base-300 block rounded-md px-3 py-2 text-base font-medium
                            {$page.url.pathname === link.href
              ? 'bg-primary text-primary-content hover:text-primary pointer-events-none'
              : ''}"
            target={link.external ? '_blank' : '_top'}>
            {link.name}
          </a>
        {/each}
      </div>
    </div>
  {/if}
</nav>
