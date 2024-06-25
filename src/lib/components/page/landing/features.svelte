<script lang="ts">
  import { Icon, AcademicCap, ChartBar, Users } from 'svelte-hero-icons';

  const features = [
    {
      icon: AcademicCap,
      title: 'Daily 5-minute tips.',
      description:
        'Every single day, we study a certain podcast alongside the research provided there and condense it into a 5-minute article with practical tips which you can implement.'
    },
    {
      icon: ChartBar,
      title: 'Progress tracker.',
      description:
        'Full tracking tool for tracking your mood, face, pimple count, and getting reports based on your progress.'
    },
    {
      icon: Users,
      title: 'Community chats.',
      description:
        'You get access to all the users, chats, where you have a community of people with the same goals as yours where you can ask for advice and give advice.'
    }
  ] as const;
</script>

<section id="features" class="overflow-hidden bg-white py-24 sm:py-32">
  <div class="mx-auto max-w-7xl px-6 lg:px-8">
    <div
      class="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2">
      <div class="lg:pr-8 lg:pt-4">
        <div class="lg:max-w-lg">
          <h2 class="font-semibold leading-7 text-primary">Heal your skin for good</h2>
          <p class="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
            Your roadmap to clear skin
          </p>
          <p class="text-base-content-secondary mt-6">
            Skinly is an application for both web and mobile which serves as your guidance
            through the confusing world of dermatology and skincare. It's a holistic tool.
          </p>
          <dl class="mt-10 max-w-xl space-y-8 text-base leading-7 lg:max-w-none">
            {#each features as feature}
              <div class="relative pl-9">
                <dt class="inline font-semibold">
                  <Icon
                    solid
                    src={feature.icon}
                    aria-hidden="true"
                    class="absolute left-1 top-1 h-5 w-5 text-primary" />
                  {feature.title}
                </dt>
                <dd class="text-base-content-secondary inline">
                  {feature.description}
                </dd>
              </div>
            {/each}
          </dl>
        </div>
      </div>
      <img
        src="https://tailwindui.com/img/component-images/dark-project-app-screenshot.png"
        alt="Product screenshot"
        class="w-[48rem] max-w-none rounded-xl shadow-xl ring-1 ring-gray-400/10 sm:w-[57rem] md:-ml-4 lg:-ml-0"
        width="2432"
        height="1442" />
    </div>
  </div>
</section>
