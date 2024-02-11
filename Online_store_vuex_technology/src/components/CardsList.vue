<template>
  <div class="os-products-list">
    <!-- Используется слот <slot> для отображения содержимого карточек продуктов. 
      Каждая карточка представляется в отдельном слоте с данными продукта, которые передаются через атрибут :data -->
    <slot v-for="product in products" :data="product"></slot>
  </div>
</template>

<script>
  export default {
    name: "CardsList",
    props: ['data'],
    data () {
      return {
        // изначально список продуктов инициализируется переданными данными
        products: this.data
      }
    },
    // отслеживаем изменение свойства data. Когда оно изменяется, свойство products обновляется новым значением
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
