import { IStationsStore } from "./stations.interfaces";

export interface IListStationsComponent {
    stations: IStationsStore;
    isLoading: boolean; 
}