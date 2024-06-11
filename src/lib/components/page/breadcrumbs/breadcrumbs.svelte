<script lang="ts">
  import { Icon, Home, ChevronRight } from 'svelte-hero-icons';
  import { page } from '$app/stores';
  import type { Readable } from 'svelte/store';
  import { derived } from 'svelte/store';

  interface Breadcrumb {
    name: string;
    path: string;
  }

  const BreadcrumbMap: Record<string, string> = {
    '/': 'Home',
    '/gallery': 'Gallery',
    '/gallery/calendar': 'History',
    '/gallery/upload': 'Upload',
    '/settings': 'Settings'
  };

  const breadcrumbs: Readable<Breadcrumb[]> = derived(page, ($page) => {
    const pathSnippets = $page.url.pathname.split('/').filter(Boolean);
    const paths: Breadcrumb[] = [];

    pathSnippets.reduce((prevPath, currentSnippet) => {
      const path = `${prevPath}/${currentSnippet}`;
      paths.push({
        name: BreadcrumbMap[path],
        path
      });
      return path;
    }, '');

    return paths;
  });
</script>

{#if $breadcrumbs.length}
  <nav class="mb-6 flex px-6 py-12" aria-label="Breadcrumb">
    <ol role="list" class="flex items-center space-x-4 text-sm">
      <li>
        <div class="flex items-center">
          <a href="/" class="text-base-content-secondary">
            <Icon
              src={Home}
              class="text-base-content-secondary h-5 w-5 flex-shrink-0"
              solid />
          </a>
        </div>
      </li>
      {#each $breadcrumbs as breadcrumb, i}
        <li>
          <div class="flex items-center">
            <Icon src={ChevronRight} class="text-base-content-secondary h-5 w-5" />

            {#if i < $breadcrumbs.length - 1}
              <a href={breadcrumb.path} class="text-base-content-secondary ml-4">
                {breadcrumb.name}
              </a>
            {:else}
              <span class="text-base-content-secondary ml-4">{breadcrumb.name}</span>
            {/if}
          </div>
        </li>
      {/each}
    </ol>
  </nav>
{:else}
  <div class="mb-12"></div>
{/if}
