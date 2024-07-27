import {
    createContext, FC, ReactNode, useEffect, useMemo, useState,
} from 'react';

import { fetchLogin, fetchRegister, fetchToken } from '../../services/api/users';
import {
    ILoginData, IRegisterData, IUser, IUserContext,
} from './interface';

interface IChildProps {
    children: string | JSX.Element | JSX.Element[] | ReactNode;
}

const initUser = {
    email: '',
    isAdmin: false,
    name: '',
    token: '',
    _id: '',
};

export const UserContext = createContext<IUserContext>({} as IUserContext);

export const UserContextProvider: FC<IChildProps> = ({ children }) => {
    const [user, setUser] = useState<IUser>(initUser);

    const [loading, setLoading] = useState(false);

    const checkUser = async () => {
        setLoading(true);
        const token = localStorage.getItem('token'); // Получаем значение по ключу 'token' из локального хранилища браузера
        if (token) {
            const userData = await fetchToken(token);
            if (userData?._id?.length) {
                setUser(userData); // вызываем setUser, чтобы обновить состояние пользователя, передавая ему данные, полученные из fetchToken
            }
        }
        setLoading(false);
    };

    // проверка пользователя
    useEffect(() => {
        checkUser();
    }, []);

    const register = async (values: IRegisterData) => {
        const userData = await fetchRegister(values);
        localStorage.setItem('token', userData.token); // Устанавливаем значение токена пользователя в локальное хранилище браузера
        if (userData?._id?.length) {
            setUser(userData);
        }
    };

    const login = async (values: ILoginData) => {
        const userData = await fetchLogin(values);
        localStorage.setItem('token', userData.token);
        if (userData?._id?.length) {
            setUser(userData);
        }
    };

    const logout = () => {
        localStorage.removeItem('token'); // удаляем элемент с ключом 'token' из локального хранилища браузера
        setUser(initUser);
    };

    // используется для мемоизации значения контекста пользователя, чтобы избежать лишних ререндеров
    const value = useMemo(() => ({
        user,
        login,
        register,
        logout,
        loading,
    }), [user, loading]);

    return (
        <UserContext.Provider value={value}>
            {children}
        </UserContext.Provider>
    );
};
