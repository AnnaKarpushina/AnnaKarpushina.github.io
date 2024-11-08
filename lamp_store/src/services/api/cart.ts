import axios from 'axios';

import { IAddCart, IAddCartLocal, IRemoveCart } from '../../store/CartStore/interface';

axios.defaults.baseURL = 'http://localhost:3001/';

// Получение корзины пользователя
export const fetchGetCart = async (id: string) => {
    try {
        const { data } = await axios.get(`cart/${id}`);
        return data;
    } catch (error) {
        console.log('Error fetching cart:', error);
    }
};

// Удаление товара из корзины
export const fetchDeleteCart = async ({ userId, productId }: IRemoveCart) => {
    try {
        const { data } = await axios.delete(`cart/${userId}/${productId}`);
        return data;
    } catch (error) {
        console.error('Error deleting product from cart:', error);
    }
};

// Добавление товара в корзину
export const fetchAddCart = async ({
    userId, productId, quantity, price,
}: IAddCart) => {
    try {
        const { data } = await axios.patch('cart', {
            userId, productId, quantity, price,
        });
        return data;
    } catch (error) {
        console.error('Error adding product to cart:', error);
    }
};

// Добавление корзины из LocalStorage при входе
export const fetchAddCartLocal = async ({ userId, localCart }: IAddCartLocal) => {
    try {
        const { data } = await axios.post('cart', {
            userId, localCart,
        });
        return data;
    } catch (error) {
        console.error('Error adding cart from local storage:', error);
    }
};
