import React, { useEffect, useState } from 'react';
import { PieChart, Pie, Cell, BarChart} from 'recharts';
import AdminLayout from '~/layouts/AdminLayout';

function AdminDashboard() {
  const [quantityCaphe, setQuantityCaphe] = useState(0);
  const [quantityTraHoaQua, setQuantityTraHoaQua] = useState(0);
  const [quantityBanhNgot, setQuantityBanhNgot] = useState(0);
  const [quantitySmoothies, setQuantitySmoothies] = useState(0);
  const [quantityTraSua, setQuantityTraSua] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseCaphe = await fetch('http://localhost:4000/api/v1/products?category=Cà phê');
        const dataCaphe = await responseCaphe.json();
        setQuantityCaphe(dataCaphe.products.length);

        const responseTraHoaQua = await fetch('http://localhost:4000/api/v1/products?category=Trà hoa quả');
        const dataTraHoaQua = await responseTraHoaQua.json();
        setQuantityTraHoaQua(dataTraHoaQua.products.length);

        const responseBanhNgot = await fetch('http://localhost:4000/api/v1/products?category=Bánh ngọt');
        const dataBanhNgot = await responseBanhNgot.json();
        setQuantityBanhNgot(dataBanhNgot.products.length);

        const responseSmoothies = await fetch('http://localhost:4000/api/v1/products?category=Smoothies');
        const dataSmoothies = await responseSmoothies.json();
        setQuantitySmoothies(dataSmoothies.products.length);

        const responseTraSua = await fetch('http://localhost:4000/api/v1/products?category=Trà sữa');
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

  const colors = ['#FF0000', '#00FF00', '#0000FF', '#FFFF00', '#FF00FF'];

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
    <AdminLayout heading="Dashboard">
      <h1>Biểu đồ số lượng sản phẩm mỗi danh mục</h1>
      <PieChart width={800} height={800}>
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
    </AdminLayout>
  );
}

export default AdminDashboard;