## Usage
```html
<script>
  import Modal from '$lib/modal/Modal.svelte';
  let win;
</script>

<button on:click={win.open}> Open Window </button>

<Modal
  opened
  bind:this={win}
  on:open={() => { console.log('Modal is opened'); }}
  on:close={() => { console.log('Modal is closet'); }}
>
  <div>
    <h1>My Modal Window</h1>
    <p>Simple usage for component "Modal"</p>
    <button on:click={win.close}> Close Window </button>
  </div>
</Modal>

<style>
  div {
    background-color: #fff;
    padding: 40px 60px;
  }
</style>
```