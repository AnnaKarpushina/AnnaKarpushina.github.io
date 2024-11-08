import { create } from "zustand";

import { fetchStation } from "../../services/station";
import { getLocalStorage, setLocalStorage } from "../../utilits";
import { INetwork } from "../useNetworksStore/interface";
import { IStationsStore } from "./interface";

const initialFavorites = getLocalStorage("favoriteStations") || [];

const useStationsStore = create<IStationsStore>((set, get) => ({
  network: {} as INetwork,
  isLoadingSt: false,
  stationsCount: 0,
  favorites: initialFavorites,
  favoritesCount: initialFavorites.length,
  isShowFavorites: false,

  getStations: async (id) => {
    set({ isLoadingSt: true });
    const data = await fetchStation(id);
    set({
      network: data,
      isLoadingSt: false,
      stationsCount: data?.stations.length,
    });
  },

  toggleFavorite: (stationId) => {
    set((state) => {
      const isFavorite = state.favorites.find((i) => i.id === stationId); // Поиск станции в избранном

      const station = (state.network.stations || []).find(
        (i) => i.id === stationId
      ); // Поиск станции в текущей сети

      const updatedFavorites = isFavorite
        ? state.favorites.filter((i) => i.id !== stationId) // Удаление из избранного
        : station // Добавление в избранное, если станция найдена
          ? [...state.favorites, station]
          : state.favorites; // Если станции нет в сети и она не избранная, ничего не меняем

      setLocalStorage("favoriteStations", updatedFavorites);
      
      return {
        favorites: updatedFavorites,
        favoritesCount: updatedFavorites.length,
        isShowFavorites:
          updatedFavorites.length > 0 ? state.isShowFavorites : false,
      };
    });
  },

  toggleFavoritesView: () => {
    set((state) => {
      if (!state.favorites.length) {
        return { isShowFavorites: false };
      }
      const isShowFavorites = !state.isShowFavorites;
      return { isShowFavorites };
    });
  },

  showFavoritesStations: () => {
    const { isShowFavorites, favorites, network } = get();
    return isShowFavorites ? favorites : network.stations;
  },
}));

export default useStationsStore;
