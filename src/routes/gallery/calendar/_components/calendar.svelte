<script lang="ts">
  import { onMount } from 'svelte';

  enum State {
    COMPLETED = 'completed',
    NOT_COMPLETED = 'not-completed',
    BLANK = 'blank'
  }

  interface Task {
    date: Date;
    completed: State;
  }

  let today: Date = new Date();
  let currentMonth: number = today.getMonth();
  let currentYear: number = today.getFullYear();

  // Example tasks array
  export let tasks: Task[] = [
    { date: new Date(currentYear, currentMonth, 5), completed: State.NOT_COMPLETED },
    { date: new Date(currentYear, currentMonth, 15), completed: State.COMPLETED },
    { date: new Date(currentYear, currentMonth, 20), completed: State.NOT_COMPLETED }
  ];

  let daysInMonth: number = 0;
  let startDay: number = 0;

  onMount(() => {
    daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    startDay = new Date(currentYear, currentMonth, 1).getDay();
  });

  function dayStatus(day: number): State {
    const found = tasks.find(
      (task) => task.date.getDate() === day && task.date.getMonth() === currentMonth
    );

    return found ? found.completed : State.BLANK;
  }
</script>

<div class="grid grid-cols-7 gap-2 px-4">
  {#each Array(daysInMonth + startDay) as _, index}
    {#if index >= startDay}
      {@const status = dayStatus(index - startDay + 1)}
      <div
        class="flex h-8 w-8 items-center justify-center rounded-full border border-base-300
          {status === State.COMPLETED
          ? 'bg-green-200'
          : status === State.NOT_COMPLETED
            ? 'bg-red-200'
            : ''}
        ">
        {index - startDay + 1}
      </div>
    {/if}
    {#if index < startDay}
      <div></div>
    {/if}
  {/each}
</div>
