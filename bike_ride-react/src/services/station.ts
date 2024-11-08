import axios from 'axios';

import { IStationsStore } from '../store/useStationsStore/interface';
import { BASE_URL } from '../utilits';

axios.defaults.baseURL = BASE_URL;

// получение станции
export const fetchStation = async (id: string) => {
    try {
        const { data } = await axios.get<IStationsStore>(`networks/${id}`);
        const { network } = data;
        return network;
    } catch (error) {
        console.error('Error fetching station', error);
    }
};
