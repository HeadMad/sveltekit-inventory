<script>
  export let shown = false;
  export const show = () => shown = true;
  export const hide = () => shown = false;

  const windowKeyActions = {
    Escape(event) {
      // shown = false;
    }
  };

  function onWindowKeydown(event) {
    const code = event.code;
    if (code in windowKeyActions)
      windowKeyActions[code](event);
  }
</script>

<svelte:window on:keydown={onWindowKeydown} />

{#if shown}
<div class="modal">
  <div class="modal__overlay" on:click={hide}></div>
  <div class="modal__window"><slot></slot></div>
</div>
{/if}


<style>
  .modal {
    position: fixed;
    display: flex;
    width: 100%;
    height: 100%;
    top:0;
    left:0;
    align-items: center;
    justify-content: center;
  }

.modal__window {
  position: relative;
  }

  .modal__overlay {
    position: absolute;
    top:0;
    left:0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, .5);
  }
  
</style>

