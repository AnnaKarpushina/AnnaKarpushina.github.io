import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ActiveNetwork, INetwork } from 'src/app/models/network.interfaces';
import { NetworkService } from 'src/app/services/networks.service';
import { LoadingComponent } from '../loading/loading.component';

import { NzButtonModule } from 'ng-zorro-antd/button';
import { IListNetworkComponent } from 'src/app/models/ilist-network-component';

@Component({
  selector: 'app-list-network',
  standalone: true,
  templateUrl: './list-network.component.html',
  styleUrls: ['./list-network.component.scss'],
  imports: [
    CommonModule, 
    LoadingComponent, 
    NzButtonModule
  ],
})

export class ListNetworkComponent implements IListNetworkComponent {
  @Input() networks = [] as INetwork[];
  @Input() isLoading = false; 
  @Input() activeNetwork = {} as ActiveNetwork;

  constructor(private networksService: NetworkService) {}

  onNetworkClick(network: INetwork) {
    this.networksService.setActiveNetwork(network.id, network.name, true);
  }
}