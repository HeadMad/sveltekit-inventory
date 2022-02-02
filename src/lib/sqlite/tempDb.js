
import sqlite3 from 'better-sqlite3';

const db = sqlite3('./temp.sqlite3');
process.on('exit', () => db.close());

// Create Search table
(function () {
  const sql = `CREATE VIRTUAL TABLE IF NOT EXISTS search USING fts4(text, tablename, id INTEGER);`;
  console.log("Create Search:", db.prepare(sql).run())
})()


/**
 * 
 * @param {string} name - Table name
 * @param {number} length - number of columns
 */
function createTable({ name, length }) {
  const placeholders = genColsNames(length);
  const sql = `CREATE TABLE IF NOT EXISTS '${name}' (${placeholders});`;
  return db.prepare(sql).run();
};

/**
 * 
 * @param {string} name - Table name
 * @param {array} rows - Array of rows
 */
async function fillTable({ name, rows, indexing = false }) {
  const cols = genColsNames(rows[0].length);
  const placeholders = new Array(rows[0].length).fill('?').join(',');
  const insertSql = `INSERT INTO '${name}' (${cols}) VALUES (${placeholders});`;
  const searchSql = `INSERT INTO search (text, tablename, id) VALUES (?, '${name}', ?);`;
  const insert = db.prepare(insertSql);
  const search = db.prepare(searchSql);
  const transact = db.transaction((rows) => {
    const handle = !indexing 
    ? (row) => insert.run(row)
    : (row, i) => {
      insert.run(row);
      search.run(row.join(' '), i + 1);
    }
    
    rows.forEach(handle);
  });

  transact(rows);
  return await db.prepare('SELECT last_insert_rowid();').get();
};

/**
 * 
 * @param {string} name 
 * @param {array} rows 
 * @param {boolean} indexing 
 * @returns 
 */
async function placeTable({ name, rows, indexing = false}) {
  dropTable(name);
  createTable({name, length: rows[0].length});
  return await fillTable({name, rows, indexing});
}

/**
 * 
 * @param {string} name - Table name
 * @param {number} limit - Limit of rows
 * @param {number} offset - Ofset of rows
 * @returns {array} - Array of rows
 */
async function getTableData({ name, limit = null, offset = null, where = null }) {
  let sql = `SELECT * FROM "${name}"`;
  if (limit) sql += ' LIMIT ' + limit;
  if (offset) sql += ' OFFSET ' + offset;
  if (where) sql += ' WHERE ' + where;
  const result = [];
  const stmt = db.prepare(sql);
  for (let row of stmt.iterate())
    result.push(Object.values(row));
  return result;
};

/**
 * 
 * @param {string} name - Table name
 * @param {number} id - Row id for deleting
 * @returns 
 */
async function deleteTable({ name, id }) {
  const sql = `DELETE FROM "${name}" WHERE rowid = ${id}`;
  return db.prepare(sql).run();
};
/**
 * 
 * @param {string} name - Table name
 * @returns 
 */
async function dropTable(name) {
  const sql = `DROP TABLE IF EXISTS "${name}"`;
  return db.prepare(sql).run();
};


/**
 * @param {string} query - Search query
 * @returns {array} - List of results on query
 */
async function search({ query }) {
  const sql = `SELECT DISTINCT text FROM search WHERE text MATCH '${query}'`;
  const rows = await db.prepare(sql).all();
  return rows.map(r => r.text);
};

/**
 * @return {array} - List of tables in database
 */
async function getTablesList() {
  const result = await db.prepare(`SELECT name FROM sqlite_schema WHERE type='table' AND name NOT LIKE 'search%'`).all();
  return result.map(r => r.name);
};



export default {
  placeTable,
  createTable,
  fillTable,
  getTableData,
  deleteTable,
  search,
  getTablesList
};


/*----------------------- HELPERS ---------------------*/

function genColsNames(length) {
  return new Array(length).fill().map((_, i) => 'col' + (i + 1)).join(',')
}