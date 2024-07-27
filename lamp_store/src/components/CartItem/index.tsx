import './styles.scss';

import { FC } from 'react';
import { Link } from 'react-router-dom';

import { ICart } from '../../context/CartContext/interface';
import Button from '../Button';
import Images from '../Images';

interface ICartItem {
    product: ICart;
    onRemove: (productId: string, amount: number) => void;
}

const CartItem:FC<ICartItem> = ({ product, onRemove }) => (
    <div className="cart_products" key={product._id}>
        <Link to={`/cardlamp/${product._id}`}>
            <Images className="cart_products_img" src={product.productImage} alt={product.name} />
        </Link>
        <div className="cart_products_information">
            <h2>{product.name}</h2>
            <p>{product.quantity} х {product.price.toLocaleString()} ₽</p>
            <span>{product.info}</span>
        </div>
        <Button
            className="cart_products_button"
            onClick={() => onRemove(product._id, product.quantity)}
        >х
        </Button>
    </div>
);

export default CartItem;
