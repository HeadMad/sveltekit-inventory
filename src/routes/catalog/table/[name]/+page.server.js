import {createRequest} from "$lib/api";

   export async function load({ params, fetch }) {
     const {name} = params;
     const response = await createRequest('/api', fetch)('getTableData', {name});
     
     const tableData = response.ok ? response.result : [];
    return { tableData }
  };
  
  