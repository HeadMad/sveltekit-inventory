import db from "$lib/sqlite/tempDb";
import {createHandlerResponse} from "$lib/API"

export async function post({request}) {
  const {method, params} = await request.json();
  const response = await createHandlerResponse(db[method])(params);
  return {
    body: response
  }
}