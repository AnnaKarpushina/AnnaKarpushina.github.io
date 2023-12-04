<template>
	<div>
		<h1 class="mb-3">Корзина</h1>
		<div v-if="products.length > 0" >
			<table class="table table-bordered table-hover">
				<thead>
					<tr>
						<th>Название товара</th>
						<th>Цена</th>
						<th>Кол-во</th>
						<th>Общая цена</th>
						<th>Действия</th>
					</tr>
				</thead>	
				<tbody>
					<tr v-for="product in products" :key="product.id">
						<td><router-link :to="{ name: 'product', params: { id: product.id } }">{{ product.title.trim() }}</router-link></td>
						<td>{{ product.price }}</td>
						<td>{{ product.cnt }}</td>
						<td>{{ product.price * product.cnt }}</td>
						<td>
							<button class="btn btn-secondary me-2 mb-1 mb-md-0" 
								@click="setCount({ id: product.id, cnt: product.cnt - 1 })" 
								:disabled="product.cnt <= 1">-</button>
							<button class="btn btn-success me-2 mb-1 mb-md-0" 
								@click="setCount({ id: product.id, cnt: product.cnt + 1 })">+</button>
							<button class="btn btn-danger" @click="remove(product.id)">х</button>
						</td>
					</tr>
				</tbody>
			</table>
			<div class="d-flex justify-content-between">
				<!-- <button class="btn btn-danger">Очистить корзину</button> -->
				<router-link :to="{ name: 'checkout' }" class="btn btn-success">Заказать сейчас</router-link>
			</div>
		</div>
		<div v-else>
			<div class="alert alert-success">Корзина пуста</div>
			<router-link :to="{ name: 'catalog' }" class="btn btn-success">Вернуться к товарам</router-link>
		</div>
	</div>
</template>

<script>
	import { mapGetters, mapActions } from 'vuex';

	export default {
		// В computed используется mapGetters для отображения геттера itemsDetailed из модуля 'cart', 
		// который, возвращает детализированную информацию о товарах в корзине
		computed: {
			...mapGetters('cart', { products: 'itemsDetailed' })
		},
		// В methods используется mapActions для отображения методов setCount и remove из модуля 'cart', 
		// которые, отвечают за установку количества товара и удаление товара из корзины 
		methods: {
			...mapActions('cart', [ 'setCount', 'remove' ])
		}
	}
</script>