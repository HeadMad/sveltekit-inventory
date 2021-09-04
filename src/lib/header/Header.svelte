<script>

import { title } from '$lib/store.js';

  export let page = '';
  console.log(page)

  const menu = [
    {
      text: 'Главная',
      href: '/',
    },
    {
      text: 'Катологи',
      href: '/catalogs'
    },
    {
      text: 'Ревизия',
      href: '/revision',
    },
    {
      text: 'Настройки',
      href: '/settings',
    },
    
  ];



</script>

<header>
  <h1>{$title}</h1>

  <ul class="menu">
    {#each menu as {text, href}}
    <li class="menu__item">
      <a {href}
      class="menu__link"
      class:menu__link_active={page === href}
      >{text}</a>
    </li>
    {/each}
    
  </ul>
</header>


<style>
  header {
    border-bottom: 1px solid var(--tertiary-color);
  }

 

  h1 {
    text-align: left;
    font-size: 14px;
    line-height: 24px;
    margin: 28px 0 12px;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    font-weight: 700;
  }

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