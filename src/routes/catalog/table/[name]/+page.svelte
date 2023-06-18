<script>
  import Rows from "$lib/plugins/Rows/Rows";
  import SelectableTable from "$lib/components/test/selectableTable/SelectableTable.svelte";

  export let data;
  let { tableData } = data;

  const parser = new Rows(
    tableData.map((row) => row.map((value) => ({ selected: false, value })))
  );
  let rows = parser.rows;

  function clearTable() {
    parser.filterTable(({ value }) => value !== "");
    rows = parser.rows;
  }

  function cutTable() {
    parser.filterTable(({ selected }) => selected);
    parser.filterTable(({ value }) => value !== "");
    rows = parser.rows;
  }

  function removeCells() {
    parser.filterTable(({ selected }) => !selected);
    rows = parser.rows;
  }

  function onWindowKeyDown(event) {
    if (event.code !== "Delete")
    return;

    if (!event.ctrlKey && !event.shiftKey)
    return removeCells();

    if (!event.ctrlKey && event.shiftKey)
    return cutTable();

    if (event.ctrlKey && !event.shiftKey)
    return clearTable();
  }

</script>

<svelte:window on:keydown={onWindowKeyDown} />

<div class="wrap">
  <div>
    <button on:click={clearTable}>Почистить (Ctrl + Del)</button>
    <button on:click={cutTable}>Обрезать (Shift + Del)</button>
    <button on:click={removeCells}>Удалить (Del)</button>
  </div>
  <SelectableTable {rows} />
</div>

<style>
  .wrap {
    display: flex;
    flex-direction: column;
    gap: 1.5em;
  }
</style>
