export async function load({ fetch }) {
  const response = await fetch('/catalog/api', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ method: 'getTablesList' })
  }).then(data => data.json());

  const tablesList = response.ok ? response.result : [];
  
  return { tablesList };
}