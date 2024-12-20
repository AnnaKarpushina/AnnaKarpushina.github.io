export interface ILamp {
  _id?: string;
  id?: string;
  amount: number | null;
  name: string;
  price: number | null;
  productImage: string;
  info: string;
}

export interface ILampsStore {
  lamp: ILamp;
  lamps: ILamp[];
  isLoading: boolean;
  quantity: number,
  isAvailable: boolean,
  getAllLamps: () => void;
  getOneLamp: (id: string) => void;
  setLamps: (lamps: ILamp[]) => void;
  plusQuantity: () => void;
  minusQuantity: () => void;
  resetQuantity: () => void;
}
