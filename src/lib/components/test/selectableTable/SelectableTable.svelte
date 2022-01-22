<script>
  import outsideClick from "$lib/actions/outsideClickAction";

  let rows = [];
  let start;
  let range = new Set();

  function onTableClick(event) {
    const td = event.target.closest("td");

    if (td.classList.contains("service")) {
      if (!event.shiftKey) deselectRange();
      const r = rows.length - 1;
      const c = rows[0].length - 1;
      // select all
      if ("all" in td.dataset) {
        selectRange([0, 0], [r, c]);

        // select cell
      } else if ("col" in td.dataset) {
        const col = Number(td.dataset.col);
        selectRange([0, col], [r, col]);

        // select row
      } else if ("row" in td.dataset) {
        const row = Number(td.dataset.row);
        selectRange([row, 0], [row, c]);
      }
    } else {
      const r = Number(td.dataset.row);
      const c = Number(td.dataset.col);
      const cell = [r, c];

      if (start && event.shiftKey) {
        selectRange(start, cell);
      } else {
        deselectRange();
        selectRange(cell);
      }
    }
  }

  function selectRange(from, to) {
    const [fr, fc] = from;

    // select one cell
    if (!to) {
      rows[fr][fc].selected = true;
      start = from;
      range.add(from);

      // select range of cells
    } else {
      const [tr, tc] = to;
      for (let r = Math.min(fr, tr); r <= Math.max(fr, tr); r++)
        for (let c = Math.min(fc, tc); c <= Math.max(fc, tc); c++) {
          range.add([r, c]);
          rows[r][c].selected = true;
        }
    }
  }

  function deselectRange() {
    start = null;
    if (!range.size) return;
    for (let [r, c] of range) {
      if (!rows[r] || !rows[r][c]) {
        deselectRows();
        break;
      }
      rows[r][c].selected = false;
    }
    range.clear();
  }

  function deselectRows() {
    if (!rows.length) return;
    let rlen = rows.length;
    let clen = rows[0].length;
    for (let r = 0; r < rlen; r++)
      for (let c = 0; c < clen; c++)
        rows[r][c].selected = false;
  }

  export { rows };
</script>

{#if rows.length}
  <table use:outsideClick={deselectRange} on:click={onTableClick}>
    <col />
    <thead>
      <tr>
        <td class="service" data-all>🡮</td>
        {#each rows[0] as _, c}
          <td class="service" data-col={c}>{c + 1}</td>
        {/each}
      </tr>
    </thead>
    {#each rows as row, r}
      <tr>
        <td class="service" data-row={r}>{r + 1}</td>
        {#each row as cell, c}
          <td data-row={r} data-col={c} class:selected={cell.selected}
            >{cell.value}</td
          >
        {/each}
      </tr>
    {/each}
  </table>
{/if}

<style>
  col {
    width: 0;
  }
  thead {
    position: sticky;
    top: 0;
  }

  table {
    border-collapse: collapse;
    font-size: 13px;
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -khtml-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }

  td {
    border: 1px solid #ddd;
    background: #fff;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }
  td:not(:empty) {
    padding: 0.2em 1em;
  }

  td.selected {
    background-color: rgba(75, 141, 241, 0.048);
  }

  .service {
    background-color: #eee;
    padding: 0.1em 0.2em;
    text-align: center;
    font-size: 12px;
    font-weight: 400;
    border: 1px solid #ccc;
  }
</style>
