import XLSX from "xlsx";
import Rows from "./Rows";

export default function XLSXParser(data, handler) {
  return new Rows(parseData(data, handler));
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
      const value = ref in sheet ? sheet[ref].v : undefined;
      const nr = r - sr;
      const nc = c - sc;
      result[nr][nc] = handler(value, nr, nc, ref);
    }
  }
  return result;
}
