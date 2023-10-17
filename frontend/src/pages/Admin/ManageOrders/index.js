import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, Button, Space, Popconfirm, Input } from 'antd';
import AdminLayout from '~/layouts/AdminLayout';
import { toast } from 'react-toastify';
import Pagination from '~/components/Pagination';

function ManageOrders() {
    const [orders, setOrders] = useState([]);
    const [searchKeyword, setSearchKeyword] = useState('');
    const [orderCount, setOrderCount] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [numberOrdersPerPage, setNumberOrdersPerPage] = useState(null);

    const fetchOrders = (currentPage, keyword) => {
        axios
            .get(`/api/v1/admin/orders?page=${currentPage}&keyword=${keyword}`)
            .then((response) => {
                setOrders(response.data.orders);
                setNumberOrdersPerPage(response.data.numberOrdersPerPage);
                setOrderCount(response.data.orderCount);
            })
            .catch((error) => {
                console.error('Error fetching orders:', error);
            });
    };

    useEffect(() => {
        fetchOrders(currentPage, searchKeyword);
    }, [currentPage, searchKeyword]); 

    console.log("orders", orders);

    const handleDelete = (orderId) => {
        axios
            .delete(`/api/v1/admin/order/${orderId}`)
            .then(() => {
                toast.success('Order deleted successfully');
                setOrders(orders.filter((order) => order._id !== orderId));
            })
            .catch((error) => {
                console.error('Error deleting order:', error);
                toast.error('Error deleting order');
            });
    };



    // useEffect(() => {
    //     filterOrders(orders, searchKeyword);
    // }, [orders, searchKeyword]);

    const columns = [
        { title: 'Avatar', dataIndex: 'avatar', key: 'avatar' },
        { title: 'Customer Name', dataIndex: 'name', key: 'name' },
        { title: 'Order Status', dataIndex: 'status', key: 'status' },
        {
            title: 'Cart',
            dataIndex: 'cart',
            key: 'cart',
            render: (cart) => (
                <ul>
                    {cart.map((item) => (
                        <li key={item.productId}>
                            {item.name} - Price:{' '}
                            {item.price.toLocaleString('vi-VN', {
                                style: 'currency',
                                currency: 'VND',
                            }) || 'N/A'}{' '}
                            - Quantity: {item.quantity}
                        </li>
                    ))}
                </ul>
            ),
        },
        { title: 'Total Price', dataIndex: 'totalPrice', key: 'totalPrice' },
        { title: 'Order Date', dataIndex: 'date', key: 'date' },
        {
            title: 'Action',
            key: 'action',
            render: (text, record) => (
                <Space size="middle">
                    <Popconfirm
                        title="Are you sure you want to delete?"
                        onConfirm={() => handleDelete(record.key)}
                        okText="Delete"
                        cancelText="Cancel"
                    >
                        <Button type="primary" danger>
                            Delete
                        </Button>
                    </Popconfirm>
                </Space>
            ),
        },
    ];

    const dataSource = orders.map((order) => ({
        key: order._id,
        avatar: (
            <img
                style={{
                    width: '60px',
                    height: '60px',
                    borderRadius: '50%',
                    padding: '2px',
                    border: '1px solid #ccc',
                }}
                src={order.customerInfo.avatar}
                alt="Avatar"
            />
        ),
        name: order.customerInfo.name || 'N/A',
        status: order.orderInfo.status || 'N/A',
        cart: order.cart || [],
        totalPrice:
            order.totalProductPrice.toLocaleString('vi-VN', {
                style: 'currency',
                currency: 'VND',
            }) || 'N/A',
        date: order.dateOrder || 'N/A',
    }));

    return (
        <AdminLayout>
            <div style={{ marginBottom: '16px' }}>
                <Input.Search
                    placeholder="Search by name"
                    allowClear
                    enterButton
                    value={searchKeyword}
                    onChange={(e) => setSearchKeyword(e.target.value)}
                    onSearch={() => fetchOrders(currentPage, searchKeyword)}
                />
            </div>
            <Table dataSource={dataSource} columns={columns} pagination={false} />

            <Pagination
                currentPage={currentPage}
                totalPages={Math.ceil(orderCount / numberOrdersPerPage)}
                onPageChange={(pageNumber) => {
                    setCurrentPage(pageNumber); 
                    fetchOrders(pageNumber, searchKeyword);
                }}
            /> 
        </AdminLayout>
    );
}

export default ManageOrders;
