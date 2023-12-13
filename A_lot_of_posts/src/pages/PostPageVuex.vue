<template>
  <div>
    <h1>Страница с постами, написанная на Vuex</h1>
    <MyInput
      v-focus
      :model-value="searchQuery"
      @update:model-value="setSearchQuery"
      placeholder="Поиск по названию или описанию..."
    />
    <div class="app_btns">
      <MyButton @click="showDialog">Создать пользователя</MyButton>
      <MySelect
        :model-value="selectedSort"
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
        setPage: 'post/setPage',
        setSearchQuery: 'post/setSearchQuery',
        setSelectedSort: 'post/setSelectedSort'
      }),
      ...mapActions({
        loadMorePosts: 'post/loadMorePosts',
        fetchPosts: 'post/fetchPosts'
      }),
      createPost(post) {
        this.posts.push(post)
        this.dialogVisible = false
      },
      removePost(post) {
        // пробегаемся по постам с помощью фильтра
        // т.к. функция filter возвращает новый массив, мы перезаписываем старый
        // в результирующий массив попадают те посты, id которых не равен посту, который мы хотим удалить
        this.$store.commit('post/setPosts', this.$store.state.post.posts.filter(p => p.id !== post.id));
      },
      showDialog() {
        this.dialogVisible = true
      },
      changePage(pageNumber) {
        this.page = pageNumber
      }
    },
    mounted() {
      this.fetchPosts() //чтобы сразу подгрузились посты
    },
    computed: {
      ...mapState({
        posts: state => state.post.posts,
        isPostsLoading: state => state.post.isPostsLoading,
        selectedSort: state => state.post.selectedSort,
        searchQuery: state => state.post.searchQuery,
        page: state => state.post.page,
        totalPages: state => state.post.totalPages,
        sortOptions: state => state.post.sortOptions
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
