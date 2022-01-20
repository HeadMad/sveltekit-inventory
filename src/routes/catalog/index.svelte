<script context="module">
  import {createRequest} from "$lib/API";
  export async function load({ fetch }) {
    const response = await createRequest('/catalog/api', fetch)('getTablesList');
    const tablesList = response.ok ? response.result : [];
    return {
      props: { tablesList },
    };
  }
</script>

<script>
  import Uploader from "$lib/components/default/uploader/Uploader.svelte";
  import { title } from "$lib/store.js";

  const fetchData = createRequest('/catalog/api');

  $title = "Каталог таблиц";
  export let tablesList;

  let tableHead;
  let tableBody;

  function onChange(event) {
    const { files } = event.detail;
    for (let file of files) {
      // If dataBase has this table
      if (tablesList.includes(file.name))
        continue;

      const reader = new FileReader();
      reader.readAsText(file);
      reader.onerror = () => console.log("Load file error: ", reader.error);
      reader.onload = async () => {
        const rows = await getRowsfromHtml(reader.result);

        const createTable = await fetchData('createTable', {
          table: file.name,
          length: rows[0].length,
        });
        console.log({createTable});

        const fillTable = await fetchData('fillTable', { table: file.name, rows });
        console.log({fillTable});
        if (fillTable.ok) tablesList = tablesList.concat(file.name);
      };
    }
  }

  async function getRowsfromHtml(html) {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, "text/html");
    const table = doc.getElementsByTagName("table")[0];
    const result = await forEach(table.rows, (row) =>
      forEach(row.cells, (cell) => cell.innerText)
    );
    return result;
  }

  function forEach(collection, handler) {
    const result = [];
    for (let i = 0; i < collection.length; i++)
      result.push(handler(collection[i]));
    return result;
  }

 
</script>

<div class="wrap">
  <h1>Загрузка таблиц</h1>
  <p>Перетащите в поле .html файлы с таблицами</p>
  <br />

  <ul>
    {#each tablesList as name}
      <li><a href="/catalog/table?name={encodeURI(name)}">{name}</a></li>
    {/each}
  </ul>
  <div class="uploader">
    <Uploader let:state let:files on:change={onChange}>
      <div class="dropzone" slot="dropzone" />
    </Uploader>
  </div>
</div>

<style>
  .wrap {
    max-width: 800px;
    margin: auto;
  }
  .uploader {
    display: flex;
    gap: 2em;
  }
  /* section {
    overflow: hidden;
    flex-grow: 1;
  } */
  .uploader > :global(div) {
    align-self: stretch;
    min-height: 150px;
    flex-grow: 2;
  }
  .dropzone {
    background: rgb(255, 255, 255);
    height: 100%;
    border-radius: 10px;
  }

  /* .table {
    position: sticky;
    top: 0;
  } */
</style>
