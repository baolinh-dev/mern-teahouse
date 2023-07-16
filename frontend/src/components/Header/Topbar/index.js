import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping, faPhoneAlt, faUser, faTrash, faCartFlatbedSuitcase } from '@fortawesome/free-solid-svg-icons';
import classNames from 'classnames/bind';
import styles from './Topbar.module.scss';
import { Link, Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import axios from 'axios';
import ContainerHeading from '~/components/ContainerHeading';
import Heading from '~/components/Heading';
import AuthLink from '~/components/AuthLink';

const cx = classNames.bind({ ...styles, container: 'container' });

function Topbar() {
    const [isLoginDropdownOpen, setIsLoginDropdownOpen] = useState(false);
    const [shouldRedirect, setShouldRedirect] = useState(false);
    const [cart, setCart] = useState(JSON.parse(localStorage.getItem('cart')) || []); 

    // Tính tổng số lượng sản phẩm trong giỏ hàng
    const totalQuantity = cart.reduce((total, item) => total + item.quantity, 0);

    const handleLogout = async () => {
        try {
            const response = await axios.get('/api/v1/logout');
            if (response.status === 200) {
                localStorage.removeItem('lastRegisteredEmail');
                localStorage.removeItem('cart');
                Cookies.remove('userName');
                Cookies.remove('userAvatar');
                Cookies.remove('userId');
                Cookies.remove('token');
                setShouldRedirect(true);
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

    function renderAccountContent() {
        const userName = Cookies.get('userName');
        const userAvatar = Cookies.get('userAvatar');

        let content = (
            <>
                <FontAwesomeIcon icon={faUser} />
                <span>{userName || 'Tài khoản'}</span>
            </>
        );

        if (userAvatar) {
            content = (
                <>
                    <img src={userAvatar} alt={userName} />
                    <span>{userName || 'Tài khoản'}</span>
                </>
            );
        }

        return content;
    }

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
    };

    return (
        <div className={cx('topbar-container')}>
            <div className={cx('topbar', 'container')}>
                <div className={cx('left-topbar')}>
                    <FontAwesomeIcon icon={faPhoneAlt} />
                    <span>Hotline: </span>
                    <a href="tel:19006750">1900 6750</a>
                </div>
                <div className={cx('right-topbar')}>
                    <ul>
                        <li className={cx('account')}>
                            <Link to="/user-profile">{renderAccountContent()}</Link>

                            <div id="login-dropdown" className={cx('login-dropdown', { open: isLoginDropdownOpen })}>
                                <Link to="/login">Đăng nhập</Link>
                                <Link to="/register">Đăng ký</Link>
                                <button onClick={handleLogout}>Đăng xuất</button>
                            </div>
                        </li>
                        <li className={cx('cart')}>
                            <FontAwesomeIcon icon={faCartShopping} />
                            <Link to={"/cart"}>Giỏ hàng ({totalQuantity})</Link>
                            <div className={cx('cart-dropdown', { open: isLoginDropdownOpen })}>
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
                                                                        handleQuantityChange(item.id, Number(item.quantity) - 1)
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
                                                <AuthLink linkTo={'/paymet'} />
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
