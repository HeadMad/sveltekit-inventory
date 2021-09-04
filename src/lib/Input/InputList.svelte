<script>
  import { getContext, createEventDispatcher } from "svelte";
  import { createEventActions } from './listEventActions.js';

  export let items = [];
  export let keyActions = {};

  
  let selected = -1;
  let focused = -1;
  let visible = true;
  
  const dispatch = createEventDispatcher();
  const value = getContext('input-value');
  const state = getContext('input-state');
  
  $: selected = focused = items.indexOf($value);
  
  const list = {
    get items() {return items; },
    get selected() { return selected; },
    get focused() { return focused; },
    get visible() { return visible; },
    
    show: () => visible = true,
    hide: () => visible = false,
    toggle: () => visible = !visible,
    focus: (i) => focused = i, 
    change: (func) => items = func(items),
    
    select(index) {
      if (typeof index === "number")
      focused = index;
      if (focused === -1 || selected === focused)
      return false;
      
      $value = items[focused];
      dispatch("select", {index, value: $value});
      selected = focused;
      return $value;
    },
    offsetFocus(add) {
      const len = items.length;
      let newIndex = (focused + add) % len;
      if (newIndex < 0) newIndex = len + newIndex;
      focused = newIndex;
      return newIndex;
    },
  };
  
  
  const eventActions = createEventActions(list, keyActions);
  
  state.subscribe(({ type, event }) => {
    if (type in eventActions) {
      
      const actionResponse = eventActions[type](event);
      
      if (typeof actionResponse === 'function') 
        actionResponse(dispatch);
    }
  });
</script>


{#if items.length}
<ul
class="input__list"
class:input__list_visible={visible}
>
  {#each items as item, index}
    <li
      on:click={ () => list.select(index) }
      class="input__item"
      class:input__item_selected={index === selected}
      class:input__item_focused={index === focused}
    >
      <slot
        {item}
        {index}

        focused={index === focused}
        selected={index === selected}
      >{item}</slot>
    </li>
  {/each}
</ul>
{/if}

<style>
  .input__list {
    position: absolute;
    box-sizing: border-box;
    border-radius: 4px;
    padding: 8px;
    margin: 10px 0 0;
    min-width: 100%;
    list-style: none;
    background-color: #fff;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.15);
    visibility: hidden;
  }

  .input__list:hover,
  .input__list_visible {
    visibility: visible;
  }

  .input__item {
    padding: 0.2em 0.4em;
    border-radius: 2px;
    white-space: nowrap;
    cursor: pointer;
    margin: 2px 0;
  }

  .input__item_focused,
  .input__item:hover {
    background: var(--light);
    color: var(--dark);
  }

  .input__item_selected,
  .input__item_selected:hover {
    background: var(--dark);
    color: #fff;
  }
</style>
