export default function Rows(rows) {
  this.rows = rows;

  this.map = (handler) => {
    this.rows = mapRows(this.rows, handler);
    return this;
  }

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

  this.insertColumns = (col, insert) => {
    this.rows = insertColumns(this.rows, col, insert);
    return this;
  };

  this.insertRows = (row, insert) => {
    this.rows = insertRows(this.rows, row, insert);
    return this;
  };


}

export function mapRows(rows, handler) {
  return rows.map((row, r) => row.map((cell, c) => handler(cell, r, c)));
}

export function eachRow(rows, handler) {
  for (let r = 0; r < rows.length; r++)
    handler(rows[r], r);
}

export function eachCell(rows, handler) {
  eachRow(rows, (row, r) => {
    for (let c = 0; c < row.length; c++)
      handler(row[c], c, r);
  });
}

export function filterTable(rows, handler) {
  let result = filterColumns(filterRows(rows, handler), handler);
  return result;
}



export function filterRows(rows, handler) {
  if (!rows.length) return [];
  const result = [];

  for (let r = 0; r < rows.length; r++) {
    if (rows[r].some((cell, c) => handler(cell, r, c))) {
      result.push(rows[r]);

    }
  };
  return result;
}

export function filterColumns(rows, handler) {
  if (!rows.length) return [];
  const rlen = rows.length;
  const clen = rows[0].length;
  const result = Array(rlen).fill().map(row => []);

  for (let c = 0; c < clen; c++) {
    let empty = true;
    for (let r = 0; r < rlen; r++) {
      if (handler(rows[r][c], r, c)) {
        empty = false;
        break;
      }
    }

    if (!empty)
      for (let r = 0; r < rlen; r++)
        result[r].push(rows[r][c]);

  }
  return result;
}


export function insertRows(rows, start, insert) {
  const rlen = rows.length;
  if (!rows.length) return [];
  const clen = rows[0].length;
  const result = [];

  const insertData = !Array.isArray(insert)
  ? insertRowHandler(insert)
  : (newRow, r, c) => insert.forEach((ins, i) => insertRowHandler(ins)(r, c + i))
  
  for (let r = 0; r < rlen; r++) {
    if (r === start) 
      result.push(rows[0].map((_, c) => insertData(r, c)));
    result.push(rows[r].map(cell => cell));
  }
  if (start >= rlen)
    result.push(rows[0].map((_, c) => insertData(rlen, c)));

  return result;
}

function insertRowHandler(insert) {
  return (r, c) => {
    if (typeof insert === 'function') return insert(r, c);
    else return insert;
  };
}

/**
 * 
 * @param {array} rows Array of rows
 * @param {number} start - Index of column for inserting
 * @param {any|array} insert - data for inserting can be array for multicolumn insert
 * @returns {array} - Array of rows
 */
export function insertColumns(rows, start, insert) {
  if (!rows.length) return [];

  if (!Array.isArray(start))
    return insert1(rows, start, insert);
  else
    return insert2(rows, start);
}

function insertColumnHandler(insert) {
  return (newRow, r, c) => {
    if (typeof insert === 'function') newRow.push(insert(r, c));
    else newRow.push(insert);
  };
}

function insert1(rows, start, insert) {
  const rlen = rows.length;
  const clen = rows[0].length
  const result = Array(rlen).fill().map(row => []);

  const insertData = !Array.isArray(insert)
    ? insertColumnHandler(insert)
    : (newRow, r, c) => insert.forEach((ins, i) => insertColumnHandler(ins)(newRow, r, c + i))

  for (let r = 0; r < rlen; r++) {
    for (let c = 0; c < clen; c++) {
      if (c === start)
        insertData(result[r], r, c);
      result[r].push(rows[r][c]);
    }
    if (start >= clen)
      insertData(result[r], r, clen);
  }
  return result;
}

function insert2(rows, inserts) {
  const rlen = rows.length;
  const clen = rows[0].length
  const result = Array(rlen).fill().map(row => []);
  const handlers = inserts.map(insert => insertColumnHandler(insert));

  for (let r = 0; r < rlen; r++) {
    let i = 0;
    for (let c = 0; c < clen; c++) {
      if (handlers[c]) {
        handlers[c](result[r], r, i);
        i++;
      }
      result[r].push(rows[r][c]);
      i++;
    }
    if (handlers.length > clen)
      for (let h = clen; h < handlers.length; h++) {
        if (!handlers[h]) continue;
        handlers[h](result[r], r, i);
        i++;
      }
  }
  return result;
}