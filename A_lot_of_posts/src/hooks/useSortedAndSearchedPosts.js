// для фильтрации отсортированных постов на основе поискового запроса

import { ref, computed } from "vue"

// sortedPosts - отсортированные посты
export default function useSortedPosts(sortedPosts) {
  //Создание реактивной переменной для хранения текущего поискового запроса с помощью функции ref
  const searchQuery = ref('') 
  //фильтрует отсортированные посты на основе текущего значения переменной searchQuery
  const sortedAndSearchedPosts = computed(() => {
    // Мы проверяем, содержит ли название (title) поста подстроку, соответствующую значению переменной searchQuery
    // проверяет, содержит ли текст (body) поста подстроку, соответствующую значению переменной searchQuery.
    return sortedPosts.value.filter(post => post.title.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
                                            post.body.toLowerCase().includes(searchQuery.value.toLowerCase()))
  })
  return { searchQuery, sortedAndSearchedPosts }
}
