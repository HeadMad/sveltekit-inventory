import {getTablesList} from "$lib/sqlite/tempDb"

export async function get() {
  const result = await getTablesList();

  return {
    body: result
  }
}