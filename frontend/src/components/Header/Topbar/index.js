import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping, faPhoneAlt, faTrash } from '@fortawesome/free-solid-svg-icons';
import classNames from 'classnames/bind';
import styles from './Topbar.module.scss';
import { Link, Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import ContainerHeading from '~/components/ContainerHeading';
import Heading from '~/components/Heading';
import AuthLink from '~/components/AuthLink';

const cx = classNames.bind({ ...styles, container: 'container' });

function Topbar() {
    const [userData, setUserData] = useState(null);
    const [shouldRedirect, setShouldRedirect] = useState(false);
    const [cart, setCart] = useState(JSON.parse(localStorage.getItem('cart')) || []);
    const [error, setError] = useState(null);
    // Tính tổng số lượng sản phẩm trong giỏ hàng
    const totalQuantity = cart.reduce((total, item) => total + item.quantity, 0);

    useEffect(() => {
        axios
            .get('/api/v1/me')
            .then((response) => {
                setUserData(response.data.user);
            })
            .catch((err) => {
                setError(err.response.data.message);
            });
    }, [error]);

    function clearAllCookies() {
        const cookies = document.cookie.split(';');

        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i];
            const eqPos = cookie.indexOf('=');
            const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
            document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/';
        }
    }

    const handleLogout = async () => {
        try {
            const response = await axios.get('/api/v1/logout');
            if (response.status === 200) {
                clearAllCookies(); // Xóa tất cả các cookie
                setShouldRedirect(true);
                window.location.reload();
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        const storedCart = localStorage.getItem('cart');
        if (storedCart) {
            setCart(JSON.parse(storedCart));
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart));
    }, [cart]);

    const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0);

    const handleRemoveItem = (itemId) => {
        const newCart = cart.filter((item) => item.id !== itemId);
        setCart(newCart);
        window.location.reload();
    };

    const handleQuantityChange = (itemId, newQuantity) => {
        const parsedQuantity = parseInt(newQuantity, 10); // Chuyển đổi giá trị mới thành số nguyên

        if (!isNaN(parsedQuantity)) {
            // Kiểm tra nếu giá trị là một số hợp lệ
            const newCart = cart.map((item) => {
                if (item.id === itemId) {
                    return { ...item, quantity: parsedQuantity };
                }
                return item;
            });
            setCart(newCart);
        }
        setTimeout(() => {
            window.location.reload();
        }, 2000);
    };

    return (
        <div className={cx('topbar-container')}>
            <div className={cx('topbar', 'container')}>
                <div className={cx('left-topbar')}>
                    <FontAwesomeIcon icon={faPhoneAlt} />
                    <span>Hotline: </span>
                    <a href="tel:0768494121">0768494121</a>
                </div>
                <div className={cx('right-topbar')}>
                    <ul>
                        <li className={cx('account')}>
                            <Link to="/user-profile">
                                <img
                                    src={
                                        userData?.avatar?.url ||
                                        'https://th.bing.com/th/id/R.b9838bf721d3dff150c954530b3856f3?rik=Uulm6lnhid2Giw&riu=http%3A%2F%2Fshackmanlab.org%2Fwp-content%2Fuploads%2F2013%2F07%2Fperson-placeholder.jpg&ehk=GGILj1W77t4L5TSfJq0peMYJY8na6RvFj0vx3uPQHkI%3D&risl=&pid=ImgRaw&r=0&sres=1&sresct=1'
                                    }
                                    alt={userData?.name}
                                />
                                <span>{userData?.name ? userData?.name : 'Tài khoản'}</span>
                            </Link>

                            <div id="login-dropdown" className={cx('login-dropdown')}>
                                <Link to="/login">Đăng nhập</Link>
                                <Link to="/register">Đăng ký</Link>
                                <button onClick={handleLogout}>Đăng xuất</button>
                            </div>
                        </li>
                        <li className={cx('cart')}>
                            <FontAwesomeIcon icon={faCartShopping} />
                            <Link to={'/cart'}>Giỏ hàng ({totalQuantity})</Link>
                            <div className={cx('cart-dropdown')}>
                                <ContainerHeading center>
                                    <Heading content={'Giỏ hàng'} />
                                </ContainerHeading>

                                {cart.length === 0 ? (
                                    <div className={cx('cart-empty')}>
                                        <FontAwesomeIcon icon={faCartShopping} />
                                        <p>Giỏ hàng trống</p>
                                    </div>
                                ) : (
                                    <>
                                        <div className={cx('cart-content')}>
                                            {cart.map((item) => (
                                                <div key={item.id} className={cx('cart-item')}>
                                                    <div className={cx('cart-item-image')}>
                                                        <img src={item.image} alt={item.name} />
                                                    </div>
                                                    <div className={cx('cart-item-info')}>
                                                        <h3 className={cx('cart-item-name')}>{item.name}</h3>
                                                        <div className={cx('cart-item-quantity-price')}>
                                                            <div className={cx('cart-item-price')}>
                                                                {item.price.toLocaleString('vi-VN', {
                                                                    style: 'currency',
                                                                    currency: 'VND',
                                                                })}
                                                            </div>
                                                            <div className={cx('cart-item-quantity')}>
                                                                <button
                                                                    type="button"
                                                                    onClick={() =>
                                                                        handleQuantityChange(
                                                                            item.id,
                                                                            Number(item.quantity) - 1,
                                                                        )
                                                                    }
                                                                    disabled={item.quantity === 1}
                                                                >
                                                                    -
                                                                </button>
                                                                <input
                                                                    type="text"
                                                                    min="1"
                                                                    value={item.quantity}
                                                                    onChange={(e) =>
                                                                        handleQuantityChange(item.id, e.target.value)
                                                                    }
                                                                />

                                                                <button
                                                                    type="button"
                                                                    onClick={() =>
                                                                        handleQuantityChange(
                                                                            item.id,
                                                                            Number(item.quantity) + 1,
                                                                        )
                                                                    }
                                                                >
                                                                    +
                                                                </button>
                                                            </div>
                                                        </div>
                                                        <button
                                                            className={cx('cart-item-remove')}
                                                            onClick={() => handleRemoveItem(item.id)}
                                                        >
                                                            <FontAwesomeIcon icon={faTrash} />
                                                        </button>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                        <div className={cx('cart-dropdown-footer')}>
                                            <div className={cx('cart-total')}>
                                                <label>Tổng cộng: </label>
                                                <p className={cx('cart-total-price')}>
                                                    {totalPrice.toLocaleString('vi-VN', {
                                                        style: 'currency',
                                                        currency: 'VND',
                                                    })}
                                                </p>
                                            </div>
                                            <li className={cx('payment')}>
                                                <AuthLink linkTo={'/paymentform'} />
                                            </li>
                                        </div>
                                    </>
                                )}
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
            {shouldRedirect && <Navigate to="/" />}
        </div>
    );
}

export default Topbar;
