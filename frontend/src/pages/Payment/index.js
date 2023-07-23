import { useState, useEffect } from 'react';
import axios from 'axios';
import classNames from 'classnames/bind';
import styles from './Payment.module.scss';
import Cart from './CartPayment';
import Footer from '~/components/Footer'; 
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping, faClipboardList } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind({ ...styles, container: 'container' });

function Payment() {
    const host = 'https://provinces.open-api.vn/api/';
    const [provinces, setProvinces] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [wards, setWards] = useState([]);
    const [selectedProvince, setSelectedProvince] = useState('');
    const [selectedDistrict, setSelectedDistrict] = useState('');
    const [selectedWard, setSelectedWard] = useState('');
    const [houseNumber, setHouseNumber] = useState('');
    const [address, setAddress] = useState('');
    const [userData, setUserData] = useState(null);
    
    const [deliveryMethod, setDeliveryMethod] = useState('home_delivery');
    const [paymentMethod, setPaymentMethod] = useState('cod');
    const [cart, setCart] = useState([]);  

    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        const cartData = localStorage.getItem('cart');
        if (cartData) {
            setCart(JSON.parse(cartData));
        }
    }, []);

    useEffect(() => {
        axios
            .get('/api/v1/me')
            .then((response) => {
                setUserData(response.data.user);
            })
            .catch((error) => {
                const errorMessage = error.response.data.message;
                setError(errorMessage);
            });
    }, [error]); 

    const handlePayment = (event) => { 
        axios
            .post('/api/v1/order/new', cart) 
            .then((response) => {
                setSuccess(true);
                localStorage.removeItem('cart');
            }) 
            .catch((error) => {
                const errorMessage = error.response.data.message;
                setError(errorMessage);
            });
    }

    // Hàm để gọi API và render dữ liệu
    const callAPI = async (api, renderCallback) => {
        try {
            const response = await axios.get(api);
            renderCallback(response.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    // Hàm để render dữ liệu vào select box
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
        let address = 'Địa chỉ: ';

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
        // Lấy danh sách tỉnh/thành phố và render vào select box
        callAPI(host + '?depth=1', (data) => renderData(data, 'province'));
    }, []);

    // Xử lý sự kiện thay đổi select box tỉnh/thành phố
    const handleProvinceChange = (e) => {
        setSelectedProvince(e.target.value);
        setSelectedDistrict('');
        setSelectedWard('');
        callAPI(host + 'p/' + e.target.value + '?depth=2', (data) => renderData(data.districts, 'district'));
        setAddress(createFullAddress());
    };

    // Xử lý sự kiện thay đổi select box quận/huyện
    const handleDistrictChange = (e) => {
        setSelectedDistrict(e.target.value);
        setSelectedWard('');
        callAPI(host + 'd/' + e.target.value + '?depth=2', (data) => renderData(data.wards, 'ward'));
        setAddress(createFullAddress());
    };

    // Xử lý sự kiện thay đổi select box phường/xã
    const handleWardChange = (e) => {
        setSelectedWard(e.target.value);
        setAddress(createFullAddress());
    };

    // Xử lý sự kiện thay đổi input số nhà
    const handleHouseNumberChange = (e) => {
        setHouseNumber(e.target.value);
        setAddress(createFullAddress());
    };

    return (
        <>
            <div className={cx('payment')}>
                <div className="container">
                    <div className="row">
                        <div className="col-6">
                            <div className={cx('form-wrapper')}>
                                <h2>Thông tin người nhận</h2>
                                {/* Thông tin người dùng */}
                                {userData && (
                                    <>
                                        <div className={cx('form-group')}>
                                            <input value={userData.email} />
                                        </div>
                                        <div className={cx('form-group')}>
                                            <input value={userData.name} />
                                        </div>
                                        <div className={cx('form-group')}>
                                            <input type="number" placeholder="Số điện thoại" />
                                        </div>
                                    </>
                                )}
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
                                    <p>{createFullAddress()}</p>
                                </div>
                                <div className={cx('form-group')}>
                                    <textarea placeholder="Ghi chú" />
                                </div>
                            </div>

                            <div className={cx('form-wrapper')}>
                                <h2>Vận chuyển</h2>
                                <div className={cx('form-input')}>
                                    <label>Giao hàng tận nơi</label>
                                    <input
                                        type="radio"
                                        name="deliveryMethod"
                                        value="home_delivery"
                                        checked={deliveryMethod === 'home_delivery'}
                                        onChange={(e) => setDeliveryMethod(e.target.value)}
                                    />
                                </div>
                            </div>
                            <div className={cx('form-wrapper')}>
                                <h2>Thanh toán</h2>
                                <div className={cx('form-input')}>
                                    <label>Thanh toán khi giao hàng (COD)</label>
                                    <input
                                        type="radio"
                                        name="paymentMethod"
                                        value="cod"
                                        checked={paymentMethod === 'cod'}
                                        onChange={(e) => setPaymentMethod(e.target.value)}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="col-6">
                            <div className={cx('form-wrapper')}>
                                <Cart cartItems={cart} />
                                <div className={cx('cart-buttons')}>
                                    <Link to="/products">
                                        {' '}
                                        <FontAwesomeIcon icon={faCartShopping} /> Tiếp tục mua hàng
                                    </Link>
                                    <button onClick={handlePayment}>
                                        <FontAwesomeIcon icon={faClipboardList} /> Đặt hàng
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </>
    );
}

export default Payment;
