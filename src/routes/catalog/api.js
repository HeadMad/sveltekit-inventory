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
import {createHandlerResponse} from "$lib/API";

export async function post({ body }) {
  const {method, params} = body;
  const response = await createHandlerResponse(db[method])(params);
  
  return {
    body: response
  }
}

