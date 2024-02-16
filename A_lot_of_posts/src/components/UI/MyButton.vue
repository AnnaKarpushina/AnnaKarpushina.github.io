<template>
  <button>
    <slot></slot>
  </button>
</template>

<script>
  export default {
    name: 'MyButton'
  }
</script>

<style scoped>
  button {
    align-self: flex-end;
    padding: 10px 15px;
    background: none;
    color: teal;
    border: 1px solid teal;
    cursor: pointer;
  }
</style>
