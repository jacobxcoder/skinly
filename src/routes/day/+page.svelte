<script lang="ts">
  import { Button, Textarea } from '$lib/components';
  import Habit from './_components/habit.svelte';

  let journal = '';
</script>

<Textarea
  label="Describe your day"
  rows={6}
  bind:value={journal}
  textAreaClass="min-h-20"
  placeholder="What did you eat? How did you feel? How much did you stress? How was your skin? How was your gut?" />

<section>
  <h2 class="text-xl font-bold">Habits</h2>
  <Habit
    habit={{
      id: '1',
      name: 'Drink 2L of water',
      description: 'Drink 2 liters of water every day',
      frequency: 'daily',
      completed: false
    }} />
</section>

<Button type="submit" class="btn-primary mt-6 w-full">Save your day</Button>
