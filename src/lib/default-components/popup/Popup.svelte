<script>
  import { onMount } from "svelte";
  export let position = "bottom";
  export let visible = false;


  function windowClick(event) {
    if (visible && !event.target.closest(".popup"))
      visible = false;
  }

  // const dispatch = createEventDispatcher();
  // export const toggle = () => visible = !visible;
</script>
<svelte:window on:click={windowClick} />
<div class="popup" tabindex="0">
  <div class="popup__content" on:click={() => (visible = !visible)}>
    <slot />
  </div>
  {#if visible}
    <div
      class:top={position === "top"}
      class:bottom={position === "bottom"}
      class:left={position === "left"}
      class:right={position === "right"}
      class:visible
      class="popup__list"
    >
      <slot name="data" />
    </div>
  {/if}
</div>

<style>
  .popup {
    display: inline-block;
    position: relative;
    cursor: pointer;
    vertical-align: baseline;
  }
  .popup__content {
    display: inline-block;
    vertical-align: baseline;
  }
  .popup__list {
    cursor: auto;
    position: absolute;
    background-color: #fff;
    box-shadow: 0 3px 5px #00000010;
    border: 1px solid #00000020;
  }

  .popup__list::before,
  .popup__list::after {
    content: "";
    position: absolute;
    border: 5px solid transparent;
  }

  .popup__list::after {
    border-width: 4px;
  }

  .top {
    left: 50%;
    bottom: 100%;
    transform: translate(-50%, -8px);
  }
  .top::before {
    top: 100%;
    left: 50%;
    margin-left: -5px;
    border-top-color: inherit;
  }

  .top::after {
    top: 100%;
    left: 50%;
    margin-left: -4px;
    border-top-color: #fff;
  }

  .bottom {
    left: 50%;
    top: 100%;
    transform: translate(-50%, 8px);
  }

  .bottom::before {
    bottom: 100%;
    left: 50%;
    margin-left: -5px;
    border-bottom-color: inherit;
  }

  .bottom::after {
    bottom: 100%;
    left: 50%;
    margin-left: -4px;
    border-bottom-color: #fff;
  }

  .left {
    right: 100%;
    top: 50%;
    transform: translate(-8px, -50%);
  }

  .left::before {
    left: 100%;
    top: 50%;
    margin-top: -5px;
    border-left-color: inherit;
  }

  .left::after {
    left: 100%;
    top: 50%;
    margin-top: -4px;
    border-left-color: #fff;
  }

  .right {
    left: 100%;
    top: 50%;
    transform: translate(8px, -50%);
  }

  .right::before {
    right: 100%;
    top: 50%;
    margin-top: -5px;
    border-right-color: inherit;
  }

  .right::after {
    right: 100%;
    top: 50%;
    margin-top: -4px;
    border-right-color: #fff;
  }

</style>
