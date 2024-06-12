<script lang="ts">
  import { Button, Textarea } from '$lib/components';

  let journal = '';
</script>

<Textarea
  label="Describe your day"
  rows={6}
  bind:value={journal}
  textAreaClass="min-h-20"
  placeholder="What did you eat? How did you feel? How much did you stress? How was your skin? How was your gut?" />

<Button type="submit" class="btn-primary mt-6 w-full">Save your day</Button>
