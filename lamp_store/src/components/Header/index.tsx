import './styles.scss';

import classNames from 'classnames';
import { useContext } from 'react';
import { NavLink } from 'react-router-dom';

import { CartContext } from '../../context/CartContext/CartContext';
import { ICart } from '../../context/CartContext/interface';
import { UserContext } from '../../context/UserContext/UserContext';
import SvgIcon from '../SvgIcon';

const Header = () => {
    const { cart, clearCart } = useContext(CartContext);
    const { user, logout } = useContext(UserContext);

    const cartCount = cart.reduce((total, product: ICart) => total + product.quantity, 0);

    // метод reduce принимает два аргумента: функцию обратного вызова и начальное значение аккумулятора
    // total - аккумулятор, который хранит текущее общее количество
    // product - текущий элемент массива (товар из корзины)
    // total + product.quantity — на каждом шаге мы добавляем количество текущего товара к аккумулятору.

    const handleLogout = () => {
        clearCart();
        logout();
    };

    return (
        <header>
            <div className="menu">

                <NavLink to="/" className={({ isActive }) => classNames('menu_store', { 'menu-active': isActive })}>
                    <p>Starter Store</p>
                </NavLink>

                <div className="menu_options">
                    {user._id.length ? (
                        <>
                            {user.isAdmin && (
                                <NavLink to="/admin" className={({ isActive }) => classNames('menu_options-singUp', { 'menu-active': isActive })}>
                                    <p>Admin</p>
                                </NavLink>
                            )}
                            <NavLink to="/" onClick={handleLogout} className="menu_options-signIn">
                                <p>Log Out</p>
                            </NavLink>
                        </>
                    ) : (
                        <>
                            <NavLink to="/singup" className={({ isActive }) => classNames('menu_options-singUp', { 'menu-active': isActive })}>
                                <p>Sing up</p>
                            </NavLink>
                            <NavLink to="/signin" className={({ isActive }) => classNames('menu_options-signIn', { 'menu-active': isActive })}>
                                <p>Sign in</p>
                            </NavLink>
                        </>
                    )}

                    <NavLink to="/cart" className={({ isActive }) => classNames('menu_options-cart', { 'menu-active': isActive })}>
                        <SvgIcon />
                        <p>Cart {cartCount > 0 && `(${cartCount})`}</p>
                    </NavLink>

                </div>
            </div>
        </header>
    );
};

export default Header;
