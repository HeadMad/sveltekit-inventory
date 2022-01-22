export default function Rows(rows) {
  this.rows = rows;

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



export function filterRows(parsedTable, handler) {
  if (!parsedTable.length) return [];
  const result = [];
  
  for (let r = 0; r < parsedTable.length; r++) {
    if (parsedTable[r].some((cell, c) => handler(cell, r, c))) {
      result.push(parsedTable[r]);
      
    }
  };
  return result;
}

export function filterColumns(parsedTable, handler) {
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