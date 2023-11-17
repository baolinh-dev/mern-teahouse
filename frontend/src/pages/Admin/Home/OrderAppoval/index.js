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

    const [orderCount, setOrderCount] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [numberOrdersPerPage, setNumberOrdersPerPage] = useState(null);


    const fetchOrders = async (currentPage) => {
        try {
            const response = await fetch(`/api/v1/admin/orders?page=${currentPage}`);
            const data = await response.json();
            setOrders(data.orders); 
            setNumberOrdersPerPage(data.numberOrdersPerPage);
            setOrderCount(data.orderCount);
        } catch (error) {
            console.error('Error fetching orders:', error);
        }
    };
    useEffect(() => {
        fetchOrders(currentPage);
    }, [currentPage]);


    return ( 
        <div className={cx('order-appoval')}>
            <div className={cx('container-heading')}>
                <ContainerHeading center>
                    <Heading content={'Order Approval'} />
                </ContainerHeading>
            </div>
            {orders.map((order) => (
                <OrderAppovalItem key={order._id} order={order} />
            ))}


<Pagination
        currentPage={currentPage}
        totalPages={Math.ceil(orderCount / numberOrdersPerPage)}
        onPageChange={(pageNumber) => {
          setCurrentPage(pageNumber);
        }}
      />
        </div>
    );
}

export default OrderApproval;