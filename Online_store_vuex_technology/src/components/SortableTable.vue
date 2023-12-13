<!-- Таблица товаров, другого вида -->
<template>
  <table class="table table-striped">
    <thead class="sortable-table-header">
      <tr class="d-flex">
        <th class="col" v-for="column of config" :key="column.id">
          <span>{{ column.title }}</span>
        </th>
      </tr>
    </thead>

    <tbody>
      <template v-if="products.length">
        <tr v-for="product of products" :key="product.id" class="d-flex">
          <template v-for="column of config" :key="column.id">
            <td class="col" v-if="column.template" v-html="column.template(product[column.id])"></td>
            <td v-else class="col">
              {{ product[column.id] }}
            </td>
          </template>
        </tr>
      </template>
      <tr v-else class="d-flex">
        <td class="col text-center" :colSpan="config.length">Нет товаров</td>
      </tr>
    </tbody>
  </table>
</template>

<script>
  export default {
    name: "SortableTable",
    props: ['data', 'tableConfig'],
    data() {
      return {
        products: this.data,
        config: this.tableConfig
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
  .sortable-table-header tr th[data-sortable="true"] {
    cursor: pointer;
  }


  :global(.sortable-table-image) {
    height: 80px;
    max-width: 100%;
    padding: 4px;
    border: 1px solid lightgray;
    border-radius: 2px;
  }

  tr th[data-sortable="true"]::before,
  tr th[data-sortable="true"]::after {
    right: 1em;
    font-family: 'Font Awesome 5 Free';
    font-weight: 900;
    font-size: 1rem;
    position: absolute;
    bottom: .5em;
    display: block;
    opacity: .3
  }

  tr th[data-sortable="true"]::before {
    content: "\f0de";
  }

  tr th[data-sortable="true"]::after {
    content: "\f0dd";
  }

  tr th[data-sortable="true"][data-order='asc']::before {
    opacity: 1
  }

  tr th[data-sortable="true"][data-order='desc']::after {
    opacity: 1
  }
</style>
