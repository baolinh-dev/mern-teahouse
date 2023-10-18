import React, { useEffect, useState } from 'react';
import { PieChart, Pie, Cell, BarChart } from 'recharts'; 

import classNames from 'classnames/bind';
import styles from './CategoryCountChart.module.scss';
import ContainerHeading from '~/components/ContainerHeading';
import Heading from '~/components/Heading';
const cx = classNames.bind({ ...styles, container: 'container' });

function CategoryCountChart() {
    const [quantityCaphe, setQuantityCaphe] = useState(0);
    const [quantityTraHoaQua, setQuantityTraHoaQua] = useState(0);
    const [quantityBanhNgot, setQuantityBanhNgot] = useState(0);
    const [quantitySmoothies, setQuantitySmoothies] = useState(0);
    const [quantityTraSua, setQuantityTraSua] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const responseCaphe = await fetch('/api/v1/products?category=Cà phê');
                const dataCaphe = await responseCaphe.json();
                setQuantityCaphe(dataCaphe.products.length);

                const responseTraHoaQua = await fetch('/api/v1/products?category=Trà hoa quả');
                const dataTraHoaQua = await responseTraHoaQua.json();
                setQuantityTraHoaQua(dataTraHoaQua.products.length);

                const responseBanhNgot = await fetch('/api/v1/products?category=Bánh ngọt');
                const dataBanhNgot = await responseBanhNgot.json();
                setQuantityBanhNgot(dataBanhNgot.products.length);

                const responseSmoothies = await fetch('/api/v1/products?category=Smoothies');
                const dataSmoothies = await responseSmoothies.json();
                setQuantitySmoothies(dataSmoothies.products.length);

                const responseTraSua = await fetch('/api/v1/products?category=Trà sữa');
                const dataTraSua = await responseTraSua.json();
                setQuantityTraSua(dataTraSua.products.length);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    const data = [
        { name: 'Cà phê', value: quantityCaphe },
        { name: 'Trà hoa quả', value: quantityTraHoaQua },
        { name: 'Bánh ngọt', value: quantityBanhNgot },
        { name: 'Smoothies', value: quantitySmoothies },
        { name: 'Trà sữa', value: quantityTraSua },
    ];

    const colors = ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF']; 

    const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
        const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
        const x = cx + radius * Math.cos(-midAngle * (Math.PI / 180));
        const y = cy + radius * Math.sin(-midAngle * (Math.PI / 180));

        return (
            <text x={x} y={y} fill="black" textAnchor="middle" dominantBaseline="central">
                {`${data[index].name} (${(percent * 100).toFixed(0)}%)`}
            </text>
        );
    };
    return (
        <div className={cx('box')}>
            <div className={cx('container-heading')}>
                <ContainerHeading center>
                    <Heading content={'Category ratio'} />
                </ContainerHeading>
            </div> 

            <PieChart width={400} height={400}>
                <Pie
                    data={data}
                    dataKey="value"
                    cx={200}
                    cy={200}
                    outerRadius={160}
                    fill="#8884d8"
                    labelLine={false}
                    label={renderCustomizedLabel}
                >
                    {data.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                    ))}
                </Pie>
            </PieChart>
        </div>
    );
}

export default CategoryCountChart;
