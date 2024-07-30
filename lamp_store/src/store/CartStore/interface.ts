import { ILamp } from '../LampsStore/interface';

export interface ICart {
    _id: string;
    amount?: number | null;
    name: string;
    price: number | null;
    quantity: number; // кол-во которое добавили
    productImage: string;
    info: string;
}

export interface ICartStore {
    cart: ICart[];
    setCart: (cart: ICart[]) => void;
    addToCart: (product: ILamp, newCount: number) => void;
    removeFromCart: (productId: string, amount: number) => void;
    clearCart: () => void;
    userCart: (userId: string) => void;
}

export interface IRemoveCart {
    userId: string;
    productId: string;
    amount: number | null;
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
