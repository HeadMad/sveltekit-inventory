
export default function TableParser(table, handler = (cell) => cell) {
  this.rows = parseTable(table, handler);

  this.filterRows = (handler) => {
    this.rows = filterRows(this.rows, handler);
    return this;
  };
  
  this.filterColumns = (handler) => {
    this.rows = filterColumns(this.rows, handler);
    return this;
  };

  this.filterTable = (handler) => {
    this.rows = filterTable(this.rows, handler);
    return this;
  };

  this.eachRow = (handler) => {
    eachRow(this.rows, handler);
    return this;
  };

  this.eachCell = (handler) => {
    eachCell(this.rows, handler);
    return this;
  };
}

export function parseTable(table, handler) {
  switch (table.constructor.name) {
    case 'String':
      return parseHtmlString(table, handler);
      break;

    case 'Array':
      return table;
  
    default:
      return parseDOMElement(table, handler);
      break;
  }
}


export function parseHtmlString(html, handler) {
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, "text/html");
  return parseDOMElement(doc, handler);
}

export function parseDOMElement(node, handler) {
  const table = node.querySelector('table');

  const rows = table.rows;
  const rlen = rows.length;

  const result = Array(rlen).fill().map(row => []);
  for (let r = 0; r < rlen; r++) {
    const cells = rows[r].cells;
    for (let c = 0; c < cells.length; c++) {
      const cell = rows[r].cells[c];
      const cspan = cell.colSpan;
      const rspan = cell.rowSpan;
      if (handler) {
        for (let i = r; i < r + rspan; i++) {
          let n = cspan;
          const cells = [];
          const len = result[i].length;
          while (n--) {
            const c = len + n;
            if (n === 0 && i === r) cells[0] = handler(cell.innerText, i, c);
            else cells[n] = handler('', i, c);
          }
          result[i].push(...cells);
        }

      } else {
        for (let i = r; i < r + rspan; i++) {
          const cells = Array(cspan).fill('');
          if (i === r) cells[0] = cell.innerText;
          result[i].push(...cells);
        }
      }
    } // cells
  } // rows
  return result;
}


export function eachRow(parsedTable, handler) {
  for (let r = 0; r < parsedTable.length; r++)
    handler(parsedTable[r], r);
}

export function eachCell(parsedTable, handler) {
  eachRow(parsedTable, (row, r) => {
    for (let c = 0; c < row.length; c++)
      handler(row[c], c, r);
  });
}

export function filterTable(parsedTable, handler) {
  let result = filterColumns(filterRows(parsedTable, handler), handler);
  return result;
}



function filterRows(parsedTable, handler) {
  if (!parsedTable.length) return [];
  const result = [];
  
  for (let r = 0; r < parsedTable.length; r++) {
    if (parsedTable[r].some((cell, c) => handler(cell, r, c))) {
      result.push(parsedTable[r]);
      
    }
  };
  return result;
}

function filterColumns(parsedTable, handler) {
  if (!parsedTable.length) return [];
  const rlen = parsedTable.length;
  const clen = parsedTable[0].length;
  const result = Array(rlen).fill().map(row => []);

  for (let c = 0; c < clen; c++) {
    let empty = true;
    for (let r = 0; r < rlen; r++) {
      if (handler(parsedTable[r][c], r, c)) {
        empty = false;
        break;
      }
    }

    if (!empty)
      for (let r = 0; r < rlen; r++)
        result[r].push(parsedTable[r][c]);

  }
  return result;
}
