<script>

  import Uploader from "$lib/components/default/uploader/Uploader.svelte";
 import XLSXParser from "$lib/plugins/XLSXParser"
  import { pin } from "$lib/store";
  import SelectableTable from "$lib/components/test/selectableTable/SelectableTable.svelte"

  $: top = $pin ? "39px" : "0";

  let parser;
  let rows;

  async function onChange(event) {
    const { files } = event.detail;
    const file = files[0];
    const data = await file.arrayBuffer();

    parser = new XLSXParser(data, (value) => ({value, selected: false}));
    // parser.filterTable(({value}) => value !== '');
    rows = parser.rows;
  }
  


</script>

<div class="wrap">
  {#if !parser}
  <Uploader on:change={onChange} />
  {:else}


  <div class="controll">
    <button
      on:click={() => {
        parser.filterTable(({ value }) => value !== "");
        rows = parser.rows;
      }}>Почистить</button
    >
    <button
      on:click={() => {
        parser.filterTable(({ selected }) => selected);
        rows = parser.rows
      }}>Обрезать</button
    >
    <button
      on:click={() => {
        parser.filterTable(({ selected }) => !selected);
        rows = parser.rows
      }}>Удалить</button
    >
  </div>

    <SelectableTable {rows} />
  {/if}
</div>

<style>
  .wrap {
    display: flex;
    flex-direction: column;
    gap: 1.5em;
  }

</style>
