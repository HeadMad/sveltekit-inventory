<script>
  import Icon from "$lib/icon/Icon.svelte";
  import Checkbox from "$lib/checkbox/Checkbox.svelte";
  import Popup from "$lib/popup/Popup.svelte";
  import BarcodeInput from "$lib/default-components/table/BarcodeInput.svelte";

  export let data = [];
  export let head = [];

  let checkCount = 0;
</script>

<div class="wrap">
  <div class="table">
    <table>
      <thead>
        <tr>
          <th><Checkbox checked disabled /></th>
          {#each head as th, i}
            <th>{th}</th>
          {/each}
          <th>
            <Popup>
              <Icon size="1.5em">more_vert</Icon>
              <ul slot="data">
                <li>Снять выделение</li>
                <li>Удалить выделенные</li>
              </ul>
            </Popup>
          </th>
        </tr>
      </thead>
  
      {#if data.length}
        <tbody>
          {#each new Array(5) as row, i}
            <tr>
              <td>
                <Checkbox name="row" size="1.5em" />
              </td>
              {#each data[0] as cell}
                <td>{cell}</td>
              {/each}
              <td>
                <Icon size="1.5em">more_vert</Icon>
              </td>
            </tr>
          {/each}
        </tbody>
      {/if}
    </table>
  </div>
  <BarcodeInput />
</div>

<style>

  /* popups */

  ul {
    list-style: none;
    padding: 0.25em;
    margin: 0;
  }

  li {
    font-size: 0.75rem;
    font-style: normal;
    text-transform: none;
    font-weight: normal;
    line-height: 1.5em;
    white-space: nowrap;
    padding: 0.25em 0.75em;
    cursor: pointer;
    color: #888;
  }

  li:hover {
    background-color: #eee;
  }



  /* Table */

  .wrap {
    background: #fff;
    border-bottom: 1px solid #eee;
    display: inline-block;
    box-sizing: border-box;
    padding-bottom: 2rem;

  }

  .table {
		resize: vertical;
		max-height: 100%;
		overflow: auto;
	}

  

  table {
		border-collapse: collapse;
		border: solid #ddd;
		border-width: 0 1px;
    height: 100%;
	}
	thead{
		position: -webkit-sticky;
		position: sticky;
		top: 0;
	}

	th {
		position: relative;
    text-align: left;
		width: 200px;
		height: 40px;
		background: #efefef;
	}
	
	th::before {
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		right: -1px;
		bottom: -1px;
		border: 1px solid #ddd;
	}
	th:first-child::before {
		left: -2px;
	}

	
	th:hover,
	th:active {
		resize: horizontal;
		overflow: auto;
	}

	
	td {
		height: 32px;
		border: 1px solid #eee
	}
	
	tr:nth-child(even) {
		background: #fafafa;
	}
	
	

  /* th:first-child,
  th:last-child,
  td:first-child,
  td:last-child {
    flex-grow: 0;
    width: 1.5em;
    text-align: center;
  } */
</style>
