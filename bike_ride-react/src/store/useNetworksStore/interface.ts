import { IStation } from '../useStationsStore/interface';

export interface ActiveNetwork {
    id: string | null;
    name: string | null;
    networkSelected: boolean;
}

export interface INetwork {
    id: string;
    name: string;
    stations: IStation[];
}

export interface INetworksStore {
    networks: INetwork[];
    isLoadingNet: boolean;
    activeNetwork: ActiveNetwork;
    getNetworks: () => void;
    setActiveNetwork: (
        id: string,
        name: string,
        networkSelected: boolean,
    ) => void;
}
