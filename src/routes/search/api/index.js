import {search} from "$lib/sqlite/tempDb"

export async function get({query}) {
  const str = query.get('s');
  const result = await search(str);
  return {
    body: result
  }
}