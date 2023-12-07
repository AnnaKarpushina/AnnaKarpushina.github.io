<template>
	<div>
		<header>
			<div class="container">
				<div class="row align-items-center mt-4 mt-md-5">
					<div class="col-12 col-md-9">
						<h1>Интернет-магазин телефонов</h1>
					</div>
					<div class="col-12 col-md-3">
						<div class="alert alert-default alert-secondary px-0 mb-0 py-1 py-md-3">
							<!-- Геттер 'cart/length' обращается к геттеру length в модуле Vuex с именем 'cart' -->
							<div class="text-nowrap text-center">В корзине: {{ $store.getters['cart/length'] }} шт</div>
							<!-- Функция .toLocaleString('ru-RU') используется для форматирования числа в соответствии с правилами 
								локали "ru-RU", в данном случае разделителя тысяч -->
							<div class="text-nowrap text-center">Общая сумма: {{ $store.getters['cart/total'].toLocaleString('ru-RU') }} ₽</div>
						</div>
					</div>
				</div>
				<hr>
			</div>
		</header>
		<section>
			<div class="container">
				<div class="row">
					<div class="col-12 col-md-3 menu mb-4 mb-md-0">
						<ul class="list-group">
							<li class="list-group-item" v-for="item in menu" :key="item.route">
								<router-link 
									:to="{ name: item.route }" 
									exact-active-class="text-danger" 
									@click="handleLink(item.route)"
									:class="{ 'disabled': MenuDisabled(item.route) }"
								>
									{{ item.text }}
								</router-link>
							</li>
						</ul>
					</div>
					<div class="col-12 col-md-9">
						<router-view />
					</div>
				</div>
			</div>
		</section>
	</div>
</template>

<script>
	export default {
		data: () => ({
			menu: [
				{ route: 'catalog', text: 'Каталог' },
				{ route: 'cart', text: 'Корзина' },
				{ route: 'checkout', text: 'Заказать' }
			]
		}),
		methods: {
			handleLink(route) {
				if (this.MenuDisabled(route)) {
				// this.$router - предоставляет доступ к объекту маршрутизатора 
				// replace - метод маршрутизатора, который заменяет текущий маршрут новым
				// this.$route.fullPath - предоставляет полный путь текущего маршрута
				// мы откатываем текущий маршрут на себя, что фактически приводит к отмене перехода и предотвращает 
				// изменение маршрута, когда кнопка отключена
					this.$router.replace(this.$route.fullPath); 
				}
			},
			MenuDisabled(route) {
				return route === 'checkout' && this.$store.getters['cart/length'] === 0;
			}
		}
	}
</script>

<style>
	.menu {
		border-right: 1px solid #ddd;
	}

	.list-group-item {
		transition: background 0.3s, color 0.3s;
	}

	.list-group-item a {
		text-decoration: none;
	}

	.list-group-item.active a {
		color: inherit;
	}

	.disabled {
		pointer-events: none; /* Отключение кликов */
		opacity: 0.5; /* Прозрачность для указания на отключенное состояние */
	}
</style>
