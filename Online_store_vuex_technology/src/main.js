import { createApp } from 'vue'  // импорт функции createApp из библиотеки Vue для создания экземпляра приложения
// импорт функций createRouter и createWebHistory из библиотеки vue-router для создания маршрутизатора и типа истории навигации
import {createRouter, createWebHistory} from 'vue-router'
import App from './App.vue' // импорт компонента App.vue, который представляет корневой компонент приложения
import store from './store' // импорт хранилища Vuex 

import Error404Page from '@/pages/Error404Page'
import MainPage from '@/pages/MainPage'
import WishlistPage from '@/pages/WishlistPage'
import CartPage from '@/pages/CartPage'

const router = createRouter({
  history: createWebHistory(), //тип истории навигации
  //массив маршрутов, каждый из которых определяет путь и соответствующий ему компонент, который будет отображаться при переходе по этому пути
  routes: [ 
    {
      path: '/',
      component: MainPage
    },
    {
      path: '/wishlist',
      component: WishlistPage
    },
    {
      path: '/cart',
      component: CartPage
    },
    {
      path: '/404',
      component: Error404Page
    },
    {
      path: '/:pathMatch(.*)*',
      component: Error404Page
    }
  ],
  linkActiveClass: 'active' //определяет класс, который будет добавлен к активному элементу навигации
})

// создается экземпляр приложения Vue, к которому применяются маршрутизатор и хранилище Vuex, после чего он монтируется в элемент с id "app"
createApp(App).use(router).use(store).mount('#app')
