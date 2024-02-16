// Vuex-модуль для управления состоянием и запросами к API для получения списка постов

import { createStore } from "vuex"
import axios from "axios"

export default createStore({
  modules: {
    post: {
      state: () => ({
        posts: [], //массив постов
        isPostsLoading: true, //флаг, указывающий на загрузку постов
        selectedSort: '', //выбранный тип сортировки
        searchQuery: '', //строка поискового запроса
        page: 1, //номер текущей страницы
        limit: 5, //кол-во постов на одной страницы
        totalPages: 0, //общее количество страниц
        sortOptions: [ //поля по которых осуществляется сортировка
          { value: 'title', name: 'По названию' },
          { value: 'body', name: 'По содержимому' }
        ]
      }),
      getters: {
        // возвращает отсортированные посты в соответствии с выбранной сортировкой
        sortedPosts(state) {
          // localeCompare - сравнение строк
          return [ ...state.posts ].sort((post1, post2) => post1[state.selectedSort]?.localeCompare(post2[state.selectedSort]))
        },
        // возвращает отсортированные и найденные по поисковому запросу посты
        sortedAndSearchedPosts(state, getters) {
          return getters.sortedPosts.filter(post => post.title.toLowerCase().includes(state.searchQuery.toLowerCase()) ||
                                                    post.body.toLowerCase().includes(state.searchQuery.toLowerCase()) )
        }
      },
      // мутации представляют из себя функции, внутри которых мы меняем значения какого то поля в состоянии
      mutations: {
        // устанавливает новый массив постов
        setPosts(state, posts) {
          state.posts = posts
        },
        // устанавливает флаг загрузки постов
        setLoading(state, bool) {
          state.isPostsLoading = bool
        },
        // устанавливает номер страницы
        setPage(state, page) {
          state.page = page
        },
        // устанавливает выбранный тип сортировки
        setSelectedSort(state, selectedSort) {
          state.selectedSort = selectedSort
        },
        // устанавливает общее количество страниц
        setTotalPages(state, totalPages) {
          state.totalPages = totalPages
        },
        // устанавливает строку поискового запроса
        setSearchQuery(state, searchQuery) {
          state.searchQuery = searchQuery
        }
      },
      // также функции, которые внутри себя используют мутации
      // можно получить данные из сервера, вызвать мутацию и сохранить эти данные в состоянии
      actions: {
        // асинхронно получает список постов с сервера, устанавливает общее количество страниц и обновляет массив постов
        async fetchPosts({ state, commit }) {
          try {
            commit('setLoading', false)
            // делаем запрос на сервер и ответ помещаем в переменную responce (get - получить)
            const responce = await axios.get('https://jsonplaceholder.typicode.com/posts', {
              params: {
                _page: state.page,
                _limit: state.limit
              }
            })
            // кол-во страниц находим: общее кол-во постов делим на кол-во постов на странице и округляем в большую сторону
            commit('setTotalPages', Math.ceil(responce.headers['x-total-count'] / state.limit))
            commit('setPosts', responce.data) // перезаписываем посты
          } catch (e) {
            console.log(e)
          } finally {
            commit('setLoading', true)
          }
        },
        // асинхронно загружает дополнительные посты для пагинации
        async loadMorePosts({ state, commit }) {
          try {
              commit('setPage', state.page + 1)
              setTimeout(async () => {
                const responce = await axios.get('https://jsonplaceholder.typicode.com/posts', {
                    params: {
                      _page: state.page,
                      _limit: state.limit
                    }
                })
                commit('setTotalPages', Math.ceil(responce.headers['x-total-count'] / state.limit))
                // 'setPosts' - это строка, которая указывает на конкретную мутацию, которую мы хотим вызвать
                // [ ...state.posts, ...responce.data ] - это новое значение, которое мы передаем в мутацию
                // для объединения текущего состояния постов из хранилища state.posts с данными, полученными в ответе responce.data
                commit('setPosts', [ ...state.posts, ...responce.data ])
            }, 500)
          } catch (e) {
              console.log(e)
          }
        }
      },
      // Указывает, что этот модуль является пространством имен, что позволяет использовать его в других модулях без конфликтов
      namespaced: true  
    }
  }
})