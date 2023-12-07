// модуль Vuex для управления состоянием товаров в приложении
export default {
	// Пространство имен позволяет использовать модуль в приложении без опасности конфликта имен с другими модулями 
	namespaced: true, //автоматические префиксы 
	state: {
		items: [] //список товаров
	},
	// Геттеры предоставляют доступ к данным из состояния
	getters: {
		all: state => state.items, //возвращает все товары из состояния
		// find - это метод массивов, который применяется для поиска первого элемента в массиве, 
		// который удовлетворяет условию, заданному в переданной функции обратного вызова
		// Принимает id в качестве параметра и возвращает товар с соответствующим идентификатором
		one: state => id => state.items.find(item => item.id === id), 
	},
	// Мутации - это синхронные функции, изменяющие состояние
	mutations: {
		//Принимает состояние и новый список товаров, заменяя текущий список новым.
		setItems(state, products){
			state.items = products
		}
	},
	//Actions представляют собой асинхронные операции, которые вызывают мутации
	actions: {
		//load - Асинхронно загружает данные с удаленного сервера и вызывает мутацию для обновления списка товаров
		async load({ commit }){
			let response = await fetch('http://faceprog.ru/reactcourseapi/products/all.php');
			commit('setItems', await response.json());
		}
	}
}