<script>
  import Icon from "$lib/icon/Icon.svelte";
  import Checkbox from "$lib/checkbox/Checkbox.svelte";
  import Popup from "$lib/popup/Popup.svelte";

  export let data = [];
  export let head = [];

  let checkCount = 0;
</script>

<div class="table">
  <div class="table__head">
    <slot name="header" />
    {#if head.length}
      <div class="table__row">
        <div class="table__cell table__cell_check">
          <Checkbox checked disabled />
        </div>
        {#each head as th, i}
          <div class="table__cell">
            {th}
          </div>
        {/each}
        <div class="table__cell table__cell_opt">
          <Popup>
            <Icon size="1.5em">more_vert</Icon>
            <ul slot="data">
              <li>Снять выделение</li>
              <li>Удалить выделенные</li>
            </ul>
          </Popup>
        </div>
      </div>
    {/if}
  </div>
  {#if data.length}
    <div class="table__body">
      {#each data as row, i}
        <div class="table__row">
          <div class="table__cell table__cell_check">
            <Checkbox name="row" size="1.5em" />
          </div>
          {#each row as cell}
            <div class="table__cell">{cell}</div>
          {/each}
          <div class="table__cell table__cell_opt">
              <Icon size="1.5em">more_vert</Icon>
          </div>
        </div>
      {/each}
    </div>
  {/if}
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

  .table__head > .table__row {
    height: 40px;
    background: #f4f2ff;
    width: 100%;
  }
  
  /* .table__row_title > .table__cell {
    font-family: "Ubuntu", sans-serif;
    font-weight: 600;
    letter-spacing: 0.05em;
    text-transform: uppercase;
    font-size: 11px;
    
  } */

  
  .table__row {
    border-top: 1px solid #d9d5ec;
    display: flex;
  }

  .table__cell {
    flex-grow: 1;
    line-height: 4.5em;
    padding: 0 1em;
    font-weight: 400;
    font-size: 0.75rem;
    color: #25213b;
  }

  .table__cell_check,
  .table__cell_opt {
    flex-grow: 0;
    width: 1.5em;
    text-align: center;
  }
</style>
