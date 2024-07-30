import { create } from 'zustand';

import { fetchLogin, fetchRegister, fetchToken } from '../../services/api/users';
import {
    ILoginData, IRegisterData, IUser, IUserStore,
} from './interface';

const initUser: IUser = {
    email: '',
    isAdmin: false,
    name: '',
    token: '',
    _id: '',
};

const UserStore = create<IUserStore>((set) => ({
    user: initUser,
    loading: false,

    // проверка пользователя
    checkUser: async () => {
        set({ loading: true });
        const token = localStorage.getItem('token'); // Получаем значение по ключу 'token' из локального хранилища браузера
        if (token) {
            const userData = await fetchToken(token);
            if (userData?._id?.length) {
                set({ user: userData }); // обновляем состояние пользователя, передавая ему данные, полученные из fetchToken
            }
        }
        set({ loading: false });
    },

    register: async (values: IRegisterData) => {
        const userData = await fetchRegister(values);
        localStorage.setItem('token', userData.token); // Устанавливаем значение токена пользователя в локальное хранилище браузера
        if (userData?._id?.length) {
            set({ user: userData });
        }
    },

    login: async (values: ILoginData) => {
        const userData = await fetchLogin(values);
        localStorage.setItem('token', userData.token);
        if (userData?._id?.length) {
            set({ user: userData });
        }
    },

    logout: () => {
        localStorage.removeItem('token'); // удаляем элемент с ключом 'token' из локального хранилища браузера
        set({ user: initUser });
    },
}));

// Автоматическая проверка пользователя при создании хранилища
UserStore.getState().checkUser();

export default UserStore;
