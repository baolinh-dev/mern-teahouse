import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import classNames from 'classnames/bind';
import styles from './PaymentForm.module.scss';
import Cart from './CartPayment';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping, faClipboardList } from '@fortawesome/free-solid-svg-icons';
import Footer from '~/components/Footer';
import casual from 'casual-browserify';
import { useDispatch, useSelector } from 'react-redux';
import { addNotification, clearNotification } from '~/redux/actions/notificationActions';
import socket from '~/socket';
import { clearCart } from '~/redux/actions/cartActions';

const cx = classNames.bind(styles);

const PaymentForm = () => {
    // address
    const host = 'https://provinces.open-api.vn/api/';
    const [provinces, setProvinces] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [wards, setWards] = useState([]);
    const [selectedProvince, setSelectedProvince] = useState('');
    const [selectedDistrict, setSelectedDistrict] = useState('');
    const [selectedWard, setSelectedWard] = useState('');
    const [houseNumber, setHouseNumber] = useState('');
    // State để lưu trữ thông tin giỏ hàng từ localStorage

    const [userDataLoaded, setUserDataLoaded] = useState(false);
    const [error, setError] = useState(null);
    // State để lưu trữ thông tin người dùng nhập vào từ các input
    const [customerInfo, setCustomerInfo] = useState({
        email: '',
        name: '',
        avatar: '',
        phoneNumber: '',
        address: '',
    });

    const [orderInfo, setOrderInfo] = useState({
        transport: 'Delivery',
        payment: 'COD',
        status: 'Processing',
    });
    // Hàm để gọi API và render dữ liệu
    const cart = useSelector((state) => state.carts);
    const notifications = useSelector((state) => state.notifications);
    const dispatch = useDispatch();

    useEffect(() => {
        socket.emit('sendNotifications', notifications);
    }, [notifications]);

    const callAPI = async (api, renderCallback) => {
        try {
            const response = await axios.get(api);
            renderCallback(response.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const renderData = (array, select) => {
        const row = array.map((element) => (
            <option key={element.code} value={element.code}>
                {element.name}
            </option>
        ));
        select === 'province' ? setProvinces(row) : select === 'district' ? setDistricts(row) : setWards(row);
    };

    // Hàm để tạo chuỗi kết quả đầy đủ của địa chỉ
    const createFullAddress = useCallback(() => {
        let address = '';

        if (houseNumber !== '') {
            address += `${houseNumber} | `;
        }

        if (selectedProvince !== '') {
            const provinceOption = document.querySelector(`#province option[value="${selectedProvince}"]`);
            address += provinceOption.textContent;
        }

        if (selectedDistrict !== '') {
            const districtOption = document.querySelector(`#district option[value="${selectedDistrict}"]`);
            address += ` | ${districtOption.textContent}`;
        }

        if (selectedWard !== '') {
            const wardOption = document.querySelector(`#ward option[value="${selectedWard}"]`);
            address += ` | ${wardOption.textContent}`;
        }

        return address;
    }, [houseNumber, selectedProvince, selectedDistrict, selectedWard]);

    useEffect(() => {
        const updatedAddress = createFullAddress();
        setCustomerInfo((prevCustomerInfo) => ({
            ...prevCustomerInfo,
            address: updatedAddress,
        }));
    }, [houseNumber, selectedProvince, selectedDistrict, selectedWard, createFullAddress]);

    useEffect(() => {
        // Lấy danh sách tỉnh/thành phố và render vào select box
        callAPI(host + '?depth=1', (data) => renderData(data, 'province'));
    }, []);

    // Xử lý sự kiện thay đổi select box tỉnh/thành phố
    const handleProvinceChange = (e) => {
        setSelectedProvince(e.target.value);
        setSelectedDistrict('');
        setSelectedWard('');
        callAPI(host + 'p/' + e.target.value + '?depth=2', (data) => renderData(data.districts, 'district'));
    };

    // Xử lý sự kiện thay đổi select box quận/huyện
    const handleDistrictChange = (e) => {
        setSelectedDistrict(e.target.value);
        setSelectedWard('');
        callAPI(host + 'd/' + e.target.value + '?depth=2', (data) => renderData(data.wards, 'ward'));
    };

    // Xử lý sự kiện thay đổi select box phường/xã
    const handleWardChange = (e) => {
        setSelectedWard(e.target.value);
    };

    // Xử lý sự kiện thay đổi input số nhà
    const handleHouseNumberChange = (e) => {
        setHouseNumber(e.target.value);
    };

    // Xử lý sự kiện thay đổi Transport
    const handleTransportChange = (e) => {
        setOrderInfo({
            ...orderInfo,
            transport: e.target.value,
        });
    };

    const handlePaymentChange = (e) => {
        setOrderInfo({
            ...orderInfo,
            payment: e.target.value,
        });
    };

    useEffect(() => {
        if (!userDataLoaded) {
            axios
                .get('/api/v1/me')
                .then((response) => {
                    setUserDataLoaded(true);
                    setCustomerInfo({
                        email: response.data.user.email,
                        name: response.data.user.name,
                        avatar: response.data.user.avatar.url,
                        phoneNumber: response.data.user.phoneNumber,
                        address: response.data.user.address,
                    });
                })
                .catch((err) => {
                    const errorMessage = err.response.data.message;
                    setError(errorMessage);
                    console.log(error);
                });
        }
    }, [userDataLoaded, error]);

    // Hàm xử lý khi người dùng submit form
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Notifications
        const authorAvatar = customerInfo.avatar;
        const authorName = customerInfo.name;
        const typeNoti = 'Đặt hàng thành công';
        const totalProductPrice = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
        const content = `${customerInfo.name} đã đặt hàng thành công với số tiền ${totalProductPrice.toLocaleString(
            'vi-VN',
            {
                style: 'currency',
                currency: 'VND',
            },
        )}`;
        const idNoti = casual.uuid;
        const currentDate = new Date();
        const formattedDate = currentDate.toISOString().split('T')[0];

        const notification = {
            typeNoti,
            authorAvatar,
            authorName,
            content,
            idNoti,
            date: formattedDate,
        };
        // FormDatas
        const formData = {
            cart,
            customerInfo,
            orderInfo,
        };

        if (formData.cart.length === 0) {
            toast.warn('Giỏ hàng đang trống');
            return;
        }

        axios
            .post('/api/v1/order/new', formData)
            .then(() => {
                if (cart.length > 0) {
                    dispatch(clearNotification());
                    toast.success('Đặt hàng thành công');
                    dispatch(clearCart());
                    dispatch(addNotification(notification));
                } else {
                    toast.error('Đặt hàng thất bại ok');
                }
            })
            .catch((error) => {
                toast.error('Đặt hàng thất bại');
                console.log('Loi o day', error);
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
                            <div className={cx('info-wrapper')}>
                                <div className={cx('info-avatar')}>
                                    <img alt={customerInfo.name} src={customerInfo.avatar} />
                                </div>
                                <div className={cx('info-input')}>
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
                                        onChange={(e) =>
                                            setCustomerInfo({ ...customerInfo, phoneNumber: e.target.value })
                                        }
                                        placeholder="Phone Number"
                                    />
                                </div>
                            </div>

                            {/* Địa chỉ */}
                            <div className={cx('form-group')}>
                                <select id="province" onChange={handleProvinceChange}>
                                    <option value="">Chọn tỉnh/thành phố</option>
                                    {provinces}
                                </select>
                            </div>
                            <div className={cx('form-group')}>
                                <select id="district" onChange={handleDistrictChange}>
                                    <option value="">Chọn quận/huyện</option>
                                    {districts}
                                </select>
                            </div>
                            <div className={cx('form-group')}>
                                <select id="ward" onChange={handleWardChange}>
                                    <option value="">Chọn phường/xã</option>
                                    {wards}
                                </select>
                            </div>
                            <div className={cx('form-group')}>
                                <input
                                    type="text"
                                    placeholder="Số nhà"
                                    value={houseNumber}
                                    onChange={handleHouseNumberChange}
                                />
                            </div>
                            <div className={cx('form-group')}>
                                <input
                                    onChange={(e) => setCustomerInfo({ ...customerInfo, address: e.target.value })}
                                    value={customerInfo.address ? customerInfo.address : createFullAddress()}
                                    placeholder="Địa chỉ"
                                />
                            </div>
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
                                        onChange={handleTransportChange}
                                    />
                                </div>

                                <div className={cx('order-info-item')}>
                                    <label>Pickup</label>
                                    <input
                                        type="radio"
                                        name="transport"
                                        value="Pickup"
                                        checked={orderInfo.transport === 'Pickup'}
                                        onChange={handleTransportChange}
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
                                        onChange={handlePaymentChange}
                                    />
                                </div>

                                <div className={cx('order-info-item')}>
                                    <label>Bank Transfer</label>
                                    <input
                                        type="radio"
                                        name="payment"
                                        value="Bank Transfer"
                                        checked={orderInfo.payment === 'Bank Transfer'}
                                        onChange={handlePaymentChange}
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
                                <FontAwesomeIcon icon={faCartShopping} />
                                <p>Chưa có sản phẩm nào trong giỏ hàng</p>
                            </div>
                        )}

                        <div className={cx('cart-buttons')}>
                            <Link to="/products">
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
