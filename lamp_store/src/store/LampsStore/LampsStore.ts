import { create } from 'zustand';

import { fetchLamp, fetchLamps } from '../../services/api/products';
import { ILamp, ILampsStore } from './interface';

const LampsStore = create<ILampsStore>((set) => ({
    lamps: [],
    lamp: {} as ILamp,
    isLoading: false,
    quantity: 1,
    isAvailable: false,

    getAllLamps: async () => {
        set({ isLoading: true });
        const data = await fetchLamps(); // получяем данные о лампах
        set({ lamps: data || [], isLoading: false }); // обновляем состояние lamps
    },

    getOneLamp: async (id) => {
        set({ isLoading: true, quantity: 1 });
        const data = await fetchLamp(id);
        const isAvailable = data.amount && data.amount > 0;
        set({ lamp: data || {} as ILamp, isLoading: false, isAvailable });
    },

    setLamps: (lamps) => set({ lamps }),

    plusQuantity: () => set((state) => ({
        quantity: Math.min(state.quantity + 1, state.lamp.amount),
    })),

    minusQuantity: () => set((state) => ({
        quantity: Math.max(state.quantity - 1, 1),
    })),

    resetQuantity: () => set({ quantity: 1 }),

}));

export default LampsStore;
