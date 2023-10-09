import React from 'react';
import { Layout, Breadcrumb } from 'antd';
import { HomeOutlined, DashboardOutlined } from '@ant-design/icons';

const { Content } = Layout;

function AdminDashboard() {
  const breadcrumbItems = [
    { path: '/', breadcrumbName: 'Trang chủ', icon: <HomeOutlined /> },
    { breadcrumbName: 'Dashboard', icon: <DashboardOutlined /> },
  ];

  return (
    <Layout>
      <Breadcrumb>
        {breadcrumbItems.map((item) => (
          <Breadcrumb.Item key={item.breadcrumbName} href={item.path}>
            {item.icon}
            <span>{item.breadcrumbName}</span>
          </Breadcrumb.Item>
        ))}
      </Breadcrumb>
      <Content>
        <h1>Đây là Dashboard</h1>
        {/* Nội dung Dashboard */}
      </Content>
    </Layout>
  );
}

export default AdminDashboard;