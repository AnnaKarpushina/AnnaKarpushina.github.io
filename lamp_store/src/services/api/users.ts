import axios from 'axios';

import {
    ICheckUser, ILoginData, IRegisterData, IUser,
} from '../../store/UserStore/interface';

axios.defaults.baseURL = 'http://localhost:3001/';

export const fetchRegister = async (values: IRegisterData) => {
    try {
        const { data } = await axios.post<IUser>('users/register', values);
        return data;
    } catch (error) {
        console.error('Error submitting form', error);
    }
};

export const fetchLogin = async (values: ILoginData) => {
    try {
        const { data } = await axios.post<IUser>('/users/login', values);
        return data;
    } catch (error) {
        console.error('Error submitting form', error);
    }
};

// Токены предоставляют собой средство авторизации для каждого запроса от клиента к серверу
// Токен нужен для проверки юзера и получении его данных

export const fetchToken = async (token: string) => {
    try {
        const { data } = await axios.post<ICheckUser>('users/token', '', { headers: { token } });
        const { user } = data;
        return user;
    } catch (error) {
        console.error('Error checking user by token', error);
        throw error;
    }
};

// - '' — это тело запроса. Запрос на аутентификацию, не требует передачи данных в теле запроса
// - { headers: { token } } — это объект с заголовками, где заголовок token содержит значение переданного аргумента token
