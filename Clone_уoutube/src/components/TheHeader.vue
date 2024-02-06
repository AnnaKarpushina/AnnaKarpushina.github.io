<template>
  <header class="flex justify-between w-full bg-white bg-opacity-95">
    <div :class="leftSideClasses">
      <div class="flex items-center xl:w-64 xl:bg-white pl-4">
        <button class="mr-3 sm:ml-2 sm:mr-6 focus:outline-none" @click="$emit('toggleSidebar')">
          <BaseIcon name="menu" />
        </button>
        <LogoMain />
      </div>
    </div>
    <TheSearchWrapper
      v-show="isSearchShown"
      :is-small-screen="isSmallScreen"
      @close="closeMobileSearch"
      @open-voice-modal="isVoiceModalOpen = true"
    />
    <div :class="rightSideClasses">
      <BaseTooltip text="Голосовой поиск">
        <button class="sm:hidden p-2 focus:outline-none" @click="isVoiceModalOpen = true">
          <BaseIcon name="microphone" class="w-5 h-5" />
        </button>
      </BaseTooltip>
      <BaseTooltip text="Поиск">
        <button class="sm:hidden p-2 focus:outline-none" @click.stop="isMobileSearchActive = true">
          <BaseIcon name="search" class="w-5 h-5" />
        </button>
      </BaseTooltip>
      <TheDropdownApps />
      <TheDropdownSettings />
      <ButtonLogin />
    </div>
  </header>
  <teleport to="body">
    <TheModalSearchWithVoice
      v-if="isVoiceModalOpen"
      @close="isVoiceModalOpen = false"
    />
  </teleport>
</template>

<script>
  import { computed } from 'vue'
  import BaseIcon from './BaseIcon.vue'
  import BaseTooltip from './BaseTooltip.vue'
  import LogoMain from './LogoMain.vue'
  import ButtonLogin from './ButtonLogin.vue'
  import TheSearchWrapper from './TheSearchWrapper.vue'
  import TheDropdownApps from './TheDropdownApps.vue'
  import TheDropdownSettings from './TheDropdownSettings.vue'
  import TheModalSearchWithVoice from './TheModalSearchWithVoice.vue'

  export default {
    components: {
      BaseIcon,
      BaseTooltip,
      LogoMain,
      ButtonLogin,
      TheSearchWrapper,
      TheDropdownApps,
      TheDropdownSettings,
      TheModalSearchWithVoice
    },

    provide () {
      return {
        isMobileSearchActive: computed(() => this.isMobileSearchActive)
      }
    },

    emits: {
      toggleSidebar: null
    },

    data () {
      return {
        isSmallScreen: false, //мобильный поиск
        isMobileSearchActive: false,
        isVoiceModalOpen: false
      }
    },

    computed: {
      isSearchShown () {
        return this.isMobileSearchShown || !this.isSmallScreen
      },

      isMobileSearchShown () {
        return this.isSmallScreen && this.isMobileSearchActive
      },

      leftSideClasses () {
        return [ 'lg:w-1/4', 'flex', this.opacity ]
      },

      rightSideClasses () {
        return [ 'flex', 'items-center', 'justify-end', 'lg:w-1/4', 'sm:space-x-3', 'p-2', 'sm:px-4', this.opacity ]
      },

      opacity () {
        return this.isMobileSearchShown ? 'opacity-0' : 'opacity-100'
      }
    },

    mounted () {
      this.onResize()
      window.addEventListener('resize', this.onResize)
    },

    methods: {
      onResize () {
        if (window.innerWidth < 768) {
          this.isSmallScreen = true
        } else {
          this.closeMobileSearch()
          this.isSmallScreen = false
        }
      },

      closeMobileSearch () {
        this.isMobileSearchActive = false
      }
    }
  }
</script>
