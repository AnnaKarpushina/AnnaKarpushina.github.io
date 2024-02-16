<template>
  <form @submit.prevent="createPost">
    <h5>Создание поста</h5>
    <MyInput type="text" placeholder="Название" v-model="post.title" v-focus />
    <MyInput type="text" placeholder="Описание" v-model="post.body" />
    <MyButton class="form-button">Создать</MyButton>
  </form>
</template>

<script>
  export default {
    data() {
      return {
        post: { title: '', body: '' }
      }
    },
    methods: {
      createPost() {
        this.post.id = Date.now() //уникальный идентификатор
        this.$emit('create', this.post) // компонент генерирует событие create и передает в него объект this.post
        this.post = { title: '', body: '' } //очищаем поля
      }
    }
  }
</script>

<style scoped>
  form {
    display: flex;
    flex-direction: column;
  }
  form .form-button {
    margin-top: 15px;
  }
</style>
