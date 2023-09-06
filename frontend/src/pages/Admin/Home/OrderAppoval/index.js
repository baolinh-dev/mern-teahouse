import classNames from 'classnames/bind';
import styles from './OrderAppoval.module.scss';
import OrderAppovalItem from './OrderAppovalItem';
import { useEffect, useState } from 'react';

const cx = classNames.bind({ ...styles, container: 'container' });

function OrderAppoval() {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await fetch('/api/v1/admin/orders');
                const data = await response.json();
                setOrders(data.orders);
            } catch (error) {
                console.error('Error fetching orders:', error);
            }
        };

        fetchOrders();
    }, []); 

    console.log("orders", orders);

    return (
        <div className={cx('order-appoval')}>
            {orders.map(order => ( 
                <OrderAppovalItem key={order._id} order={order} />
            ))}
        </div>
    );
}

export default OrderAppoval;
