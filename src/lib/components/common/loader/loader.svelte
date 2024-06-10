<script lang="ts">
  let className: string = '';
  export { className as class };

  export let full: boolean = false;

  export let spinnerClass: string = '';
</script>

<div
  class="{full
    ? 'fixed'
    : 'absolute'} left-0 top-0 flex h-full w-full items-center justify-center {className}">
  <div class="loading loading-spinner {spinnerClass}"></div>
</div>
