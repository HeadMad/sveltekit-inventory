<script>

  export let tabindex = -1;
  
</script>

<span
{...$$restProps}
{tabindex}

on:click
on:focus

class="material-icons{$$restProps.class ? ' ' + $$restProps.class : ''}"
><slot /></span>
