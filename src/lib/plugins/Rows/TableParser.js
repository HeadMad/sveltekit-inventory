import Rows from "./Rows";

export default function TableParser(table, handler = (cell) => cell) {
  return new Rows(parseTable(table, handler));
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