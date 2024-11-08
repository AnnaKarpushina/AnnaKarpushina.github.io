import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { finalize, Observable, tap } from 'rxjs';
import { ActiveNetwork, INetwork, INetworksStore } from '../models/network.interfaces';
import { StationsService } from './stations.service';

@Injectable({
  providedIn: 'root',
})

export class NetworkService implements INetworksStore {
  baseUrl = 'https://api.citybik.es/v2/';
  
  networks = [] as INetwork[];
  activeNetwork = {} as ActiveNetwork;
  isLoadingNetworks = false;

  constructor(private http: HttpClient, private stationsService: StationsService) {}

  fetchNetworks(): Observable<{ networks: INetwork[] }> {
    this.isLoadingNetworks = true;
    return this.http.get<{ networks: INetwork[] }>(`${this.baseUrl}/networks`, {
      params: new  HttpParams({
        fromObject: { fields: 'id, name, href' }
      })
    }).pipe(
      tap(({ networks }) => {
        this.networks = networks.slice(0, 30);
      }),
      finalize(() => this.isLoadingNetworks = false)
    );
  }

  setActiveNetwork(networkId: string, networkName: string, networkSelected: boolean): void {
    if (this.activeNetwork.id !== networkId) {
      this.stationsService.fetchStation(networkId).subscribe();
      this.stationsService.isShowFavorites = false;
      this.activeNetwork = { id: networkId, name: networkName, networkSelected: networkSelected };
    }
  }
}