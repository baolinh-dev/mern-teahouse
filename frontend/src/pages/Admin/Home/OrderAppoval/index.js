import classNames from 'classnames/bind';
import styles from './OrderAppoval.module.scss';
import OrderAppovalItem from './OrderAppovalItem';
import { useEffect, useState } from 'react';
import ContainerHeading from '~/components/ContainerHeading';
import Heading from '~/components/Heading';
import Pagination from '~/components/Pagination';

const cx = classNames.bind({ ...styles, container: 'container' });

function OrderApproval() {
    const [orders, setOrders] = useState([]);
    const [currentPage, setCurrentPage] = useState(1); 

    const ordersPerPage = 4;

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

    console.log('orders', orders);

    const indexOfLastOrder = currentPage * ordersPerPage;
    const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
    const pagedOrders = orders.slice(indexOfFirstOrder, indexOfLastOrder);

    return ( 
        <div className={cx('order-appoval')}>
            <div className={cx('container-heading')}>
                <ContainerHeading center>
                    <Heading content={'Order Approval'} />
                </ContainerHeading>
            </div>
            {pagedOrders.map((order) => (
                <OrderAppovalItem key={order._id} order={order} />
            ))}
            <Pagination
                currentPage={currentPage}
                totalPages={Math.ceil(orders.length / ordersPerPage)}
                onPageChange={(pageNumber) => {
                    setCurrentPage(pageNumber);
                }}
            />
        </div>
    );
}

export default OrderApproval;