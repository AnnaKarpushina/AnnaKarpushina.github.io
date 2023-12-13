// для отсортированных постов

import { ref, computed } from "vue"

export default function useSortedPosts(posts) {
  // Принимает внутреннее значение и возвращает реактивный и изменяемый объект ref
  const selectedSort = ref('')
  const sortedPosts = computed(() => {
    return [ ...posts.value ].sort((post1, post2) => post1[selectedSort.value]?.localeCompare(post2[selectedSort.value]))
  })

  return {
    selectedSort, sortedPosts
  }
}
