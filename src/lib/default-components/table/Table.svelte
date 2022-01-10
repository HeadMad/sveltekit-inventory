<script>
  let body = [];
  let head = [];


  export {
    body,
    head
  }
</script>


  <div class="table">
    <table>
      <thead>
        <tr>
          {#each head as th, i}
            <th>{th}</th>
          {/each}
        </tr>
      </thead>
  
      {#if body.length}
        <tbody>
          {#each body as row, i}
            <tr>
              {#each row as cell}
                <td>{cell}</td>
              {/each}
            </tr>
          {/each}
        </tbody>
      {/if}
    </table>
  </div>


<style>





  /* Table */

  /* .wrap {
    border-bottom: 1px solid #eee;
    box-sizing: border-box;
  } */
  
  .table {
    background: #fff;
		resize: vertical;
		max-height: 100%;
		/* overflow-y: scroll; */
    /* scrollbar-gutter: stable; */
  scrollbar-width: 10px;
  scrollbar-color: #ccc rgb(196, 20, 20);
}
.table::-webkit-scrollbar {
  /* width: 10px; */
}
.table::-webkit-scrollbar-track {

  /* position: absolute;
  background: transparent;
  border-radius: 0; */
  border: none;
}
.table::-webkit-scrollbar-thumb {
 background-color: red; 
  border-radius: 0;
  border: none; 
  /* background-image: ; */
}

  

  table {
		border-collapse: collapse;
		border: solid #ddd;
		border-width: 0 1px;
    height: 100%;
    width: 100%;
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
  tr:hover,
  tr:nth-child(even):hover {
    background-color: #00000010;
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
