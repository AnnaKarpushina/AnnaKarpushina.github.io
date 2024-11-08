import { IStation } from "./stations.interfaces";

export interface ActiveNetwork {
  id: string;
  name: string;
  networkSelected: boolean;
}

export interface INetwork {
  id: string;
  name: string;
  stations: IStation[];
}

export interface INetworksStore {
  networks: INetwork[];
  activeNetwork: ActiveNetwork;
  isLoadingNetworks: boolean;
  fetchNetworks: () => void;
  setActiveNetwork: (id: string, name: string, networkSelected: boolean) => void;
}