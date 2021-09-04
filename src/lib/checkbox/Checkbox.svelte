<script>
  export let disabled = false;
  export let checked = false;
  export let color = false;
  export let radio = false;
  export let size = false;
  export let tabindex = 1;

  $: type = radio ? "radio" : "checkbox";

  let style = "";
  $: if (size) style += "font-size:" + size + ";";
  $: if (color) style += "color:" + color + ";";

  let control;
</script>

<input
  bind:this={control}
  on:change
  {...$$restProps}
  {disabled}
  {checked}
  {type}
/>
<span
  {style}
  {tabindex}
  on:click={() => control.click()}
  on:click
  on:focus
  class="material-icons"
  class:disabled
/>

<style>
  input {
    display: none;
  }

  span {
    cursor: pointer;
  }

  .disabled {
    opacity: 0.5;
  }

  span:before {
    content: "check_box_outline_blank";
  }

  input:checked + span:before {
    content: "check_box";
  }

  input[type="radio"] + span:before {
    content: "radio_button_unchecked";
  }

  input[type="radio"]:checked + span:before {
    content: "radio_button_checked";
  }
</style>
