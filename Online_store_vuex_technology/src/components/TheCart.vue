<!-- Корзина -->
<template>
  <div class="cart-container" v-if="products.length">
    <ul class="cart-list">
      <CartItem
          v-for="product in products" :key="product.id"
          :data="product"
          @updateTotal="updateTotal"
          @removeProduct="removeProduct"
        />
    </ul>
    <div class="footer">
      <div class="cart-total">
        Итого: <span>{{ totalPrice }} $</span>
      </div>
    </div>
  </div>
  <div class="alert alert-secondary" v-else>Корзина пуста</div>
</template>

<script>
  import CartItem from "@/components/CartItem"

  export default {
    name: "TheCart",
    props: ['items'],
    components: {
      CartItem
    },
    data () {
      return {
        products: this.items,
        totalPrice: this.items.reduce((accum, item) => accum + item.price, 0)
      }
    },
    methods: {
      updateTotal (price) {
        this.totalPrice += price
      },
      removeProduct (id) {
        this.$emit('remove-product', id)
      }
    },
    watch: {
      items (newValue) {
        this.products = newValue
      }
    }
  }
</script>

<style scoped>
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
    flex-direction: column;
    align-items: center;
  }

  .cart-total {
    padding: 10px;
  }
</style>
