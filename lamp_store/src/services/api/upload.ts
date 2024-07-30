import axios from 'axios';

import { ILamp } from '../../store/LampsStore/interface';

axios.defaults.baseURL = 'http://localhost:3001/';

// создание продукта (в админке)
export const fetchCreateProduct = async (productData: ILamp) => {
    try {
        const { data } = await axios.post<ILamp>('upload', productData);
        return data;
    } catch (error) {
        console.error('Error to create product:', error);
    }
};

// обновить продукт (в админке)
export const fetchUpdateProduct = async (productData: ILamp) => {
    try {
        const { data } = await axios.patch<ILamp>('upload', productData);
        return data;
    } catch (error) {
        console.error('Error to update product', error);
    }
};
