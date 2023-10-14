import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { format, parse, differenceInMonths } from 'date-fns';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Cell, ReferenceLine, LabelList } from 'recharts';

import classNames from 'classnames/bind';
import styles from './MonthlyRevenueStatistics.module.scss';
import ContainerHeading from '~/components/ContainerHeading';
import Heading from '~/components/Heading';
const cx = classNames.bind({ ...styles, container: 'container' });

const MonthlyRevenueStatistics = () => {
    const [revenueData, setRevenueData] = useState([]);

    useEffect(() => {
        // Call API to get the list of orders
        axios
            .get('/api/v1/admin/orders')
            .then((response) => {
                const orders = response.data.orders;

                console.log('orders', orders);

                // Create an array to store the revenue statistics by month
                const revenueByMonth = [];

                // Loop through the orders array
                orders.forEach((order) => {
                    const month = format(new Date(order.dateOrder), 'MM/yyyy'); // Format the date to "MM/yyyy"
                    const revenue = order.totalProductPrice;

                    // Check if the month already exists in the revenue statistics array
                    const existingMonth = revenueByMonth.find((item) => item.month === month);

                    if (existingMonth) {
                        // If the month already exists, add the revenue to the total revenue
                        existingMonth.revenue += revenue;
                    } else {
                        // If the month doesn't exist, create a new entry in the revenue statistics array
                        revenueByMonth.push({ month, revenue });
                    }
                });

                setRevenueData(revenueByMonth);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }, []);

    // Create an array to store the information for the 12 months of 2023
    const currentMonth = new Date().getMonth() + 1; // Get the current month number
    const monthsOfYear = Array.from(Array(12).keys()).map((monthOffset) => {
        const date = new Date(2023, currentMonth - 1 + monthOffset, 1);
        return { month: format(date, 'MM/yyyy'), revenue: 0 };
    });

    // Sort the merged data by month in ascending order
    const mergedData = [...monthsOfYear, ...revenueData].sort((a, b) => {
        const dateA = parse(a.month, 'MM/yyyy', new Date());
        const dateB = parse(b.month, 'MM/yyyy', new Date());
        return dateA - dateB;
    });

    // Remove the duplicate October month, if it exists
    let finalData = mergedData;
    const octoberIndex = mergedData.findIndex((item, index) => {
        if (item.month === '10/2023' && index !== mergedData.length - 1) {
            return item.month === mergedData[index + 1].month;
        }
        return false;
    });

    if (octoberIndex !== -1) {
        finalData = [...mergedData.slice(0, octoberIndex), ...mergedData.slice(octoberIndex + 1)];
    }

    return (
        <div className={cx('box')}>
            <div className={cx('container-heading')}>
                <ContainerHeading center>
                    <Heading content={'Monthly Revenue Statistics'} />
                </ContainerHeading>
            </div>
            <div className={cx('chart')}>
                <BarChart width={1200} height={300} data={finalData}>
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