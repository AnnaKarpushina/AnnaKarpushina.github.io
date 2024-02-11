// конфигурация хранилища Vuex 

import { createStore } from 'vuex' //импорт функции createStore из библиотеки Vuex для создания хранилища

export default createStore({ //экспорт конфигурации хранилища по умолчанию
  state: {  //объект, который содержит начальное состояние хранилища
    cart: [], //корзина
    wishList: [], //избранное
  },
  getters: { //функции, которые позволяют получать значения из состояния хранилища
    getCart: (state) => state.cart, //возвращает содержимое корзины
    getWishList: (state) => state.wishList //возвращает содержимое избранного
  },
  mutations: { //функции, которые используются для изменения состояния хранилища
    ADD_TO_CART(state, product) { //добавляет товар в корзину
      state.cart.push(product) 
    },
    REMOVE_FROM_CART(state, productId) { //удаляет товар из корзины по его идентификатору
      //Создаем новый массив, исключая товар с идентификатором productId из текущего массива корзины
      state.cart = state.cart.filter(product => product.id !== productId)
    },
    ADD_TO_WISHLIST(state, product) { //добавляет товар в избранное
      state.wishList.push(product)
    },
    REMOVE_FROM_WISHLIST(state, productId) { //удаляет товар из избранного по его идентификатору
      //Создаем новый массив, исключая товар с идентификатором productId из текущего массива избранного
      state.wishList = state.wishList.filter(product => product.id !== productId)
    }
  }
})

