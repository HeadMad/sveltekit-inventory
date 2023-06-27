<script>
  import Uploader from "$lib/components/default/uploader/Uploader.svelte";
  import XLSXParser from "$lib/plugins/Rows/XLSXParser";
  import { pin } from "$lib/store";
  import SelectableTable from "$lib/components/selectableTable/SelectableTable.svelte";


  $: top = $pin ? "39px" : "0";

  let parser;
  let rows;

  async function onChange(event) {
    const { files } = event.detail;
    const file = files[0];
    const data = await file.arrayBuffer();

    parser = new XLSXParser(data, (val) => ({
      value: val ?? "",
      selected: false,
    }));
    parser.filterTable(({ value }) => value !== "");
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
          parser.filterTable(({ value }) => value !== "");
          rows = parser.rows;
        }}>Обрезать</button
      >

      <button
        on:click={() => {
          parser.filterTable(({ selected }) => !selected);
          rows = parser.rows;
        }}>Удалить</button
      >

      <button
        on:click={() => {
          parser.insertColumns(2, () => ({ selected: false, value: "string" }));
          rows = parser.rows;
        }}>Вставить колонку</button
      >

      <button
        on:click={() => {
          parser.insertRows(33, (r, c) => {
            let value
            if (parser.rows.every(row => typeof row[c].value === 'number'))
              value = 'Сумма: ' + parser.rows.reduce((sum, row) => sum + row[c].value, 0);
            else
              value = '';
            return {selected: false, value}
          });
          rows = parser.rows;
        }}>Вставить строку</button
      >
    </div>

    <SelectableTable {rows}>
      <span slot="top" let:title let:id>{id}: {title}</span>
      <span slot="right" let:id>{id}:</span>
    </SelectableTable>
  {/if}
</div>

<style>
  .wrap {
    display: flex;
    flex-direction: column;
    gap: 1.5em;
  }
</style>
