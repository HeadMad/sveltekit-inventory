<script>
  import {title} from '$lib/store';
  $title = 'Катологи';

  import Table from "$lib/defaultComponents/table/Table.svelte";
  const data = [
    ["Штрихкод", "Наименование", "Количество", "Цена"],
    ["87487239478", "Колготки Incante р.48", 25, 207],
    ["87487239478", "Колготки Incante р.48", 25, 207],
    ["87488", "Колготки  р.48", 25, 20764564],
    ["87487239478", "Колготки Incante р.48", 25, 207],
    ["87487239478", "Колготки Incante р.48", 25, 207],
    ["87487239478", " Incante р.48", 25, 207],
    ["8748728", "Колготки Incante р.48", 25, 207],
    ["88", "Колготки Incante р.48", 25, 207],
  ];

  const head = data.shift();
</script>


<Table {data} {head} ></Table>