<template>
  <li>
    <a @click.prevent href="#" class="flex items-center px-4 py-2 text-sm hover:bg-gray-100">
      <BaseIcon class="w-5 h-5 mr-3 text-gray-400"
        v-if="isIconShown" :name="iconName"
      />
      <span :class="['truncate', 'flex-1', { 'ml-8': icon && !isIconShown }]">
        {{ label }}
      </span>
      <BaseIcon class="w-5 h-5 text-gray-400 ml-auto"
        v-if="withSubMenu" name="chevronRight"
      />
    </a>
  </li>
</template>

<script>
  import BaseIcon from './BaseIcon.vue'

  export default {
    components: {
      BaseIcon
    },

    props: {
      active: Boolean,
      label: String,
      withSubMenu: Boolean,
      icon: {
        type: String,
        default: 'check'
      }
    },

    computed: {
      isIconShown () {
        return this.active || (this.icon !== 'check' && this.icon !== null)
      },

      iconName () {
        return this.active ? 'check' : this.icon
      }
    }
  }
</script>
