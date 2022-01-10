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
  import Sidebar from "$lib/sidebar/Sidebar.svelte";
  
</script>

<!-- <svelte:window on:click={click} /> -->
<svelte:head>
  <title>{$title}</title>
</svelte:head>

<main><slot /></main>
<Sidebar />


<style>

  main {
    padding: 0 3.5rem;
    margin: auto;
    min-height: 100%;
  }
</style>
