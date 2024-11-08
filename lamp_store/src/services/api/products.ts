import axios from 'axios';

import { ILamp } from '../../store/LampsStore/interface';

axios.defaults.baseURL = 'http://localhost:3001/';

// получение всех продуктов
export const fetchLamps = async () => {
    try {
        const { data } = await axios.get<ILamp[]>('products');
        return data;
    } catch (error) {
        console.error('Error fetching lamps:', error);
    }
};

// получить 1 продукт
export const fetchLamp = async (id: string) => {
    try {
        const { data } = await axios.get<ILamp>(`products/${id}`);
        return data;
    } catch (error) {
        console.error('Error fetching lamp:', error);
    }
};

// удалить 1 продукт (в админке)
export const fetchLampDelete = async (id: string) => {
    try {
        const { data } = await axios.delete<ILamp>(`products/${id}`);
        return data;
    } catch (error) {
        console.log('Error delete lamp:', error);
    }
};
