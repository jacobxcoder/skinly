<script lang="ts">
  import { Icon, Home, CalendarDays, Camera, Cog6Tooth } from 'svelte-hero-icons';

  const links = [
    {
      href: '/',
      icon: Home,
      name: 'Home'
    },
    {
      href: '/calendar',
      icon: CalendarDays,
      name: 'Calendar'
    },
    {
      href: '/gallery/upload',
      icon: Camera,
      name: 'Gallery'
    },
    {
      href: '/settings',
      icon: Cog6Tooth,
      name: 'Settings'
    }
  ] as const;
</script>

<nav class="fixed bottom-0 left-0 mb-6 w-full">
  <div class="px-4">
    <div
      class="mx-auto flex max-w-96 items-end justify-between rounded-[2rem] bg-[#1a1a1a] bg-opacity-60 px-8 py-4 shadow-sm backdrop-blur-md">
      {#each links as { href, icon, name } (href)}
        <a {href} class="flex flex-col items-center justify-center gap-1.5">
          <Icon src={icon} class="h-5 w-5 text-white" />
          <span class="text-xs text-white">{name}</span>
        </a>
      {/each}
    </div>
  </div>
</nav>
