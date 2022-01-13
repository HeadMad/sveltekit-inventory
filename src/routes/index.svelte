<script>
  import { query, path, fragment } from "svelte-pathfinder";
  import Modal from "$lib/components/default/modal/Modal.svelte";
  import Input from "$lib/components/default/input/Input.svelte";

  import { title } from "$lib/store.js";
  $title = "Главная страница";

  let rows = [];
  let value = '';
  let input;
  let searchResults = [];

  // async function onInputSearch(event) {
  //   if (this.value.length < 3) return searchResults = [];

  //   const res = await fetch('/search/api?s=' + this.value);
  //   const result = await res.json();
  //   console.log(result)
  //   if (result.ok)
  //     searchResults = result.result;
  //   }
    
  //   function onListSelect(event) {
  //     const val = event.detail.value;
  //     rows = rows.concat(val);
  //     searchResults = [];
  //     input.value = '';
  // }
 
</script>

<div class="wrap">
  <section>
    <h1>Инвентаризация товаров</h1>
    <p>В поле ниже поместите штрихкод или наниет вводить название товара</p>
  </section>
  <div class="controll">
    <!-- <Input bind:this={input} bind:value label="Штрихкод" class="input_grow_1" on:input={onInputSearch}>
      <InputList items={searchResults} on:select={onListSelect}/>
    </Input> -->
    <Input
    value="me"
    items={['some time the', 'text same', 'lead', 'and', 'me', 'take']}
    class="some_class"
    size="40"
    on:select={event => console.log(event)}
    />


    <button on:blur={()=> input.focus()}>+1</button>
  </div>
  <div class="rows">
    <table>
      {#each rows as row, i}
        <tr>
          <td>{row}</td>
        </tr>
      {/each}
    </table>
  </div>
</div>


<style>
  .wrap {
    display: flex;
    flex-direction: column;
    gap: 18px;
    min-height: 100%;
    max-width: 800px;
    margin: auto;
    justify-content: center;
  }
  .controll {
    position: sticky;
    top:0;
    width: 100%;
    white-space: nowrap;
    display: flex;
    align-items: flex-end;
    gap: 12px;
    padding: 30px 50px;
    background: #fff;
    box-shadow: 0 0 20px #00000035;
    box-sizing: border-box;
  }
  /* .controll:hover {
		resize: horizontal;
		overflow: auto;
	} */
  :global(.input_grow_1) {
    flex-grow: 1;
  }
  .rows {
    /* flex-grow: 1; */
    /* overflow: auto; */
  }
</style>
