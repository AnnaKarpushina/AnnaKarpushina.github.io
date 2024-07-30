import { create } from 'zustand';

import {
    fetchAddCart, fetchDeleteCart, fetchGetCart, fetchUpdateCart,
} from '../../services/api/cart';
import { getLocalStorage, setLocalStorage } from '../../utilites';
import { ILamp } from '../LampsStore/interface';
import UserStore from '../UserStore/UserStore';
import { ICart, ICartStore } from './interface';

const CartStore = create<ICartStore>((set, get) => {
    // Инициализация состояния корзины
    const localCart = getLocalStorage('bucket'); // извлекаем данные из локального хранилища
    // Если localCart имеет значение null или undefined, то будет использовано значение второго операнда ([], пустой массив)
    set({ cart: localCart ?? [] }); // устанавливаем их в состояние компонента

    return {
        cart: localCart,
        setCart: (cart) => set({ cart }),

        userCart: async () => { // обновляем корзину пользователя
            const { user } = UserStore.getState();
            if (user?._id) {
                const cartData = await fetchGetCart(user._id);
                if (cartData && Array.isArray(cartData)) {
                    setLocalStorage('bucket', JSON.stringify(cartData));
                    set({ cart: cartData }); // обновляем состояние корзины
                }
            }
        },

        addToCart: async (product: ILamp, newCount: number) => {
            const { cart } = get(); // извлекаем текущее состояние cart из хранилища
            const { user } = UserStore.getState();
            let newCartArr: ICart[] = [];
            if (user?._id) {
                // Проверяем, существует ли товар уже в корзине
                const existingProduct = cart.find((item) => item._id === product._id);

                if (existingProduct) {
                    // Если товар уже есть, обновляем его количество
                    const newQuantity = existingProduct.quantity + newCount;
                    await fetchUpdateCart({ productId: product._id, quantity: newQuantity });
                } else {
                    // Если товар нет в корзине, добавляем его
                    await fetchAddCart({ userId: user._id, productId: product._id, quantity: newCount });
                }
            } else {
                // Проверяем, есть ли уже что-то в корзине и уже существует элемент с _id, который соответствует _id элемента
                if (cart.length && cart.find((el) => el._id === product._id)) {
                    newCartArr = cart.map((cartItem) => {
                        const { _id, amount, quantity } = cartItem;
                        if (_id === product._id) {
                            const newQuantity = quantity + newCount <= amount ? quantity + newCount : quantity;
                            return { ...cartItem, quantity: newQuantity }; // Возвращаем обновленный товар
                        }
                        return cartItem; // Возвращаем неизмененный товар
                    });
                } else {
                    // Если корзина пуста, добавляем новый товар с указанным количеством к существующим товарам
                    newCartArr = [...cart, { ...product, quantity: newCount }];
                }

                // Cохраняем новое значение newCartArr (которое преобразует в строку) в локальное хранилище браузера под ключом 'bucket'
                setLocalStorage('bucket', JSON.stringify(newCartArr));
            }

            set({ cart: newCartArr }); // Обновляем состояние корзины с новым массивом товаров
        },

        removeFromCart: async (productId: string, amount: number) => {
            const { cart } = get();
            const { user } = UserStore.getState();
            await fetchDeleteCart({ userId: user?._id, productId, amount });
            const newCartArr = cart.filter((product) => product._id !== productId);
            set({ cart: newCartArr });
            setLocalStorage('bucket', JSON.stringify(newCartArr));
        },

        // Очистка корзины
        clearCart: () => {
            set({ cart: [] });
            setLocalStorage('bucket', JSON.stringify([])); // сохраняет пустой массив в локальном хранилище браузера под ключом 'bucket'
        },
    };
});

export default CartStore;
