import {
    createContext, FC, ReactNode, useEffect, useMemo, useState,
} from 'react';

import {
    fetchAddCart,
    fetchDeleteCart, fetchGetCart,
} from '../../services/api/cart';
import { ILamp } from '../../store/LampsStore/interface';
import UserStore from '../../store/UserStore/UserStore';
import { getLocalStorage, setLocalStorage } from '../../utilites';
import { ICart, ICartContext } from './interface';

interface IChildProps {
    children: string | JSX.Element | JSX.Element[] | ReactNode;
}

export const CartContext = createContext<ICartContext>({} as ICartContext);

const CartContextProvider: FC<IChildProps> = ({ children }) => {
    const [cart, setCart] = useState<ICart[]>([]);
    const { user } = UserStore();

    useEffect(() => {
        // Если localCart имеет значение null или undefined, то будет использовано значение второго операнда ([], пустой массив)
        setCart(getLocalStorage('bucket') ?? []); // извлекаем данные из локального хранилища и устанавливаем их в состояние компонента
    }, []);

    const userCart = async () => {
        const cartData = await fetchGetCart(user._id);
        if (cartData && Array.isArray(cartData)) {
            setLocalStorage('bucket', JSON.stringify(cartData));
            setCart(cartData); // обновляем состояние корзины
        }
    };

    useEffect(() => {
        if (user?._id) {
            userCart(); // обновляем корзину пользователя
        }
    }, [user]);

    const addToCart = async (product: ILamp, newCount: number) => {
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

        setCart(newCartArr); // Обновляем состояние корзины с новым массивом товаров
    };

    const removeFromCart = async (productId: string) => {
        await fetchDeleteCart({ userId: user?._id, productId });
        const newCartArr = cart.filter((product) => product._id !== productId);
        setCart(newCartArr);
        setLocalStorage('bucket', JSON.stringify(newCartArr));
    };

    // Очистка корзины
    const clearCart = () => {
        setCart([]);
        setLocalStorage('bucket', JSON.stringify([])); // сохраняет пустой массив в локальном хранилище браузера под ключом 'bucket'
    };

    const value = useMemo(() => ({
        cart,
        addToCart,
        removeFromCart,
        clearCart,
        userCart,
    }), [cart, addToCart, removeFromCart, clearCart, userCart]);

    return (
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    );
};

export default CartContextProvider;
