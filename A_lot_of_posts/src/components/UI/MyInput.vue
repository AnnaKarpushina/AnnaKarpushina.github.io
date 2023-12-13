<template>
  <!-- В шаблоне компонента используется директива v-bind для связывания значения поля ввода с prop "modelValue". 
    При изменении значения поля ввода, метод "updateInput" вызывается, чтобы обновить значение prop "modelValue" -->
  <input :value="modelValue" @input="updateInput" type="text" />
</template>

<script>
  export default {
    name: 'MyInput',
    props: {
      modelValue: [ String, Number ]
    },
    methods: {
      // Когда пользователь вводит текст в поле ввода, метод "updateInput" вызывается событием "input". 
      // Этот метод генерирует событие с именем "update:modelValue" и передает новое значение в свойстве "value" элемента input. 
      // Это событие будет передано родительскому компоненту, который может обновить свойство "modelValue" 
      // с помощью синтаксиса v-model
      updateInput(event) {
        // первый параметр - новое событие, второй параметр - значение, которое должно обновиться
        this.$emit('update:modelValue', event.target.value) 
      }
    }
  }
</script>

<style scoped>
  input {
    width: 100%;
    border: 1px solid teal;
    padding: 10px 15px;
    margin-top: 15px;
  }
</style>
