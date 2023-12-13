<template>
  <div class="relative">
    <img class="rounded" :src="`https://source.unsplash.com/720x404/?nature,${index}`" :alt="`image${index}`" />
    <VideoItemThumbnailButton icon="clock" label="Посмотреть позже" class="top-0" />
    <VideoItemThumbnailButton icon="menuAlt3" label="Добавить в очередь" class="top-8" />
    <span class="opacity-100 group-hover:opacity-0 duration-500 absolute bottom-0 right-0 bg-black text-white
     rounded-sm m-1 p-1 text-xs font-semibold">{{ randomTime }}</span>
  </div>
</template>

<script>
  import BaseIcon from './BaseIcon.vue'
  import VideoItemThumbnailButton from './VideoItemThumbnailButton.vue'

  export default {
    components: {
      BaseIcon,
      VideoItemThumbnailButton
    },

    props: ['index'],

    data() {
      return {
        randomTime: ""
      };
    },
    mounted() {
      this.generateRandomTime()
    },
    methods: {
      generateRandomTime() {
        const hours = Math.floor(Math.random() * 24)
        const minutes = Math.floor(Math.random() * 60)
        // метод padStart() для добавления ведущего нуля к строкам часов и минут, если они состоят из одной цифры
        this.randomTime = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`
      }
    }
  }
</script>
