import axios from 'axios';

import { INetworksStore } from '../store/useNetworksStore/interface';
import { BASE_URL } from '../utilits';

axios.defaults.baseURL = BASE_URL;

// получение всех сетей
export const fetchNetworks = async () => {
    try {
        const { data } = await axios.get<INetworksStore>('networks');
        const { networks } = data;
        return networks.slice(0, 30);
    } catch (error) {
        console.error('Error fetching networks', error);
    }
};
