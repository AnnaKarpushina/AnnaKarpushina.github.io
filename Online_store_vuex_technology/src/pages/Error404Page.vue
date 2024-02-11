<template>
  <div class='error404'>
    <h1 class='error404-title'>404</h1>
    <h2>Страница не найдена</h2>
  </div>
</template>

<script>
  export default {
    name: "Error404Page"
  }
</script>

<style scoped>
  .error404 {
    height: 100%;
    display: flex;
    align-items: center;
    flex-direction: column;
    padding: 100px 20px 0;
  }

  .error404-title {
    font-size: 9rem;
    color: darkgreen;
  }
</style>
