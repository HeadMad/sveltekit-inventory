<script context=module>
   import {createRequest} from "$lib/API";

   export async function load({ page, fetch, session, context }) {
     const {name} = page.params;
    const response = await createRequest('/catalog/api', fetch)('getTableData', {name});
    const tableData = response.ok ? response.result : [];
    return {
      props: { tableData },
    };
  
   }
</script>
<script>
  
  import SelectableTable from "$lib/components/test/selectableTable/SelectableTable.svelte";
  let tableData = [];
  let rows = [];
  $: {
    rows = tableData.map(row => row.map(value => ({selected: false, value})));
  }

  export { tableData };

</script>


<div class="wrap">
  <SelectableTable {rows} />

</div>
<style>
.wrap {
    display: flex;
    flex-direction: column;
    gap: 1.5em;
  }
</style>