import XLSX from "xlsx";

export default function XLSXParser(data, handler) {
  this.rows = parseData(data, handler);

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

function parseData(data, handler) {
  const { Sheets, SheetNames } = XLSX.read(data);
  const sheet = Sheets[SheetNames[0]];
  const range = XLSX.utils.decode_range(sheet['!ref']);

  const sr = range.s.r;
  const sc = range.s.c;

  const result = Array(range.e.r - range.s.r + 1).fill().map(row => []);

  for (let r = sr; r <= range.e.r; ++r) {
    for (let c = sc; c <= range.e.c; ++c) {
      const addr = { r, c };
      const ref = XLSX.utils.encode_cell(addr);
      const value = !(ref in sheet) ? '' : sheet[ref].v !== undefined ? sheet[ref].v : '';
      const nr = r - sr;
      const nc = c - sc;
      result[nr][nc] = handler(value, nr, nc, ref);
    }
  }
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

