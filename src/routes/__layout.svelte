<script context="module">
  export function load({ page }) {
    return {
      props: {
        page: page.path,
      },
    };
  }
</script>

<script>
  import "../app.css";
  import { title } from "$lib/store.js";
  import { click, path } from "svelte-pathfinder";
  import Header from "$lib/components/custom/header/Header.svelte";
  let page;
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
