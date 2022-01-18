import db from "$lib/sqlite/tempDb.js";
import {createHandlerResponse} from "$lib/api";

export async function post({ body }) {
  const {method, params} = body;
  const response = await createHandlerResponse(db[method])(params);
  
  return {
    body: response
  }
}

// export async function get({query}) {

//   const {table, limit, offset} = JSON.parse(query.get('data'));
//   const result = await db(table).get(limit, offset);
//   return {
//     body: result
//   }
// }

// export async function put({ body }) {
//   const {table, rows} = body;
//   const result = await db(table).set(rows);
//   console.log('Set data in teable: ', result);
//   return {
//     body: result
//   }
// }

