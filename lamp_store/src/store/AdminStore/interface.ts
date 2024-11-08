import { ILamp } from '../LampsStore/interface';

export interface IAdminStore {
    lamps: ILamp[];
    modalOpen: boolean;
    currentProduct: ILamp | null;
    search: string;
    getAllLamps: () => void;
    createProduct: (productData: ILamp) => void
    updateProduct: (productData: ILamp) => void;
    deleteProduct: (id: string) => void;
    openModal: () => void;
    closeModal: () => void;
    setCurrentProduct: (lamp: ILamp | null) => void;
    setSearch: (search: string) => void;
    getFilteredLamps: () => ILamp[];
}
