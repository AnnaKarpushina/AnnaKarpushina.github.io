import { ActiveNetwork, INetwork } from "./network.interfaces";

export interface IListNetworkComponent {
    networks: INetwork[];
    isLoading: boolean; 
    activeNetwork: ActiveNetwork;
}