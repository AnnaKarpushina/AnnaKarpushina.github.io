<template>
	<div>
		<h1 class="mb-3">Ваш заказ</h1>
		<div v-if="orderPlaced">
			<div class="alert alert-success d-inline-block">
				Ваш заказ принят, с вами свяжутся
			</div>
			<!-- <div>
				<h2>Детали вашего заказа</h2>
				<table class="table table-bordered table-hover">
				<thead>
					<tr>
						<th>Название товара</th>
						<th>Цена</th>
						<th>Кол-во</th>
						<th>Общая цена</th>
					</tr>
				</thead>
				<tbody>
					<tr v-for="item in orderDetails.items" :key="item.id">
						<td>{{ item.title }}</td>
						<td>{{ item.price.toLocaleString('ru-RU') }} ₽</td>
						<td>{{ item.quantity }} шт</td>
						<td>{{ (item.price * item.quantity).toLocaleString('ru-RU') }} ₽</td>
					</tr>
				</tbody>
				</table>
			</div> -->
    	</div>
		<div class="alert alert-success d-inline-block" v-else>
			Вернитесь в корзину и оформите заказ
		</div>
  </div>
</template>

<script>
	export default {
		computed: {
			orderPlaced() {
				// указываем на то, что свойство orderPlaced находится в объекте cart в состоянии хранилища Vuex
				return this.$store.state.cart.orderPlaced
			},
			// orderDetails() {
			// 	return this.$store.state.cart
			// }
		}
	}
</script>