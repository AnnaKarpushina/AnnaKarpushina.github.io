<!-- Бесконечный список товаров и отслеживание прокрутки страницы для подгрузки новых товаров-->
<template>
  <slot></slot> <!-- вставляем содержимое списка товаров -->
  <div ref="loader"></div>  <!-- используется для отслеживания видимости элемента и подгрузки новых страниц товаров -->
</template>

<script>
  export default {
    name: "InfinityList",
    data () {
      return {
        pageIndex: 0,  //индекс текущей страницы товаров
        observer: null //экземпляр IntersectionObserver
      }
    },
    emits: ['page-changed'],  //опции emits указывает, что компонент может генерировать событие page-changed
    mounted() {
      const options = {
        root: null, // указывает, что корневой элемент, используемый для проверки видимости, является корнем вьюпорта
        rootMargin: "20px", // определяет отступ вокруг корня, при котором происходит событие видимости
        threshold: 0 //указывает, что событие видимости должно произойти, когда хотя бы один пиксель элемента становится видимым
      };

      // Этот код создает экземпляр IntersectionObserver, который отслеживает видимость элемента $refs.loader. 
      // Когда этот элемент становится видимым (при прокрутке страницы), генерируется событие page-changed 
      // с инкрементированным индексом страницы.
      this.observer = new IntersectionObserver(([target]) => {
        if (target.isIntersecting) {
          this.$emit('page-changed', this.pageIndex++)
        }
      }, options)

      if (this.$refs.loader) {
        // Если этот элемент существует, то код создает новый экземпляр наблюдателя (observer) 
        // и начинает наблюдать за изменениями в этом элементе, используя метод observe
        this.observer.observe(this.$refs.loader)
      }
    }
  }
</script>
