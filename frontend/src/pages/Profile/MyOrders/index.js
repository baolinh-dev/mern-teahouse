import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Heading from '~/components/Heading';
import ContainerHeading from '~/components/ContainerHeading';

import classNames from 'classnames/bind';
import styles from './MyOrders.module.scss';
import Header from '~/components/Header';
import Footer from '~/components/Footer';
import Breadcrumb from '~/components/Breadcrumb';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown, faCaretUp } from '@fortawesome/free-solid-svg-icons';
import MainLayout from '~/layouts/MainLayout';

const cx = classNames.bind({
    ...styles,
    container: 'container',
    'col-xl-6': 'col-xl-6',
    'col-lg-6': 'col-lg-6',
    'col-sm-12': 'col-sm-12',
    'col-xs-12': 'col-xs-12',
    row: 'row',
});

function MyOrders() {
    const [cart, setCart] = useState(null);
    const [error, setError] = useState(null);
    const [expandedOrders, setExpandedOrders] = useState({}); // State to keep track of expanded orders
    const breadcrumbItems = [
        { label: 'Trang chủ', link: '/' },
        { label: 'My Orders', link: '/caphe', active: true },
    ];

    useEffect(() => {
        axios
            .get('/api/v1/orders/me')
            .then((response) => {
                setCart(response.data.order);
            })
            .catch((error) => {
                setError(error.response.data.message);
                toast.error(error.response.data.message);
            });
    }, []);

    return (
        <>
            <MainLayout>
                <div className={cx('myorders', 'container')}>
                    <Breadcrumb items={breadcrumbItems} />
                    <ContainerHeading center>
                        <Heading content={'My Orders'} />
                    </ContainerHeading>

                    {cart && cart.length > 0 ? (
                        <div className={cx('myorder-content')}>
                            {cart.map((order) => (
                                <div key={order._id} className={cx('myorder-wrapper')}>
                                    <div className={cx('myorder-item')}>
                                        <h2>Customer Info</h2>
                                        <p>Email: {order.customerInfo.email}</p>
                                        <p>Name: {order.customerInfo.name}</p>
                                        <p>PhoneNumber: {order.customerInfo.phoneNumber}</p>
                                        <p>Address: {order.customerInfo.address}</p>
                                    </div>

                                    <div className={cx('myorder-item')}>
                                        <h2>Order Info</h2>
                                        <p>Transport: {order.orderInfo.transport}</p>
                                        <p>Status: {order.orderInfo.status}</p>
                                    </div>

                                    <div className={cx('myorder-item')}>
                                        <h2>Cart</h2>

                                        {order.cart.map((item, index) =>
                                            expandedOrders[order._id] || index === 0 ? (
                                                <div key={index} className={cx('myorder-cart')}>
                                                    <div className={cx('myorder-cart-img')}>
                                                        <img src={item.image} alt={item.name} />
                                                    </div>
                                                    <div className={cx('myorder-cart-info')}>
                                                        <p>{item.name}</p>
                                                        <p>{item.quantity}</p>
                                                        <p>{item.price}</p>
                                                    </div>
                                                </div>
                                            ) : null,
                                        )}

                                        <button
                                            className={cx('button-detail')}
                                            onClick={() =>
                                                setExpandedOrders({
                                                    ...expandedOrders,
                                                    [order._id]: !expandedOrders[order._id], // Toggle the expanded state for the clicked order
                                                })
                                            }
                                        >
                                            {expandedOrders[order._id] ? (
                                                <>
                                                    <FontAwesomeIcon icon={faCaretUp} />
                                                    <p>Show less</p>
                                                </>
                                            ) : (
                                                <>
                                                    <FontAwesomeIcon icon={faCaretDown} />
                                                    <p>Show more</p>
                                                </>
                                            )}
                                        </button>
                                    </div>

                                    <div className={cx('myorder-item')}>
                                        <h2>TotalProductPrice</h2>
                                        <p>{order.totalProductPrice}</p>
                                    </div>

                                    <hr />
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p>Hiện tại tài khoản này chưa mua hàng</p>
                    )}
                    {error && <p>{error}</p>}
                </div>
            </MainLayout>
        </>
    );
}

export default MyOrders;
