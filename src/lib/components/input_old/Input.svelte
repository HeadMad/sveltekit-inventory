<script>
  import { setContext } from 'svelte';
  import { writable } from 'svelte/store';
  
  let label = '';
  let value = '';

  const state = writable({type: 'init'});
  setContext('input-state', state);
  
  const inputValue = writable(value);
  setContext('input-value', inputValue);
  inputValue.subscribe(newVal => value = newVal);
  
  let control;

  const focus = () => control.focus();
  const blur = () => control.blur();
  
  const changeState = (event) => $state = {type: event.type, event};

  export {
    value,
    label,
    focus,
    blur
  }
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
  on:change={ changeState }
  on:input={ changeState }
  
  on:input
  on:change
  on:blur
  on:click
  on:focus
  on:keydown
  >
  
  {#if label}
  <span
    class="input__label"
    class:input__label_top={ value }
  >{ label }</span>
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
    box-sizing: border-box;
    width: 100%;
    height: 2em;
    padding: 0 .4em;
    margin: 0;
  }
  
  .input__control:focus {
    position: relative;
    z-index: 1;
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