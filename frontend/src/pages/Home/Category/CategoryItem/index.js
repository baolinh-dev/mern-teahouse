import classNames from 'classnames/bind';
import styles from './CategoryItem.module.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';

const cx = classNames.bind({ ...styles, container: 'container' });

function CategoryItem({ content, imageUrl }) {
    return (
        <Link to={`/productCategory?category=${content}`} className={cx('category-item')}>
            <img src={imageUrl} alt={content} />
            <h3>{content}</h3>
        </Link>
    );
}

export default CategoryItem;