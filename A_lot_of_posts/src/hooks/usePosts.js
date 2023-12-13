// отвечает за загрузку постов с сервера

import axios from "axios"
import { ref, onMounted } from "vue"

export function usePosts(limit) {
  const posts = ref ([])
  const totalPages = ref (0) //кол-во страниц на сайте
  const isPostsLoading = ref (false)
  const fetching = async () => {
    try {
      // делаем запрос на сервер и ответ помещаем в переменную responce (get - получить)
      const responce = await axios.get('https://jsonplaceholder.typicode.com/posts', {
        params: {
          page: 1,
          limit: 10 //кол-во постов на одной страницы
        }
      })
      // кол-во страниц находим: общее кол-во постов делим на кол-во постов на странице
      // Math.ceil - округляем в большую сторону
      totalPages.value = Math.ceil(responce.headers['x-total-count'] / limit)
      posts.value = responce.data // перезаписываем посты
    } catch (e) {
        console.log(e)
    } finally {
      isPostsLoading.value = true
    }
  }

  onMounted(fetching)
  return {
    posts, totalPages, isPostsLoading
  }
}
