<!-- Карточка товара в корзине -->
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
    <div class="item-remove">
      <button class="remove-btn" @click="removeProduct">
        <i class="bi bi-trash"></i>
      </button>
    </div>
  </li>
</template>

<script>
  export default {
    name: "CartItem",
    props: ['data'], //содержит информацию о товаре
    data () {
      return {
        product: this.data, //данные о товаре
        count: 1 //счетчик количества товара
      }
    },
    methods: {
      // обновляет количество товара в корзине
      updateCount (value) {
        this.count += value
        if (this.count === 0) {
          this.$emit('remove-product', this.product.id) // Отправляем идентификатор товара для удаления из корзины
        } else {
          // Обновляем количество товара и цену в корзине
          this.$emit('update-count', { count: this.count, price: this.product.price }) 
          this.$emit('update-total', this.product.price * value) // Обновляем общую сумму корзины
        }
      },
      removeProduct() {
        this.$emit('remove-product', this.product.id) // Отправляем идентификатор товара для удаления из корзины
      }
    }
  }
</script>

<style scoped>
  .item-row {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr auto;
    grid-gap: 20px;
    align-items: center;
    justify-items: center;
    padding-top: 15px;
    padding-bottom: 15px;
    padding-right: 50px;
    margin-bottom: 15px;
    box-shadow: 0 2px 8px rgb(0 0 0 / 15%);
    background: white;
    border-radius: 3px;
  }

  .remove-btn {
    padding: 5px 10px;
    box-shadow: 0 2px 8px rgb(0 0 0 / 15%);
    border-radius: 5px;
    background-color: var(--primary-bg);
    border: none;
  }

  .remove-btn .bi-trash {
    color: white;
  }

  .item-preview {
    height: 70px;
    display: flex;
    align-items: center;
  }

  .item-preview img {
    width: 100%;
    max-height: 70px;
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
