<template>
  <select class="select_block" :value="modelValue" @change="changeOption">
    <option disabled value="">Выберите из списка</option>
    <option
      v-for="option in options"
      :key="option.value"
      :value="option.value"
    >
      {{ option.name }}
    </option>
  </select>
</template>

<script>
  export default {
    name: 'MySelect',
    props: {
      modelValue: {
        type: String
      },
      options: {
        type: Array
      }
    },

    methods: {
      // вызывается при изменении выбранной опции в выпадающем списке
      changeOption(event) {
        this.$emit('update:modelValue', event.target.value) //передает новое значение выбранной опции
      }
    }
    
  }
</script>

<style scoped>
  .select_block {
    cursor: pointer;
  }
</style>