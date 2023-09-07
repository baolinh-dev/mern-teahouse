import React from 'react';
import classNames from 'classnames/bind';
import styles from './OrderAppovalItem.module.scss';

const cx = classNames.bind(styles);

function OrderAppovalItem({ order }) {
    return (
        <div className={cx('order-approval-item')}>
            <div className={cx('infor-customer')}>
                <img alt={order.customerInfo.name} width={200} src={order.customerInfo.avatar} />
                <h3>{order.customerInfo.name}</h3>
            </div>

            <p>{order.orderInfo.status}</p>
            <p>{order.dateOrder}</p>
            <p className={cx('money')}>
                {order.totalProductPrice.toLocaleString('vi-VN', {
                    style: 'currency',
                    currency: 'VND',
                })}
            </p>
        </div>
    );
}

export default OrderAppovalItem;
