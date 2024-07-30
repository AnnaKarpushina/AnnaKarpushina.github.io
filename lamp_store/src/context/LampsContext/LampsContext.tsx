import {
    createContext, FC, ReactNode, useMemo, useState,
} from 'react';

import { fetchLamp, fetchLamps } from '../../services/api/products';
import { ILamp, ILampsContext } from './interface';

interface IChildProps {
    children: string | JSX.Element | JSX.Element[] | ReactNode;
}

const initLamp = {
    _id: '',
    amount: 0,
    name: '',
    price: 0,
    productImage: '',
    info: '',
};

export const LampsContext = createContext<ILampsContext>({} as ILampsContext);

const LampsContextProvider: FC<IChildProps> = ({ children }) => {
    const [lamps, setLamps] = useState<ILamp[]>([]);
    const [lamp, setLamp] = useState<ILamp>(initLamp);
    const [isLoading, setLoading] = useState<boolean>(false);

    const getAllLamps = async () => {
        setLoading(true);
        const data = await fetchLamps(); // получяем данные о лампах
        setLamps(data || []); // обновляем состояние lamps
        setLoading(false);
    };

    const getOneLamp = async (id: string) => {
        setLoading(true);
        const data = await fetchLamp(id);
        setLamp(data || initLamp);
        setLoading(false);
    };

    // useMemo используется для создания объекта value, который содержит состояния и функции, которые будут переданы в контекст

    const value = useMemo(() => ({
        lamp,
        lamps,
        isLoading,
        getAllLamps,
        getOneLamp,
        setLamps,
    }), [lamp, lamps, isLoading, getAllLamps, getOneLamp, setLamps]);

    return (
        <LampsContext.Provider value={value}>
            {children}
        </LampsContext.Provider>
    );
};

export default LampsContextProvider;
