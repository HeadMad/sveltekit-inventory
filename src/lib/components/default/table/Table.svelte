<script>
  let body = [];
  let head = [];

  export { body, head };
</script>

<div class="table">
  <slot name="before" />
  <table {...$$restProps}>
    {#if head.length}
      <slot name="thead" {head}>
        <thead>
          <tr>
            {#each head as th, i}
              <th>{th}</th>
            {/each}
          </tr>
        </thead>
      </slot>
    {/if}

    {#if body.length}
        {#each body as cells, i}
          <slot name="row" {cells} num={i + 1}>
            <tr>
              {#each cells as cell}
                <td>{cell}</td>
              {/each}
            </tr>
          </slot>
        {/each}
    {/if}
  </table>

  <slot name="after" />
</div>

<style>
  /* Table */

  /* .wrap {
    border-bottom: 1px solid #eee;
    box-sizing: border-box;
  } */

  /* .table {
    background: #fff;
    resize: vertical;
    max-height: 100%;
    overflow-y: scroll;
    scrollbar-gutter: stable;
    scrollbar-width: 10px;
    scrollbar-color: #ccc rgb(196, 20, 20);
  }
  .table::-webkit-scrollbar {
    width: 10px;
  }
  .table::-webkit-scrollbar-track {
    position: absolute;
  background: transparent;
  border-radius: 0;
    border: none;
  }
  .table::-webkit-scrollbar-thumb {
    background-color: red;
    border-radius: 0;
    border: none;
    background-image: ;
  } */

  table {
    border-collapse: separate;
    border-spacing: 1px;
    height: 100%;
    width: 100%;
    background-color: #ddd;
  }


  table :global(th) {
    position: relative;
    text-align: left;
    width: 200px;
    height: 40px;
    background: #efefef;
  }

  table :global(th)::before {
    content: "";
    position: absolute;
    top: -1px;
    left: -1px;
    right: 0;
    bottom: -1px;
    border: solid #ccc;
    border-width: 1px 0 1px 1px;
  }

  table :global(th):last-child::before {
    border-right-width: 1px;
    right: -1px;
  }

  table :global(th):hover,
  table :global(th):active {
    resize: horizontal;
    overflow: auto;
  }

  table :global(td) {
    height: 32px;
    /* background-color: #fff; */
  }

  table :global(tr) {
    background-color: #fff;
  }

  table :global(tr):nth-child(even) {
    background: #fafafa;
  }

  table :global(tr):hover,
  table :global(tr):nth-child(even):hover {
    background-color: #eee;
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
