
<script>
  import Rows from "$lib/plugins/Rows/Rows";
  import SelectableTable from "$lib/components/test/selectableTable/SelectableTable.svelte";
  export let data;
  let {tableData} = data;
  console.log(tableData)
  const parser = new Rows(tableData.map(row => row.map(value => ({selected: false, value}))));
  let rows = parser.rows;
  
  function clearTable() {
    parser.filterTable(({value}) => value !== '');
    rows = parser.rows;
  }

  function cutTable() {
    parser.filterTable(({selected}) => selected);
    parser.filterTable(({value}) => value !== '');
    rows = parser.rows;
  }

  function removeCells() {
    parser.filterTable(({selected}) => !selected);
    rows = parser.rows;
  }

  // export { tableData };

</script>


<div class="wrap">
  <div>
    <button on:click={clearTable}>Почистить</button>
    <button on:click={cutTable}>Обрезать</button>
    <button on:click={removeCells}>Удалить</button>
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