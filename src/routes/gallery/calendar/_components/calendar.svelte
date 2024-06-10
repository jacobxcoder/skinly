<script lang="ts">
  import { onMount } from 'svelte';

  interface Task {
    date: Date;
    completed: boolean;
  }

  let today: Date = new Date();
  let currentMonth: number = today.getMonth();
  let currentYear: number = today.getFullYear();

  // Example tasks array
  export let tasks: Task[] = [
    { date: new Date(currentYear, currentMonth, 5), completed: true },
    { date: new Date(currentYear, currentMonth, 15), completed: false },
    { date: new Date(currentYear, currentMonth, 20), completed: true }
  ];

  let daysInMonth: number;
  let startDay: number;

  onMount(() => {
    daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    startDay = new Date(currentYear, currentMonth, 1).getDay();
  });

  function dayStatus(day: number): string {
    const found = tasks.find(
      (task) => task.date.getDate() === day && task.date.getMonth() === currentMonth
    );
    return found ? (found.completed ? 'completed' : 'not-completed') : '';
  }
</script>

<div class="calendar">
  {#each Array(daysInMonth + startDay) as _, index}
    <div class={index < startDay ? 'day' : `day ${dayStatus(index - startDay + 1)}`}>
      {index >= startDay ? index - startDay + 1 : ''}
    </div>
  {/each}
</div>

<style>
  .calendar {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    gap: 10px;
  }
  .day {
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid #ccc;
  }
  .completed {
    background-color: #c8e6c9; /* Green for completed tasks */
  }
  .not-completed {
    background-color: #ffcdd2; /* Red for tasks not completed */
  }
</style>
