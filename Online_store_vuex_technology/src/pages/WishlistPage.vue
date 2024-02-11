<!-- Страница избранного -->
<template>
  <div class="page-container">
    <h1 class="page-title">Избранное</h1>
    <template v-if="products.length">
      <!-- принимаем данные products и рендерим карточки товаров  -->
      <CardsList :data="products">
        <!-- определяем слот с именем "default" в компоненте -->
        <template #default="slotProps">
          <!-- данные о товаре -->
          <!-- скрытие футера -->
          <!-- отображение футера для избранного -->
          <TheCard 
            :data="slotProps.data"   
            :showFooter="false" 
            :showIzbranFooter="true" 
            :isExistedInCart="isProductInCart(slotProps.data.id)"
            @remove-from-wishlist="removeFromWishList"
          />
        </template>
      </CardsList>
      <div class="clearIzbran">
        <button @click="clearIzbran">Очистить избранное</button>
      </div>
    </template>
    <div class="alert alert-secondary" v-else>В избранном нет товаров</div>
  </div>
</template>

<script>
  import CardsList from "@/components/CardsList"
  import TheCard from "@/components/TheCard"

  export default {
    name: "WishlistPage",
    components: {
      CardsList,
      TheCard
    },
    data() {
      return {
        products: this.$store.state.wishList
      }
    },
    computed: {
      // Вычисляемое свойство, которое проверяет, есть ли товар с заданным идентификатором (productId) в корзине покупок
      isProductInCart() {
        return productId => this.$store.state.cart.some(product => product.id === productId)
      }
    },
    methods: {
      clearIzbran() {
        this.products.forEach(product => {
          // Для взаимодействия с хранилищем Vuex используются методы commit, которые вызывают мутации для изменения состояния хранилища
          this.$store.commit('REMOVE_FROM_WISHLIST', product.id) // Удаляем товар из избранного 
        })
        this.products = [] // Очищаем массив товаров
      },
      removeFromWishList(id) {
        this.$store.commit('REMOVE_FROM_WISHLIST', id) // Удаление товара из избранного
        this.products = this.products.filter(product => product.id !== id) // Обновление массива избранных товаров
      }
    }
  }
</script>

<style scoped>
  .clearIzbran button {
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

  .clearIzbran {
    text-align: center;
  }

  .wish-card-container {
    position: relative;
  }

  .close-btn {
    position: absolute;
    top: 10px;
    right: 10px;
    cursor: pointer;
  }
</style>
