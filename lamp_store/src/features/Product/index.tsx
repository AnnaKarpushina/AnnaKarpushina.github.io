import './styles.scss';

import classNames from 'classnames';
import {
    FC, useEffect, useState,
} from 'react';
import { useParams } from 'react-router-dom';

import Button from '../../components/Button';
import Images from '../../components/Images';
import Input from '../../components/Input';
import Loading from '../../components/Loading';
import SvgIcon from '../../components/SvgIcon';
import CartStore from '../../store/CartStore/CartStore';
import LampsStore from '../../store/LampsStore/LampsStore';

const Product: FC = () => {
    const [quantity, setQuantity] = useState(1);

    const { getOneLamp, lamp, isLoading } = LampsStore();
    const { addToCart } = CartStore();

    const { id } = useParams<{ id: string }>();
    const isAvailable = lamp.amount && lamp.amount > 0;

    useEffect(() => {
        if (id) {
            getOneLamp(id);
        }
    }, []);

    const minusQuantity = () => {
        if (isAvailable && quantity > 1) {
            setQuantity((prevQuantity) => prevQuantity - 1);
        }
    };

    const plusQuantity = () => {
        if (isAvailable && quantity < lamp.amount) {
            setQuantity((prevQuantity) => prevQuantity + 1);
        }
    };

    const handleAddToCart = () => {
        addToCart(lamp, quantity);
    };

    if (isLoading) {
        return (<Loading />);
    }

    return (
        <>
            <div className="product">
                <div className="product_block">
                    {lamp?.productImage
                        && (
                            <Images
                                src={lamp?.productImage}
                                alt={lamp?.name}
                                className="product_block-img"
                            />
                        )}
                </div>
                <div>
                    <h1 className="product_title">{lamp?.name}</h1>

                    <div className="product_price">
                        <p>{lamp?.price?.toLocaleString()} ₽</p>
                        <div className={classNames('product_price-stock', { 'stock-out': !isAvailable })}>
                            {isAvailable ? 'in stock' : 'out of stock'}
                        </div>
                    </div>

                    <div className="product_amount">
                        <p>В наличии:</p>
                        <p>{lamp.amount} шт</p>
                    </div>

                    <div className={classNames('product_quantity', { 'product_quantity-disable': !isAvailable })}>
                        <Button
                            className="product_quantity-sign product_quantity-minus"
                            onClick={minusQuantity}
                            disabled={!isAvailable || quantity <= 1}
                        >
                            -
                        </Button>
                        <Input
                            type="text"
                            placeholder="Введите кол-во"
                            value={quantity}
                            readOnly // поле ввода недоступным для редактирования пользователем
                        />
                        <Button
                            className="product_quantity-sign product_quantity-plus"
                            onClick={plusQuantity}
                            disabled={!isAvailable || quantity >= lamp.amount}
                        >
                            +
                        </Button>
                    </div>

                    <Button
                        className={classNames('product_quantity-add', { 'product_quantity-add-disable': !isAvailable })}
                        onClick={handleAddToCart}
                        disabled={!isAvailable}
                    >
                        <SvgIcon className="product_quantity-add-svg" />
                        Add to Cart
                    </Button>

                </div>
            </div>
            <div className="product_about">
                <h3>About this product</h3>
                <p>{lamp?.info}</p>
            </div>
        </>
    );
};

export default Product;
