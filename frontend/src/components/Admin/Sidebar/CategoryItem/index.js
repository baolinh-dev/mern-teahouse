import React from 'react';
import classNames from 'classnames/bind';
import styles from './CategoryItem.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const cx = classNames.bind({ ...styles, container: 'container' });

function CategoryItem({ categoryName, categoryIcon }) {
    return (
        <div className={cx('category-item')}>
            <div className={cx('category-icon')}>
                <FontAwesomeIcon icon={categoryIcon} />
            </div>
            <p>{categoryName}</p>
        </div>
    );
}

export default CategoryItem;
