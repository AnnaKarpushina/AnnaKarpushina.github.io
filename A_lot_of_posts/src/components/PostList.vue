<template>
  <div v-if="posts.length > 0"> 
    <h3>Список пользователей</h3>
    <transition-group name="user-list">
      <!-- :post="post" - компонент PostItem принимает свойство post, которое содержит данные о конкретном посте из массива posts. 
        Это свойство используется для отображения информации о посте внутри компонента PostItem. -->
      <PostItem
        v-for="post in posts"
        :key="post.id"
        :post="post"
        @remove="$emit('remove', post)"
      />
    </transition-group>
  </div>
  <h3 v-else class="posts-error">  
    Список пользователей пуст
  </h3>
</template>

<script>
  import PostItem from "@/components/PostItem"
  export default {
    components: {
      PostItem
    },
    props: {
      // мы ожидаем на вход эти посты
      posts: {
        type: Array,
        required: true //обязательное
      }
    }
  }
</script>

<style scoped>
  .user-list-item {
    display: inline-block;
    margin-right: 10px;
  }
  .user-list-enter-active,
  .user-list-leave-active {
    transition: all 0.4s ease;
  }
  .user-list-enter-from,
  .user-list-leave-to {
    opacity: 0;
    transform: translateX(130px);
  }
  .user-list-move {
    transition: transform 0.8s ease;
  }
  .posts-error {
    color: red;
  }
</style>
