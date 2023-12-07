<template>
	<div v-if="hasProduct">
		<h1>{{ product.title }}</h1>
		<div class="alert alert-success">
			<span>Цена: {{ product.price.toLocaleString('ru-RU') }} ₽</span><br>
			<span>В наличии: {{ product.rest }} шт</span>
		</div>
		<router-link :to="{ name: 'catalog' }" class="btn btn-success">Вернуться к товарам</router-link>
	</div>
	<app-e-404 v-else />
</template>

<script>
	import { mapGetters } from 'vuex';
	import AppE404 from './E404.vue'

	export default {
		components: {
			AppE404
		},
		computed: {
			// Метод mapGetters получает геттер 'one' из модуля Vuex под названием 'products'. 
			// Этот геттер позволяет получить информацию о продукте по его id
			...mapGetters('products', { productById: 'one' }),
			id(){
				//преобразует идентификатор из параметра маршрута в целое число, используя функцию parseInt
				return parseInt(this.$route.params.id);
			},
			//использует productById для получения информации о продукте на основе идентификатора, который был получен из параметра маршрута
			product(){
				return this.productById(this.id);
			},
			hasProduct(){
				// Проверяет, существует ли продукт с указанным идентификатором и соответствует ли идентификатор регулярному выражению
				// this.id состоит из одной или более цифр и не начинается с нуля
				return /^[1-9]+\d*$/.test(this.id) && this.product !== undefined;
			}
		}
	}
</script>