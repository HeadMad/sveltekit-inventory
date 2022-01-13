<script context="module">
  export async function load({page, fetch}) {
    const name = page.params.name;
    
    const res = await fetch(
      `/catalog/api/table?data=${encodeURIComponent(JSON.stringify({ table: name }))}`
    );
    const result = await res.json();
    if (!result.ok)
      return console.log(result);

    return {
      props: { name, tableData: result.result },
    };
  }
</script>

<script>
  import UploadTable from "$lib/components/custom/uploadTable/UploadTable.svelte";
  let name;
  let tableData = [];

  const tableHead = tableData.shift();
  export { name, tableData };
</script>

<h1>{name}</h1>
{#if tableData}
  <div class="table">
    <UploadTable head={tableHead} body={tableData} />
  </div>
{/if}
