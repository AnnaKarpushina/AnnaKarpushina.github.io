<template>
  <div class="post">
    <div>
      <div><strong>Номер: </strong>{{ post.id }}</div>
      <div><strong>Название: </strong>{{ post.title }}</div>
      <div><strong>Описание: </strong>{{ post.body }}</div>
    </div>
    <div class="post_btn">
      <MyButton @click="$router.push(`/${post.id}`)">Открыть</MyButton>
      <!-- при клике на элемент будет вызвано событие "remove", и в качестве аргумента будет передан объект "post" -->
      <MyButton @click="$emit('remove', post)">Удалить</MyButton>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      // мы ожидаем на вход эти посты
      post: {
        type: Object,
        required: true //обязательный
      }
    }
  }
</script>

<style scoped>
  .post {
    padding: 15px;
    border: 2px solid teal;
    margin-top: 15px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 20px;
  }

  @media (max-width: 768px) {
    .post {
      display: grid;
    }
  }
  
  .post_btn {
    display: flex;
  }
</style>
