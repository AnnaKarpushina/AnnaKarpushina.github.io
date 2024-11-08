import { create } from 'zustand';

import {
    fetchAddCart, fetchDeleteCart, fetchGetCart,
} from '../../services/api/cart';
import { getLocalStorage, setLocalStorage } from '../../utilites';
import LampsStore from '../LampsStore/LampsStore';
import UserStore from '../UserStore/UserStore';
import { ICartStore } from './interface';

const CartStore = create<ICartStore>((set, get) => ({
    cart: getLocalStorage('bucket') ?? [], // извлекаем данные из локального хранилища
    orderSuccess: false, // Отслеживания успеха заказа

    setCart: (cart) => set({ cart }),

    setOrderSuccess: (success) => set({ orderSuccess: success }),

    userCart: async () => { // обновляем корзину пользователя
        const { user } = UserStore.getState();

        if (user && user._id) {
            const cartData = await fetchGetCart(user._id);

            if (cartData && Array.isArray(cartData.products)) {
                setLocalStorage('bucket', JSON.stringify(cartData.products));
                set({ cart: cartData.products });
            }
        }
    },

    addToCart: async (product, newCount) => {
        const { cart } = get(); // Извлекаем текущее состояние корзины из хранилища
        const { user } = UserStore.getState(); // Получаем текущего пользователя
        const { resetQuantity } = LampsStore.getState();

        // Проверяем, существует ли товар уже в корзине
        const existingProduct = cart.find((item) => item._id === product._id);
        const currentQuantity = existingProduct ? existingProduct.quantity : 0;
        const newQuantity = currentQuantity + newCount;

        if (newQuantity > 3 || newQuantity > product.amount) return;

        if (user?._id) {
            // Если пользователь авторизован, отправляем запрос на сервер
            const result = await fetchAddCart({
                userId: user._id,
                productId: product._id, // Используем product._id для передачи идентификатора
                quantity: newCount,
                price: product.price * newCount,
            });
            if (result) {
                await get().userCart();
                resetQuantity();
            }
        } else {
            // Локальная корзина для неавторизованных пользователей
            let newCartArr = [];

            if (existingProduct) {
                // Если товар уже в корзине, обновляем его количество
                newCartArr = cart.map((cartItem) => (cartItem._id === product._id
                    ? { ...cartItem, quantity: newQuantity }
                    : cartItem),
                );
            } else {
                // Если товара нет в корзине, добавляем его, включая productId
                newCartArr = [
                    ...cart, { ...product, quantity: newCount, productId: product._id },
                ];
            }

            // Сохраняем новую локальную корзину
            setLocalStorage('bucket', JSON.stringify(newCartArr));
            set({ cart: newCartArr });
            resetQuantity();
        }
    },

    removeFromCart: async (productId) => {
        const { cart } = get();
        const { user } = UserStore.getState();

        if (user._id) {
            const updatedCart = await fetchDeleteCart({ userId: user._id, productId });
            if (updatedCart && updatedCart.products) {
                set({ cart: updatedCart.products });
            }
        } else {
            const newCartArr = cart.filter((product) => product.productId !== productId);
            set({ cart: newCartArr });
            localStorage.setItem('bucket', JSON.stringify(newCartArr));
        }
    },

    // Обновления количества товара в корзине
    updateQuantity: async (productId, newQuantity) => {
        const { cart } = get();
        const { user } = UserStore.getState();

        const product = cart.find((item) => item._id === productId); // Получаем товар по его ID
        if (!product) return;

        if (newQuantity > 3) return;

        // Новое количество не меньше 1 и не превышает доступное количество
        const validQuantity = Math.max(1, Math.min(newQuantity, product.amount));

        if (user?._id) {
            await fetchAddCart({
                userId: user._id,
                productId,
                quantity: validQuantity,
                price: product.price * validQuantity,
            });
        } else {
            const newCartArr = cart.map((item) => (item._id === productId ? { ...item, quantity: validQuantity } : item));

            set({ cart: newCartArr });
            setLocalStorage('bucket', JSON.stringify(newCartArr));
        }
    },

    // Кол-во товара, добавленного в корзину
    quantityInCart: (productId) => {
        const { cart } = get();
        const { user } = UserStore.getState();

        const item = user._id
            ? cart.find((product) => product.productId === productId)
            : cart.find((product) => product._id === productId);

        return item ? item.quantity : 0;
    },

    remainingQuantity: (productId, maxAmount) => {
        const quantityInCart = get().quantityInCart(productId);
        const maxAllowed = 3; // Максимальное количество одной разновидности в корзине

        // Рассчитываем, сколько еще можно добавить
        return Math.max(Math.min(maxAmount - quantityInCart, maxAllowed - quantityInCart), 0);
    },

    clearCart: () => {
        set({ cart: [] }); // Очищаем локальную корзину
        setLocalStorage('bucket', JSON.stringify([])); // сохраняет пустой массив в локальном хранилище браузера под ключом 'bucket'
    },

    cartCount: () => {
        const { cart } = get();
        return cart.reduce((total, product) => total + product.quantity, 0);
    },

    makeOrder: () => {
        const { cart } = get();
        const orderData = {
            items: cart.map((product) => ({
                id: product._id,
                quantity: product.quantity,
                price: product.price,
            })),
            totalAmount: cart.reduce((total, product) => total + product.price * product.quantity, 0),
        };

        console.log('Заказ оформлен:', orderData);

        get().setOrderSuccess(true);
        get().clearCart();

        setTimeout(() => {
            get().setOrderSuccess(false);
        }, 3000);
    },

}));

export default CartStore;

// total - аккумулятор, который хранит текущее общее количество
// product - текущий элемент массива (товар из корзины)
// total + product.quantity — на каждом шаге мы добавляем количество текущего товара к аккумулятору.
