<script context="module">
  import {createRequest} from "$lib/API";
  export async function load({ fetch }) {
    const response = await createRequest('/catalog/api', fetch)('getTablesList');
    const tablesList = response.ok ? response.result : [];
    return {
      props: { tablesList },
    };
  }
</script>

<script>

 
</script>

<div class="wrap">
  <ul class="menu">
    <li><a href="/">Создать каталог</a></li>
    <li><a href="/">Добавить таблицы</a></li>
    <li><a href="/">Создать каталог</a></li>
    <li><a href="/">Создать каталог</a></li>
  </ul>
</div>

<style>
  .wrap {
    display: flex;
    max-width: 800px;
    margin: auto;
  }

</style>
