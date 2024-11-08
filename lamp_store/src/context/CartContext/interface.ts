import { ILamp } from '../../store/LampsStore/interface';

export interface ICart {
    _id: string;
    amount?: number | null;
    name: string;
    price: number | null;
    quantity: number; // кол-во которое добавили
    productImage: string;
    info: string;
}

export interface ICartContext {
    cart: ICart[];
    addToCart: (product: ILamp, newCount: number) => void;
    removeFromCart: (productId: string) => void;
    clearCart: () => void;
    userCart: (userId: string) => void;
}

export interface IRemoveCart {
    userId: string;
    productId: string;
}

export interface IAddCart {
    userId: string;
    productId: string;
    quantity: number;
}

export interface IUpdateCart {
    productId: string;
    quantity: number;
}
