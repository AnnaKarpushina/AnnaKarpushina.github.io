<!-- Страница товаров -->
<template>
  <div>

    <div class="filters-panel">
      <h1 class="page-title mb-0">Товары</h1>
      <div class="list-view-controls">
        <i :class="['bi', 'bi-list', { active: activeComponent === 'SortableTable' }]"
           @click="showTableView"></i>
        <i :class="['bi', 'bi-grid', { active: activeComponent === 'CardsList' }]"
           @click="showGridView"></i>
      </div>
    </div>

    <InfinityList @page-changed="pageChanged">
      <SortableTable
          v-if="activeComponent === 'SortableTable'"
          :data="products"
          :tableConfig="tableConfig"/>

      <CardsList v-if="activeComponent === 'CardsList'" :data="products">
        <template v-slot="slotProps">
          <TheCard
              :data="slotProps.data"
              :showFooter="true"
              :isExistedInWishList="wishList.includes(slotProps.data.id)"
              :isExistedInCart="cart.includes(slotProps.data.id)"
              @updateCart="updateCart"
              @updateWishlist="updateWishList"
              @remove-from-wishlist="removeFromWishList"/>
        </template>
      </CardsList>
    </InfinityList>
  </div>
</template>

<script>
  import SortableTable from "@/components/SortableTable"
  import CardsList from "@/components/CardsList"

  import { tableConfig } from './sortable-table-config'
  import InfinityList from "@/components/InfinityList"
  import TheCard from "@/components/TheCard"

  export default {
    name: "MainPage",
    components: {
      SortableTable,
      CardsList,
      InfinityList,
      TheCard
    },
    data() {
      return {
        activeComponent: 'CardsList',
        products: [],
        loading: true,
        tableConfig,
        pageSize: 10,
        url: new URL('api/rest/products', process.env.VUE_APP_BACKEND_URL),
      }
    },
    methods: {
      async loadProducts(pageIndex = 0) {
        try {
          this.loading = true
          this.setPagination(pageIndex)
          const response = await fetch(this.url)
          this.products = [...this.products, ...await response.json()]
        } catch (error) {
          console.error(`Something went wrong: ${error.message}`)
          throw new Error(error)
        } finally {
          this.loading = false
        }
      },
      setPagination (pageIndex) {
        const start = pageIndex * this.pageSize
        const end = start + this.pageSize
        this.url.searchParams.set('_start', start)
        this.url.searchParams.set('_end', end)
      },
      pageChanged (pageIndex) {
        if (this.loading === false) {
          this.loadProducts(pageIndex)
        }
      },
      showTableView() {
        this.activeComponent = 'SortableTable'
      },
      showGridView() {
        this.activeComponent = 'CardsList'
      },
      findProduct (productId = '') {
        return this.products.find(product => product.id === productId)
      },
      updateCart(productId = '') {
        const product = this.findProduct(productId)
        this.$store.commit('ADD_TO_CART', product)
      },
      updateWishList(productId = '') {
        const product = this.findProduct(productId)
        this.$store.commit('ADD_TO_WISHLIST', product)
      },
      // Обработка события удаления из избранного
      removeFromWishList(productId) {
      this.$store.commit('REMOVE_FROM_WISHLIST', productId);
    },
    },
    computed: {
      wishList () {
        return this.$store.state.wishList.map(item => item.id)
      },
      cart () {
        return this.$store.state.cart.map(item => item.id)
      }
    },
    created() {
      this.loadProducts()
    }
  }
</script>

<style scoped>
  .list-view-controls {
    font-size: 18px;
    padding: 10px 0;
    text-align: right;
  }

  .list-view-controls .bi {
    cursor: pointer;
    margin-left: 5px;
  }

  .list-view-controls .bi.active {
    color: var(--primary-bg);
  }

  .products-page {
    padding-top: 25px;
  }

  .filters-panel {
    grid-template-columns: 3fr 1fr;
    grid-gap: 20px;
    display: grid;
    align-items: center;
    justify-content: space-between;
    padding: 10px 20px;
    margin: 20px 0;
    box-shadow: 0 2px 8px rgb(0 0 0 / 13%);
    border-radius: 8px;
    overflow: hidden;
    background-color: #fff;
  }
</style>
