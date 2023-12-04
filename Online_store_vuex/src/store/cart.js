const BASEURL = 'http://faceprog.ru/reactcourseapi/cart/';

export default {
	namespaced: true,
	state: {
		items: [],
		token: null
	},
	getters: {
		// inCart использует метод some для проверки, есть ли товар с определённым id в массиве items
		inCart: state => id => state.items.some(item => item.id == id), //добавлен ли товар в корзину
		//Возвращает детальную информацию о товарах в корзине, включая их цену и количество
		itemsDetailed: (state, getters, rootState, rootGetters) => {
			//Он использует метод map для преобразования каждого элемента массива items в объект, содержащий информацию о товаре и его количестве
			return state.items.map(item => {
				let product = rootGetters['products/one'](item.id)
				return { ...product, cnt: item.cnt }
			})
		},
		length: state => state.items.length, // получаем кол-во товаров в корзине
		// Общая стоимость всех товаров в корзине
		total: (state, getters) => getters.itemsDetailed.reduce((t, i) => t + i.price * i.cnt, 0)
	},
	mutations: {
		// используется для загрузки состояния корзины из внешнего источника, такого как сервер. 
		// Она принимает объект cart (содержащий информацию о товарах в корзине) и токен, и обновляет состояние items и token
		load(state, { cart, token }) {
			state.items = cart
			state.token = token
		},
		// add добавляет новый объект с id товара и количеством 1 в массив items
		add(state, id) {
			state.items.push({ id, cnt: 1 })
		},
		// remove удаляет объект с определённым id из массива items
		remove(state, id) {
			state.items = state.items.filter(item => item.id != id)
		},
		// Она принимает id товара и новое количество (cnt) и обновляет количество определённого товара в массиве items 
		setCount(state, { id, cnt }) {
			state.items.find(item => item.id == id).cnt = cnt
		}
	},
	// действия (actions) для вызова мутаций с проверкой наличия товара в корзине
	actions: {
		// load получает данные о корзине и токен из внешнего источника, обновляет состояние items и token,
		// и сохраняет новый токен в локальное хранилище, если это необходимо.
		async load({ commit }) {
			// Получаем токен из локального хранилища браузера, который был сохранен ранее при загрузке корзины
			let oldToken = localStorage.getItem('CART__TOKEN')
			let response = await fetch(`${BASEURL}load.php?token=${oldToken}`)
			let { cart, token, needUpdate } = await response.json()
			// Если флаг needUpdate равен true, то новый токен сохраняется в локальном хранилище
			if(needUpdate) {
				localStorage.setItem('CART__TOKEN', token)
			}
			// метод вызывает мутацию load и передает ей объект с данными о корзине и новым токеном
			commit('load', { cart, token })
		},
		// Действие add вызывает мутацию add только если товара с указанным id нет в корзине
		async add({ commit, getters, state }, id) { 
			if(!getters.inCart(id)) {
				let response = await fetch(`${BASEURL}add.php?token=${state.token}&id=${id}`)
				if(await response.json()){
					commit('add', id)
				}
			}
		},
		// Действие remove вызывает мутацию remove только если товар с указанным id уже есть в корзине
		async remove({ commit, getters, state }, id) {
			if(getters.inCart(id)) {
				let response = await fetch(`${BASEURL}remove.php?token=${state.token}&id=${id}`)
				if(await response.json()){
					commit('remove', id)
				}
			}
		},
		// setCount проверяет, что товар с указанным id уже есть в корзине, обновляет количество определённого товара 
		// в массиве items состояния и вызывает мутацию setCount
		setCount({ commit, getters }, { id, cnt }) {
			if(getters.inCart(id)) {
				// Math.min() сравнивает полученное значение с количеством товаров, доступных для покупки, которое находится 
				// в объекте itemsDetailed в хранилище Vuex. Для этого используется метод find(), который находит элемент в массиве 
				// объектов по заданному условию. В данном случае мы ищем элемент с id, равным переданному параметру id
				// если количество товаров, которое можно добавить в корзину, больше, чем количество товаров, доступных для покупки, 
				// то метод Math.min() вернет значение, равное доступному количеству товаров. В противном случае он вернет значение, 
				// равное переданному параметру cnt
				let validCount = Math.min(Math.max(cnt, 1), getters.itemsDetailed.find(item => item.id == id).rest)
				commit('setCount', { id, cnt: validCount })
			}
		}
	}
}
