import { createStore } from 'vuex';

export default createStore({
  state: {
    cart: [],
    wishList: [],
  },
  getters: {
    getCart: (state) => state.cart,
    getWishList: (state) => state.wishList
  },
  mutations: {
    ADD_TO_CART(state, product) {
      state.cart = [...state.cart, product]
    },
    REMOVE_FROM_CART(state, productId) {
      state.cart = state.cart.filter(product => product.id !== productId)
    },
    ADD_TO_WISHLIST(state, product) {
      state.wishList = [...state.wishList, product]
    },
    REMOVE_FROM_WISHLIST(state, productId) {
      state.wishList = state.wishList.filter(product => product.id !== productId)
    }
  }
});
