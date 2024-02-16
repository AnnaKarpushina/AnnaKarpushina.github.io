<template>
  <div>
    <h1>Страница с постами, написанная на Options API</h1>
    <MyInput placeholder="Поиск по названию или описанию..." v-model.trim="searchQuery" v-focus />
    <div class="app_btns">
      <MyButton @click="showDialog">Создать пользователя</MyButton>
      <MySelect v-model="selectedSort" :options="sortOptions" />
    </div>
    <MyDialog v-model:show="dialogVisible">
      <PostForm @create="createPost" />
    </MyDialog>
    <PostList
      v-if="isPostsLoading"
      :posts="sortedAndSearchedPosts"
      @remove="removePost"
    />
    <div v-else>Идет загрузка...</div>
    <div v-intersection="loadMorePosts" class="observer"></div>
    <div class="page_wrapper">
      <div
        v-for="pageNumber in totalPages"
        :key="pageNumber"
        class="page"
        :class="{ 'current_page': page === pageNumber }"
        @click="changePage(pageNumber)"
      >
        {{ pageNumber }}
      </div>
    </div>
    
  </div>
</template>

<script>
  import axios from 'axios'
  import PostForm from "@/components/PostForm"
  import PostList from "@/components/PostList"
  import MyButton from "@/components/UI/MyButton"
  import MyDialog from "@/components/UI/MyDialog"
  import MyInput from "@/components/UI/MyInput"
  import MySelect from "@/components/UI/MySelect"

  export default {
    components: {
      PostForm, PostList, MyButton, MyDialog, MySelect, MyInput
    },
    data() {
      return {
        posts: [], //массив постов
        dialogVisible: false, //модальное окно
        isPostsLoading: false, //флаг, указывающий на загрузку постов
        selectedSort: '', //выбранный тип сортировки
        searchQuery: '', //строка поискового запроса
        page: 1, //номер текущей страницы
        limit: 5, //кол-во постов на одной страницы
        totalPages: 0, //общее количество страниц
        sortOptions: [ //поля по которых осуществляется сортировка
          { value: 'title', name: 'По названию' },
          { value: 'body', name: 'По описанию' }
        ]
      }
    },
    methods: {
      // создания поста
      createPost(post) {
        this.posts.push(post) 
        this.dialogVisible = false
      },
      // удаления поста
      removePost(post) {
        // пробегаемся по постам с помощью фильтра, функция filter возвращает новый массив, мы перезаписываем старый
        // в результирующий массив попадают те посты, id которых не равен посту, который мы хотим удалить
        this.posts = this.posts.filter(p => p.id !== post.id)
      },
      // отображения модального окна
      showDialog() {
        this.dialogVisible = true
      },
      // изменения страницы
      changePage(pageNumber) {
        this.page = pageNumber
      },
      // получаем посты
      async fetchPosts() {
        try {
            // делаем запрос на сервер и ответ помещаем в переменную responce (get - получить)
            const responce = await axios.get('https://jsonplaceholder.typicode.com/posts', {
              params: {
                _page: this.page,
                _limit: this.limit
              }
            })
            // кол-во страниц находим: общее кол-во постов делим на кол-во постов на странице и округляем в большую сторону
            this.totalPages = Math.ceil(responce.headers['x-total-count'] / this.limit)
            this.posts = responce.data // перезаписываем посты
            this.isPostsLoading = true //посты есть
        } catch (e) {
            console.log(e)
        }
      },
      // подгрузки дополнительных постов
      async loadMorePosts() {
        try {
          this.page += 1
          setTimeout(async () => {
            // делаем запрос на сервер и ответ помещаем в переменную responce (get - получить)
            const responce = await axios.get('https://jsonplaceholder.typicode.com/posts', {
              params: {
                _page: this.page,
                _limit: this.limit
              }
            })
            // кол-во страниц находим: общее кол-во постов делим на кол-во постов на странице и округляем в большую сторону
            this.totalPages = Math.ceil(responce.headers['x-total-count'] / this.limit)
            this.posts = [ ...this.posts, ...responce.data ] // добавляем в конец массива новые посты
            this.isPostsLoading = true
          }, 500)
        } catch (e) {
            console.log(e)
        } 
      }
    },
    mounted() {
      this.fetchPosts() //чтобы сразу подгрузились посты
    },
    computed: {
      // возвращает отсортированные посты
      sortedPosts() {
        // localeCompare - сравнение строк
        return [ ...this.posts ].sort((post1, post2) => post1[this.selectedSort]?.localeCompare(post2[this.selectedSort]))
      },
      // отсортированные и найденные сообщения
      sortedAndSearchedPosts() {
        // поиск по названию или описанию поста
        // Метод includes() определяет, содержит ли массив определённый элемент, возвращая в зависимости от этого true или false
        return this.sortedPosts.filter(post => post.body.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
                                               post.title.toLowerCase().includes(this.searchQuery.toLowerCase()))
      }
    }
  }
</script>

<style scoped>
  .app_btns {
    margin-top: 15px;
    margin-bottom: 15px;
    display: flex;
    justify-content: space-between;
  }
  .page_wrapper {
    display: flex;
    margin-top: 15px;
  }
  .page {
    border: 1px solid black;
    padding: 10px;
  }
  .current_page {
    border: 2px solid teal;
  }
</style>
