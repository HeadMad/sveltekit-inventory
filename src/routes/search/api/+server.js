import db from "$lib/sqlite/tempDb";
import {createHandlerResponse} from "$lib/api"

export async function POST({request}) {
  const {method, params} = await request.json();
  const response = await createHandlerResponse(db[method])(params);
  return {
    body: response
  }
}