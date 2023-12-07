import { createStore } from 'vuex'

import products from './products'
import cart from './cart'

const store = {
	// Модули представляют собой отдельные части состояния, мутаций, действий и геттеров для управления данными в приложении 
	modules: {
		products,
		cart
	},
	// В строгом режиме (strict mode) Vuex будет следить за изменениями состояния и выдавать предупреждения, что упрощает отладку, 
	// но снижает производительность в продакшене
	strict: process.env.NODE_ENV !== 'production'
}

export default createStore(store);