import classNames from 'classnames/bind';
import styles from './ProductRelatedItem.module.scss';
import { Link } from 'react-router-dom';
const cx = classNames.bind({ ...styles, container: 'container', row: 'row' });

function ProductRelatedItem({ id, name, imageUrl, price }) {
    return (
        <div className={cx('item')}>
            <p style={{ display: 'none' }}>{id}</p>

            <Link to={`/products/${id}`} className={cx('item-img')}>
                <img alt="Ten San Pham" src={imageUrl} />
            </Link>
            <h3>{name}</h3>
            <p>
                Giá:{' '}
                {price.toLocaleString('vi-VN', {
                    style: 'currency',
                    currency: 'VND',
                })}
            </p>
        </div>
    );
}

export default ProductRelatedItem;
