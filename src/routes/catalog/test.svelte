<script>
  import TableParser, {parseHtmlString, fillElementTable} from "$lib/plugins/TableParser";
  import Table from "$lib/components/custom/table/Table.svelte";
  import Uploader from "$lib/components/default/uploader/Uploader.svelte";
  import Selectable from "$lib/plugins/selectable/selectable.table";
  import XLSX from "xlsx";
  import { pin } from "$lib/store";
import validate from "$lib/components/default/headroom/validation";
import readXlsxFile from "read-excel-file";
import _function from "better-sqlite3/lib/methods/function";
import { clear_loops } from "svelte/internal";

  $: top = $pin ? "39px" : "0";

  let showTable = false;
  let selectable;
  let table;

  let rows = [];

  async function onChange(event) {
    const { files } = event.detail;
    const file = files[0];
    const data = await file.arrayBuffer();

    const { Sheets, SheetNames } = await XLSX.read(data);
    const raw = Sheets[SheetNames[0]];

    // console.log(await XLSX.utils.sheet_to_json(raw));
    const htmlString = await XLSX.utils.sheet_to_html(raw);

    table = new TableParser(htmlString, (value) => {
      const el = document.createElement('td');
      el.innerText = value;
      return {el, value};
    });

    table.filterRows(({value}) => {
      // console.log(value === '');
      return value !== '';
    }).filterRows((_, r) => r < 10)
    .filterColumns(({value}) => value !== '')
    

    // console.log(table.array)

    table.node.insertAdjacentHTML('afterbegin', '<thead><tr>'
      + '<th class="service" data-selectable="all">🡮</th>'
      + table.array[0].map((_, i) => '<th class="service" data-selectable="column">' + i + '</th>').join('')
      + '</tr></thead><tbody></tbody>');
    
    table.fillNode((node, row, r) => {
      const rowElem = document.createElement('tr');
      rowElem.insertAdjacentHTML('afterbegin', '<td class="service" data-selectable="row">' + r + '</td>');
      row.forEach(td => rowElem.append(td.el));
      node.tBodies[0].append(rowElem);
    });


    document.querySelector('.table').append(table.node);

    initSelectable(table.node);
    showTable = true;
  }
  

  async function initSelectable(table) {
    const options = {
      filter: '.table td:not(.service)',
    };

    selectable = !selectable ? new Selectable(options) : selectable.init(options);

    // selectable.on("end", function (e, selected) {
    //   console.log(selected);
    // });

    selectable.table(table);
  }

  function normalizeTable() {

  }

  // function onTableChange({detail}) {
  //   console.log('change table');
  //   initSelectable(detail);
  // }

</script>

<div class="wrap">
  {#if showTable}
    <div class="controll">
      <button on:click={() => selectable.invert()}>Инвертировать</button>
      <button>Новая таблица</button>
      <button on:click={normalizeTable}>Нормализовать таблицу</button>
    </div>
  {/if}
  
  <div class="table">

    <!-- <Table {rows} let:row let:col let:value on:change={onTableChange}>
      <thead slot="before">
        <th class="service" data-selectable="all">🡮</th>
        {#each rows.shift() as th}
        <th class="service" data-selectable="column">{th}</th>
        {/each}
      </thead>

        {#if !col}<td class="service" data-selectable="row">{row}</td>{/if}
        <td>{value}</td>

    </Table> -->
  </div>

  {#if !showTable}
    <Uploader on:change={onChange} />
  {/if}
</div>

<style>
  .wrap {
    display: flex;
    flex-direction: column;
    gap: 1.5em;
  }

  .table :global(thead) {
    position: sticky;
    top: 0;
  }

  .table :global(.service.ui-selected),
  .table :global(.ui-selected) {
    background-color: rgba(75, 141, 241, 0.048);
  }

  .table :global(table) {
    border-collapse: collapse;
    border: 1px solid #000;
    font-size: 13px;
  }
  .table :global(th),
  .table :global(td) {
    border: 1px solid #ddd;
    background: #fff;
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -khtml-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }
  .table :global(td:not(:empty)) {
    padding: 0.2em 1em;
  }

  .table :global(.service) {
    background-color: #eee;
    padding: 0.1em 0.2em;
    text-align: center;
    font-size: 12px;
    font-weight: 400;
  }
</style>
