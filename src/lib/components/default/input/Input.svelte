<script>
  import { createEventDispatcher } from "svelte";
  let list = [];
  let focused = -1;
  let selected = -1;
  let visible = false;
  let spread = 10;

  let value;
  let input;

  $: selectValue = list[focused];
  $: items = [...new Set(list)];
  $: {
    selected = items.indexOf(value);
    focused = items.indexOf(value);
  }
  $: listSize = Math.max(2, Math.min(spread, items.length));

  const dispatch = createEventDispatcher();

  function select(newValue) {
    value = newValue;
    visible = false;
    dispatch("select", selectValue);
  }

  const inputArrowAction = (add) => (event) => {
    const len = items.length;
    if (focused >= len) focused = 0;
    else if (focused === -1) focused = add === 1 ? 0 : len - 1;
    else focused = (len + focused + add) % len;
    
    visible = true;
    event.preventDefault();
  };

  const inputKeydownHandlers = {
    ArrowUp: inputArrowAction(-1),
    ArrowDown: inputArrowAction(1),
    Escape() {
      visible = false;
    },
    Tab() {
      visible = false;
    },
    Enter() {
      if (visible && selectValue) {
        select(selectValue);
      } else {
        dispatch("enter");
      }
    },
  };

  function onInputKeydown(event) {
    if (event.code in inputKeydownHandlers)
      inputKeydownHandlers[event.code](event);
  }

  function selectClick(event) {
    select(event.target.value);
    input.focus();
  }

  function onBodyclick(event) {
    if (!visible) return;
    let target = event.target;
    while (target) {
      if (target === input.parentNode) return;
      target = target.parentNode;
    }
    visible = false;
  }

  export { list, value, spread, input as ref };
</script>

<svelte:body on:click={onBodyclick} />

<div
class="input{$$restProps.class ? ' ' + $$restProps.class : ''}"
>
  <slot name="before" />
  <label
    class:list={items.length}
    class:visible
    class="input__label"
  >
    <input
      type="text"
      {...$$restProps}
      class="input__controll"

      bind:this={input}
      bind:value

      on:click={() => (visible = !visible)}
      on:keydown={onInputKeydown}
      on:input
      on:click

    />
</label>
  {#if items.length}
    <select
      class="input__list"
      tabindex="-1"
      size={listSize}

      class:visible
      class:scrolling={listSize < items.length}

      bind:value={selectValue}

      on:focus={input.focus}
      on:click={selectClick}
      
    >
      {#each items as opt, num}
        <option
          class:selected={selected === num}
          class:focused={focused === num}
          value={opt}
          >{opt}</option>
      {/each}
    </select>
  {/if}
  <slot name="after" />
  </div>

<style>
  .input {
    position: relative;
    display: inline-block;
  }
  
  .input__label {
    position: relative;
    display: block;
  }
  
  .list::after {
    content: "";
    position: absolute;
    bottom: 0;
    top: 0;
    margin: auto auto auto -1.25em;
    width: 0;
    height: 0;
    border: 3px solid transparent;
    border-top-color: #000;
    border-bottom-width: 0;
  }
  
  .list.visible::after {
    opacity: 0.3;
  }
  
  .list > input {
    padding-right: 1.5em;
  }
  
  .input__controll {
    width: 100%;
    box-sizing: border-box;
    padding: 0 0.6em;
    text-overflow: ellipsis;
  }
  
  .input__controll:focus {
    outline: 5px auto Highlight;
    outline: 5px auto -webkit-focus-ring-color;
  }
  
  .input__list {
    position: absolute;
    z-index: 100;
    top: 100%;
    left: 0;
    margin-top: 4px;
    min-width: 100%;
    border-radius: 0;
    border: 0;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
    outline: 0;
    overflow: hidden;
    visibility: hidden;
  }

  .input__list.visible {
    visibility: visible;
  }

  .scrolling {
    overflow: auto;
  }

  .scrolling::-webkit-scrollbar {
    width: 5px;
  }

  .scrolling::-webkit-scrollbar-thumb {
    background-color: #000;
    border: 1px solid #fff;
  }

  option {
    position: relative;
    font-size: 1.2em;
    padding: 0.5em 1em;
  }

  option:hover::after,
  option.focused::after {
    content: attr(value);
    padding: inherit;
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    color: #000;
    background-color: #eee;
  }

  option.selected,
  option.selected.focused::after {
    background: #000;
    color: #fff;
  }

  /* option:hover,
option:focus,
option:active,
option:checked {
  background: linear-gradient(#5A2569, #5A2569);
  color: linear-gradient(#fff, #fff);
} */
  /* optgroup {
    margin-top: 0;
  }

  optgroup::first-line {
    font-size: 24px;
  } */
</style>
