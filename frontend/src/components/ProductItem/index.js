import classNames from 'classnames/bind';
import styles from './ProductItem.module.scss';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

const cx = classNames.bind({ ...styles, container: 'container' });

function ProductItem({ imageUrl, nameProduct, price, id, product }) {
    const [cart, setCart] = useState([]);
    const quantity = 1;

    const handleAddToCart = () => {
        const newItem = {
            id: id,
            name: nameProduct,
            image: imageUrl,
            price: price,
            quantity: quantity,
        };
        const itemIndex = cart.findIndex((item) => item.id === id);
        if (itemIndex !== -1) {
            const updatedCart = [...cart];
            updatedCart[itemIndex].quantity += quantity;
            setCart(updatedCart);
            localStorage.setItem('cart', JSON.stringify(updatedCart));
        } else {
            setCart([...cart, newItem]);
            localStorage.setItem('cart', JSON.stringify([...cart, newItem]));
        }
        window.location.reload();
    };

    const productImg = imageUrl
        ? imageUrl
        : 'https://www.independentmediators.co.uk/wp-content/uploads/2016/02/placeholder-image.jpg';

    useEffect(() => {
        const storedCart = JSON.parse(localStorage.getItem('cart'));
        if (storedCart) {
            setCart(storedCart);
        }
    }, []);

    return (
        <div className={cx('product-item')}>
            <div className={cx('product-thumbnail-container')}>
                <div className={cx('product-thumbnail')}>
                    <Link to={`/products/${id}`}>
                        <img alt="Ten San Pham" src={productImg} />
                    </Link>
                </div>
                <div className={cx('add-to-cart')}>
                    <button onClick={handleAddToCart}>Thêm vào giỏ hàng</button>
                </div>
            </div>

            <div className={cx('product-info')}>
                <h3 className={cx('product-name')}>
                    <a href="/">{nameProduct}</a>
                </h3>
                <div className={cx('price-box')}>
                    <span className={cx('price-label')}>Giá: </span>
                    {price.toLocaleString('vi-VN', {
                        style: 'currency',
                        currency: 'VND',
                    })}
                </div>
            </div>
        </div>
    );
}

export default ProductItem;
