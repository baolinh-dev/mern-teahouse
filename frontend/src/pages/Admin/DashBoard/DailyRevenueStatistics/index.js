import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { format } from 'date-fns';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Cell, LabelList } from 'recharts'; 

import classNames from 'classnames/bind';
import styles from './DailyRevenueStatistics.module.scss';
import ContainerHeading from '~/components/ContainerHeading';
import Heading from '~/components/Heading';
const cx = classNames.bind({ ...styles, container: 'container' });

const DailyRevenueStatistics = () => {
    const [revenueData, setRevenueData] = useState([]);

    useEffect(() => {
        // Gọi API để lấy danh sách đơn hàng
        axios
            .get('/api/v1/admin/orders?page=all')
            .then((response) => {
                const orders = response.data.orders;

                console.log('orders', orders);

                // Tạo một mảng để lưu trữ thông tin thống kê theo ngày
                const revenueByDate = [];

                // Lặp qua mảng đơn hàng
                orders.forEach((order) => {
                    const date = format(new Date(order.dateOrder), 'dd/MM'); // Định dạng lại ngày thành "/MM/dd"
                    const revenue = order.totalProductPrice; 

                    // Kiểm tra xem ngày đã tồn tại trong mảng thống kê chưa
                    const existingDate = revenueByDate.find((item) => item.date === date);

                    if (existingDate) {
                        // Nếu ngày đã tồn tại, cộng thêm doanh thu vào tổng doanh thu
                        existingDate.revenue += revenue;
                    } else {
                        // Nếu ngày chưa tồn tại, tạo một mục mới trong mảng thống kê
                        revenueByDate.push({ date, revenue });
                    }
                });

                setRevenueData(revenueByDate);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }, []);

    // Lấy 7 ngày mới nhất từ mảng revenueData
    const latest7Days = revenueData.slice(-7);

    return (
        <div className={cx('box')}>
            <div className={cx('container-heading')}>
                <ContainerHeading center>
                    <Heading content={'Daily Revenue Statistics'} />
                </ContainerHeading>
            </div>
            <div className={cx('chart')}>
                <BarChart width={500} height={300} data={latest7Days}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Bar dataKey="revenue" fill="#4d8a54">
                        <LabelList dataKey="revenue" position="top" />
                        <Cell fill="#4d8a54" />
                    </Bar>
                </BarChart>
            </div>
        </div>
    );
};

export default DailyRevenueStatistics;
