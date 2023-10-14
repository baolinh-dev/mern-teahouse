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

    const handleEdit = (userId) => {
        // Handle the event when "Edit" button is clicked
        console.log('Edit user:', userId);
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
        // Handle the event when "Delete" button is clicked
        console.log('Delete user:', userId);
        axios
            .delete(`/api/v1/admin/user/${userId}`)
            .then(() => {
                // Handle success
                console.log('User deleted successfully');
                // Refresh user data or perform any other necessary actions
            })
            .catch((error) => {
                // Handle error
                console.error('Error deleting user:', error);
            });
    };

    const handleEditModalOk = () => {
        form.submit();
    };

    const handleEditModalCancel = () => {
        setIsEditModalVisible(false);
    };

    const handleEditFormFinish = (values) => {
        console.log('Updated user:', values);
        const { name, email, role } = values;
        const newUserData = {
            name,
            email,
            role,
        };

        // Call the API to update user information
        axios
            .put(`/api/v1/admin/user/${selectedUser._id}`, newUserData)
            .then((response) => {
                // Handle success
                toast.success('User updated successfully');
                console.log('User updated successfully');
                setTimeout(() => {
                    window.location.reload();
                }, 1000);
                // Refresh user data or perform any other necessary actions
            })
            .catch((error) => {
                // Handle error
                console.error('Error updating user:', error);
                toast.error('Error updating user');
            });

        setIsEditModalVisible(false);
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

    const dataSource = users.map((user) => ({
        key: user._id,
        avatarUrl: user.avatar?.url || '',
        phoneNumber: user.phoneNumber || 'Chưa có số điện thoại',
        address: user.address || 'Chưa có địa chỉ giao hàng',
        name: user.name || 'Chưa có tên',
        email: user.email || 'Chưa có email',
        role: user.role || 'Chưa phân quyền',
    }));

    return (
        <AdminLayout>
            <Table dataSource={dataSource} columns={columns} />

            <Modal
                title="Edit User"
                visible={isEditModalVisible}
                onOk={handleEditModalOk}
                onCancel={handleEditModalCancel}
            >
                <Form form={form} onFinish={handleEditFormFinish}>
                    <Form.Item name="name" label="Name" rules={[{ required: true, message: 'Please enter a name' }]}>
                        <Input />
                    </Form.Item>

                    <Form.Item
                        name="email"
                        label="Email"
                        rules={[
                            { required: true, message: 'Please enter an email' },
                            { type: 'email', message: 'Invalid email' },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item name="role" label="Role" rules={[{ required: true, message: 'Please select a role' }]}>
                        <Radio.Group>
                            <Radio value="user">User</Radio>
                            <Radio value="admin">Admin</Radio>
                        </Radio.Group>
                    </Form.Item>

                    {/* Add more form fields for other user information */}

                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            Save
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </AdminLayout>
    );
}

export default ManageUser;
