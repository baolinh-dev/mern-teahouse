import React from 'react';
import { Link } from 'react-router-dom';

import classNames from 'classnames/bind';
import styles from './Breadcrumb.module.scss';

const cx = classNames.bind(styles);

const Breadcrumb = ({ items }) => {
    const active = cx('active');

    return (
        <nav aria-label="breadcrumb" className={cx('breadcrumb')}>
            <ol className="breadcrumb">
                {items.map((item, index) => (
                    <li key={index} className={`breadcrumb-item ${item.active ? active : ''}`}>
                        {item.active ? item.label : <Link to={item.link}>{item.label}</Link>}
                    </li>
                ))}
            </ol>
        </nav>
    );
};

export default Breadcrumb;