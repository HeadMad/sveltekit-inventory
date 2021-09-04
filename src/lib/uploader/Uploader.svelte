<script>
  import { createEventDispatcher, onMount } from 'svelte';
  const dispatch = createEventDispatcher();
  export let accept = ".";
  let control;
  let state = 'none';
  let files = [];

  onMount(() => {
    function docPreventDefault(event) {  event.preventDefault(); }
    document.addEventListener('drop', docPreventDefault);
    document.addEventListener('dragover', docPreventDefault);

    return () => {
      document.removeEventListener('drop', docPreventDefault);
      document.removeEventListener('dragover', docPreventDefault);
    }
  })


  function onDrop(event) {
    event.preventDefault();
    state = 'drop';
    files = event.dataTransfer.files;
    dispatch('change', {files});
  }

  function dragEnter() {
    state = 'enter';
  }
  function dragLeave() {
    state = 'leave';
  }

  function onChange() {
    files = this.files;
    dispatch('change', {files});
  }

  function onClick() {
    control.click();
  }

  
</script>

<div
class="uploader"

on:drop={onDrop}
on:click={onClick}

on:drop
on:dragenter={dragEnter}
on:dragleave={dragLeave}
>
  <slot {state}>
    <div class="uploader__dropzone uploader__dropzone_state_{state}">

      <ul class="uploader__items">
        {#each files as file}
        <li class="uploader__item">{file.name}</li>
        {:else}
        Перетащите сюда файлы
        {/each}
      </ul>
    </div>
  </slot>
</div>
<input
    {accept}
    multiple
    type="file"
    class="uploader__control"
    on:change={onChange}
    bind:this={control}
  />

<style>
  .uploader {
    display: contents;
  }

  .uploader__control {
    display: none;
  }

  .uploader__items {
    display: inline-block;
    list-style: none;
    padding: 0;
    margin: 0;
  }
  .uploader__item {
    background-color: var(--light);
    border-radius: 4px;
    text-align: left;
    margin: 5px 0;
    line-height: 24px;
    font-size: 14px;
  }

  .uploader__dropzone {
    display: flex;
    text-align: center;
    flex-direction: column;
    justify-content: center;
    border-radius: 4px;
    border: 2px dashed #ccc;
    width: var(--width, auto);
    min-height: var(--height, 150px);
  }

  .uploader__dropzone_state_enter {
    border-color: var(--dark);
  }
</style>
