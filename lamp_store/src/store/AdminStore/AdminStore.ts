import { create } from 'zustand';

import { fetchLampDelete, fetchLamps } from '../../services/api/products';
import {
    fetchCreateProduct,
    fetchUpdateProduct,
} from '../../services/api/upload';
import { ILamp } from '../LampsStore/interface';
import { IAdminStore } from './interface';

const AdminStore = create<IAdminStore>((set) => ({
    lamps: [],

    getAllLamps: async () => {
        const data = await fetchLamps(); // получяем данные о лампах
        set({ lamps: data || [] }); // обновляем состояние lamps
    },

    createProduct: async (productData: ILamp) => {
        const newProduct = await fetchCreateProduct(productData);
        set((state) => ({
            // создаем новый массив, добавляя в него все существующие лампы и новый продукт
            lamps: [...state.lamps, newProduct],
        }));
    },

    updateProduct: async (productData: ILamp) => {
        await fetchUpdateProduct(productData);
        // объединяем старые данные с новыми либо возвращается старая лампа
        set((state) => ({
            lamps: state.lamps.map((lamp) => (
                lamp._id === productData._id ? { ...lamp, ...productData } : lamp),
            ),
        }));
    },

    deleteProduct: async (id: string) => {
        await fetchLampDelete(id);
        // новый массив создаем, в который не входит лампа с удаляемым идентификатором
        set((state) => ({
            lamps: state.lamps.filter((lamp) => lamp._id !== id),
        }));
    },

}));

export default AdminStore;
