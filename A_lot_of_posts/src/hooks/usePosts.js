// отвечает за загрузку постов с сервера

import axios from "axios"
import { ref, onMounted } from "vue"

export function usePosts(limit) {
  const posts = ref ([]) // Массив постов
  const totalPages = ref (0) // Общее количество страниц
  const isPostsLoading = ref (false) //состояние загрузки постов установлено как "не загружается"
  const fetching = async () => {
    try {
      // делаем запрос на сервер и ответ помещаем в переменную responce (get - получить)
      const responce = await axios.get('https://jsonplaceholder.typicode.com/posts?_limit=5')
      // кол-во страниц находим: общее кол-во постов делим на кол-во постов на странице и округляем в большую сторону
      // response.headers['x-total-count'] - это обычно используемый способ получения заголовка ответа HTTP с именем x-total-count
      totalPages.value = Math.ceil(responce.headers['x-total-count'] / limit)
      posts.value = responce.data // перезаписываем посты
    } catch (e) {
        console.log(e)
    } finally {
      isPostsLoading.value = true //загрузка постов завершена
    }
  }

  onMounted(fetching) //вызывает функцию fetching при монтировании компонента

  return { posts, totalPages, isPostsLoading }
}
