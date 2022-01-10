<script>
  import { query, path, fragment } from "svelte-pathfinder";
  import Modal from "$lib/default-components/modal/Modal.svelte";
  import Input from "$lib/default-components/input/Input.svelte";
  import InputList from "$lib/default-components/input/InputList.svelte";

  import { title } from "$lib/store.js";
  $title = "Главная страница";

  const rows = new Array(100).fill("Some Text");
  let input;
</script>

<div class="wraper">
  <section>
    <h1>Инвентаризация товаров</h1>
    <p>В поле ниже поместите штрихкод или наниет вводить название товара</p>
  </section>
  <div class="controll">
    <Input bind:this={input} label="Штрихкод" class="input_grow_1"/>
    <button on:blur={()=> input.focus()}>+1</button>
  </div>
  <div class="rows">
    <table>
      {#each rows as row, i}
        <tr>
          <td>{i} {row}</td>
        </tr>
      {/each}
    </table>
  </div>
</div>

<style>
  .wraper {
    display: flex;
    flex-direction: column;
    gap: 18px;
    min-height: 100%;
    margin: auto;
    justify-content: center;
    width: min-content;
  }
  .controll {
    position: sticky;
    top:0;
    width: 700px;
    min-width: 300px;
    white-space: nowrap;
    display: flex;
    align-items: flex-end;
    gap: 12px;
    padding: 30px 50px;
    background: #fff;
    box-shadow: 0 0 20px #00000035;
  }
  .controll:hover {
		resize: horizontal;
		overflow: auto;
	}
  :global(.input_grow_1) {
    flex-grow: 1;
  }
  .rows {
    /* flex-grow: 1; */
    /* overflow: auto; */
  }
</style>
