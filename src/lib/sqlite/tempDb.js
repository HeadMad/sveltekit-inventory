
import sqlite3 from 'better-sqlite3';

const db = sqlite3('./temp.sqlite3');
process.on('exit', () => db.close());

// Create Search table
(function () {
  const sql = `CREATE VIRTUAL TABLE IF NOT EXISTS search USING fts4(text, tablename, id INTEGER);`;
  console.log(Result(async () => await db.prepare(sql).run()))
})()


/**
 * 
 * @param {string} table - Table name
 * @param {number} length - number of columns
 */
function Create(table, length) {
  const placeholders = genColsNames(length);
  const sql = `CREATE TABLE '${table}' (${placeholders});`;
  return Result(() => db.prepare(sql).run());
}

/**
 * 
 * @param {string} table - Table name
 * @param {array} rows - Array of rows
 */
async function Insert(table, rows) {
  const cols = genColsNames(rows[0].length);
  const placeholders = new Array(rows[0].length).fill('?').join(',');
  const insertSql = `INSERT INTO '${table}' (${cols}) VALUES (${placeholders});`;
  const searchSql = `INSERT INTO search (text, tablename, id) VALUES (?, '${table}', ?);`;

  return Result(async () => {
    const insert = db.prepare(insertSql);
    const search = db.prepare(searchSql);

    const transact = db.transaction((rows) => {
      rows.forEach(async (row, i) => {
        insert.run(row);
        search.run(row.join(' '), i+1);
      });
    });
    
    transact(rows);
    return await db.prepare('SELECT last_insert_rowid();').get();
  });
}

/**
 * 
 * @param {string} table - Table name
 * @param {number} limit - Limit of rows
 * @param {number} offset - Ofset of rows
 * @returns {array} - Array of rows
 */
async function Select(table, limit = null, offset = null, where = null) {
  let sql = `SELECT * FROM "${table}"`;
  if (limit) sql += ' LIMIT ' + limit;
  if (offset) sql += ' OFFSET ' + offset;
  if (where) sql += ' WHERE ' + where;

  return Result(() => {
    const result = [];
    const stmt = db.prepare(sql);
    for (let row of stmt.iterate())
      result.push(Object.values(row));
    return result;
  });

}

/**
 * 
 * @param {string} table - Table name
 * @param {number} id - Row id for deleting
 * @returns 
 */
function Delete(table, id) {
  const sql = `DELETE FROM "${table}" WHERE rowid = ${id}`;
  return Result(() => db.prepare(sql).run());
}

export async function search(query) {
  const sql = `SELECT text FROM search WHERE text MATCH '${query}'`;
  return Result(async () => {
    const rows = await db.prepare(sql).all();
    return rows.map(r => r.text);
  });
}

export async function getTablesList() {
  return Result(async () => {
    const result = await db.prepare(`SELECT name FROM sqlite_schema WHERE type='table' AND name NOT LIKE 'search%'`).all();
    return result.map(r => r.name);
  });
}






export default function (table) {
  return {
    create: (length) => Create(table, length),
    set: (rows) => Insert(table, rows),
    get: (limit = null, offset = null) => Select(table, limit, offset)
  };
}


/*----------------------- HELPERS ---------------------*/

function genColsNames(length) {
  return new Array(length).fill().map((_, i) => 'col' + (i + 1)).join(',')
}

async function Result(handler) {
  try {
    return { ok: true, result: await handler() }
  } catch (err) {
    return { ok: false, message: err.toString() }
  }
}

async function createSearchTrigger(table) {
    const sql = `CREATE TRIGGER AFTER INSERT ON '${table}`

}