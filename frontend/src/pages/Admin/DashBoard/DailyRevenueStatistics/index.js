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
        axios
            .get('/api/v1/admin/orders?page=all')
            .then((response) => {
                const orders = response.data.orders;

                const revenueByDate = [];

                orders.forEach((order) => {
                    const date = format(new Date(order.dateOrder), 'MM/dd');
                    const revenue = order.totalProductPrice;

                    const existingDate = revenueByDate.find((item) => item.date === date);

                    if (existingDate) {
                        existingDate.revenue += revenue;
                    } else {
                        revenueByDate.push({ date, revenue });
                    }
                });

                const latest10Days = revenueByDate
                    .sort((a, b) => new Date(b.date) - new Date(a.date)) 
                    .slice(0, 10)
                    .reverse();

                setRevenueData(latest10Days);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }, []);

    console.log('revenueDataDaily', revenueData);

    return (
        <div className={cx('box')}>
            <div className={cx('container-heading')}>
                <ContainerHeading center>
                    <Heading content={'Daily Revenue Statistics'} />
                </ContainerHeading>
            </div>
            <div className={cx('chart')}>
                <BarChart width={800} height={300} data={revenueData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" domain={[revenueData.length - 1, 0]} />
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
