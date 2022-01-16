<script>
// @ts-nocheck

  // import { query, path, fragment } from "svelte-pathfinder";
  import Modal from "$lib/components/default/modal/Modal.svelte";
  import Input from "$lib/components/default/input/Input.svelte";

  import { title, pin } from "$lib/store.js";
  $title = "Главная страница";

  $: top = $pin ? '40px' : '0';

  let rows = [];
  let value = '';
  let ref;
  let searchResults = [];
  
  async function onInputSearch(event) {
    if (value.length < 3) return searchResults = [];
    
    const res = await fetch('/search/api?s=' + value);
    const result = await res.json();
    console.log(result)
    if (result.ok)
    searchResults = result.result;
  }
  
  function onListSelect(event) {
    const val = event.detail;
    rows = rows.concat(val);
    // searchResults = [];
    // value = '';
  }
  
  
</script>

<div class="wrap">
  <section>
    <h1>Инвентаризация товаров</h1>
    <p>В поле ниже поместите штрихкод или начниет вводить название товара</p>
  </section>
  <div class="controll" style="top:{top}">
    <Input
    bind:value

      list={searchResults}

      on:input={onInputSearch}
      on:select={onListSelect}

      class="input_grow_1"
      size="40"
    >
  <small slot="before">Вставте штрихкод или введите часть названия</small>
  </Input>

  
  
  <button on:blur={()=> ref.focus()}>+1</button>
</div>
<div class="rows">
  
  <Input list={["some", "like", "you", "like"]} type="button" value="like"></Input>
  
    <table>
      {#each Array(50).fill('hello') as row, i}
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
    z-index: 1000;
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
    transition: .1s;
  }
  /* .controll:hover {
		resize: horizontal;
		overflow: auto;
	} */
  :global(.input_grow_1) {
    flex-grow: 1;
  }
  /* .rows {
    flex-grow: 1;
    overflow: auto; 
  } */
</style>
