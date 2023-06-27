<script>
  import Table from "$lib/components/default/table/Table.svelte";
  import Modal from "$lib/components/default/modal/modal.svelte";
  import Icon from "$lib/components/default/icon/Icon.svelte";

  let body = [];
  let head = [];

  export { body, head };
</script>

<Table {head} {body} style="font-size: 14px;">
    <thead slot="thead" let:head>
      <tr> {#each head as th} <th>{th}</th> {/each} </tr>
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
  }

  td, th {
    padding: .25em 1em;
  }

  .after {
    position: sticky;
    bottom: 0;
    background-color: #fff;
    box-shadow: 0 -5px 5px rgba(0,0,0,.15);
    padding: .25em 1em;
    font-size: 14px;
  }
</style>
