<script>
  import Input from "$lib/default-components/input/Input.svelte";
  import Select from "$lib/default-components/select/Select.svelte";
import { is_client } from "svelte/internal";
  let tableName = "sem";
  const columns = [
    {
      name: "id",
      type: "INTEGER",
      constraints: ["PRIMARY KEY", "NOT NULL"],
    },
  ];

  const columnConstraints = ['⟵', "NOT NULL", "UNIQUE", "PRIMARY KEY"];
  const columnTypes = ["TEXT", "INTEGER", "REAL", "NONE"];

</script>

<Input label="Название таблицы" bind:value={tableName} />
<br />
<br />
{#each columns as col, i}
  <Input label="Имя колонки" bind:value={col.name} />
  <Select label="Тип" list={columnTypes} bind:value={col.type} size="8"/>
  {#each col.constraints as _, ind }
    <Select
      label="Ограничение"
      list={columnConstraints}
      bind:value={col.constraints[ind]}
      size="11"
      on:select={ event => {
        if (event.detail.value === '⟵') 
          col.constraints = col.constraints.filter((_, i) => i !== ind);
      }}
    />&nbsp
  {/each}
  {#if col.constraints.length < 3}
    <button on:click={function() {
      col.constraints = col.constraints.concat('');
    }}>+ Ограничение</button>
  {/if}
{/each}
