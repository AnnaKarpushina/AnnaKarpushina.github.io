import './styles.scss';

import { FC, useEffect } from 'react';
import { Link } from 'react-router-dom';

import CartStore from '../../store/CartStore/CartStore';
import LampsStore from '../../store/LampsStore/LampsStore';
import UserStore from '../../store/UserStore/UserStore';
import Button from '../Button';
import Images from '../Images';
import Loading from '../Loading';

const ListCart: FC = () => {
    const {
        cart, removeFromCart, updateQuantity,
    } = CartStore();

    const { lamps, getAllLamps, isLoading } = LampsStore();

    const { showCartButtons } = UserStore();

    useEffect(() => {
        if (!lamps.length) {
            getAllLamps();
        }
    }, [lamps, getAllLamps]);

    if (isLoading) {
        return (<Loading />);
    }

    return (
        <>
            {cart.map((product) => {
                const lampCart = lamps.find((lamp) => lamp._id === product.productId);

                return (
                    <div className="cart_products" key={`${product._id || product.productId}`}>
                        <Link to={`/cardlamp/${product.productId}`}>
                            <Images
                                className="cart_products_img"
                                src={lampCart?.productImage || product.productImage}
                                alt={lampCart?.name || product.name}
                            />
                        </Link>
                        <div className="cart_products_information">
                            <div className="cart_products_information_block">
                                <div>
                                    <h2>{lampCart?.name || product.name}</h2>
                                    <p>{product.quantity} х {product.price.toLocaleString()} ₽</p>
                                </div>
                                {showCartButtons && (
                                    <div className="cart_products_information_block_button">
                                        <Button
                                            className="cart_products_button"
                                            onClick={() => updateQuantity(product._id, product.quantity - 1)}
                                            disabled={product.quantity <= 1}
                                        >
                                            -
                                        </Button>
                                        <Button
                                            className="cart_products_button"
                                            onClick={() => updateQuantity(product._id, product.quantity + 1)}
                                            disabled={product.quantity >= product.amount || product.quantity >= 3}
                                        >
                                            +
                                        </Button>
                                    </div>
                                )}
                            </div>

                            <span>{lampCart?.info || product.info}</span>
                        </div>
                        <Button
                            className="cart_products_button delete"
                            onClick={() => removeFromCart(product.productId)}
                        >
                            х
                        </Button>
                    </div>
                );
            })}
        </>
    );
};

export default ListCart;
