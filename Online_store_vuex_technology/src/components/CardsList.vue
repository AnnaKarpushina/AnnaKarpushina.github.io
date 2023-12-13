<template>
  <div class="os-products-list">
    <slot v-for="product in products" :data="product"></slot>
  </div>
</template>

<script>
  export default {
    name: "CardsList",
    props: ['data'],
    data () {
      return {
        products: this.data
      }
    },
    watch: {
      data (newValue) {
        this.products = newValue
      }
    }
  }
</script>

<style scoped>
  .os-products-list {
    display: grid;
    grid-template-columns :repeat(auto-fit, minmax(300px, 1fr));
    grid-gap: 20px;
    margin: 20px 0;
  }
</style>
