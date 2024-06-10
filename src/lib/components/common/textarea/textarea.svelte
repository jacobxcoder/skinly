<script lang="ts">
  export let id: string | undefined = undefined;
  export let name: string | undefined = undefined;
  export let rows: number = 3; // Default number of rows
  export let placeholder = '';
  export let label: string = '';
  export let value: string | undefined = '';
  export let required: boolean = false;
  export let error: string | boolean = '';

  export let containerClass: string = '';
  export let labelClass: string = '';
  export let textAreaClass: string = '';
</script>

<div class={containerClass}>
  {#if label}
    <label
      for={id}
      class="mb-2 flex justify-between text-sm font-medium leading-6 {error
        ? 'text-error'
        : ''} {labelClass}">
      {label}

      {#if error && typeof error === 'string'}
        <span class="text-error text-right font-bold">{error}</span>
      {/if}
    </label>
  {/if}

  <textarea
    {id}
    {name}
    {rows}
    {placeholder}
    {required}
    class="textarea textarea-bordered w-full {error
      ? 'textarea-error placeholder:text-error placeholder:text-opacity-80'
      : ''} {textAreaClass}"
    bind:value></textarea>
</div>
