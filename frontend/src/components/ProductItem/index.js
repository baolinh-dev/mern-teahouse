import classNames from 'classnames/bind';
import styles from './ProductItem.module.scss';
import { Link } from 'react-router-dom';

const cx = classNames.bind({ ...styles, container: 'container' });

function ProductItem({ imageUrl, nameProduct, price, id }) {
    const productImg = imageUrl
        ? imageUrl
        : 'https://www.independentmediators.co.uk/wp-content/uploads/2016/02/placeholder-image.jpg';
    return (
        <div className={cx('product-item')}>
            <div className={cx('product-thumbnail')}>
                <Link to={`/products/${id}`}>
                    <img alt="Ten San Pham" src={productImg} />
                    <div className={cx('add-to-cart')}>
                        <a href="/">Thêm vào giỏ hàng</a>
                    </div>
                </Link>
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
