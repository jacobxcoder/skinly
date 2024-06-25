<script lang="ts">
  import { Icon, CheckCircle } from 'svelte-hero-icons';
  import { PUBLIC_PRICE } from '$env/static/public';

  const features = [
    'Private community access',
    'Daily content & tips',
    'Progress tracking tools',
    'AI skin analysis',
    'Natural remedies',
    'Personalized roadmap'
  ] as const;
</script>

<section id="pricing" class="py-24 sm:py-32">
  <div class="mx-auto max-w-7xl px-6 lg:px-8">
    <div class="mx-auto max-w-2xl sm:text-center">
      <h2 class="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
        Simple no-tricks pricing
      </h2>
      <p class="text-base-content-secondary mt-6 leading-8">
        You get full access to all the features of the application as well as the
        community chats, AI progress tracking tools, and more features which are coming
        out in the upcoming days.
      </p>
    </div>
    <div
      class="mx-auto mt-16 max-w-2xl rounded-3xl ring-1 ring-gray-200 sm:mt-20 lg:mx-0 lg:flex lg:max-w-none">
      <div class="p-8 sm:p-10 lg:flex-auto">
        <h3 class="text-2xl font-bold tracking-tight">Lifetime membership</h3>
        <p class="text-base-content-secondary mt-4 leading-7">
          The price of the application will increase with new users. Do not miss out on
          this opportunity.
        </p>
        <div class="mt-10 flex items-center gap-x-4">
          <h4 class="flex-none text-sm font-semibold leading-6 text-primary">
            What’s included
          </h4>
          <div class="h-px flex-auto bg-gray-100"></div>
        </div>
        <ul
          role="list"
          class="mt-8 grid grid-cols-1 gap-4 text-sm leading-6 text-gray-600 sm:grid-cols-2 sm:gap-6">
          {#each features as feature}
            <li class="flex gap-2">
              <Icon src={CheckCircle} class="h-6 w-5 flex-none text-primary" />
              {feature}
            </li>
          {/each}
        </ul>
      </div>
      <div
        class="-mt-2 flex items-stretch justify-stretch p-2 lg:mt-0 lg:w-full lg:max-w-md lg:flex-shrink-0">
        <div
          class="w-full rounded-2xl bg-gray-50 py-10 text-center ring-1 ring-inset ring-gray-900/5 lg:flex lg:flex-col lg:justify-center lg:py-16">
          <div class="mx-auto max-w-xs px-8">
            <p class="text-base-content-secondary text-base font-semibold">
              Pay once, own it forever
            </p>
            <p class="mt-6 flex items-baseline justify-center gap-x-2">
              <span class="text-5xl font-bold tracking-tight">
                ${(parseInt(PUBLIC_PRICE) / 100).toFixed(2)}
              </span>
              <span
                class="text-base-content-secondary text-sm font-semibold leading-6 tracking-wide">
                USD
              </span>
            </p>
            <a href="/access" class="btn btn-primary mt-10 w-full"> Get access </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
