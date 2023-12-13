<template>
  <div>
    <MyButton class="navbar_btn" @click="goBack">&larr; Назад</MyButton><br><br>
    <h1>Эта страница поста с ID = {{ $route.params.id }}</h1><br>
    <div v-if="post.title"><strong>Название: </strong>{{ post.title }}</div><br>
    <div v-if="post.body"><strong>Описание: </strong>{{ post.body }}</div>
    <div v-else>Идет загрузка...</div>
  </div>
</template>

<script>
  import axios from 'axios'

  export default {
    data() {
      return {
        post: {}
      }
    },
    async created() {
      try {
        // делаем запрос на сервер и получаем данные о посте по его id
        const response = await axios.get(`https://jsonplaceholder.typicode.com/posts/${this.$route.params.id}`)
        // data - это свойство объекта response в библиотеке Axios, которое содержит данные, полученные в ответ на запрос. 
        // response.data содержит данные о посте, полученные из API
        this.post = response.data
      } catch (error) {
        console.error('Ошибка:', error.message);
      }
    },
    methods: {
      goBack() {
        // Мы проверяем путь текущего маршрута и, в зависимости от него, меняем путь для кнопки назад. 
        // Если мы находимся на странице (/composition) или (/vuex'=), то при нажатии на кнопку назад мы вернемся на эту страницу. 
        // Если же мы находимся на любой другой странице, то при нажатии на кнопку назад 
        // мы вернемся на предыдущую страницу.
        if (this.$route.path === '/composition') {
          this.$router.push('/composition')
        } else if (this.$route.path === '/vuex') {
          this.$router.push('/vuex')
        } else {
          // Аргумент -1 указывает, что нужно перейти на одну страницу назад. Если бы мы передали аргумент 1, 
          // то пользователь бы перешел на следующую страницу в истории браузера (если такая страница есть)
          this.$router.go(-1)
        }
      }
    }
  }
</script>
