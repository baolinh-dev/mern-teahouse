import React, { useState, useEffect } from 'react';
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
    const [cart, setCart] = useState([]);
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
    // const [orderInfo, setOrderInfo] = useState({
    //     transport: 'Delivery',
    //     payment: 'COD',
    //     status: 'Processing',
    // });

    const orderInfo = {
        transport: 'Delivery',
        payment: 'COD',
        status: 'Processing',
    };

    // Hàm để gọi API và render dữ liệu
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
    const createFullAddress = () => {
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
    };

    useEffect(() => {
        const updatedAddress = createFullAddress();
        setCustomerInfo((prevCustomerInfo) => ({
            ...prevCustomerInfo,
            address: updatedAddress,
        }));
    }, [houseNumber, selectedProvince, selectedDistrict, selectedWard]);

    useEffect(() => {
        // Lấy danh sách tỉnh/thành phố và render vào select box
        callAPI(host + '?depth=1', (data) => renderData(data, 'province'));
    }, []);

    // Xử lý sự kiện thay đổi select box tỉnh/thành phố
    const handleProvinceChange = (e) => {
        setSelectedProvince(e.target.value);
        setSelectedDistrict('');
        setSelectedWard('');
        const updatedAddress = createFullAddress(); // lấy đưuọc province Hà Nội
        setCustomerInfo((prevCustomerInfo) => ({
            ...prevCustomerInfo,
            address: updatedAddress,
        })); // address chưa đưuọc cập nhật thành Hà Nội
        callAPI(host + 'p/' + e.target.value + '?depth=2', (data) => renderData(data.districts, 'district'));
    };

    console.log(createFullAddress());

    // Xử lý sự kiện thay đổi select box quận/huyện
    const handleDistrictChange = (e) => {
        setSelectedDistrict(e.target.value);
        setSelectedWard('');
        const updatedAddress = createFullAddress();
        setCustomerInfo((prevCustomerInfo) => ({
            ...prevCustomerInfo,
            address: updatedAddress,
        }));
        callAPI(host + 'd/' + e.target.value + '?depth=2', (data) => renderData(data.wards, 'ward'));
    };

    // Xử lý sự kiện thay đổi select box phường/xã
    const handleWardChange = (e) => {
        setSelectedWard(e.target.value);
        const updatedAddress = createFullAddress();
        setCustomerInfo((prevCustomerInfo) => ({
            ...prevCustomerInfo,
            address: updatedAddress,
        }));
    };

    // Xử lý sự kiện thay đổi input số nhà
    const handleHouseNumberChange = (e) => {
        setHouseNumber(e.target.value);
        const updatedAddress = createFullAddress();
        setCustomerInfo((prevCustomerInfo) => ({
            ...prevCustomerInfo,
            address: updatedAddress,
        }));
    };

    useEffect(() => {
        if (!userDataLoaded) {
            axios
                .get('/api/v1/me')
                .then((response) => {
                    setUserDataLoaded(true);
                    // Cập nhật giá trị mặc định cho customerInfo
                    setCustomerInfo({
                        email: response.data.user.email,
                        name: response.data.user.name,
                        phoneNumber: '',
                        address: '',
                    });
                })
                .catch((err) => {
                    const errorMessage = err.response.data.message;
                    setError(errorMessage);
                    console.log(error);
                });
        }
    }, [userDataLoaded, error]);
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
                console.log('Loi o day', error);
            });
    };
    console.log(customerInfo);
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
                            {/* <input
                                type="text"
                                value={customerInfo.address}
                                onChange={(e) => setCustomerInfo({ ...customerInfo, address: e.target.value })}
                                placeholder="Address"
                            /> */}
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
                                    value={createFullAddress()}
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
                                <FontAwesomeIcon icon={faCartShopping} />
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
