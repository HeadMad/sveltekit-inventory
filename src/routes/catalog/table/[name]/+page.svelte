<script>
  import Rows from "$lib/plugins/Rows/Rows";
  import SelectableTable from "$lib/components/selectableTable/SelectableTable.svelte";

  export let data;
  let { tableData } = data;

  const parser = new Rows(
    tableData.map((row) => row.map((value) => ({
      selected: false,
      editable: false,
      value })))
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

  function invertSelection() {
    rows.map(row => row.map(cell => cell.selected = !cell.selected))
    rows = rows;
  }

  function onWindowKeyDown(event) {
    if (event.code === "Delete") {
      if (!event.ctrlKey && !event.shiftKey)
      return removeCells();

      if (!event.ctrlKey && event.shiftKey)
      return cutTable();

      if (event.ctrlKey && !event.shiftKey)
      return clearTable();

    } else if (event.code === "KeyI" && event.ctrlKey && !event.shiftKey) {
      return invertSelection();
    }
  }

</script>

<svelte:window on:keydown={onWindowKeyDown} />

<div class="wrap">
  <div>
    <button on:click={invertSelection}>Инвертировать (Ctrl + I)</button>
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
