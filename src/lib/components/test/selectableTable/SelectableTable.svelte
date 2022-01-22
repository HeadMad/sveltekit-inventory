<script>
  import outsideClick from "$lib/actions/outsideClickAction";

  let rows = [];
  let range = new Set();
  let start;
  let state;

  /**
   * 
   * @param i 0 - row, 1 -col
   * @param num Argument from dataset
   * @param max Max row or column
   * @param key 'shift' or 'ctrl'
   */
  function rowColAction(i, num, max, key) {
    const from = [0, 0];
    const to = [max, max]
    if (key === 'shift') {
      from[i] = Math.min(start[i], num);
      to[i] = Math.max(start[i], num);

    } else {
      from[i] = num;
      to[i] = num;  
    }
    return {from, to};
  }

  const selection = {
    all({r, c}) {
      if (state === 'all') deselectRange();
      else selectRange([0, 0], [r, c]);
    },
    col({col, r}, key) {
      const {from, to} = rowColAction(1, col, r, key);
      selectRange(from, to);
    },
    row({row, c}, key) {
      const {from, to} = rowColAction(0, row, c, key);
      selectRange(from, to);
    },
    cell({col, row}) {
      const cell = [row, col];
      if (start) selectRange(start, cell);
      else selectRange(cell);
    }
  }

  function onTableClick(event) {
    const td = event.target.closest("td");
    const key = event.shiftKey ? 'shift'
    : event.ctrlKey ? 'ctrl' : false;
    if (!key) deselectRange();

    const {action, ...args} = td.dataset;
    args.r = rows.length - 1;
    args.c = rows[0].length - 1;
    selection[action](args, key);
    state = action;

  }

  function selectRange(from, to) {
    start = from;
    const [fr, fc] = from;

    // select one cell
    if (!to) {
      rows[fr][fc].selected = true;
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
    state = null;
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
        <td class="service" data-action="all">🡮</td>
        {#each rows[0] as _, c}
          <td class="service" data-col={c} data-action="col">{c + 1}</td>
        {/each}
      </tr>
    </thead>
    {#each rows as row, r}
      <tr>
        <td class="service" data-row={r} data-action="row">{r + 1}</td>
        {#each row as cell, c}
          <td
          data-row={r}
          data-col={c}
          data-action="cell"
          class:selected={cell.selected}
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
