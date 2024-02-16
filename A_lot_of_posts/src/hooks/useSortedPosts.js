// для сортировки списка постов

import { ref, computed } from "vue"

export default function useSortedPosts(posts) {
  const selectedSort = ref('') //создаем реактивную переменную с начальным значением пустой строки
  const sortedPosts = computed(() => {
    // мы копируем массив постов и сортируем его. 
    // Мы передаем функцию сравнения, которая сравнивает значения выбранного свойства (selectedSort.value) для двух постов, 
    // используя метод localeCompare(), который возвращает отрицательное число, если post1 должен быть расположен перед post2, 
    // положительное число, если post2 должен быть расположен перед post1, и 0, если они равны.
    return [ ...posts.value ].sort((post1, post2) => post1[selectedSort.value]?.localeCompare(post2[selectedSort.value]))
  })

  return { selectedSort, sortedPosts }
}
