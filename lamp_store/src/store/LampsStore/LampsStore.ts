import { create } from 'zustand';

import { fetchLamp, fetchLamps } from '../../services/api/products';
import { ILamp, ILampsStore } from './interface';

const initLamp: ILamp = {
    _id: '',
    amount: 0,
    name: '',
    price: 0,
    productImage: '',
    info: '',
};

const LampsStore = create<ILampsStore>((set) => ({
    lamps: [],
    lamp: initLamp,
    isLoading: false,
    setLamps: (lamps: ILamp[]) => set({ lamps }),

    getAllLamps: async () => {
        set({ isLoading: true });
        const data = await fetchLamps(); // получяем данные о лампах
        set({ lamps: data || [], isLoading: false }); // обновляем состояние lamps
    },

    getOneLamp: async (id: string) => {
        set({ isLoading: true });
        const data = await fetchLamp(id);
        set({ lamp: data || initLamp, isLoading: false });
    },

}));

export default LampsStore;
