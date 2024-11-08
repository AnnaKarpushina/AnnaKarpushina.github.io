import { INetwork } from "./network.interfaces";

export interface IStation {
  id: string;
  name: string;
  free_bikes: number;
}

export interface IStationsStore {
  network: INetwork;
  stationsCount: number;
  favorites: IStation[];
  favoritesCount: number;
  isShowFavorites: boolean;
  isLoadingStations: boolean;
  fetchStation: (id: string) => void;
  toggleFavorite: (id: string) => void;
  toggleFavoritesView: () => void;
  showFavoritesStations: () => IStation[];
}