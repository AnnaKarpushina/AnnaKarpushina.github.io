<template>
	<div>
		<h1>Каталог всех товаров</h1>
		<div class="row">
			<div class="col-12 col-sm-6 col-lg-4 mb-3 mt-3" v-for="product in productList" :key="product.id">
				<div class="card h-100">
					<div class="card-body d-flex flex-column justify-content-between">
						<h3>{{ product.title }}</h3>
						<div>Цена: {{ product.price.toLocaleString('ru-RU') }} ₽</div>
						<div>В наличии: {{ product.rest }} шт</div>
						<router-link class="text-decoration-none" :to="{ name: 'product', params: { id: product.id } }">Читать о товаре</router-link>
						<!-- если товар находится в корзине -->
						<button 
							v-if="inCart(product.id)"  
							@click="remove(product.id)" 
							type="button" 
							class="btn btn-danger mt-3"
						>
							Удалить из корзины
						</button>
						<button 
							v-else 
							@click="add(product.id)" 
							type="button" 
							class="btn btn-success mt-3"
						>
							Добавить в корзину
						</button>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import { mapGetters, mapActions } from 'vuex'

	export default {
		// В computed используются mapGetters для отображения геттеров из модулей Vuex
		// Отображаются productList из модуля 'products' и inCart из модуля 'cart'
		computed: {
			...mapGetters('products', { productList: 'all' }),
			...mapGetters('cart', [ 'inCart' ])
		},
		// В methods используется mapActions для отображения методов add и remove из модуля 'cart'
		methods: {
			...mapActions('cart', [ 'add', 'remove' ])
		}
	}
</script>