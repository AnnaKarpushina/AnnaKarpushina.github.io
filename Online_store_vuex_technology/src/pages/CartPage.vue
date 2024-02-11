<template>
  <div class="page-container">
    <h1 class="page-title">Корзина</h1>
    <div class="cart-container" v-if="products.length">
      <ul class="cart-list">
        <!-- отображаем каждый товар в корзине -->
        <CartItem
            v-for="product in products" 
            :key="product.id"
            :data="product"
            @updateTotal="updateTotal"
            @removeProduct="removeProduct"
          />
      </ul>
      <div class="footer">
        <div class="cart-total">
          Итого: <span>{{ totalPrice }} $</span>
        </div>
        <button class="clearCart" @click="clearCart">Очистить корзину</button>
      </div>
    </div>
    <div class="alert alert-secondary" v-else>Корзина пуста</div>
  </div>
</template>

<script>
  import CartItem from "@/components/CartItem"

  export default {
    name: "CartPage",
    components: {
      CartItem
    },
    data () {
      return {
        products: this.$store.state.cart, // получаем товары из корзины (массив товаров из хранилища Vuex)
        totalPrice: this.$store.state.cart.reduce((accum, item) => accum + item.price, 0) //общая стоимость всех товаров в корзине
      } 
    },
    methods: {
      updateTotal (price) {
        this.totalPrice += price //обновляет общую стоимость при добавлении товара
      },
      // удаляет товар из корзины по его идентификатору
      removeProduct(id) {
        // Эта строка ищет продукт с заданным id в массиве products
        const removedProduct = this.products.find(product => product.id === id)
        if (removedProduct) {
          // Если товар существует, его цена вычитается из общей стоимости totalPrice
          this.totalPrice -= removedProduct.price //обновляем общую стоимость
          this.$store.commit('REMOVE_FROM_CART', id) //вызываем мутацию Vuex для удаления товара из корзины
        }
      },
      // очищаем корзину
      clearCart() {
        this.products.forEach(product => {
          this.$store.commit('REMOVE_FROM_CART', product.id) // удаляем все товары из хранилища Vuex 
        })
        this.products = [] // Очищаем массив товаров
      }
    },
    // отслеживаем изменение массива товаров в хранилище Vuex. При изменении обновляются локальные данные
    watch: {
      '$store.state.cart' (newValue) {
        this.products = newValue
        this.totalPrice = newValue.reduce((accum, item) => accum + item.price, 0)
      }
    }
  }
</script>

<style scoped>
 .clearCart {
    border-radius: 5px;
    background-color: var(--primary-bg);
    color: white;
    padding: 13px 15px;
    border: none;
    font-size: .875rem;
    font-weight: 400;
    font-family: "Montserrat", sans-serif;
    line-height: 1;
    text-transform: uppercase;
    transition: .3s;
 }

  .cart-container {
    padding: 10px;
  }

  .cart-list {
    padding: 0;
    margin: 0;
  }

  .item-preview img {
    width: 100%;
    max-height: 40px;
  }

  .footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .cart-total {
    padding: 10px;
  }
</style>