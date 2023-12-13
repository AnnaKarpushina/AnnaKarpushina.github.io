<template>
  <div class="relative">
    <BaseTooltip text="Приложения YouTube">
      <button @click="isOpen = !isOpen" class="relative p-2 focus:outline-none">
        <BaseIcon name="viewGrid" class="w-5 h-5" />
      </button>
    </BaseTooltip>
    <transition
      enter-active-class="transition ease-out duration-100"
      enter-from-class="transition opacity-0 scale-95"
      enter-to-class="transform opacity-100 scale-100"
      leave-active-class="transition ease-in duration-75"
      leave-from-class="transform opacity-100 scale-100"
      leave-to-class="transform opacity-0 scale-95"
    >
      <div 
        class="z-10 absolute top-9 right-0 sm:left-0 bg-white w-60 border border-t-0 focus:outline-none"
        v-show="isOpen"
        ref="dropdown"
        @keydown.esc="isOpen = false"
        tabindex="-1"
      >
        <section class="py-2 border-b">
          <ul>
            <DropdownAppsListItem label="YouTube ТВ" />
          </ul>
        </section>
        <section class="py-2 border-b">
          <ul>
            <DropdownAppsListItem label="YouTube Музыка" />
            <DropdownAppsListItem label="YouTube Детям" />
          </ul>
        </section>
        <section class="py-2">
          <ul>
            <DropdownAppsListItem label="Академия создателей" />
            <DropdownAppsListItem label="YouTube для артистов" />
          </ul>
        </section>
      </div>
    </transition>
  </div>
</template>

<script>
  import BaseIcon from './BaseIcon.vue'
  import BaseTooltip from './BaseTooltip.vue'
  import DropdownAppsListItem from './DropdownAppsListItem.vue'

  export default {
    components: {
      BaseIcon,
      BaseTooltip,
      DropdownAppsListItem
    },

    data () {
      return {
        isOpen: false
      }
    },

    watch: {
      isOpen () {
        this.$nextTick(() => this.isOpen && this.$refs.dropdown.focus())
      }
    },

    mounted () {
      window.addEventListener('click', event => {
        // Если корневой элемент (this.$el) содержит (contains) в себе элемент на который произошел клик (event.target)
        if (!this.$el.contains(event.target)) {
          this.isOpen = false
        }
      })
    }
  }
</script>
