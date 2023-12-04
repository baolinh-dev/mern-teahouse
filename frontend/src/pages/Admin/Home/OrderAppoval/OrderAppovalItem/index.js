import React, { useState } from 'react';
import classNames from 'classnames/bind';
import styles from './OrderAppovalItem.module.scss';
import { ToastContainer, toast } from 'react-toastify';
const cx = classNames.bind(styles);

function OrderAppovalItem({ order }) {
    const [selectedStatus, setSelectedStatus] = useState(order.orderInfo.status);

    const handleStatusChange = async (event) => {
        const newStatus = event.target.value;
        setSelectedStatus(newStatus);

        try {
            const response = await fetch(`/api/v1/admin/order/${order._id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ status: newStatus }),
            });

            if (response.ok) {
                toast.success(`Cập nhật trạng thái đơn hàng thành ${newStatus}`);
                console.log('Cập nhật trạng thái đơn hàng thành công');
            } else {
                // Xử lý lỗi nếu cần thiết
                toast.error('Lỗi khi cập nhật trạng thái đơn hàng');
                console.log('Lỗi khi cập nhật trạng thái đơn hàng');
            }
        } catch (error) {
            console.log('Lỗi khi gọi API');
        }
    };

    return (
        <div className={cx('order-approval-item')}>
            <div className={cx('infor-customer')}>
                <img alt={order.customerInfo.name} width={200} src={order.customerInfo.avatar} />
                <h3>{order.customerInfo.name}</h3>
            </div>
            <div className={cx('options')}>
                <select
                    value={selectedStatus}
                    onChange={handleStatusChange}
                    className={cx('custom-select', {
                        delivered: selectedStatus === 'Delivered',
                        cancelled: selectedStatus === 'Cancelled',
                        refunded: selectedStatus === 'Refunded',
                        processing: selectedStatus === 'Processing',
                    })}
                >
                    <option value="Delivered" selected={selectedStatus === 'Delivered'}>
                        Delivered
                    </option>
                    <option value="Cancelled" selected={selectedStatus === 'Cancelled'}>
                        Cancelled
                    </option>
                    <option value="Refunded" selected={selectedStatus === 'Refunded'}>
                        Refunded
                    </option>
                    <option value="Processing" selected={selectedStatus === 'Processing'}>
                        Processing
                    </option>
                </select>
            </div>

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
