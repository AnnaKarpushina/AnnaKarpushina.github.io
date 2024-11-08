import { create } from 'zustand';

import { fetchLampDelete, fetchLamps } from '../../services/api/products';
import {
    fetchCreateProduct,
    fetchUpdateProduct,
} from '../../services/api/upload';
import { IAdminStore } from './interface';

const AdminStore = create<IAdminStore>((set, get) => ({
    lamps: [],
    modalOpen: false,
    currentProduct: null, // текущий продукт, который редактируется
    search: '',

    getAllLamps: async () => {
        const data = await fetchLamps(); // получяем данные о лампах
        set({ lamps: data || [] }); // обновляем состояние lamps
    },

    createProduct: async (productData) => {
        await fetchCreateProduct(productData);
        set((state) => ({
            // создаем новый массив, добавляя в него все существующие лампы и новый продукт
            lamps: [...state.lamps, productData],
        }));
    },

    updateProduct: async (productData) => {
        await fetchUpdateProduct(productData);
        // объединяем старые данные с новыми либо возвращается старая лампа
        set((state) => ({
            lamps: state.lamps.map((lamp) => (
                lamp._id === productData._id ? { ...lamp, ...productData } : lamp),
            ),
        }));
    },

    deleteProduct: async (id) => {
        await fetchLampDelete(id);
        // новый массив создаем, в который не входит лампа с удаляемым идентификатором
        set((state) => ({
            lamps: state.lamps.filter((lamp) => lamp._id !== id),
        }));
    },

    openModal: () => set({ modalOpen: true }),

    closeModal: () => set({ modalOpen: false, currentProduct: null }),

    setCurrentProduct: (lamp) => set({ currentProduct: lamp, modalOpen: true }),

    setSearch: (search) => set({ search }),

    getFilteredLamps: () => {
        const { lamps, search } = get();
        return lamps.filter((lamp) => lamp.name.toLowerCase().includes(search.toLowerCase()));
    },

}));

export default AdminStore;
