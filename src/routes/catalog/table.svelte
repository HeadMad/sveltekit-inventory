<script context="module">
  import {createRequest} from "$lib/API";
  export async function load({ page, fetch }) {
    const name = page.query.get('name');
    const response = await createRequest('/catalog/api', fetch)('getTableData', {table: name})
    if (!response.ok) return console.log(response);

    return {
      props: { name, tableData: response.result },
    };
  }
</script>

<script>
  import Table from "$lib/components/default/table/Table.svelte";
  import Icon from "$lib/components/default/icon/Icon.svelte";
  import { pin } from "$lib/store";

  $: top = $pin ? "39px" : "0";

  let name;
  let tableData = [];

  const tableHead = tableData.shift();

  export { name, tableData };
</script>

<h1>{name}</h1>
{#if tableData}
  <Table head={tableHead} body={tableData} style="font-size: 14px;">
    <thead slot="thead" let:head style="top:{top}">
      <tr>
        {#each head as th} <th>{th}</th> {/each}
      </tr>
      <tr class="settings-row">
        {#each head as _}
          <td class="settings-row__cell">
            Настройки
            <Icon class="settings-row__icon">edit</Icon>
          </td>
        {/each}
      </tr>
    </thead>

    <tr slot="row" let:cells>
      {#each cells as cell} <td>{cell}</td> {/each}
    </tr>
    <div slot="after" class="after">Содержимое нижнего блока</div>
  </Table>
{/if}

<style>
  tr.settings-row {
    box-shadow: 0 5px 5px #00000015;
    height: 1.5rem;
  }

  .settings-row__cell {
    background-color: #fff;
    font-size: 0.75rem;
    vertical-align: middle;
  }

  td > :global(.settings-row__icon) {
    font-size: 1rem;
    display: inline;
    float: right;
    color: #ccc;
  }

  thead {
    top: 0;
    position: -webkit-sticky;
    position: sticky;
    transition: .1s;
  }

  td,
  th {
    padding: 0.25em 1em;
  }

  .after {
    position: sticky;
    bottom: 0;
    background-color: #fff;
    box-shadow: 0 -5px 5px rgba(0, 0, 0, 0.15);
    padding: 0.25em 1em;
    font-size: 14px;
  }
</style>
