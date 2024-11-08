import { create } from 'zustand';

import { fetchAddCartLocal } from '../../services/api/cart';
import { fetchLogin, fetchRegister, fetchToken } from '../../services/api/users';
import CartStore from '../CartStore/CartStore';
import { IUser, IUserStore } from './interface';

const initUser: IUser = {
    email: '',
    isAdmin: false,
    name: '',
    token: '',
    _id: '',
};

const UserStore = create<IUserStore>((set, get) => ({
    user: initUser,
    loading: false,
    showCartButtons: true, // Отображения кнопок для неавторизованных

    // проверка пользователя
    checkUser: async () => {
        set({ loading: true });
        const token = localStorage.getItem('token'); // Получаем значение по ключу 'token' из локального хранилища браузера
        if (token) {
            const userData = await fetchToken(token);
            if (userData?._id?.length) {
                set({ user: userData, showCartButtons: false }); // обновляем состояние пользователя, передавая ему данные, полученные из fetchToken
            }
        }
        set({ loading: false });
    },

    register: async (values, navigate) => {
        const userData = await fetchRegister(values);
        localStorage.setItem('token', userData.token);
        if (userData?._id?.length) {
            set({ user: userData });

            const localCart = JSON.parse(localStorage.getItem('bucket') || '[]');

            if (localCart.length > 0) {
                await fetchAddCartLocal({ userId: userData._id, localCart });
            }

            await CartStore.getState().userCart();

            set({ showCartButtons: false });

            navigate();
        }
    },

    login: async (values, navigate) => {
        const userData = await fetchLogin(values);
        localStorage.setItem('token', userData.token);
        if (userData?._id?.length) {
            set({ user: userData });

            // Извлекаем локальную корзину из LocalStorage
            const localCart = JSON.parse(localStorage.getItem('bucket') || '[]');

            if (localCart.length > 0) {
                await fetchAddCartLocal({ userId: userData._id, localCart });
            }

            // Обновляем корзину пользователя в состоянии после синхронизации
            await CartStore.getState().userCart();

            set({ showCartButtons: false });

            navigate();
        }
    },

    logout: () => {
        localStorage.removeItem('token'); // удаляем элемент с ключом 'token' из локального хранилища браузера
        set({ user: initUser });
        set({ showCartButtons: true });
    },

    handleLogout: () => {
        CartStore.getState().clearCart();
        get().logout();
    },
}));

// Автоматическая проверка пользователя при создании хранилища
UserStore.getState().checkUser();

export default UserStore;
