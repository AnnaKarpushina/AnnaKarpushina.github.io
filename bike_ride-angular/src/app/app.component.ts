import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { ListNetworkComponent } from './components/list-network/list-network.component';
import { ListStationsComponent } from './components/list-stations/list-stations.component';
import { NetworkService } from './services/networks.service';
import { StationsService } from './services/stations.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true, 
  imports: [
    CommonModule, 
    HeaderComponent, 
    ListNetworkComponent, 
    ListStationsComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  encapsulation: ViewEncapsulation.None
})

export class AppComponent implements OnInit, OnDestroy {
  subscription: Subscription;

  constructor(
    public networksService: NetworkService,
    public stationsService: StationsService
  ) {}

  ngOnInit() {
    this.subscription = this.networksService.fetchNetworks().subscribe();
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}