<script>
  import {onMount, setContext} from 'svelte';
  import { writable } from 'svelte/store';
  
  export let label = '';
  export let value = '';

  const state = writable({type: 'init'});
  setContext('input-state', state);
  
  const inputValue = writable(value);
  setContext('input-value', inputValue);
  inputValue.subscribe(newVal => value = newVal);
  
  let control;

  export const focus = () => control.focus();
  export const blur = () => control.blur();
  
  const changeState = (event) => $state = {type: event.type, event};

</script>

<label
class="input{ $$restProps.class ? ' ' + $$restProps.class : '' }"
>
  <input
  {...$$restProps}
  
  bind:value={$inputValue}
  bind:this={control}
  
  autocomplete="off"
  class="input__control"
  
  on:focus={ changeState }
  on:blur={ changeState }
  on:click={ changeState }
  on:keydown={ changeState }
  
  on:blur
  on:click
  on:focus
  on:keydown
  >
  
  {#if label}
  <span
  class="input__label"
  class:input__label_top={ value }
  >{label}</span>
  {/if}
  <slot />
</label>

<style>
  .input {
    position: relative;
    display: inline-block;
    padding:  1.2em 0 0;
  }

  .input__control {
    width: 100%;
    margin: 0;
  }

  .input__label {
    position: absolute;
    transition: .15s;
    left: 0.4em;
    top: 1.6em;
    color: #777;
  }

  .input__control:focus + .input__label,
  .input__label_top {
    top: 0;
    left: 0.5em;
    font-size: 0.8em;
  }

</style>