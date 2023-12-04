<template>
	<div>
		<h1>Каталог всех товаров</h1>
		<div class="row">
			<div class="col-12 col-sm-6 col-lg-4 mb-3 mt-3" v-for="product in productList" :key="product.id">
				<div class="card">
					<div class="card-body">
						<h3>{{ product.title }}</h3>
						<div>{{ product.price }} ₽</div>
						<p><router-link :to="{ name: 'product', params: { id: product.id } }">Читать о товаре</router-link></p>
						<!-- если товар находится в корзине -->
						<button 
							v-if="inCart(product.id)"  
							@click="remove(product.id)" 
							type="button" 
							class="btn btn-danger"
						>
							Удалить из корзины
						</button>
						<button 
							v-else 
							@click="add(product.id)" 
							type="button" 
							class="btn btn-success"
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