<!-- Карточка товара -->
<template>
  <div class="os-product-card">
    <div class="close" @click="removeWishlist" v-if="izbranfooter">&#10006;</div>
    <div class="os-product-img" :style="{backgroundImage: `url(${product.images[0].url})`}"></div>

    <div class="os-product-content">
      <div class="os-product-price-wrapper">
        <h5 class="os-product-title">{{ product.title }}</h5>
        <div class="os-product-price text-nowrap">{{ product.price }} $</div>
      </div>
      <p class="os-product-description">{{ product.description.slice(0, 120) + '...' }}</p>
    </div>

    <footer class="os-product-footer" v-if="footer">
      <button @click="updateWishList" :class="['os-btn-default', 'add-to-wishlist-btn', { active: wishListActive }]">
        <i class="bi bi-heart"></i>
        <i class="bi bi-heart-fill"></i>
        {{ wishListActive ? 'В избранном' : 'Добавить в избранное' }}
      </button>
      <div class="btns-separator"></div>
      <button @click="updateCart" :class="['os-btn-default', 'add-to-cart-btn', { active: cartActive }]">
        <i class="bi bi-cart"></i>
        <i class="bi bi-cart-check-fill"></i>
        {{ cartActive ? 'В Корзине' : 'Добавить в корзину' }}
      </button>
    </footer>

    <div class="os-product-footer-izbran" v-if="izbranfooter">
      <button @click="updateCart" :class="['os-btn-default', 'add-to-cart-btn', { active: cartActive }]">
        <i class="bi bi-cart"></i>
        <i class="bi bi-cart-check-fill"></i>
        {{ cartActive ? 'В Корзине' : 'Добавить в корзину' }}
      </button> 
    </div>
  </div>

</template>

<script>
  export default {
    name: "TheCard",
    props: ['data', 'isExistedInWishList', 'isExistedInCart', 'showFooter', 'showIzbranFooter'],
    data() {
      return {
        product: this.data, //Значение свойства product устанавливается равным значению, переданному через prop data
        wishListActive: this.isExistedInWishList, //Значение свойства wishListActive устанавливается равным значению, переданному через prop isExistedInWishList
        cartActive: this.isExistedInCart, //Значение свойства cartActive устанавливается равным значению, переданному через prop isExistedInCart
        footer: this.showFooter, //Значение свойства footer устанавливается равным значению, переданному через prop showFooter
        izbranfooter: this.showIzbranFooter, //Значение свойства izbranfooter устанавливается равным значению, переданному через prop showIzbranFooter
        count: 1
      }
    },
    methods: {
      updateCart() {
        if (!this.product) return // Проверяем существование товара
        if (this.cartActive) {
          // Если товар уже в корзине, убираем его оттуда
          this.$store.commit('REMOVE_FROM_CART', this.product.id)
          // Метод commit используется для вызова мутаций, которые являются синхронными функциями, изменяющими состояние хранилища
        } else {
          // Иначе, добавляем в корзину
          this.$store.commit('ADD_TO_CART', this.product)
        }
      },
      updateWishList() {
        if (this.wishListActive) {
          // Если товар уже в избранном, убираем его оттуда
          this.$store.commit('REMOVE_FROM_WISHLIST', this.product.id)
        } else {
          // Иначе, добавляем в избранное
          this.$store.commit('ADD_TO_WISHLIST', this.product)
        }
      },
      removeWishlist() {
        this.$emit('remove-from-wishlist', this.product.id) // Отправляем идентификатор товара для удаления из избранного 
      }
    },
    // для обновления соответствующих переменных в компоненте при изменении значений вне компонента
    watch: {
      isExistedInWishList (newValue) {
        this.wishListActive = newValue //активная кнопка избранного
      },
      isExistedInCart (newValue) {
        this.cartActive = newValue //активная кнопка корзины
      }
    }
  }
</script>

<style scoped>
  .close {
    cursor: pointer;
    display: flex;
    justify-content: end;
    padding-top: 20px;
    padding-right: 20px;
    color: red;
  }

  .os-product-card {
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.13);
    border-radius: 8px;
    overflow: hidden;
    background-color: #fff;
    display: grid;
    align-content: space-between;
    grid-template-rows: 0.5fr 0.5fr 40px;
  }

  .os-product-img {
    display: flex;
    height: 150px;
    justify-content: center;
    margin: 12px;
    background-repeat: no-repeat;
    background-size: contain;
    background-position: center
  }

  .os-product-content {
    padding: 10px 20px;
  }

  .os-product-price-wrapper {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 16px;
    gap: 10px;
  }

  .os-product-price {
    display: flex;
    align-items: center;
    justify-content: center;
    flex: 1;
    max-width: 70px;
    padding: 6px 12px;
    border-radius: 3px;
    background-color: var(--primary-bg);
    color: #fff;
    font-size: 1.125rem;
    font-weight: 400
  }

  .os-product-price-wrapper {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 16px
  }

  .os-btn-default.active {
    background-color: var(--primary-bg) !important;
    color: white !important;
  }

  .os-product-title,
  .os-product-description {
    margin: 0;
    font-weight: normal;
    color: #2c2c2c
  }

  .os-product-title {
    font-size: 1rem;
    margin-bottom: 8px
  }

  .os-product-description {
    font-size: 0.75rem
  }

  .os-product-footer-izbran {
    display: grid;
    grid-template-columns: 1fr;
  }

  .os-product-footer {
    display: grid;
    grid-template-columns: 1fr auto 1fr;
  }

  .os-product-footer-izbran button{
    padding: 20px;
  }

  .os-product-footer button,
  .os-product-footer-izbran button{
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 0
  }

  .os-product-footer button i,
  .os-product-footer-izbran button i {
    margin-right: 3px;
  }

  .btns-separator {
    height: 100%;
    width: 1px;
    background: lightgray;
  }

  .add-to-wishlist-btn .bi-heart-fill {
    display: none;
  }

  .add-to-cart-btn .bi-cart-check-fill {
    display: none;
  }

  .add-to-wishlist-btn.active .bi-heart {
    display: none;
  }

  .add-to-cart-btn.active .bi-cart {
    display: none;
  }

  .add-to-wishlist-btn.active .bi-heart-fill {
    display: inline-block;
  }

  .add-to-cart-btn.active .bi-cart-check-fill {
    display: inline-block;
  }
</style>
