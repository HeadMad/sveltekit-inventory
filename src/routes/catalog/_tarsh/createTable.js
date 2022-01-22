async function onChange(event) {
  const { files } = event.detail;
  const file = files[0];
  const data = await file.arrayBuffer();

  const { Sheets, SheetNames } = await XLSX.read(data);
  const raw = Sheets[SheetNames[0]];

  // console.log(await XLSX.utils.sheet_to_json(raw));
  const htmlString = await XLSX.utils.sheet_to_html(raw);

  parser = new TableParser(htmlString, (cell) => cell);
  rows = parser.rows;

  // table = createTable(htmlString);
  // document.querySelector('.table').append(table);

  // initSelectable(table);
  showTable = true;
}

async function initSelectable(table) {
  const options = {
    filter: '.table td:not(.service)',
  };

  selectable = !selectable ? new Selectable(options) : selectable.init(options);

  selectable.on("end", function (e, selected) {
    if (selected.length < 2) return;
    selectedNodes = [selected[0].node, selected[selected.length -1].node];
    disabled = false;
  });

  selectable.table(table);
}


function createTable(htmlString) {
  const table = document.createElement('table');
  table.insertAdjacentHTML('afterbegin', '<thead></thead><tbody></tbody>');

  parser = new TableParser(htmlString, (value) => {
    const el = document.createElement('td');
    el.innerText = value;
    return {el, value};
  });

  fillTable(table);
  return table;
}

function fillTable(table) {
  parser.filterTable(({value}, r, c) => value !== '');
  table.tHead.insertAdjacentHTML('afterbegin', '<tr>'
    + '<th class="service" data-selectable="all">🡮</th>'
    + parser.rows[0].map((_, i) => '<th class="service" data-selectable="column">' + i + '</th>').join('')
    + '</tr></thead><tbody></tbody>');
  
  parser.eachRow((row, r) => {
    const rowElem = table.insertRow();
    rowElem.insertAdjacentHTML('afterbegin', '<td class="service" data-selectable="row">' + r + '</td>');
    row.forEach(td => rowElem.append(td.el));
  });
}

function trimTable() {
    
  const [start, end] = selectedNodes;

  const colStart = start.cellIndex - 1;
  const rowStart = start.parentNode.sectionRowIndex;
  
  const colEnd = end.cellIndex - 1;
  const rowEnd = end.parentNode.sectionRowIndex;

  parser
  .filterRows((_, r) => r >= Math.min(rowStart, rowEnd) && r <= Math.max(rowStart, rowEnd))
  .filterColumns((_, c) => c >= Math.min(colStart, colEnd) && c <= Math.max(colStart, colEnd));
  console.log(parser.rows)

  table.tBodies[0].innerHtml = '';
  table.tHead.innerHtml = '';
  fillTable(table);

  disabled = true;
  
}