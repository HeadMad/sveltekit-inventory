<!-- <script context="module">
  export async function load({fetch }) {


    const res = await fetch(
      `/catalog/api/table?data=${encodeURIComponent(
        JSON.stringify({ table: 'Майки.html' })
      )}`
    );
    const result = await res.json();
    if (!result.ok) return console.log(result);

    return {
      props: { tableData: result.result },
    };
  }
</script> -->

<script>
import Uploader from "$lib/components/default/uploader/Uploader.svelte";
import Selectable from "$lib/components/default/selectable/selectable.table";
import XLSX from "xlsx";
  import { pin } from "$lib/store";

  $: top = $pin ? "39px" : "0";

  let showTable = false;
  let wrap;

  async function onChange(event) {
    const { files } = event.detail;
    const file = files[0];
    const data = await file.arrayBuffer();

    const {Sheets, SheetNames} = await XLSX.read(data);
    const raw = Sheets[SheetNames[0]];

    const htmlString = await XLSX.utils.sheet_to_html(raw);
    const table = await parseHtmlTable(htmlString);
    wrap.append(table);

    initSelectable(table);
    showTable = true;
    
  }

  async function parseHtmlTable(html) {
    const parser = new DOMParser();
    const doc = await parser.parseFromString(html, "text/html");
    const table = doc.querySelector('table');
    
    let maxCells = 0;

    foreach(table.rows, async (row, i) => {
      maxCells = Math.max(maxCells, row.cells.length);
      const cell = await createServiceCell('td', i + 1, 'row');
      row.prepend(cell);
    });

    const thead = await createTableHead(maxCells);
    table.append(thead);

    return table;
  }

  async function createTableHead(num) {
    const thead = document.createElement('thead');
    const row = document.createElement('tr');
    const toggle = createServiceCell('th' ,'T', 'all');
    row.append(toggle);

    for (let i = 0; i < num; i++)
      await row.append(createServiceCell('th', i + 1, 'column'));

      thead.append(row);
    return thead;
  }

  function createServiceCell(type, text, dataset) {
    const cell = document.createElement(type);
    cell.classList = 'service';
    cell.dataset.selectable = dataset;
    cell.innerHTML = text;
    return cell;
  }

  async function initSelectable(table) {
    let selectable = new Selectable({
      filter: '.wrapper td:not(.service)'
    });
    selectable.on("init", function() {
      selectable.table(table);
    });
    
  }

  function foreach(iter, handler) {
    for (let i = 0; i < iter.length; i++) {
      handler(iter[i], i);
    }
  }


</script>



<div class="wrapper" bind:this={wrap}></div>

{#if !showTable}
<Uploader on:change={onChange}></Uploader>
{/if}

<style>

.wrapper :global(thead) {
  position: sticky;
  top: 0;

}

.wrapper :global(.service.ui-selected),
.wrapper :global(.ui-selected) {
  background-color: rgba(75, 141, 241, 0.048);
}

.wrapper :global(table) {
  border-collapse: collapse;
  border: 1px solid #000;
  font-size: 13px;
}
.wrapper :global(th),
.wrapper :global(td) {
  border: 1px solid #ddd;
  background: #fff;
  -webkit-touch-callout: none;
    -webkit-user-select: none;
    -khtml-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
}
.wrapper :global(td:not(:empty)) {
  padding: .2em 1em;
}

.wrapper :global(.service) {
  background-color: #eee;
  padding: .1em .2em;
  text-align: center;
  font-size: 12px;
  font-weight: 400;
}
/* .wrapper :global(table) {} */
/* .wrapper :global(table) {} */

</style>