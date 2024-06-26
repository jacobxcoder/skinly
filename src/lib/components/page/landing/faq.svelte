<script lang="ts">
  import { fade } from 'svelte/transition';
  import { Icon, Plus, Minus } from 'svelte-hero-icons';
  import { PUBLIC_PRICE } from '$env/static/public';

  interface Question {
    question: string;
    answer: string;
    open: boolean;
  }

  const questions: Question[] = [
    {
      question: 'What type of solutions do you propose?',
      answer:
        'We propose only fully natural, diet-based solutions. We are not sponsored by anyone and we do not promote any medications from drug store. We believe that acne starts in the gut and you will have to clear your acne from inside. We do not stand by any diet like vegetarian, carnivore, or keto - we try to analyze the benefits and disadvantages of each of the unprocessed diets so that it fits your lifestyle.',
      open: false
    },
    {
      question: 'How much does it cost?',
      answer: `Currently, the price is $${(parseInt(PUBLIC_PRICE) / 100).toFixed(2)}, but it will increase once our userbase grows.`,
      open: false
    },
    {
      question: "What if I don't clear my acne?",
      answer:
        "It's very unlikely for you to not get a clear skin once you implement all the habits that we promote. However, each body is different and you may struggle with a more serious skin issue than 99% of people having acne -- in this case it might be worth visiting a doctor (once you try out all the habits that we list for 90 days.)",
      open: false
    },
    {
      question: 'What will I get in this application?',
      answer:
        'You will get access to a list of all the habits to implement as well as a habit tracker. You will also be able to track your progress through our tracking tool (soon, AI will analyze photos to give you realistic & objective feedback each day). Apart from that, you have access to the community chats, daily content & tips, and all the features which are about to come in the upcoming days. You get a guarantee that the price will not change for you (but the prices for others will increase as our app grows).',
      open: false
    }
  ];
</script>

<section id="faq" class="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8 lg:py-40">
  <div class="mx-auto max-w-4xl divide-y divide-gray-900/10">
    <h2 class="text-2xl font-bold leading-10 tracking-tight">
      Frequently asked questions
    </h2>
    <dl class="mt-10 space-y-6 divide-y divide-gray-900/10">
      {#each questions as { question, answer, open }}
        <div class="pt-6">
          <dt>
            <!-- Expand/collapse question button -->
            <button
              type="button"
              class="flex w-full items-start justify-between text-left"
              on:click={() => (open = !open)}>
              <span class="text-base font-semibold leading-7">
                {question}
              </span>
              <span class="ml-6 flex h-7 items-center">
                <div class="swap swap-rotate">
                  <Icon src={Plus} class="{open ? 'swap-on' : 'swap-off'} h-6 w-6" />
                  <Icon src={Minus} class="{open ? 'swap-off' : 'swap-on'} h-6 w-6" />
                </div>
              </span>
            </button>
          </dt>
          {#if open}
            <dd class="pr-12 pt-2" transition:fade={{ duration: 150 }}>
              <p class="text-base-content-secondary text-base leading-7">
                {answer}
              </p>
            </dd>
          {/if}
        </div>
      {/each}
    </dl>
  </div>
</section>
