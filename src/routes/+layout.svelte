<script>
  import "../app.css";
  import { title } from "$lib/store.js";
  // import { Modal } from "$lib/components/modal/Modal.svelte";
  // import { click, path } from "svelte-pathfinder";
  import Header from "$lib/bundles/header/Header.svelte";
  export let data;
  let page;
  $: page = data.page; 

  const windowKeyActions = {
    Escape(event) {
      opened = false;
    },
  };

  function onWindowKeydown(event) {
    const code = event.code;
    if (code in windowKeyActions) windowKeyActions[code](event);
  }
  export { page };
</script>
<svelte:window on:keydown={onWindowKeydown} />

<!-- <svelte:window on:click={click} /> -->
<svelte:head>
  <title>{$title}</title>
</svelte:head>

<Header {page} />
<!-- <button on:click={modal.open}>Modal</button> -->
<hr>

<main><slot names={"NMAE"} /></main>
<!-- 
<Modal bind:this={modal}>
  <h1>Modal</h1>
  </Modal> -->

<style>
  main {
    padding: 0 2rem;
  }
</style>
