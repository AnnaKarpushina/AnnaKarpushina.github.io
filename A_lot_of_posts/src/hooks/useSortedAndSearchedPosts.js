// для отсортированных и найденных постов

import { ref, computed } from "vue"

export default function useSortedPosts(sortedPosts) {
  // Принимает внутреннее значение и возвращает реактивный и изменяемый объект ref
  const searchQuery = ref('')
  const sortedAndSearchedPosts = computed(() => {
    return sortedPosts.value.filter(post => post.title.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
                                            post.body.toLowerCase().includes(searchQuery.value.toLowerCase()))
  })
  return {
    searchQuery, sortedAndSearchedPosts
  }
}
