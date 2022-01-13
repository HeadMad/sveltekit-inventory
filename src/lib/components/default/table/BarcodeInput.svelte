<script>
  import Icon from "$lib/icon/Icon.svelte";
</script>


<label>
  <input type="text" placeholder="Вставьте штрихкод и нажмите Enter" maxlength="13">
  <span><Icon color="inherit" size="1.25rem">document_scanner</Icon></span>
</label>

<style>
  label {
    display: block;
    margin-bottom: -2rem;
    position: relative;
    height: 2rem;
    
  }
  span {
    color: #ccc;
    position: absolute;
    width: 1.25rem;
    height: 1.25rem;
    top: 0;
    bottom: 0;
    margin: auto 0;
    left: .5rem;
    transform: rotate(90deg);
    font-size: 1.25rem;

  }
  
  input {
    box-sizing: border-box;
    outline: none;
    height: 2rem;
    font-size: .75rem;
    border: 0;
    width: 100%;
    padding: 0 0 0 2.5rem;
  }

  input:focus + span {
    color: #666;
  }
</style>