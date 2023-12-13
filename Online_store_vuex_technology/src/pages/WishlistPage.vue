<!-- Страница избранного -->
<template>
  <div class="page-container">
    <h1 class="page-title">Избранное</h1>

    <template v-if="products.length">
      <CardsList :data="products">
        <template #default="slotProps">
          <TheCard :data="slotProps.data" :showFooter="false" />
        </template>
      </CardsList>
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
    }
  }
</script>

<style scoped>
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
