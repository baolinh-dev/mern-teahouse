import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, Button, Space, Popconfirm, Modal, Form, Input, Radio } from 'antd';
import AdminLayout from '~/layouts/AdminLayout';
import { toast } from 'react-toastify';

function ManageUser() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [searchKeyword, setSearchKeyword] = useState("");
  const [filteredUsers, setFilteredUsers] = useState([]);

  useEffect(() => {
    axios
      .get('/api/v1/admin/users')
      .then((response) => {
        setUsers(response.data.users);
      })
      .catch((error) => {
        console.error('Error fetching users:', error);
      });
  }, []);

  useEffect(() => {
    filterUsers(users, searchKeyword);
  }, [users, searchKeyword]);

  const filterUsers = (users, keyword) => {
    const filteredUsers = users.filter(user =>
      user.name.toLowerCase().includes(keyword.toLowerCase())
    );
    setFilteredUsers(filteredUsers);
  };

  const handleEdit = (userId) => {
    axios
      .get(`/api/v1/admin/user/${userId}`)
      .then((response) => {
        const user = response.data.user;
        setSelectedUser(user);
        form.setFieldsValue({
          name: user.name,
          email: user.email,
          role: user.role,
        });
        setIsEditModalVisible(true);
      })
      .catch((error) => {
        console.error('Error fetching user:', error);
      });
  };

  const handleDelete = (userId) => {
    axios
      .delete(`/api/v1/admin/user/${userId}`)
      .then(() => {
        toast.success('User deleted successfully');
        setUsers(users.filter((user) => user._id !== userId));
      })
      .catch((error) => {
        console.error('Error deleting user:', error);
        toast.error('Error deleting user');
      });
  };

  const handleEditModalOk = () => {
    form.submit();
  };

  const handleEditModalCancel = () => {
    setIsEditModalVisible(false);
  };

  const handleEditFormFinish = (values) => {
    const { name, email, role } = values;
    const newUserData = {
      name,
      email,
      role,
    };

    axios
      .put(`/api/v1/admin/user/${selectedUser._id}`, newUserData)
      .then((response) => {
        toast.success('User updated successfully');
        setIsEditModalVisible(false);
        setUsers(users.map((user) => (user._id === selectedUser._id ? response.data.user : user)));
      })
      .catch((error) => {
        console.error('Error updating user:', error);
        toast.error('Error updating user');
      });
  };

  const columns = [
    {
      title: 'Avatar',
      dataIndex: 'avatarUrl',
      key: 'avatarUrl',
      render: (avatarUrl) => (
        <img
          src={avatarUrl}
          alt="Avatar"
          style={{
            width: '60px',
            height: '60px',
            borderRadius: '50%',
            padding: '2px',
            border: '1px solid #ccc',
          }}
        />
      ),
    },
    { title: 'Phone Number', dataIndex: 'phoneNumber', key: 'phoneNumber' },
    { title: 'Address', dataIndex: 'address', key: 'address' },
    { title: 'Name', dataIndex: 'name', key: 'name' },
    { title: 'Email', dataIndex: 'email', key: 'email' },
    { title: 'Role', dataIndex: 'role', key: 'role' },
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <Space size="middle">
          <Button type="primary" onClick={() => handleEdit(record.key)}>
            Edit
          </Button>
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

  const dataSource = filteredUsers.map((user) => ({
    key: user._id,
    avatarUrl: user.avatar?.url || '',
    phoneNumber: user.phoneNumber || 'N/A',
    address: user.address || 'N/A',
    name: user.name || 'N/A',
    email: user.email || 'N/A',
    role: user.role || 'N/A',
  })); 

  console.log("filteredUsers", filteredUsers);

  return (
    <AdminLayout>
      <div style={{ marginBottom: '16px' }}>
        <Input.Search
          placeholder="Search by name"
          allowClear
          enterButton
          value={searchKeyword}
          onChange={(e) => setSearchKeyword(e.target.value)}
        /> 
        
      </div>
      <Table dataSource={dataSource} columns={columns} pagination={false} />

      <Modal
        title="Edit User"
        visible={isEditModalVisible}
        onOk={handleEditModalOk}
        onCancel={handleEditModalCancel}
      >
        <Form form={form} onFinish={handleEditFormFinish} layout="vertical">
          <Form.Item
            name="name"
            label="Name"
            rules={[{ required: true, message: 'Please enter a name' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="email"
            label="Email"
            rules={[{ required: true, message: 'Please enter an email' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item name="role" label="Role">
            <Radio.Group>
              <Radio value="admin">Admin</Radio>
              <Radio value="user">User</Radio>
            </Radio.Group>
          </Form.Item>
        </Form>
      </Modal>
    </AdminLayout>
  );
}

export default ManageUser;