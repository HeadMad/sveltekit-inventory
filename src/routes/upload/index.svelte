<script>
  import Uploader from "$lib/default-components/uploader/Uploader.svelte";
  import Table from "$lib/defaultComponents/table/Table.svelte";

  let tableHead;
  let tableBody;

  function onChange(event) {
    const {files} = event.detail;
    const file = files[0];
    const reader = new FileReader();
    reader.readAsText(file);
    reader.onerror = () => console.log('Load file error: ', reader.error);
    reader.onload = async () => {
      const result = await getRowsfromHtml(reader.result);
      tableHead = result.shift();
      tableBody = result;
    }
  }

  async function getRowsfromHtml(html) {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');
    const table = doc.getElementsByTagName('table')[0];
    const result = await forEach(table.rows, row => forEach(row.cells, cell => cell.innerText));  
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
  <div class="uploader">
    <Uploader let:state let:files on:change={onChange}>
      <section>
        {#if files.length}
        <h2>Список файлов</h2>
        <ul>
          {#each files as file, i}
            <li>{file.name}</li>
          {/each}
        </ul>
        {:else}
          <h2>Тут будет список файлов</h2>
        {/if}
      </section>
      <div class="dropzone" slot="dropzone"></div>
    </Uploader>
  </div>
</div>

  {#if tableBody}
  <div class="table">
    <Table head={tableHead} body={tableBody} />
  </div>
  {/if}

<style>
   .wrap {
     max-width: 700px;
     margin: auto;
  }
  .uploader {
    display: flex;
    gap: 2em;
  }
  section {
    overflow: hidden;
    /* flex-grow: 1; */
  }
  .uploader>:global(div) {
    align-self: stretch;
    min-height: 150px;
    flex-grow: 2;
  }
  .dropzone {
    background: rgb(255, 255, 255);
    height: 100%;
    border-radius: 10px;
  }

  .table {
    position: sticky;
    top:0;
  }
 
</style>
