export interface IProduct {
    _id: string;
    name: string;
    price: number;
    amount: number;
    info: string;
    productImage: string;
}

export interface IAdminContext {
    createProduct: (productData: IProduct) => void;
    updateProduct: (productData: IProduct) => void;
    deleteProduct: (id: string) => void;
}
