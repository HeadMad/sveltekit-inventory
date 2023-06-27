<script>
  import { createEventDispatcher } from "svelte";
  const dispatch = createEventDispatcher();

  let opened = false;
  const open = () => (opened = true);
  const close = () => (opened = false);
  $: if (opened === false) dispatch("close");
     else dispatch("open");

 
  export { opened, open, close };
</script>

{#if opened}
  <div class="modal">
    <div class="modal__overlay" on:click={close} />
    <div class="modal__window"><slot /></div>
  </div>
{/if}

<style>
  .modal {
    position: fixed;
    display: flex;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    align-items: center;
    justify-content: center;
  }

  .modal__window {
    position: relative;
  }

  .modal__overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
  }
</style>
