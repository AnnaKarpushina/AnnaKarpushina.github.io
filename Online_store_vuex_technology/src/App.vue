<!-- основной макет приложения онлайн-магазина -->
<template>
  <div class="os-container">
    <main class="os-products">
      <aside class="sidebar">
        <h2 class="sidebar__title">
          <router-link class="link-unstyled" to="/">Online Store</router-link>
        </h2>
        <ul class="sidebar__nav" data-element="navigation">
          <li>
            <router-link to="/" class="link-unstyled">
              <i class="bi bi-shop"></i><span>Товары</span>
            </router-link>
          </li>
          <li>
            <router-link to="/wishlist" class="link-unstyled">
              <i class="bi bi-star"></i>Избранное <span>{{ wishListProducts.length }}</span>
            </router-link>   
          </li>
          <li>
            <router-link to="/cart" class="link-unstyled">
              <i class="bi bi-cart"></i>Корзина <span>{{ cartProducts.length }}</span>
            </router-link>
          </li>
        </ul>
      </aside>

      <section id="page-content">
        <router-view></router-view>
      </section>
    </main>
  </div>

</template>

<script>
  export default {
    name: 'App',
    computed: {
      wishListProducts () {
        return this.$store.state.wishList  //возвращает содержимое избранного из состояния хранилища Vuex
      },
      cartProducts () {
        return this.$store.state.cart  //возвращает содержимое корзины из состояния хранилища Vuex
      }
    }
  }
</script>

<style>
  @import "https://cdn.jsdelivr.net/npm/bootstrap@4.6.0/dist/css/bootstrap.min.css";
  @import "https://cdn.jsdelivr.net/npm/bootstrap-icons@1.8.1/font/bootstrap-icons.css";
  
  :root {
    --primary-bg: #36771d;
    --primary-bg-darken: #428d24;
    --white: #fff;
  }

  html, body {
    min-height: 100%;
    font-size: 14px;
  }

  body {
    margin: 0;
    background-color: #f9f9f9;
    font-family: "Montserrat", sans-serif;
  }

  h1, h2, h3, h4, h5, h6, p {
    margin-top: 0;
  }

  .os-container {
    width: 100%;
    max-width: 1500px;
    margin: 0 auto;
    padding-right: 15px;
    padding-left: 15px
  }

  .os-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-top: 20px;
    padding-bottom: 20px;
  }

  .cart-btn .bi {
    font-size: 1.2rem;
  }

  .cart-count.hidden {
    display: none;
  }

  .os-products {
    display: grid;
    grid-template-columns: 200px 1fr;
    grid-gap: 20px;
  }

  .os-products-footer {
    display: flex;
    justify-content: center;
    margin-bottom: 20px
  }

  .os-btn-primary,
  .os-btn-default {
    padding: 8px 12px;
    border: none;
    border-radius: 3px;
    font-size: .875rem;
    font-weight: 400;
    font-family: "Montserrat", sans-serif;
    line-height: 1;
    text-transform: uppercase;
    cursor: pointer;
    transition: .3s
  }

  .os-btn-primary {
    background-color: var(--primary-bg);
    color: #fff
  }

  /* TODO: Make refactoring for colors*/
  .os-btn-primary:hover {
    background-color: #2e6418;
  }

  .os-btn-default:hover {
    background-color: #e3e3e3;
  }

  .link-unstyled, .link-unstyled:link, .link-unstyled:hover {
    color: inherit;
    text-decoration: inherit;
  }

  .sidebar {
    position: sticky;
    top: 0;
    background: var(--white);
    box-shadow: 6px 0 18px rgb(0 0 0 / 6%);
    padding: 25px;
    height: 400px;
  }

  .sidebar__title {
    font-size: 24px;
    line-height: 36px;
    height: 36px;
    margin-top: 0;
    margin-bottom: 32px;
    display: flex;
    align-items: center;
    color: #6c757d;
  }

  .sidebar__nav {
    margin: 0;
    padding: 0;
    list-style-type: none;
  }

  .sidebar__nav li {
    font-size: 15px;
    margin-bottom: 16px;
  }

  .sidebar__nav a.active,
  .sidebar__nav a:hover {
    color: var(--primary-bg);
  }

  .sidebar__nav li .bi {
    padding-right: 10px;
  }

  .page-container {
    padding-top: 25px;
  }

  .page-title {
    color: #6c757d;
    margin-bottom: 20px;
  }
</style>
