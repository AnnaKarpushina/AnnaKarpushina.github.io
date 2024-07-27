import axios from 'axios';

import { IProduct } from '../../context/AdminContext/interface';
import { ILamp } from '../../context/LampsContext/interface';

axios.defaults.baseURL = 'http://localhost:3001/';

// создание продукта
export const fetchCreateProduct = async (productData: IProduct) => {
    try {
        const { data } = await axios.post<ILamp>('upload', productData);
        return data;
    } catch (error) {
        console.error('Error to create product:', error);
    }
};

// обновить продукт
export const fetchUpdateProduct = async (productData: IProduct) => {
    try {
        const { data } = await axios.patch<ILamp>('upload', productData);
        return data;
    } catch (error) {
        console.error('Error to update product', error);
    }
};
