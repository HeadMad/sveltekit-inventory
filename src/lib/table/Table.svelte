<script>
  import Icon from '$lib/icon/Icon.svelte';
  import Checkbox from '$lib/checkbox/Checkbox.svelte';

  export let data = [];
  export let head = [];


  let checkCount = 0;

  
</script>

<div class="table">
  <slot name="header" />
  {#if head.length}
    <div class="table__title">
      <div class="table__th table__th_checkbox">
        <Checkbox checked disabled />
      </div>
      {#each head as th, i}
      <div class="table__th">
        {th}
      </div>
      {/each}
      <div class="table__th table__th_more">
        <Icon>more_vert</Icon> 
      </div>
    </div>
  {/if}
  <div class="table__data">
    {#if data.length}
      <table>
        {#each data as row, i}
          <tr>
            <td>
              <Checkbox name="row" radio color="blue" />
            </td>
            {#each row as cell}
              <td>{cell}</td>
            {/each}
            <td>
              <Icon>more_vert</Icon>                
            </td>
          </tr>
        {/each}
      </table>
    {/if}
  </div>
  <slot name="footer" />
</div>

<style>
  .table {
    width: 100%;
    background: #ffffff;
    box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.2);
    border-radius: 8px;
    margin: 48px 0 0;
    border-collapse: collapse;
  }

  .table__title {
    display: table;
    height: 40px;
    background: #f4f2ff;
    width: 100%;
  }

  .table__th {
    font-family: 'Ubuntu', sans-serif;
    display: table-cell;
    vertical-align: middle;
    font-weight: 600;
    letter-spacing: 0.05em;
    padding: 0 20px;
    text-transform: uppercase;
    font-size: 11px;
  }


  table {
    width: 100%;
    border-collapse: collapse;
  }
  tr {
    border-top: 1px solid #d9d5ec;
  }

  td {
    height: 60px;
    padding: 0 20px;
    font-weight: 400;
    font-size: 14px;
    color: #25213b;
  }
</style>
