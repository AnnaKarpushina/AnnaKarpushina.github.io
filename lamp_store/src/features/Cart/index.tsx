import './styles.scss';

import { useEffect } from 'react';

import Button from '../../components/Button';
import ListCart from '../../components/ListCart';
import Prompt from '../../components/Prompt';
import CartStore from '../../store/CartStore/CartStore';
import UserStore from '../../store/UserStore/UserStore';

const Cart = () => {
    const {
        cart, clearCart, makeOrder, orderSuccess, userCart,
    } = CartStore();

    const { showCartButtons } = UserStore();

    useEffect(() => {
        userCart();
    }, []);

    return (
        <div className="cart">
            {!orderSuccess && (
                <Prompt>{cart.length ? <>Ваши товары</> : <>Корзина пуста</>}</Prompt>
            )}

            {orderSuccess && (
                <Prompt>Заказ успешно оформлен! Спасибо за покупку</Prompt>
            )}

            <ListCart />
            {showCartButtons && cart.length > 0 && (
                <div className="cart_clear">
                    <Button className="cart_total-button" onClick={clearCart}>Очистить всю корзину</Button>
                </div>
            )}
            <div className="cart_total">
                <div className="cart_total-sum">
                    <p>Итого:&nbsp;</p>
                    <span>{cart.reduce((total, product) => total + product.price * product.quantity, 0).toLocaleString()} ₽</span>
                </div>
                {showCartButtons && (
                    <Button className="cart_total-button" onClick={() => { makeOrder(); }}>Сделать заказ</Button>
                )}
            </div>
        </div>
    );
};

export default Cart;
