<script context="module">
  export function load({  page,  fetch,  session,  context }) {
    return {
      props: {
      }
    };
  };
</script>

<script>
  import { title } from "$lib/store.js";
  import Table from "$lib/table/Table.svelte";
  $title = "Главная страница";

  const data = [
    ["Штрихкод", "Наименование", "Количество", "Цена"],
    ["87487239478", "Колготки Incante р.48", 25, 207],
    ["87487239478", "Колготки Incante р.48", 25, 207],
    ["87487239478", "Колготки Incante р.48", 25, 207],
    ["87487239478", "Колготки Incante р.48", 25, 207],
    ["87487239478", "Колготки Incante р.48", 25, 207],
    ["87487239478", "Колготки Incante р.48", 25, 207],
    ["87487239478", "Колготки Incante р.48", 25, 207],
    ["87487239478", "Колготки Incante р.48", 25, 207],
  ];

  const head = data.shift();
</script>


<Table {data} {head} ></Table>


