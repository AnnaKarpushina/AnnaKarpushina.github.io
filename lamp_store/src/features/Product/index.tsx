import './styles.scss';

import classNames from 'classnames';
import { FC, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import Button from '../../components/Button';
import Images from '../../components/Images';
import Input from '../../components/Input';
import Loading from '../../components/Loading';
import Prompt from '../../components/Prompt';
import SvgIcon from '../../components/SvgIcon';
import CartStore from '../../store/CartStore/CartStore';
import LampsStore from '../../store/LampsStore/LampsStore';

const Product: FC = () => {
    const {
        lamp, isLoading, quantity, isAvailable,
        getOneLamp, plusQuantity, minusQuantity,
    } = LampsStore();
    const { addToCart, quantityInCart, remainingQuantity } = CartStore();

    const { id } = useParams<{ id: string }>();

    useEffect(() => {
        if (id) {
            getOneLamp(id);
        }
    }, [id]);

    if (isLoading) {
        return (<Loading />);
    }

    return (
        <>
            <Prompt>Больше 3-х экземпляров одной лампы нельзя добавлять в один заказ</Prompt>
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

                    <div className="product_amount">
                        <p>Добавленно в корзину:</p>
                        <p>{quantityInCart(lamp._id)} шт</p>
                    </div>

                    <div className="product_amount">
                        <p>Можно еще добавить:</p>
                        <p>{remainingQuantity(lamp._id, lamp.amount)} шт</p>
                    </div>

                    <div className={classNames('product_quantity', { 'product_quantity-disable': !isAvailable || !remainingQuantity(lamp._id, lamp.amount) })}>
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
                            disabled={!isAvailable || quantity >= lamp.amount || quantity >= remainingQuantity(lamp._id, lamp.amount)}
                        >
                            +
                        </Button>
                    </div>

                    <Button
                        className="product_quantity-add"
                        onClick={() => { addToCart(lamp, quantity); }}
                        disabled={!isAvailable || !remainingQuantity(lamp._id, lamp.amount)}
                    >
                        <SvgIcon className="product_quantity-add-svg" />Add to Cart
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
