<script>
  import outsideClick from "$lib/actions/outsideClickAction";
  import colName from "$lib/plugins/Rows/colName";
  import { cursorInEndForContentEditable } from "$lib/focus";

  export let rows = [];
  let range = new Set();
  let start = [0, 0];
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
    const to = [max, max];
    if (key === "shift") {
      from[i] = Math.min(start[i], num);
      to[i] = Math.max(start[i], num);
    } else {
      from[i] = num;
      to[i] = num;
    }
    return { from, to };
  }

  const selection = {
    all({ r, c }) {
      if (state === "all") deselectRange();
      else selectRange([0, 0], [r, c]);
    },
    col({ col, r }, key) {
      const { from, to } = rowColAction(1, col, r, key);
      selectRange(from, to);
    },
    row({ row, c }, key) {
      const { from, to } = rowColAction(0, row, c, key);
      selectRange(from, to);
    },
    cell({ col, row }, key) {
      const cell = [row, col];
      if (key === "shift") selectRange(start, cell);
      else selectRange(cell);
    },
  };

  function onTableClick(event) {
    const td = event.target.closest("td");
    const key = event.shiftKey ? "shift" : event.ctrlKey ? "ctrl" : false;
    if (!key) deselectRange();

    const { action, ...args } = td.dataset;
    args.r = rows.length - 1;
    args.c = rows[0].length - 1;
    selection[action](args, key);
    state = action;
  }

  function onTableDoubleClick(event) {
    const td = event.target.closest("td");
    const { col, row } = td.dataset;
    const cell = rows[Number(row)][Number(col)];

    cell.editable = true;
    td.contentEditable = true;

    td.addEventListener("keydown", onInputContenteditable);
    td.addEventListener(
      "blur",
      function () {
        cell.editable = false;
        this.contentEditable = false;
      },
      { once: true }
    );
    cursorInEndForContentEditable(td);
  }
  
  function onInputContenteditable(event) {
    if (event.code !== "Enter")
    return;
    
    if (!event.ctrlKey)
    return this.blur();
    
    if (this.innerText.at(-1) !== '\n')
      this.innerText += '\n';
    this.innerText += '\n';
      
    cursorInEndForContentEditable(this);
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
    start = [0, 0];

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
      for (let c = 0; c < clen; c++) rows[r][c].selected = false;
  }
</script>

{#if rows.length}
  <table
    use:outsideClick={deselectRange}
    on:click={onTableClick}
    on:dblclick={onTableDoubleClick}
  >
    <col />
    <slot name="before" />
    <thead>
      <tr>
        <td class="service" data-action="all">🡮</td>
        {#each rows[0] as _, c}
          {@const title = colName(c)}
          <td class="service" data-col={c} data-action="col">
            <slot name="top" col={c} {title}>{title}</slot>
          </td>
        {/each}
      </tr>
    </thead>
    {#each rows as row, r}
      <tr>
        <td class="service" data-row={r} data-action="row">
          <slot name="right" row={r}>{r + 1}</slot>
        </td>
        {#each row as { value, editable, selected }, c}
          <td data-row={r} data-col={c} data-action="cell" class:selected
            >{value}</td
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
    box-sizing: border-box;
    border: 1px solid #ddd;
    background: #fff;
    position: relative;
    /* -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none; */
  }
  td:not(:empty) {
    padding: 0.2em 1em;
  }

  td.selected {
    background-color: rgba(75, 141, 241, 0.048);
  }

  .editable-cell {
    position: absolute;
    padding: 0.2em 1em;
    border: 0;
    background: none;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
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
