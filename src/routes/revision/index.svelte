<!-- <script>
  import { Sheet, Toolbar } from "svelte-sheets";

  import { title } from "$lib/store.js";
  $title = "Ревизия";



  let sheetNames;
  let sheets;
  let active;
  let data;
  let columns;
  let mergeCells;
  let style;

  $: {
    data = sheets[active].data
    columns = sheets[active].columns
    mergeCells = sheets[active].mergeCells
    style = sheets[active].style
  }
</script>

<Toolbar
  bind:sheetNames
  bind:sheets
  bind:active
/>
<Sheet
    {style}
    {mergeCells}
    {columns}
    {data}
 />


 -->
