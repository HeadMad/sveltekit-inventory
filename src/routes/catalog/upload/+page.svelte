<script>
  import Uploader from "$lib/components/default/uploader/Uploader.svelte";
  import XLSXParser from "$lib/plugins/Rows/XLSXParser";
  import { pin } from "$lib/store";

  $: top = $pin ? "39px" : "0";
  export let data;
  let tablesList = data.tablesList || [];

  async function onChange(event) {
    const { files } = event.detail;
    files.forEach(async (file) => {
      const fileName = file.name;
      const data = await file.arrayBuffer();

      const parser = new XLSXParser(data, (val) => val ?? "");
      parser.each(async (sheetName, rows) => {
        // continue
        if (!rows.length) return true;

        const name = `${fileName}/${sheetName}`;
        if (tablesList.includes(name)) return true;

        const place = await fetch("/catalog/api", {
          method: "POST",
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            method: "placeTable",
            params: { name, rows, indexing: true },
          }),
        }).then((resp) => resp.json());

        if (!place.ok) {
          console.log({ place });
          return true;
        }

        tablesList = tablesList.concat(name);
      }); // parser.each
    });
  }

  export { tablesList };
</script>

<div class="wrap">
  {#if tablesList.length}
    <ul>
      {#each tablesList as name}
        <li><a href="/catalog/table/{encodeURIComponent(name)}">{name}</a></li>
      {/each}
    </ul>
  {/if}

  <Uploader on:change={onChange} />
</div>

<style>
  .wrap {
    display: flex;
    flex-direction: column;
    gap: 1.5em;
  }
</style>
