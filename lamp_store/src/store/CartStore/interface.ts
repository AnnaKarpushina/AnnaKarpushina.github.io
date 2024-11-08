import { ILamp } from '../LampsStore/interface';

export interface ICart {
    productId?: string;
    _id?: string;
    amount?: number | null;
    name: string;
    price: number | null;
    quantity: number; // кол-во которое добавили
    productImage: string;
    info: string;
}

export interface ICartStore {
    cart: ICart[];
    orderSuccess: boolean;
    setCart: (cart: ICart[]) => void;
    setOrderSuccess: (success: boolean) => void;
    userCart: () => void;
    addToCart: (product: ILamp, newCount: number) => void;
    removeFromCart: (productId: string) => void;
    updateQuantity: (productId: string, newQuantity: number) => void;
    quantityInCart: (productId: string) => number;
    remainingQuantity: (productId: string, maxAmount: number) => number;
    clearCart: () => void;
    cartCount: () => number;
    makeOrder: () => void;
}

export interface IRemoveCart {
    userId: string;
    productId: string;
}

export interface IAddCart {
    userId: string;
    productId: string;
    quantity: number;
    price: number;
}

export interface IAddCartLocal {
    userId: string;
    localCart: {
        productId: string;
        price: number;
        quantity: number;
    };
}
