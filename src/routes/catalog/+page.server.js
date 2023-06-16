import {createRequest} from "$lib/api";
  export async function load({ fetch }) {
    const response = await createRequest('/catalog/api', fetch)('getTablesList');
    const tablesList = response.ok ? response.result : [];
    return {
      props: { tablesList },
    };
  }