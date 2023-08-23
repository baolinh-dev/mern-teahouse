import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import classNames from 'classnames/bind';
import styles from './PaymentForm.module.scss';
import Cart from './CartPayment';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faCartShopping, faClipboardList } from '@fortawesome/free-solid-svg-icons';
import Footer from '~/components/Footer';
const cx = classNames.bind(styles);

const PaymentForm = () => {
    // State để lưu trữ thông tin giỏ hàng từ localStorage
    const [cart, setCart] = useState([]);
    const [userData, setUserData] = useState(null);
    const [userDataLoaded, setUserDataLoaded] = useState(false);
    const [error, setError] = useState(null);

    // State để lưu trữ thông tin người dùng nhập vào từ các input
    const [customerInfo, setCustomerInfo] = useState({
        email: '',
        name: '',
        phoneNumber: '',
        address: '',
    });

    // State để lưu trữ thông tin đơn hàng mặc định
    const [orderInfo, setOrderInfo] = useState({
        transport: 'Delivery',
        payment: 'COD',
        status: 'Processing',
    });

    useEffect(() => {
        if (!userDataLoaded) {
            axios
                .get('/api/v1/me')
                .then((response) => {
                    setUserData(response.data.user);
                    setUserDataLoaded(true);

                    // Cập nhật giá trị mặc định cho customerInfo
                    setCustomerInfo({
                        email: response.data.user.email,
                        name: response.data.user.name,
                        phoneNumber: '',
                        address: '',
                    });
                })
                .catch((error) => {
                    const errorMessage = error.response.data.message;
                    setError(errorMessage);
                });
        }
    }, [userDataLoaded]);

    // Lấy thông tin giỏ hàng từ localStorage khi component được render
    useEffect(() => {
        const cartData = localStorage.getItem('cart');
        if (cartData) {
            setCart(JSON.parse(cartData));
        }
    }, []);

    // Hàm xử lý khi người dùng submit form
    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = {
            cart,
            customerInfo,
            orderInfo,
        };

        axios
            .post('/api/v1/order/new', formData)
            .then((response) => {
                localStorage.removeItem('cart');
                window.location.reload();
                toast.success('Đặt hàng thành công');
            })
            .catch((error) => {
                toast.error('Đặt hàng thất bại');
                console.log(error);
            });
    };

    // Render form thanh toán
    return (
        <>
            <form onSubmit={handleSubmit}>
                <div className={cx('payment')}>
                    <div className={cx('info')}>
                        <div className={cx('customer-info')}>
                            <h2>Customer Information</h2>
                            <input
                                type="text"
                                value={customerInfo.email}
                                onChange={(e) => setCustomerInfo({ ...customerInfo, email: e.target.value })}
                                placeholder="Email"
                            />
                            <input
                                type="text"
                                value={customerInfo.name}
                                onChange={(e) => setCustomerInfo({ ...customerInfo, name: e.target.value })}
                                placeholder="Name"
                            />
                            <input
                                type="text"
                                value={customerInfo.phoneNumber}
                                onChange={(e) => setCustomerInfo({ ...customerInfo, phoneNumber: e.target.value })}
                                placeholder="Phone Number"
                            />
                            <input
                                type="text"
                                value={customerInfo.address}
                                onChange={(e) => setCustomerInfo({ ...customerInfo, address: e.target.value })}
                                placeholder="Address"
                            />
                        </div>
                        <div className={cx('order-info')}>
                            <h2>Shipping</h2>
                            <div className={cx('order-info-wrapper')}>
                                <div className={cx('order-info-item')}>
                                    <label>Delivery</label>
                                    <input
                                        type="radio"
                                        name="transport"
                                        value="Delivery"
                                        checked={orderInfo.transport === 'Delivery'}
                                    />
                                </div>

                                <div className={cx('order-info-item')}>
                                    <label>Pickup</label>
                                    <input
                                        type="radio"
                                        name="transport"
                                        value="Pickup"
                                        checked={orderInfo.transport === 'Pickup'}
                                    />
                                </div>
                            </div>
                            <h2>Payment</h2>
                            <div className={cx('order-info-wrapper')}>
                                <div className={cx('order-info-item')}>
                                    <label>COD</label>
                                    <input
                                        type="radio"
                                        name="payment"
                                        value="COD"
                                        checked={orderInfo.payment === 'COD'}
                                    />
                                </div>

                                <div className={cx('order-info-item')}>
                                    <label>Bank Transfer</label>
                                    <input
                                        type="radio"
                                        name="payment"
                                        value="Bank Transfer"
                                        checked={orderInfo.payment === 'Bank Transfer'}
                                    />
                                </div>
                            </div>

                            {/* Nút submit form */}
                        </div>
                    </div>
                    <div className={cx('cart')}>
                        {cart.length > 0 ? (
                            <Cart cartItems={cart} />
                        ) : (
                            <div className={cx('empty-cart')}> 
                                <FontAwesomeIcon icon={faCartShopping}/> 
                                <p>Chưa có sản phẩm nào trong giỏ hàng</p>
                            </div>
                        )}

                        <div className={cx('cart-buttons')}>
                            <Link to="/products">
                                {' '}
                                <FontAwesomeIcon icon={faCartShopping} /> Tiếp tục mua hàng
                            </Link>
                            <button type="submit">
                                <FontAwesomeIcon icon={faClipboardList} /> Đặt hàng
                            </button>
                        </div>
                    </div>
                </div>
            </form>
            <Footer />
        </>
    );
};

export default PaymentForm;
