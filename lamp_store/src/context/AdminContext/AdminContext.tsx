import {
    createContext, FC, ReactNode, useContext, useMemo,
} from 'react';

import { fetchLampDelete } from '../../services/api/products';
import { fetchCreateProduct, fetchUpdateProduct } from '../../services/api/upload';
import { LampsContext } from '../LampsContext/LampsContext';
import { IAdminContext, IProduct } from './interface';

interface IChildProps {
    children: string | JSX.Element | JSX.Element[] | ReactNode;
}

export const AdminContext = createContext<IAdminContext>({} as IAdminContext);

export const AdminContextProvider: FC<IChildProps> = ({ children }) => {
    const { lamps, setLamps } = useContext(LampsContext);

    const createProduct = async (productData: IProduct) => {
        const newProduct = await fetchCreateProduct(productData);
        setLamps([...lamps, newProduct]); // создаем новый массив, добавляя в него все существующие лампы и новый продукт
    };

    const updateProduct = async (productData: IProduct) => {
        await fetchUpdateProduct(productData);
        // объединяем старые данные с новыми либо возвращается старая лампа
        const updateLamp = lamps.map((lamp) => (lamp._id === productData._id ? { ...lamp, ...productData } : lamp));
        setLamps(updateLamp);
    };

    const deleteProduct = async (id: string) => {
        await fetchLampDelete(id);
        // новый массив создаем, в который не входит лампа с удаляемым идентификатором
        const deleteLamp = lamps.filter((lamp) => lamp._id !== id);
        setLamps(deleteLamp);
    };

    const value = useMemo(() => ({
        createProduct,
        updateProduct,
        deleteProduct,
    }), [createProduct, updateProduct, deleteProduct]);

    return (
        <AdminContext.Provider value={value}>
            {children}
        </AdminContext.Provider>
    );
};
