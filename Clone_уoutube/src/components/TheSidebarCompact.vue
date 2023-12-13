<template>
  <aside class="min-h-screen overflow-auto fixed top-0 pt-14 bg-white z-20">
    <section>
      <ul>
        <SidebarCompactNavItem
          v-for="navItem in navItems"
          :key="navItem.label"
          :label="navItem.label"
          :icon="navItem.icon"
          :is-active="navItem.isActive"
        />
      </ul>
    </section>
  </aside>
</template>

<script>
  import SidebarCompactNavItem from './SidebarCompactNavItem.vue'

  export default {
    components: {
      SidebarCompactNavItem
    },

    data () {
      return {
        navItems: [
          {
            label: 'Главная',
            icon: 'home',
            isActive: true
          },
          {
            label: 'Тренды',
            icon: 'fire',
            isActive: false
          },
          {
            label: 'Подписки',
            icon: 'collection',
            isActive: false
          },
          {
            label: 'Библиотека',
            icon: 'duplicate',
            isActive: false
          },
          {
            label: 'История',
            icon: 'clock',
            isActive: false
          }
        ]
      }
    }
    
  }
</script>
