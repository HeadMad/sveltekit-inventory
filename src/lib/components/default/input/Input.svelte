<script>
  import { createEventDispatcher } from "svelte";
  let items = [];
  let focused = -1;
  let selected = -1;
  let visible = false;
  let spread = 10;

  let value;
  let input;

  $: selectValue = items[focused];
  $: selected = items.indexOf(value);
  $: listSize = Math.max(2, Math.min(spread, items.length));

  const dispatch = createEventDispatcher();

  const inputArrowAction = (add) => () => {
    const ind = focused + add === -2 ? 1 : 0;
    focused = (items.length + focused + add + ind) % items.length;
    visible = true;
  };

  const inputKeydownHandlers = {
    ArrowUp: inputArrowAction(-1),
    ArrowDown: inputArrowAction(1),
    Escape() { visible = false },
    Tab() { visible = false },
    Enter() {
      if (visible && selectValue) {
        value = selectValue;
        dispatch('select', selectValue);
        visible = false;
      } else {
        dispatch('enter');
      }
    }
  };

  function onInputKeydown(event) {
    if (event.code in inputKeydownHandlers)
      inputKeydownHandlers[event.code]();
  }

  function selectClick(event) {
    value = event.target.value;
    dispatch('select', event.target.value);
    input.focus();
    visible = false;
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

  export { items, value, spread };
</script>

<svelte:body on:click={onBodyclick} />

<label class={$$restProps.class}>
  {#if items.length}
    <select
      class:visible
      class:scrolling={listSize < items.length}

      bind:value={selectValue}

      on:focus={input.focus}
      on:click={selectClick}

      tabindex="-1"
      size={listSize}
    >
      {#each items as opt, i}
        <option
          class:selected={selected === i}
          class:focused={focused === i}
          value={opt}>{opt}</option
        >
      {/each}
    </select>
  {/if}
  <input
    type="text"

    {...$$restProps}

    bind:this={input}
    bind:value

    on:click={() => (visible = !visible)}
    on:keydown={onInputKeydown}
    class="input"
  />
</label>

<style>
  label {
    position: relative;
  }

  input {
    width: 100%;
    box-sizing: border-box;
    padding: 0 0.6em;
  }

  input:focus {
    outline: 5px auto Highlight;
    outline: 5px auto -webkit-focus-ring-color;
  }

  select {
    position: absolute;
    top: 100%;
    min-width: 100%;
    border-radius: 0;
    border: 0;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.15);
    outline: 0;
    overflow: hidden;
    visibility: hidden;
  }

  select:focus {
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
  }

  select.visible {
    visibility: visible;
  }

  .scrolling {
    overflow: auto;
  }

  .scrolling::-webkit-scrollbar {
    width: 5px;
  }

  .scrolling::-webkit-scrollbar-thumb {
    background-color: #ddd;
    border: 1px solid #fff;
  }

  option {
    position: relative;
    font-size: 1.2em;
    padding: 0.5em 1em;
  }

  option.selected,
  option.selected:checked::after {
    background: #000;
    color: #fff;
  }

  option:checked::after {
    content: attr(value);
    padding: inherit;
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    color: #000;
    background-color: #ddd;
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
