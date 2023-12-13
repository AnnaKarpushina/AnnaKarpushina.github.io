import { createApp } from 'vue'
import {createRouter, createWebHistory} from 'vue-router'
import App from './App.vue'
import store from './store'

import Error404Page from '@/pages/Error404Page'
import MainPage from '@/pages/MainPage'
import WishlistPage from '@/pages/WishlistPage'
import CartPage from '@/pages/CartPage'

const router = createRouter({
  history: createWebHistory(), //тип истории навигации
  routes: [ //массив маршрутов
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
  linkActiveClass: 'active'
});

createApp(App).use(router).use(store).mount('#app')
