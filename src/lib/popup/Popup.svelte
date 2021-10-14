<script>
  // import {createEventDispatcher } from 'svelte';
  export let position = 'bottom';
  export let visible = false;

  // const dispatch = createEventDispatcher();
  // export const toggle = () => visible = !visible;
</script>

<div class="popup" tabindex=0>
  <div class="popup__content"  on:click={() => visible = !visible}>
    <slot />
  </div>
  <div
  class:top={position === 'top'}
  class:bottom={position === 'bottom'}
  class:left={position === 'left'}
  class:right={position === 'right'}
  class:visible
  class="popup__win"
  >
    <slot name="data"/>
  </div>
</div>


<style>
  .popup {
    display: inline-block;
    position: relative;
    cursor:pointer;
  }
  .popup__content {
    display: inline-block;
  }
  .popup__win {
    visibility: hidden;
    cursor:auto;
    padding: 1px;
    position: absolute;
    background-color: #fff;
    box-shadow: 0 5px 5px rgba(0,0,0, .2);
  }

  .visible {
    visibility: visible;
  }

  .top {
		left: 50%;
		bottom: 100%;
		transform: translate(-50%, -10px);
	}
	.bottom {
		left: 50%;
		top: 100%;
		transform: translate(-50%, 10px);
	}
	.left {
		right: 100%;
		top: 50%;
		transform: translate(-10px, -50%);
	}
	.right {
		left: 100%;
		top: 50%;
		transform: translate(10px, -50%);
	}
</style>