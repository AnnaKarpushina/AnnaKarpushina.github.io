import { create } from 'zustand';

import { fetchNetworks } from '../../services/networks';
import useStationsStore from '../useStationsStore/useStationsStore';
import { INetworksStore } from './interface';

const useNetworksStore = create<INetworksStore>((set, get) => ({
    networks: [],
    isLoadingNet: false,
    activeNetwork: { id: null, name: null, networkSelected: false },

    getNetworks: async () => {
        set({ isLoadingNet: true });
        const data = await fetchNetworks();
        set({ networks: data || [], isLoadingNet: false });
    },

    setActiveNetwork: (networkId, networkName, networkSelected) => {
        const { getStations } = useStationsStore.getState();
        const { activeNetwork } = get();
        if (activeNetwork.id !== networkId) {
            getStations(networkId);
            useStationsStore.setState({ isShowFavorites: false });
            set({
                activeNetwork: {
                    id: networkId,
                    name: networkName,
                    networkSelected,
                },
            });
        }
    },
}));

export default useNetworksStore;
