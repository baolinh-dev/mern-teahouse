import React from 'react';
import classNames from 'classnames/bind';
import styles from './CategoryItem.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';

const cx = classNames.bind({ ...styles, container: 'container' });

function CategoryItem({ categoryName, categoryIcon, categoryUrl }) {
    return (
        <Link to={categoryUrl} className={cx('category-item')}>
            <div className={cx('category-icon')}>
                <FontAwesomeIcon icon={categoryIcon} />
            </div>
            <p>{categoryName}</p>
        </Link>
    );
}

export default CategoryItem;
