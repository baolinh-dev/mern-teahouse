import React from 'react';
import classNames from 'classnames/bind';
import styles from './OrderAppovalItem.module.scss';

const cx = classNames.bind(styles);

function OrderAppovalItem({ order }) {
    return (
        <div className={cx('order-approval-item')}>
            <h3>{order.customerInfo.name}</h3>
            <p>{order.orderInfo.status}</p>
            {/* Thêm các thông tin khác về đơn hàng */}
        </div>
    );
}

export default OrderAppovalItem;