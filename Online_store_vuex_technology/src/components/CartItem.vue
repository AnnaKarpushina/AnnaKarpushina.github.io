<!-- Карточка корзины -->
<template>
  <li class="item-row">
    <div class="item-preview">
      <img :src="product.images[0].url" :alt="product.title" />
    </div>
    <div class="item-name">
      {{ product.title }}
    </div>
    <div class="item-counter">
      <button class="count-btn" @click="updateCount(-1)">
        <i class="bi bi-dash-circle"></i>
      </button>
      <span>{{ count }}</span>
      <button class="count-btn" @click="updateCount(1)">
        <i class="bi bi-plus-circle"></i>
      </button>
    </div>
    <div class="item-price">{{ product.price * count }} $</div>
  </li>
</template>

<script>
  export default {
    name: "CartItem",
    props: ['data'],
    data () {
      return {
        product: this.data,
        count: 1
      }
    },
    methods: {
      updateCount (value) {
        this.count += value
        this.$emit('update-total', this.product.price * value)
        if (this.count === 0) {
          this.$emit('remove-product', this.product.id)
        }
      }
    }
  }
</script>

<style scoped>
  .item-row {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr auto;
    grid-gap: 20px;
    align-items: center;
    justify-items: center;
    padding: 15px;
    margin-bottom: 15px;
    box-shadow: 0 2px 8px rgb(0 0 0 / 15%);
    background: white;
    border-radius: 3px;
  }

  .item-preview {
    height: 40px;
    display: flex;
    align-items: center;
  }

  .item-preview img {
    width: 100%;
    max-height: 40px;
  }

  .item-name {
    justify-self: left;
  }

  .item-preview,
  .item-name,
  .item-counter,
  .item-price {
    padding: 0 10px;
  }

  .item-counter {
    min-width: 120px;
  }

  .item-price {
    min-width: 100px;
  }

  .count-btn {
    background: transparent;
    border: none;
    outline: none;
    width: 30px;
    height: 30px;
    cursor: pointer;
  }
</style>
