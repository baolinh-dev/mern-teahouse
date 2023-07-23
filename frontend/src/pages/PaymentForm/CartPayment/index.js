import React from 'react';
import classNames from 'classnames/bind';
import styles from './CartPayment.module.scss';
import Header from '~/components/Header';
import Footer from '~/components/Footer';


const cx = classNames.bind({ ...styles, container: 'container' });

function CartPayment({ cartItems }) {
    const total = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

    return (
        <div>
            <h2>Đơn hàng ({cartItems.length})</h2>
            <div className={cx('cart-items')}>
                {cartItems.map((item) => (
                    <div className={cx('cart-item')} key={item.id}>
                        <div className={cx('cart-item-img')}>
                            <img src={item.image} alt={item.name} />
                            <span>{item.quantity}</span>
                        </div>
                        <div className={cx('cart-item-infor')}>
                            <p>{item.name}</p>
                            <p>{(item.price * item.quantity).toLocaleString()}đ</p>
                        </div>
                    </div>
                ))}
            </div>

            <div className={cx('cart-total')}>
                <h3>Tổng cộng:</h3>
                <p>{total.toLocaleString()}đ</p>
            </div>
        </div>
    );
}

export default CartPayment;
