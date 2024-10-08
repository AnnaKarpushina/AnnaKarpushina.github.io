import './styles.scss';

import Button from '../../components/Button';
import ListCart from '../../components/ListCart';
import CartStore from '../../store/CartStore/CartStore';

const Cart = () => {
    const { cart, removeFromCart } = CartStore();

    const onRemove = (productId: string, amount: number) => {
        removeFromCart(productId, amount);
    };

    return (
        <div className="cart">
            <div className="cart_bun">
                Once a week there is a reset of not purchased products
            </div>
            <ListCart cart={cart} onRemove={onRemove} />
            <div className="cart_total">
                <div className="cart_total-sum">
                    <p>Sub total:&nbsp;</p>
                    <span>{cart.reduce((total, product) => total + product.price * product.quantity, 0).toLocaleString()} ₽</span>
                </div>
                <Button className="cart_total-button">Check out</Button>
            </div>
        </div>
    );
};

export default Cart;
