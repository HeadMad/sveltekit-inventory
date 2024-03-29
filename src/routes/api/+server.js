/**
 * Work with SQLite database of tables
 * Has methods:
 *  createTable,
 *  fillTable,
 *  getTableData,
 *  deleteTable,
 *  search,
 *  getTablesList
 */


import db from "$lib/sqlite/tempDb.js";
import {createHandlerResponse} from "$lib/api";
import {json} from '@sveltejs/kit';

export async function POST({ request }) {
  const {method, params} = await request.json();
  const response = await createHandlerResponse(db[method])(params);
  
  return json(response);
}

