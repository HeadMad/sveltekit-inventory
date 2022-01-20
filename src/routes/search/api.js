import db from "$lib/sqlite/tempDb";
import {createHandlerResponse} from "$lib/API"

export async function post({body}) {
  const {method, params} = body;
  const response = await createHandlerResponse(db[method])(params);
  return {
    body: response
  }
}