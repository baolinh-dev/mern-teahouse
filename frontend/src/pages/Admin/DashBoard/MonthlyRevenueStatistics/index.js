import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { format } from 'date-fns';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Cell, LabelList } from 'recharts';
import classNames from 'classnames/bind';
import styles from './MonthlyRevenueStatistics.module.scss';
import ContainerHeading from '~/components/ContainerHeading';
import Heading from '~/components/Heading';
const cx = classNames.bind({ ...styles, container: 'container' });

const MonthlyRevenueStatistics = () => {
    const currentYear = new Date().getFullYear();
    const [revenueData, setRevenueData] = useState([]);
    const [selectedYear, setSelectedYear] = useState(currentYear.toString());

    useEffect(() => {
        if (selectedYear) {
            // Gọi API để lấy danh sách đơn hàng
            axios
                .get(`/api/v1/admin/orders?page=all`)
                .then((response) => {
                    const orders = response.data.orders;
                    console.log('orders', orders);
                    console.log('selectedYear', selectedYear);

                    const revenueByMonth = Array.from({ length: 12 }, (_, index) => {
                        const month = index + 1;
                        const year = parseInt(selectedYear);
                        const formattedMonth = `${month}/${year}`;
                        return { month: formattedMonth, revenue: 0 };
                    });

                    orders.forEach((order) => {
                        const orderDate = new Date(order.dateOrder);
                        const month = orderDate.getMonth();
                        const year = orderDate.getFullYear();
                        const formattedMonth = year === parseInt(selectedYear) ? `${month + 1}/${year}` : null;

                        if (formattedMonth) {
                            const monthIndex = month === 12 ? 0 : month;
                            revenueByMonth[monthIndex].revenue += order.totalProductPrice;
                        }
                    });

                    setRevenueData(revenueByMonth);
                })
                .catch((error) => {
                    console.error('Lỗi:', error);
                });
        }
    }, [selectedYear]);

    useEffect(() => {
        // Reset revenueData khi selectedYear thay đổi
        setRevenueData([]);
    }, [selectedYear]);

    const handleYearSelect = (event) => {
        const selectedYear = event.target.value;
        setSelectedYear(selectedYear);
    };

    return (
        <div className={cx('box')}>
            <div className={cx('container-heading')}>
                <ContainerHeading center>
                    <Heading content={'MONTHLY REVENUE STATISTICS'} />
                </ContainerHeading>
            </div>
            <div className={cx('select-year')}>
                <p>Lựa chọn năm: </p>
                <select onChange={handleYearSelect} value={selectedYear}>
                    <option value={currentYear.toString()}>{currentYear}</option>
                    <option value="2024">2024</option>
                    <option value="2025">2025</option>
                    <option value="2025">2025</option>
                    <option value="2026">2026</option>
                    <option value="2027">2027</option>
                    <option value="2028">2028</option>
                    <option value="2029">2029</option>
                    <option value="2030">2030</option>
                </select>
            </div>

            <div className={cx('chart')}>
                <BarChart width={1200} height={300} data={revenueData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
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

export default MonthlyRevenueStatistics;
