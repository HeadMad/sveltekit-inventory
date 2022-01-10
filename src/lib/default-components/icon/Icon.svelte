<script>
import { compute_rest_props } from "svelte/internal";


  export let size = false;
  export let cursor = false;
  export let color = false;
  export let tabindex = -1;
  
  let style = '';
  $: if (size) style += 'font-size:' + size + ';';
  $: if (cursor) style += 'cursor:' + cursor + ';';
  $: if (color) style += 'color:' + color + ';';



</script>

<span
{style}
{tabindex}

on:click
on:focus

class="material-icons"
><slot /></span>
