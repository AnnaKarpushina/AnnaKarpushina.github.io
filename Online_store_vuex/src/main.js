import { createApp } from "vue"
import App from './App'
import store from './store' //хранилища Vuex
import router from './router'
import 'bootstrap/dist/css/bootstrap.min.css'

// Диспетчеризация хранилища Vuex
// Метод store.dispatch используется для отправки действия 'products/load', который загружает данные о продуктах асинхронно
// Обратный вызов then используется для указания того, что монтаж приложения должен произойти после завершения действия 'products/load'
store.dispatch('products/load').then(() => {
	createApp(App).use(store).use(router).mount('#app')
})

// 'cart/load' загружает данные, связанные с корзиной
store.dispatch('cart/load')
