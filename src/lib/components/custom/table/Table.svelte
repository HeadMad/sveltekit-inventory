<script>
  import {afterUpdate, createEventDispatcher} from "svelte";
  const dispatch = createEventDispatcher();

  let rows = [];
  let ref;

  $: if(ref) dispatch("change", ref);
  export { rows };

</script>

{#if rows.length}
  <table bind:this={ref} on:load {...$$restProps}>
    <slot name="before" />
    <tbody>
    {#each rows as row, r}
      <tr>
        {#each row as value, c}
          <slot {value} row={r} col={c}>
            <td>{value}</td>
          </slot>
        {/each}
      </tr>
    {/each}
    </tbody>
    <slot name="after" />
  </table>
{/if}