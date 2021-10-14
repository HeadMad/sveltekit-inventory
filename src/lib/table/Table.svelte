<script>
  import Icon from "$lib/icon/Icon.svelte";
  import Checkbox from "$lib/checkbox/Checkbox.svelte";
  import Popup from "$lib/popup/Popup.svelte";

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
          <span class="table__th-text">{th}</span>
        </div>
      {/each}
      <div class="table__th table__th_more">
        <Popup position="top">
          <Icon size="1.5em">more_vert</Icon>
          <ul slot="data">
            <li>Снять выделение</li>
            <li>Удалить выделенные</li>
          </ul>
        </Popup>
      </div>
    </div>
  {/if}
  {#if data.length}
    <div class="table__data">
      {#each data as row, i}
        <div class="table__row">
          <div class="table__cell table__row-check">
            <Checkbox name="row" size="1.5em" />
          </div>
          {#each row as cell}
            <div class="table__cell">{cell}</div>
          {/each}
          <div class="table__cell table__row-opt">
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

  .table__title {
    display: table;
    height: 40px;
    background: #f4f2ff;
    width: 100%;
  }

  .table__th {
    display: table-cell;
    vertical-align: middle;
    padding: 0 20px;
  }
  
  .table__th-text {
    font-family: "Ubuntu", sans-serif;
    font-weight: 600;
    letter-spacing: 0.05em;
    text-transform: uppercase;
    font-size: 11px;
    
  }

  
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

  .table__row-check,
  .table__row-opt {
    flex-grow: 0;
    width: 1.5em;
    text-align: center;
  }
</style>
