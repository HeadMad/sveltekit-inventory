<script>
  import Input from '../input_old/Input.svelte';
  import InputList from '../input_old/InputList.svelte';
  import keyActions from './userKeyActions.js';

  export let value = '';
  export let editable = null;
  export let list  = [];
  export let label = '';

  $: $$restProps.readonly = editable ? null : true;


</script>

<Input
  { label }
  bind:value
  {...$$restProps}
>
  <InputList
    { keyActions }
    items={list}
    on:select
    on:save
    on:enter={() => editable = !editable}
  />
</Input>