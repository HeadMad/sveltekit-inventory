<script>
  import "../app.css";
  import { title } from "$lib/store.js";
  // import { click, path } from "svelte-pathfinder";
  import Header from "$lib/components/custom/header/Header.svelte";
  export let data;
  /** @type {*}*/
  let page;
  $: page = data.page; 
  export { page };
</script>

<!-- <svelte:window on:click={click} /> -->
<svelte:head>
  <title>{$title}</title>
</svelte:head>

<Header {page} />

<main><slot names={"NMAE"} /></main>

<style>
  main {
    padding: 0 2rem;
  }
</style>
