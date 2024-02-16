<template>
  <div>
    <h1>Страница с постами, написанная на Vuex</h1>
    <!-- Событие @update:model-value="setSearchQuery" используется для обновления значения переменной 
      searchQuery при вводе текста пользователем. -->
    <MyInput
      v-focus
      v-model="searchQuery"
      @update:model-value="setSearchQuery"
      placeholder="Поиск по названию или описанию..."
    />
    <div class="app_btns">
      <MyButton @click="showDialog">Создать пользователя</MyButton>
      <MySelect
        v-model="selectedSort"
        @update:model-value="setSelectedSort"
        :options="sortOptions"
      />
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
  import { mapState, mapGetters, mapActions, mapMutations } from 'vuex'
  import PostForm from "@/components/PostForm"
  import PostList from "@/components/PostList"
  import MyButton from "@/components/UI/MyButton"
  import MySelect from "@/components/UI/MySelect"
  import MyInput from "@/components/UI/MyInput"

  export default {
    components: {
      PostList, PostForm, MyButton, MySelect, MyInput
    },
    data() {
      return {
        dialogVisible: false
      }
    },
    methods: {
      ...mapMutations({
        setPage: 'post/setPage', // устанавливает номер страницы
        setSearchQuery: 'post/setSearchQuery', // устанавливает строку поискового запроса
        setSelectedSort: 'post/setSelectedSort'  // устанавливает выбранный тип сортировки
      }),
      ...mapActions({
        loadMorePosts: 'post/loadMorePosts', // асинхронно загружает дополнительные посты 
        fetchPosts: 'post/fetchPosts' // асинхронно получает список постов с сервера
      }),
      // создания поста
      createPost(post) {
        this.posts.push(post)
        this.dialogVisible = false
      },
      // удаления поста
      removePost(post) {
        // пробегаемся по постам с помощью фильтра, filter возвращает новый массив, мы перезаписываем старый в результирующий 
        // массив попадают те посты, id которых не равен посту, который мы хотим удалить
        this.$store.commit('post/setPosts', this.$store.state.post.posts.filter(p => p.id !== post.id))
      },
      // отображения модального окна
      showDialog() {
        this.dialogVisible = true
      },
      // изменения страницы
      changePage(pageNumber) {
        this.page = pageNumber
      }
    },
    mounted() {
      this.fetchPosts() //чтобы сразу подгрузились посты
    },
    computed: {
      ...mapState({
        posts: state => state.post.posts, //массив постов
        isPostsLoading: state => state.post.isPostsLoading, //флаг, указывающий на загрузку постов
        selectedSort: state => state.post.selectedSort, //выбранный тип сортировки
        searchQuery: state => state.post.searchQuery, //строка поискового запроса
        page: state => state.post.page, //номер текущей страницы
        totalPages: state => state.post.totalPages, //общее количество страниц
        sortOptions: state => state.post.sortOptions //поля по которых осуществляется сортировка
      }),
      ...mapGetters({
        sortedPosts: 'post/sortedPosts', // возвращает отсортированные посты
        sortedAndSearchedPosts: 'post/sortedAndSearchedPosts' // отсортированные и найденные сообщения
      })
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
