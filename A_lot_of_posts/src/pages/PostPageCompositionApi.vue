<template>
  <div>
    <h1>Страница с постами, написанная на Composition API</h1>
    <MyInput placeholder="Поиск по названию или описанию..." v-model="searchQuery" v-focus />
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
        v-for="pageNumber in totalPagess"
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
  import { ref } from 'vue'

  import PostForm from "@/components/PostForm"
  import PostList from "@/components/PostList"
  import MyButton from "@/components/UI/MyButton"
  import MySelect from "@/components/UI/MySelect"
  import MyInput from "@/components/UI/MyInput"
  import { usePosts } from "@/hooks/usePosts"
  import useSortedPosts from "@/hooks/useSortedPosts"
  import useSortedAndSearchedPosts from "@/hooks/useSortedAndSearchedPosts"

  export default {
    components: {
      PostList, PostForm, MyButton, MySelect, MyInput
    },
    setup() {

      // Локальные реактивные переменные
      const dialogVisible = ref(false) // Модальное окно
      const sortOptions = ref([ //поля по которых осуществляется сортировка
        { value: 'title', name: 'По названию' },
        { value: 'body', name: 'По содержимому' }
      ])

      // Используем хуки из Composition API
      const { posts, totalPages, isPostsLoading } = usePosts(5)
      const { selectedSort, sortedPosts } = useSortedPosts(posts)
      const { searchQuery, sortedAndSearchedPosts } = useSortedAndSearchedPosts(sortedPosts)

      const page = ref(1)  //номер страницы
      const limit = ref(5) //кол-во постов на одной страницы
      const totalPagess = ref(0) //кол-во страниц

      // подгрузки дополнительных постов
      const loadMorePosts = async () => {
        try {
          page.value += 1
          setTimeout(async () => {
            // делаем запрос на сервер и ответ помещаем в переменную responce (get - получить)
            const response = await axios.get('https://jsonplaceholder.typicode.com/posts', {
              params: {
                _page: page.value,
                _limit: limit.value
              }
            })
            // кол-во страниц находим: общее кол-во постов делим на кол-во постов на странице и округляем в большую сторону
            totalPagess.value = Math.ceil(response.headers['x-total-count'] / limit.value)
            posts.value = [...posts.value, ...response.data] // добавляем в конец массива новые посты
          }, 500)
        } catch (e) {
          console.log(e)
        }
      }
      // изменения страницы
      const changePage = (pageNumber) => {
        page.value = pageNumber
      }
      // создания поста
      const createPost = (post) => {
        posts.value.push(post)
        dialogVisible.value = false
      }
      // отображения модального окна
      const showDialog = () => {
        dialogVisible.value = true
      }
      // удаления поста
      const removePost = (post) => {
        // пробегаемся по постам с помощью фильтра, filter возвращает новый массив, мы перезаписываем старый в результирующий 
        // массив попадают те посты, id которых не равен посту, который мы хотим удалить
        posts.value = posts.value.filter((p) => p.id !== post.id)
      }
      return {
        dialogVisible, sortOptions, posts, totalPages, totalPagess, isPostsLoading, selectedSort, sortedPosts, 
        searchQuery, sortedAndSearchedPosts, createPost, showDialog, removePost, changePage, page, loadMorePosts
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
