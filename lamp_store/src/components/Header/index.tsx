import './styles.scss';

import classNames from 'classnames';
import { NavLink } from 'react-router-dom';

import CartStore from '../../store/CartStore/CartStore';
import UserStore from '../../store/UserStore/UserStore';
import SvgIcon from '../SvgIcon';

const Header = () => {
    const { cartCount } = CartStore();
    const { user, handleLogout } = UserStore();

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
                        <p>Cart {cartCount() > 0 && `(${cartCount()})`}</p>
                    </NavLink>

                </div>
            </div>
        </header>
    );
};

export default Header;
