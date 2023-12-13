import React, { useState } from 'react';
import classNames from 'classnames/bind';
import styles from './Cart.module.scss';
import Breadcrumb from '~/components/Breadcrumb';
import ContainerHeading from '~/components/ContainerHeading';
import Heading from '~/components/Heading';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faShare, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import MainLayout from '~/layouts/MainLayout';
import { useDispatch, useSelector } from 'react-redux';
import { updateCart } from '~/redux/actions/cartActions';

const cx = classNames.bind({ ...styles, container: 'container' });

function Cart() {
    const carts = useSelector((state) => state.carts);
    const dispatch = useDispatch();

    // Lấy danh sách sản phẩm từ localStorage

    // Tính tổng giá trị của các sản phẩm trong giỏ hàng
    const total = carts.reduce((sum, item) => sum + item.price * item.quantity, 0);

    // Tính tổng số lượng sản phẩm trong giỏ hàng
    const totalQuantity = carts.reduce((total, item) => total + item.quantity, 0);

    // Hàm để cập nhật số lượng sản phẩm
    const updateQuantity = (index, newQuantity) => {
        const newCartItems = [...carts];
        const parsedQuantity = parseInt(newQuantity);
        if (!isNaN(parsedQuantity)) {
            newCartItems[index].quantity = parsedQuantity;
            console.log('newCartItems', newCartItems);

            dispatch(updateCart(newCartItems));
        }
    };

    // Hàm để xóa sản phẩm khỏi danh sách
    const removeItem = (index) => {
        const newCartItems = [...carts];
        newCartItems.splice(index, 1);
        dispatch(updateCart(newCartItems));
    };

    return (
        <>
            <MainLayout>
                <div className={cx('cart', 'container')}>
                    <Breadcrumb
                        items={[
                            { label: 'Trang chủ', link: '/' },
                            { label: 'Giỏ hàng của bạn', active: true },
                        ]}
                    />
                    <div className={cx('cart-content')}>
                        <ContainerHeading center>
                            <Heading content={'Giỏ hàng của bạn'} />
                        </ContainerHeading>
                        <div className={cx('cart-list')}>
                            {carts.map((item, index) => (
                                <div key={item.id} className={cx('cart-content-item')}>
                                    <div className={cx('cart-content-item-infor-wrapper')}>
                                        <img src={item.image} alt={item.name} />
                                        <div className={cx('cart-content-item-infor')}>
                                            <h3>{item.name}</h3>
                                            <p>
                                                {item.price.toLocaleString('vi-VN', {
                                                    style: 'currency',
                                                    currency: 'VND',
                                                })}
                                            </p>
                                        </div>
                                    </div>
                                    <div className={cx('cart-content-item-calcu')}>
                                        <div className={cx('cart-content-item-quantity')}>
                                            <button
                                                onClick={() => updateQuantity(index, item.quantity - 1)}
                                                disabled={item.quantity === 1}
                                            >
                                                -
                                            </button>
                                            <input
                                                type="text"
                                                id={`quantity-${index}`}
                                                value={item.quantity}
                                                onChange={(e) => updateQuantity(index, e.target.value)}
                                            />
                                            <button onClick={() => updateQuantity(index, item.quantity + 1)}>+</button>
                                        </div>
                                        <p className={cx('cart-item-total')}>
                                            {`${(item.price * item.quantity).toLocaleString('vi-VN', {
                                                style: 'currency',
                                                currency: 'VND',
                                            })}`}
                                        </p>
                                        <button className={cx('remove-btn')} onClick={() => removeItem(index)}>
                                            <FontAwesomeIcon icon={faTrash} />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className={cx('cart-footer')}>
                            <div className={cx('cart-total')}>
                                <div className={cx('cart-total-item')}>
                                    <label>Số lượng sản phẩm: </label>
                                    <p> {` ${totalQuantity}`} </p>
                                </div>
                                <div className={cx('cart-total-item')}>
                                    <label>Tổng giá trị của giỏ hàng: </label>
                                    <p>
                                        {total.toLocaleString('vi-VN', {
                                            style: 'currency',
                                            currency: 'VND',
                                        })}
                                    </p>
                                </div>
                            </div>
                            <div className={cx('links')}>
                                <Link to="/products">
                                    <FontAwesomeIcon icon={faShare} /> Tiếp tục mua hàng
                                </Link>
                                <Link to="/paymentform">
                                    <FontAwesomeIcon icon={faCheck} />
                                    Tiến hành thanh toán
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </MainLayout>
        </>
    );
}

export default Cart;
