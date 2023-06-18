import {createRequest} from "$lib/api";

   export async function load({ params, fetch, session, context }) {
     const {name} = params;
     const response = await createRequest('/catalog/api', fetch)('getTableData', {name});
     
     const tableData = response.ok ? response.result : [];
    return { tableData }
  };
  
  