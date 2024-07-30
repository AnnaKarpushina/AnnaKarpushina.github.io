import { ILamp } from '../LampsStore/interface';

export interface IAdminStore {
    lamps: ILamp[];
    getAllLamps: () => void;
    createProduct: (productData: ILamp) => void;
    updateProduct: (productData: ILamp) => void;
    deleteProduct: (id: string) => void;
}
