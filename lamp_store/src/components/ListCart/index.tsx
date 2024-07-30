import { FC } from 'react';

import { ICart } from '../../store/CartStore/interface';
import CartItem from '../CartItem';

interface IListCart {
    cart: ICart[],
    onRemove: (productId: string, amount: number) => void;
}

const ListCart:FC<IListCart> = ({ cart, onRemove }) => (
    <>
        {cart.map((product) => (
            <CartItem key={product._id} product={product} onRemove={onRemove} />
        ))}
    </>
);

export default ListCart;
