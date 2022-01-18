<script>
  import {createTable, parseTable} from "./createTable";
import Uploader from "$lib/components/default/uploader/Uploader.svelte";
import Selectable from "$lib/components/default/selectable/selectable.table";
import XLSX from "xlsx";
  import { pin } from "$lib/store";

  $: top = $pin ? "39px" : "0";

  let showTable = false;
  let tableWrap;
  let selectable;

  async function onChange(event) {
    const { files } = event.detail;
    const file = files[0];
    const data = await file.arrayBuffer();

    const {Sheets, SheetNames} = await XLSX.read(data);
    const raw = Sheets[SheetNames[0]];

    const htmlString = await XLSX.utils.sheet_to_html(raw);
    // const table = await parseHtmlTable(htmlString);
    // tableWrap.insertAdjacentHTML('afterbegin', htmlString);
    const table = createTable(htmlString);
    tableWrap.append(table);

    // initSelectable(table);
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

  

 


  async function normalizeTable() {

    const table = tableWrap.querySelector('table');
    await normaliseCells(table);
    await normaliseEmptySapce(table);
    
    selectable.destroy();
    selectable.init({
      filter: '.table td:not(.service)',
      appendTo: '.table'
    });
    selectable.table(table);
  }

  function normaliseEmptySapce(table) {
    const rows = table.tBodies[0].rows;
    foreach(rows, (row, r) => {
      const empty = foreach(row.cells, (cell, c) => {
        if (c === 0) return true;
        return cell.innerHTML.length === 0;
      });
      console.log(empty, row.sectionRowIndex);
      if (empty) table.tBodies[0].deleteRow(row.sectionRowIndex);
    });
  }

  function normaliseCells(table) {
    const rows = table.tBodies[0].rows;
    foreach(rows, (row, r) =>
      foreach(row.cells, (cell, c) => {
        if (c === 0) return;
        let rowspan = cell.rowSpan;
        let colspan = cell.colSpan;

        // add count of new cells in row counter
        // if (rowspan > 1)
          while(rowspan--) {
            const nr = r + rowspan;
            const nc = rowspan ? c - 1 : c;
            const span = rowspan ? colspan : colspan - 1; 
            rows[nr].cells[nc]
            .insertAdjacentHTML('afterEnd', Array(span).fill('<td></td>').join(''));
          }
        
          cell.rowSpan = 1;
          cell.colSpan = 1;
      })
    );
  }


  async function initSelectable(table) {
    selectable = new Selectable({
      filter: '.table td:not(.service)',
      appendTo: '.table'
    });
    selectable.on("end", function(e, selected) {
      console.log(selected)
    });
    
    
    selectable.table(table);


    
  }


  function foreach(iter, handler) {
    for (let i = 0; i < iter.length; i++)
      if (handler(iter[i], i) === false)
        return false;
    return true;
  }



</script>

<div class="wrap">
  {#if showTable}
    <div class="controll">
      <button on:click={() => selectable.invert()}>Инвертировать</button>
      <button>Новая таблица</button>
      <button on:click={normalizeTable}>Нормализовать таблицу</button>
    </div>
  {/if}
  <div class="table" bind:this={tableWrap} />

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
