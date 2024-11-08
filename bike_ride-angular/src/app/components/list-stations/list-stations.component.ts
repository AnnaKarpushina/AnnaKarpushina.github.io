import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { IStationsStore } from 'src/app/models/stations.interfaces';
import { StationsService } from 'src/app/services/stations.service';
import { LoadingComponent } from '../loading/loading.component';

import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { IListStationsComponent } from 'src/app/models/ilist-stations-component';

@Component({
  selector: 'app-list-stations',
  standalone: true,
  templateUrl: './list-stations.component.html',
  styleUrl: './list-stations.component.scss',
  imports: [
    CommonModule, 
    LoadingComponent, 
    NzIconModule, 
    NzButtonModule, 
    NzCardModule, 
    NzTypographyModule
  ]
})

export class ListStationsComponent implements IListStationsComponent {
  @Input() stations = {} as IStationsStore;
  @Input() isLoading = false; 
  @Input() isShowFavorites = false;
  @Input() stationsCount = 0;

  constructor(private stationsService: StationsService) {}

  onToggleFavorite(stationId: string) {
    this.stationsService.toggleFavorite(stationId);
  }

  isFavorite(stationId: string): boolean {
    return this.stationsService.favorites.some(f => f.id === stationId);
  }

  showFavoritesStations() {
    return this.stationsService.showFavoritesStations(); 
  }
}