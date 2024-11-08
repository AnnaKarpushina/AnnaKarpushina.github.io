import { INetwork } from '../useNetworksStore/interface';

export interface IStation {
    id: string;
    name: string;
    free_bikes: number;
}

export interface IStationsStore {
    network: INetwork;
    isLoadingSt: boolean;
    stationsCount: number;
    favorites: IStation[];
    favoritesCount: number;
    isShowFavorites: boolean;
    getStations: (id: string) => void;
    toggleFavorite: (id: string) => void;
    toggleFavoritesView: () => void;
    showFavoritesStations: () => IStation[];
}
