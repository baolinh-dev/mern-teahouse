import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Heading from '~/components/Heading';
import ContainerHeading from '~/components/ContainerHeading';

import classNames from 'classnames/bind';
import styles from './UserProfile.module.scss';
import Header from '~/components/Header';
import Footer from '~/components/Footer';
import Breadcrumb from '~/components/Breadcrumb';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';

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
    const [userData, setUserData] = useState(null);
    const [error, setError] = useState(null);
    const breadcrumbItems = [
        { label: 'Trang chủ', link: '/' },
        { label: 'My Orders', link: '/caphe', active: true },
    ];

    useEffect(() => {
        axios
            .get('/api/v1/orders/me')
            .then((response) => {
                setUserData(response.data.order);
            })
            .catch((error) => {
                setError(error.response.data.message);
                toast.error(error.response.data.message);
            });
    }, []);

    return (
        <>
            <Header />
            <div className={cx('user-profile', 'container')}>
                <Breadcrumb items={breadcrumbItems} />
                <ContainerHeading center>
                    <Heading content={'My Orders'} />
                </ContainerHeading>
                {userData && userData.length > 0 ? (
                    <div>
                        {userData.map((order) => (
                            <div key={order._id}>
                                <p>Order ID: {order._id}</p>
                                <p>Shipping Address: {order.shippingInfo.address}</p>
                                <p>Shipping City: {order.shippingInfo.city}</p>
                                <p>Shipping State: {order.shippingInfo.state}</p>
                                <p>Shipping Country: {order.shippingInfo.country}</p>
                                <p>Shipping Pin Code: {order.shippingInfo.pinCode}</p>
                                <p>Shipping Phone No: {order.shippingInfo.phoneNo}</p>
                                <p>Payment Status: {order.paymentInfo.status}</p>
                                <p>Ordered Date: {order.dateInfor.createAt}</p>
                                <p>Total Price: {order.totalPrice}</p>
                                <p>Order Status: {order.orderStatus}</p>
                                <hr />
                            </div>
                        ))}
                    </div>
                ) : (
                    <p>Hiện tại tài khoản này chưa mua hàng</p>
                )}
                {error && <p>{error}</p>}
            </div>
            <Footer />
        </>
    );
}

export default MyOrders;
