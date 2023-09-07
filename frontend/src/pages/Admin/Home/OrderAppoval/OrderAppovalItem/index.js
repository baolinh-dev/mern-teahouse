import React from 'react';
import classNames from 'classnames/bind';
import styles from './OrderAppovalItem.module.scss';

const cx = classNames.bind(styles);

function OrderAppovalItem({ order }) {
    return (
        <div className={cx('order-approval-item')}> 
            <h3>{order.customerInfo.name}</h3>
            <img alt={order.customerInfo.name} width={200} src={order.customerInfo.avatar}/>
            <p>{order.orderInfo.status}</p> 
            <p>{order.dateOrder}</p> 
        </div>
    );
}

export default OrderAppovalItem;