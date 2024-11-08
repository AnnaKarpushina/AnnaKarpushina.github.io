import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { StationsService } from 'src/app/services/stations.service';

import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzFlexModule } from 'ng-zorro-antd/flex';
import { NzGridModule } from 'ng-zorro-antd/grid';

import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { IHeaderComponent } from 'src/app/models/iheader-component';

@Component({
  selector: 'app-header',
  standalone: true,
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  imports: [
    CommonModule, 
    NzIconModule, 
    NzTypographyModule, 
    NzButtonModule, 
    NzFlexModule, 
    NzGridModule,
    NzToolTipModule
  ]
})

export class HeaderComponent implements IHeaderComponent {
  @Input() favoritesCount = 0;
  @Input() stationsCount = 0;
  @Input() activeNetworkName = '';
  @Input() networkSelected = false;
  @Input() isShowFavorites = false;

  constructor( private stationsStore: StationsService ) {}

  toggleFavoritesView() {
    this.stationsStore.toggleFavoritesView();
  }
}