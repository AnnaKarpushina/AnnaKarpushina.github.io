import axios from 'axios';

import { IAddCart, IRemoveCart, IUpdateCart } from '../../store/CartStore/interface';

axios.defaults.baseURL = 'http://localhost:3001/';

// Получение корзины пользователя
export const fetchGetCart = async (id: string) => {
    try {
        const { data } = await axios.get(`cart/${id}`);
        return data;
    } catch (error) {
        console.log('Error delete lamp:', error);
    }
};

// Удаление товара из корзины
export const fetchDeleteCart = async ({ userId, productId, amount }: IRemoveCart) => {
    try {
        const { data } = await axios.delete(`cart/${userId}/${productId}/${amount}`);
        return data;
    } catch (error) {
        console.error('Error fetching cart:', error);
    }
};

// Добавление товара в корзину

export const fetchAddCart = async ({ userId, productId, quantity }: IAddCart) => {
    try {
        const { data } = await axios.post('cart/', { userId, localCart: [{ productId, quantity }] });
        return data;
    } catch (error) {
        console.error('Error adding product to cart:', error);
    }
};

// Добавление количества к существующему товару в корзине (не использовали)
export const fetchUpdateCart = async ({ productId, quantity }: IUpdateCart) => {
    try {
        const { data } = await axios.patch('http://localhost:3001/cart/', { productId, quantity });
        return data;
    } catch (error) {
        console.error('Error updating cart quantity:', error);
    }
};
