import db from "$lib/sqlite/tempDb.js";

export async function post({ body }) {
  const {table, length} = body;
  const result = db(table).create(length);
  console.log('Create table: ', result);

  return {
    body: result
  }
}

export async function get({query}) {

  const {table, limit, offset} = JSON.parse(query.get('data'));
  const result = await db(table).get(limit, offset);
  return {
    body: result
  }
}

export async function put({ body }) {
  const {table, rows} = body;
  const result = await db(table).set(rows);
  console.log('Set data in teable: ', result);
  return {
    body: result
  }
}

