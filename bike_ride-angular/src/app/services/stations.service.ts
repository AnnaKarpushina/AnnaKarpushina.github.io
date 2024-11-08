import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { INetwork } from '../models/network.interfaces';
import { HttpClient } from '@angular/common/http';
import { map, tap, finalize } from 'rxjs/operators';
import { IStation, IStationsStore } from '../models/stations.interfaces';
import { StorageService } from '../utilits/utilits';

@Injectable({
  providedIn: 'root',
})

export class StationsService implements IStationsStore {
  baseUrl = 'https://api.citybik.es/v2/';

  network = {} as INetwork;
  stationsCount = 0;
  favorites = [] as IStation[]; 
  favoritesCount = 0;
  isShowFavorites = false;
  stations = {} as IStationsStore;
  isLoadingStations = false;

  constructor(private http: HttpClient, private storageService: StorageService) {
    if (typeof window !== 'undefined') { 
      this.favorites = this.storageService.getLocalStorage('favoriteStations');
      this.favoritesCount = this.favorites.length;
    } 
  }

  fetchStation(id: string): Observable<INetwork> {
    this.isLoadingStations = true;
    return this.http.get<{ network: INetwork }>(`${this.baseUrl}networks/${id}`).pipe(
      map(response => response.network),
      tap(network => {
        if (network && Array.isArray(network.stations)) {
          this.network = network; // Сохраняем данные
          this.stationsCount = network.stations.length; // Обновляем количество станций
        }
      }),
      finalize(() => this.isLoadingStations = false)
    );
  }
  
  toggleFavorite(stationId: string): void {
    const isFavorite = this.favorites.some(f => f.id === stationId);

    if (isFavorite) { //Удаление станции из избранного
      this.favorites = this.favorites.filter(f => f.id !== stationId);
      if (this.favorites.length === 0) {
        this.isShowFavorites = false;
      }
    } else {
      const station = this.network.stations.find(s => s.id === stationId);
      if (station) {
        this.favorites = [...this.favorites, station]; //добавляем в конец списка
      }
    }

    this.favoritesCount = this.favorites.length;
    this.storageService.setLocalStorage('favoriteStations', this.favorites);
  }

  toggleFavoritesView(): void {
    if (this.favorites.length > 0) {
      this.isShowFavorites = !this.isShowFavorites;
    }
  }

  showFavoritesStations(): IStation[] {
    return this.isShowFavorites ? this.favorites : this.network.stations;
  }
}