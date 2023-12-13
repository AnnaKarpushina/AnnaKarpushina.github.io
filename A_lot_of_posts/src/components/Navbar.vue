<template>
  <div class="navbar">
    <h2>Посты на Vue 3</h2>
    <div class="navbar_btns">
      <!-- <MyButton class="navbar_btn" @click="$router.push('/')">Options API</MyButton> -->
      <router-link to="/" class="navbar_btn">
        <MyButton>Options API</MyButton>
      </router-link>
      <router-link to="/composition" class="navbar_btn">
        <MyButton>Composition API</MyButton>
      </router-link>
      <router-link to="/vuex" class="navbar_btn">
        <MyButton>Vuex</MyButton>
      </router-link>
    </div>
  </div>
</template>

<style scoped>
  .navbar {
    height: 50px;
    background-color: lightgray;
    box-shadow: 2px 2px 4px gray;
    display: flex;
    align-items: center;
    padding: 0 15px;
    text-align: center;
  }

  @media (max-width: 768px) {
    .navbar {
      display: grid;
      gap: 10px;
      height: 100%;
      padding-top: 15px;
      padding-bottom: 15px;
    }

    .navbar_btns {
      margin-right: auto;
    }
  }
  .navbar_btns {
    margin-left: auto;
  }
  .navbar_btn {
    margin-left: 20px
  }
</style>
