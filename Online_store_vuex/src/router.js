import { createRouter, createWebHistory } from 'vue-router'

import AppProductsList from '@/components/ProductsList';
import AppProduct from '@/components/Product';
import AppCart from '@/components/Cart';
import AppCheckout from '@/components/Checkout';
import AppE404 from '@/components/E404';

const routes = [
	{
		name: 'catalog',
		path: '/',
		component: AppProductsList
	},
	{
		name: 'cart',
		path: '/cart',
		component: AppCart
	},
	{
		name: 'checkout',
		path: '/order',
		component: AppCheckout,
	},
	{
		name: 'product',
		path: '/product/:id',
		component: AppProduct
	},
	{
		path: '/:any(.*)',
		component: AppE404
	}
];

export default createRouter({
	routes, //массив маршрутов
	history: createWebHistory() //тип истории навигации
});
