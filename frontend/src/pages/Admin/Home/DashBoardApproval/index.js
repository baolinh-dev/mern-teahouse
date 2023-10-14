import React, { useEffect, useState } from 'react';
import ContainerHeading from '~/components/ContainerHeading';
import Heading from '~/components/Heading';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Cell, ReferenceLine, LabelList } from 'recharts';

import classNames from 'classnames/bind';
import styles from './DashBoardApproval.module.scss';
const cx = classNames.bind({ ...styles, container: 'container' });

function DashboardApproval() {
    const [deliveredCount, setDeliveredCount] = useState(0);
    const [cancelledCount, setCancelledCount] = useState(0);
    const [refundedCount, setRefundedCount] = useState(0);
    const [processingCount, setProcessingCount] = useState(0);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await fetch('/api/v1/admin/orders');
                const data = await response.json();

                let statusCount = {
                    Delivered: 0,
                    Cancelled: 0,
                    Refunded: 0,
                    Processing: 0,
                };

                data.orders.forEach((order) => {
                    const status = order.orderInfo.status;
                    if (statusCount.hasOwnProperty(status)) {
                        statusCount[status]++;
                    }
                });

                setDeliveredCount(statusCount.Delivered);
                setCancelledCount(statusCount.Cancelled);
                setRefundedCount(statusCount.Refunded);
                setProcessingCount(statusCount.Processing);
            } catch (error) {
                console.error('Error fetching orders:', error);
            }
        };

        fetchOrders();
    }, []);

    const data = [
        { status: 'Delivered', count: deliveredCount, color: '#00b74c' },
        { status: 'Cancelled', count: cancelledCount, color: '#ff032f' },
        { status: 'Refunded', count: refundedCount, color: '#ffca00' },
        { status: 'Processing', count: processingCount, color: '#344bff' },
    ];

    return (
        <div className={cx('dashboard-approval')}>
            <div className={cx('container-heading')}>
                <ContainerHeading center>
                    <Heading content={'Status Chart'} />
                </ContainerHeading>
            </div>
            <div className={cx('chart')}>
                <BarChart width={300} height={300} data={data} barGap={2}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="status" />  
                    <YAxis allowDecimals={false} />
                    <Bar dataKey="count" className={cx('bar')}>
                        {data.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                    </Bar> 
                    <LabelList dataKey="count" position="insideTop" fill="" />

                    {data.map((entry, index) => (
                        <ReferenceLine
                            key={`reference-line-${index}`}
                            y={entry.count}
                            stroke={entry.color}
                            strokeDasharray="3 3"
                            label={{ position: 'insideTop', value: `${entry.count}`, fill: entry.color }}
                        />
                    ))} 
                </BarChart>
            </div>
        </div>
    );
}

export default DashboardApproval;
