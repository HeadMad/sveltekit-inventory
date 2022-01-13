<script>
  import Headroom from "$lib/components/default/headroom/Headroom.svelte";
  import menu from "$lib/menu";

  let page = "";
  export { page };
</script>

<Headroom>
  <header>
    <div class="wrap">
      <ul class="menu">
        {#each menu as { text, href }}
          <li class="menu__item">
            <a {href} class="menu__link" class:menu__link_active={page === href}
              >{text}</a
            >
          </li>
        {/each}
      </ul>
    </div>
  </header>
</Headroom>

<style>
  header {
    position: relative;
    border-bottom: 1px solid var(--tertiary-color);
    padding: 0 2rem;
    background-color: var(--primary-color);
    z-index: 10;
  }
  .wrap {
    max-width: 800px;
    margin: auto;
  }
  
/* 
  h1 {
    text-align: left;
    font-size: 14px;
    line-height: 24px;
    margin: 28px 0 12px;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    font-weight: 700;
  } */

  .menu {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    margin-bottom: -1px;
  }

  .menu__link {
    text-decoration: none;
    display: inline-block;
    font-weight: 500;
    font-size: 14px;
    height: 39px;
    line-height: 39px;
    color: var(--text-color);
    padding: 0 16px;
  }

  .menu__link_active {
    border-bottom: 1px solid var(--text-color);
  }
</style>
