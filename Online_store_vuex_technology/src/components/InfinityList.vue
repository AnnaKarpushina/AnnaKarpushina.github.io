<!-- Бесконечный список товаров -->
<template>
  <slot></slot>
  <div ref="loader"></div> 
</template>

<script>
  export default {
    name: "InfinityList",
    data () {
      return {
        pageIndex: 0,
        observer: null
      }
    },
    emits: ['page-changed'], 
    mounted() {
      const options = {
        root: null, // указывает, что корневой элемент, используемый для проверки видимости, является корнем вьюпорта
        rootMargin: "20px", // определяет отступ вокруг корня, при котором происходит событие видимости
        threshold: 0 //указывает, что событие видимости должно произойти, когда хотя бы один пиксель элемента становится видимым
      };

      // Этот код создает экземпляр IntersectionObserver, который отслеживает, когда элемент, на который он настроен, 
      // становится видимым внутри контейнера (в данном случае, внутри корня null, что означает видимость в видимой части страницы)
      this.observer = new IntersectionObserver(([target]) => {
        if (target.isIntersecting) {
          this.$emit('page-changed', this.pageIndex++)
        }
      }, options)

      if (this.$refs.loader) {
        this.observer.observe(this.$refs.loader)
      }
    }
  }
</script>
