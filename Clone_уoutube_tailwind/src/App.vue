<template>
  <div class="fixed w-full z-30">
    <TheHeader @toggleSidebar="toggleSidebar" />
    <TheCategories :isSidebarOpen="isSidebarOpen" />
  </div>
  <TheSidebarCompact v-if="isCompactSidebarOpen" />
  <TheSidebar v-if="isSidebarOpen" />
  <TheSidebarMobile
    :is-open="isMobileSidebarOpen"
    @close="closeMobileSidebar"
  />
  <TheVideos :isSidebarOpen="isSidebarOpen" />
</template>

<script>
  import TheHeader from './components/TheHeader.vue'
  import TheSidebarCompact from './components/TheSidebarCompact.vue'
  import TheSidebar from './components/TheSidebar.vue'
  import TheSidebarMobile from './components/TheSidebarMobile.vue'
  import TheCategories from './components/TheCategories.vue'
  import TheVideos from './components/TheVideos.vue'

  export default {
    components: {
      TheHeader,
      TheSidebarCompact,
      TheSidebar,
      TheSidebarMobile,
      TheCategories,
      TheVideos
    },

    data () {
      return {
        isCompactSidebarActive: false, //активация компактного Sidebar, которое может быть открыто или закрыто в зависимости от значения переменной
        isCompactSidebarOpen: false, //компактный Sidebar
        isMobileSidebarOpen: false, //отвечает за открытие мобильного Sidebar
        isSidebarOpen: false //раскрытый Sidebar
      }
    },

    mounted () {
      this.onResize()
      window.addEventListener('resize', this.onResize)
    },

    methods: {
      onResize () {
        if (window.innerWidth < 768) {
          this.isCompactSidebarOpen = false
          this.isSidebarOpen = false
        } else if (window.innerWidth < 1280) {
          this.isCompactSidebarOpen = true
          this.isSidebarOpen = false
        } else {
          this.isCompactSidebarOpen = this.isCompactSidebarActive 
          this.isSidebarOpen = !this.isCompactSidebarActive
          this.isMobileSidebarOpen = false
        }
      },

      toggleSidebar () {
        if (window.innerWidth >= 1280) {
          this.isCompactSidebarActive = !this.isCompactSidebarActive
          this.onResize()
        } else {
          this.openMobileSidebar()
        }
      },

      openMobileSidebar () {
        this.isMobileSidebarOpen = true
      },

      closeMobileSidebar () {
        this.isMobileSidebarOpen = false
      }
    }
  }
</script>
