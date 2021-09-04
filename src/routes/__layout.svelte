<script context="module">
  export function load ({page}) {
    return {
      props: {
        page: page.path
      }
    }
  }
</script>

<script>
  import "../app.css";
  import Header from '$lib/header/Header.svelte';

  export let page = '/';



</script>
<Header {page}/>

<main><slot /></main>
<footer>Footer Information</footer>

<style>
  

  main {
    flex-grow: 1;
  }
</style>
