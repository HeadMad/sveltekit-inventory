export function parseTable(html) {
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, "text/html");
  const table = doc.querySelector('table');

  const rows = table.rows;
  const rlen = rows.length;

  const result = Array(rlen).fill([]);
  for (let r = 0; r < rlen; r++) {
    const cells = rows[r].cells;
    for (let c = 0; c < cells.length; c++) {
      const cell = rows[r].cells[c];
      const cspan = cell.colSpan;
      const rspan = cell.rowSpan;
      for (let i = r; i < r + rspan; i++) {

        const cells = Array(cspan).fill('');
        if (i === r) cells[0] = cell.innerText;
        result[i] = result[i].concat(cells);
        // console.log({i, r: r + rspan})
      }
    } // cells
  } // rows
  return result;
}


function cleanTable(parsedTable) {
  // return parsedTable;
  let result = cleanColumns(cleanRows(parsedTable));
  return result;
}


export function createTable(html) {
  const parsedTable = cleanTable(parseTable(html));
  // console.log(parsedTable)

  const table = document.createElement('table');

  const tableInner = parsedTable.map(row => {
    return '<tr>' + row.map(cell => `<td>${cell}</td>`).join('') + '</tr>';
  }).join('');
  table.insertAdjacentHTML('afterbegin', tableInner);
  return table;
}



function cleanRows(parsedTable) {
  const result = [];
  for (let r = 0; r < parsedTable.length; r++) {
    if (!parsedTable[r].every(cell => cell === ''))
     result.push(parsedTable[r]);
  };
  return result;
}

function cleanColumns(parsedTable) {
  const rlen = parsedTable.length;
  const clen = parsedTable[0].length;
  const result = Array(rlen).fill([]);

  for (let c = 0; c < clen; c++) {
    let empty = true;
    for (let r = 0; r < rlen; r++) 
      if (parsedTable[r][c] !== '') {
        empty = false;
        break;
      }
    
    if (!empty)
      for (let r = 0; r < rlen; r++) 
        result[r] = result[r].concat(parsedTable[r][c]);
  
  }
 
  return result;
}

function foreach(iter, handler) {
  for (let i = 0; i < iter.length; i++)
    if (handler(iter[i], i) === false)
      return false;
  return true;
}