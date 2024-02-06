<template>
  <div style="flex-wrap: wrap; display: flex;">
    <a v-for="link in links.slice(0, 7)" :key="link" href="#" class="mr-2" >
      {{ link }}
    </a>
  </div>
  <div style="flex-wrap: wrap; display: flex;">
    <a v-for="link in links.slice(7)" :key="link" href="#" class="mr-2" >
      {{ link }}
    </a>
  </div>
  <div class="font-normal text-gray-500">
    &copy; 2023 Google LLC
  </div>
</template>

<script>
export default {
  data () {
    return {
      links: [
        'О сервисе', 'Прессе', 'Авторские права', 'Связаться с нами', 'Авторам', 'Рекламодателям', 'Разработчикам', 
        'Условия использования', 'Конфиденциальность', 'Политика и безопасность', 'Как работает YouTube', 'Тестирование новых функций'
      ]
    }
  }
}
</script>
