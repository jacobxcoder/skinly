<script lang="ts">
  interface Habit {
    id: string;
    name: string;
    description: string;
    frequency: string;
    completed: boolean;
  }

  export let habit: Habit;
</script>

<div class="flex items-center justify-between">
  <div>
    <h3 class="text-lg font-semibold">{habit.name}</h3>
    <p class="text-sm text-gray-500">{habit.description}</p>
  </div>

  <input type="checkbox" bind:checked={habit.completed} />
</div>
