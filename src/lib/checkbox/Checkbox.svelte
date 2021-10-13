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


<label>
  <input
    on:change
    on:click

    {...$$restProps}

    {disabled}
    {checked}
    {type}
    hidden
  />
  <span
    {style}
    {tabindex}
    on:focus
    class="material-icons"
    class:disabled
    class:radio
  />
</label>

<style>
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

  input + .radio:before {
    content: "radio_button_unchecked";
  }

  input:checked + .radio:before {
    content: "radio_button_checked";
  }
</style>
