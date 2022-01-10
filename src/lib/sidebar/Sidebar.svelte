<script>
  import Icon from "$lib/icon/Icon.svelte";
  let sidebar = false;
  const menu = [
    {
      text: "Главная",
      href: "/",
    },
    {
      text: "Катологи",
      href: "/catalog",
    },
    {
      text: "Загрузка из файла",
      href: "/upload",
    },
    {
      text: "Ревизия",
      href: "/revision",
    },
    {
      text: "Настройки",
      href: "/settings",
    },
  ];
</script>

<aside class:show={sidebar}>
  <button on:click={() => (sidebar = !sidebar)} class:in={sidebar}>
    <Icon>menu</Icon>
  </button>
  <ul class="menu">
    {#each menu as { text, href }}
      <li class="menu__item">
        <a
          {href}
          class="menu__link"
          on:click={() => (sidebar = false)}>{text}</a
        >
      </li>
    {/each}
  </ul>
</aside>

<style>
  aside {
    width: 250px;
    position: fixed;
    height: 100%;
    background: #fff;
    top: 0;
    left: -250px;
    transition: 0.1s ease-in-out;
    box-shadow: 0 0 20px #00000050;
  }
  aside.show {
    left: 0;
  }
  button {
    position: relative;
    left: 100%;
    margin-left: 1em;
    white-space: nowrap;
    top: 1em;
    border: 0;
    background: none;
  }

  .in {
    left: auto;
  }
</style>
