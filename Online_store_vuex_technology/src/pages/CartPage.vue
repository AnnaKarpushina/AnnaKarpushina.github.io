<template>
  <div class="page-container">
    <h1 class="page-title">Корзина</h1>
    <TheCart :items="products" @removeProduct="removeProduct"/>
  </div>
</template>

<script>
  import TheCart from "@/components/TheCart"

  export default {
    name: "CartPage",
    components: {
      TheCart
    },
    methods: {
      removeProduct(id) { //Удаляем товар из корзины
        this.$store.commit('REMOVE_FROM_CART', id)
      }
    },
    computed: {
      products () {
        return this.$store.state.cart // получаем товары из корзины
      }
    }
  }
</script>