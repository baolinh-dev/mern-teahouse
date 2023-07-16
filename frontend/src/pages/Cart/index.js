import React, { useState } from 'react';
import classNames from 'classnames/bind';
import styles from './Cart.module.scss';
import Header from '~/components/Header';
import Breadcrumb from '~/components/Breadcrumb';
import ContainerHeading from '~/components/ContainerHeading';
import Heading from '~/components/Heading';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faShare, faShareAlt, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import Footer from '~/components/Footer';

const cx = classNames.bind({ ...styles, container: 'container' });

function Cart() {
    // Lấy danh sách sản phẩm từ localStorage
    const [cartItems, setCartItems] = useState(JSON.parse(localStorage.getItem('cart')) || []);

    // Tính tổng giá trị của các sản phẩm trong giỏ hàng
    const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

    // Hàm để cập nhật số lượng sản phẩm
    const updateQuantity = (index, newQuantity) => {
        const newCartItems = [...cartItems];
        const parsedQuantity = parseInt(newQuantity);
        if (!isNaN(parsedQuantity)) {
            newCartItems[index].quantity = parsedQuantity;
            setCartItems(newCartItems);
            localStorage.setItem('cart', JSON.stringify(newCartItems));
        }
        window.location.reload();
    };

    // Hàm để xóa sản phẩm khỏi danh sách
    const removeItem = (index) => {
        const newCartItems = [...cartItems];
        newCartItems.splice(index, 1);
        setCartItems(newCartItems);
        localStorage.setItem('cart', JSON.stringify(newCartItems));
        window.location.reload();
    };

    return (
        <>
            <Header />
            <div className={cx('cart', 'container')}>
                <Breadcrumb
                    items={[
                        { label: 'Trang chủ', link: '/' },
                        { label: 'Giỏ hàng', active: true },
                    ]}
                />
                <div className={cx('cart-content')}>
                    <ContainerHeading center>
                        <Heading content={'Giỏ hàng của bạn'} />
                    </ContainerHeading>
                    <div className={cx('cart-list')}>
                        {cartItems.map((item, index) => (
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
                                        <div className={cx('cart-content-item-quantity-input')}>
                                            <button onClick={() => updateQuantity(index, item.quantity - 1)}>-</button>
                                            <input
                                                type="text"
                                                id={`quantity-${index}`}
                                                value={item.quantity}
                                                onChange={(e) => updateQuantity(index, e.target.value)}
                                            />
                                            <button onClick={() => updateQuantity(index, item.quantity + 1)}>+</button>
                                        </div>
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
                                <p> {` ${cartItems.length}`} </p>
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
                            <Link to="/payment">
                                <FontAwesomeIcon icon={faCheck} />
                                Tiến hành thanh toán
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}

export default Cart;
