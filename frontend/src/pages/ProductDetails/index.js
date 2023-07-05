import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '~/components/Header';
import classNames from 'classnames/bind';
import styles from './ProductDetails.module.scss';
import Breadcrumb from '~/components/Breadcrumb';

const cx = classNames.bind({ ...styles, container: 'container', row: 'row' });

const ProductDetails = () => {
    const [product, setProduct] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const pathname = window.location.pathname;
    const productId = pathname.substring(pathname.lastIndexOf('/') + 1);

    useEffect(() => {
        const fetchProduct = async () => {
            const res = await axios.get(`/api/v1/product/${productId}`);
            setProduct(res.data.product);
            console.log('Product:', res.data.product);
        };
        fetchProduct();
    }, [productId]); 

    if (!product) {
        return <div>Loading...</div>;
    }

    const handleIncrement = () => {
        setQuantity(quantity + 1);
    };

    const handleDecrement = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1);
        }
    };

    const handleQuantityChange = (event) => {
        const value = parseInt(event.target.value);
        if (!isNaN(value) && value >= 1) {
            setQuantity(value);
        }
    }; 

    const breadcrumbItems = [
        { label: 'Trang chủ', link: '/' },
        { label: product.category, link: '/caphe' },
        { label: product.name, active: true },
    ];

    return (
        <>
            <Header />
            <div className={cx('bg-product')}>
                <div className={cx('container')}>
                    <div className={cx('row')}>
                        <div className={cx('product-item')}>
                            <Breadcrumb items={breadcrumbItems} />
                            <div className={cx('product-item-content')}>
                                <div className={cx('product-item-left')}>
                                    <div className={cx('product-image')}>
                                        <img src={product.images[0].url} />
                                    </div>
                                </div>
                                <div className={cx('product-item-right')}>
                                    <div className={cx('title')}>
                                        <h3>{product.name}</h3>
                                    </div>
                                    <div className={cx('desc')}>
                                        <p>
                                            <span>Mô tả: </span> {product.description}
                                        </p>
                                    </div>
                                    <div className={cx('price-calculator')}>
                                        <div className={cx('price')}>
                                            <span>Giá: </span> <p>{product.price}</p>
                                        </div>
                                        <div className={cx('quantity')}>
                                            <span>Số lượng: </span>
                                            <button type="button" onClick={handleDecrement}>
                                                -
                                            </button>
                                            <input
                                                type="number"
                                                value={quantity}
                                                min="1"
                                                onChange={handleQuantityChange}
                                            />
                                            <button type="button" onClick={handleIncrement}>
                                                +
                                            </button>
                                        </div>
                                    </div>
                                    <div className={cx('total')}>
                                        <span>Tổng: </span> <p>{product.price * quantity}</p>
                                    </div>
                                    <div className={cx('buttons')}>
                                        <button>
                                            <a href="/">Thêm vào giỏ hàng</a>
                                        </button>
                                        <button className={cx('highlight')}>
                                            <a href="/">Mua ngay</a>
                                        </button>
                                    </div>
                                    <div className={cx('shipping-infor')}>
                                        <p>
                                            <b>Giao hàng miễn phí: </b>
                                            Áp dụng đơn hàng &gt;200.000đ
                                        </p>
                                        <p>
                                            <b>Thanh toán tại nhà: </b>
                                            Nhanh chóng và an toàn
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ProductDetails;
