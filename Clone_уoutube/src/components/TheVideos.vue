<template>
  <main :class="classes">
    <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 max-w-screen-2xl m-auto">
      <VideoItem v-for="i in 52" :key="i" :index="i" />
    </div>
  </main>
</template>

<script>
  import VideoItem from './VideoItem.vue'

  export default {

    components: {
      VideoItem
    },

    props: {
      isSidebarOpen: Boolean //если развернутый Sidebar открыт, значит истинно 
    },

    computed: {
      classes () {
        return [ this.isSidebarOpen ? 'xl:ml-64' : 'md:ml-24', 'pt-32', 'px-5', 'pb-5' ]
      }
    }
    
  }
</script>
