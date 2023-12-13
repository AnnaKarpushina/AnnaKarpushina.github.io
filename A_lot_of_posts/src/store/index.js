import { createStore } from "vuex"
import axios from "axios"

export default createStore({
  modules: {
    post: {
      state: () => ({
        posts: [],
        isPostsLoading: true, //проверяем наличие постов
        selectedSort: '', //сортировка
        searchQuery: '', //поиск
        page: 1, // номер страницы
        limit: 10, //кол-во постов на одной страницы
        totalPages: 0, //кол-во страниц
        sortOptions: [ //поля по которых осуществляется сортировка
          { value: 'title', name: 'По названию' },
          { value: 'body', name: 'По содержимому' }
        ]
      }),
      // некоторые computed свойства, т.е. своего рода хешируемые вычисляемые значения
      getters: {
        // возвращает отсортированные посты
        sortedPosts(state) {
          // localeCompare - сравнение строк
          return [ ...state.posts ].sort((post1, post2) => post1[state.selectedSort]?.localeCompare(post2[state.selectedSort]))
        },
        // отсортированные и найденные сообщения
        sortedAndSearchedPosts(state, getters) {
          // поиск по названию поста
          return getters.sortedPosts.filter(post => post.title.toLowerCase().includes(state.searchQuery.toLowerCase()) ||
                                                    post.body.toLowerCase().includes(state.searchQuery.toLowerCase()) )
        }
      },
      // мутации представляют из себя функции, внутри которых мы меняем значения какого то поля в состоянии
      mutations: {
        setPosts(state, posts) {
          state.posts = posts
        },
        setLoading(state, bool) {
          state.isPostsLoading = bool
        },
        setPage(state, page) {
          state.page = page
        },
        setSelectedSort(state, selectedSort) {
          state.selectedSort = selectedSort
        },
        setTotalPages(state, totalPages) {
          state.totalPages = totalPages
        },
        setSearchQuery(state, searchQuery) {
          state.searchQuery = searchQuery
        }
      },
      // также функции, которые внутри себя используют мутации
      // можно получить данные из сервера, вызвать мутацию и сохранить эти данные в состоянии
      actions: {
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
            // кол-во страниц находим: общее кол-во постов делим на кол-во постов на странице
            // Math.ceil - округляем в большую сторону
            commit('setTotalPages', Math.ceil(responce.headers['x-total-count'] / state.limit))
            commit('setPosts', responce.data)
            // перезаписываем посты
          } catch (e) {
            console.log(e)
          } finally {
            commit('setLoading', true)
          }
        },
        async loadMorePosts({ state, commit }) {
            try {
                commit('setPage', state.page + 1)
                const responce = await axios.get('https://jsonplaceholder.typicode.com/posts', {
                    params: {
                      _page: state.page,
                      _limit: state.limit
                    }
                });
                commit('setTotalPages', Math.ceil(responce.headers['x-total-count'] / state.limit))
                commit('setPosts', [ ...state.posts, ...responce.data ]);
            } catch (e) {
                console.log(e)
            }
        }
      },
      namespaced: true  
    }
  }
})