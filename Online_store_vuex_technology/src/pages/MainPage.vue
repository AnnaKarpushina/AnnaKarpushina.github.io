<!-- Страница товаров в виде таблицы или карточек-->
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
        :tableConfig="tableConfig"
      />
      <CardsList v-if="activeComponent === 'CardsList'" :data="products">
        <template v-slot="slotProps">
          <TheCard
            :data="slotProps.data"
            :showFooter="true"
            :isExistedInWishList="wishList.includes(slotProps.data.id)"
            :isExistedInCart="cart.includes(slotProps.data.id)"
          />
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
        activeComponent: 'CardsList',  //режим отображения
        products: [],  //список товаров
        loading: true, //состояние загрузки
        tableConfig, //конфигурация таблицы
        pageSize: 9,
        url: new URL('api/rest/products', process.env.VUE_APP_BACKEND_URL),
      }
    },
    methods: {
      // загрузка списка товаров с использованием пагинации
      async loadProducts(pageIndex = 0) {
        try {
          this.loading = true //что началась загрузка данных
          this.setPagination(pageIndex) //установка параметров пагинации в URL на основе переданного pageIndex
          const response = await fetch(this.url) //запрос к серверу с использованием метода fetch, чтобы получить данные с URL
          // анные преобразуются в формат JSON с помощью метода response.json(), и затем они добавляются к уже имеющимся данным в массиве products
          this.products = [...this.products, ...await response.json()]
        } catch (error) {
          console.error(`Something went wrong: ${error.message}`)
          throw new Error(error) //Ошибка пробрасывается дальше, чтобы обработать её в вызывающем коде
        } finally {
          this.loading = false //загрузка данных завершена
        }
      },
      // установка пагинации
      setPagination (pageIndex) {
        const start = pageIndex * this.pageSize //начальный индекс элемента, который будет отображаться на текущей странице
        const end = start + this.pageSize //конечный индекс элемента
        this.url.searchParams.set('_start', start) //с какого индекса начинать отображение элементов на странице
        this.url.searchParams.set('_end', end) //на каком индексе заканчивать отображение элементов на странице
      },
      // вызывается при изменении страницы в пагинации
      pageChanged (pageIndex) {
        // если загрузка данных не выполняется в данный момент 
        if (this.loading === false) {
          // то загружаются товары для указанной страницы
          this.loadProducts(pageIndex)
        }
      },
      // изменения режима отображения в пользу SortableTable
      showTableView() {
        this.activeComponent = 'SortableTable'
      },
      // изменения режима отображения в пользу CardsList
      showGridView() {
        this.activeComponent = 'CardsList'
      }
    },
    // .map(item => item.id) - это вызов метода map для каждого элемента массива this.$store.state.wishList/.cart
    //  мы берем только значения свойства id 
    computed: {
      // Получение списка избранных товаров из хранилища состояния Vuex
      wishList () {
        return this.$store.state.wishList.map(item => item.id)
      },
      // Получение списка товаров в корзине из хранилища состояния Vuex
      cart () {
        return this.$store.state.cart.map(item => item.id)
      }
    },
    created() {
      this.loadProducts() //загрузка списка товаров при создании страницы
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
