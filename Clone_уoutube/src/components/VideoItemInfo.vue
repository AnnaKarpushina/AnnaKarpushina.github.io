<template>
  <div class="flex items-start mt-3">
    <img class="mr-3 rounded-full w-9 h-9" 
        :alt="`avatar${index}`" :src="`https://www.gravatar.com/avatar/${index}?s=68&d=identicon`"/>
    <div class="text-sm">
      <span class="font-semibold text-gray-800">Название видео {{ index }}</span>
      <div class="mt-1 flex">
        <BaseTooltip :text="channelName" top>
          <span>{{ channelName }}</span>
        </BaseTooltip>
        <BaseTooltip text="Проверено" top>
          <BaseIcon name="checkCircle" class="w-3.5 h-3.5 ml-1" />
        </BaseTooltip>
      </div>
      <div v-html="summary"></div>
    </div>
    <VideoItemDropdown />
  </div>
</template>

<script>
  import BaseIcon from './BaseIcon.vue'
  import BaseTooltip from './BaseTooltip.vue'
  import VideoItemDropdown from './VideoItemDropdown.vue'

  export default {
    components: {
      BaseIcon,
      BaseTooltip,
      VideoItemDropdown
    },

    props: ['index'],

    data () {
      return {
        channelName: `Название канала ${this.index}`
      }
    },

    computed: {
      summary () {
        const days = this.index === 1 ? 'day' : 'days'
        return `${this.index}K просмотров &middot; ${this.index} ${days} ago`
      }
    }
  }
</script>
