<script context=module>
   import {createRequest} from "$lib/API";

   export async function load({ params, fetch, session, context }) {
     const {name} = params;
    const response = await createRequest('/catalog/api', fetch)('getTableData', {name});
    const tableData = response.ok ? response.result : [];
    return {
      props: { tableData },
    };
  
   }
</script>
<script>
  import Rows from "$lib/plugins/Rows/Rows";
  import SelectableTable from "$lib/components/test/selectableTable/SelectableTable.svelte";
  let tableData = [];
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

  export { tableData };

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