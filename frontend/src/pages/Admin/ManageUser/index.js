import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, Button, Space, Popconfirm, Modal, Form, Input, Radio } from 'antd';
import AdminLayout from '~/layouts/AdminLayout';
import { toast } from 'react-toastify';
import Pagination from '~/components/Pagination';
import classNames from 'classnames/bind';
import styles from './ManageUser.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAdd } from '@fortawesome/free-solid-svg-icons';

function ManageUser() {
    const cx = classNames.bind({ ...styles, container: 'container' });
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [isEditModalVisible, setIsEditModalVisible] = useState(false);
    const [form] = Form.useForm();
    const [searchKeyword, setSearchKeyword] = useState('');
    const [totalUsers, setTotalUser] = useState(null);
    const [numberUsersPerPage, setNumberUsersPerPage] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);

    const fetchUsers = (currentPage, keyword) => {
        axios
            .get(`/api/v1/admin/users?page=${currentPage}&keyword=${keyword}`)
            .then((response) => {
                setUsers(response.data.users);
                setTotalUser(response.data.totalUsers);
                setNumberUsersPerPage(response.data.numberUsersPerPage);
            })
            .catch((error) => {
                console.error('Error fetching users:', error);
            });
    };

    useEffect(() => {
        fetchUsers(currentPage, searchKeyword);
    }, [currentPage, searchKeyword]);

    const handleEdit = (userId) => {
        axios
            .get(`/api/v1/admin/user/${userId}`)
            .then((response) => {
                const user = response.data.user;
                setSelectedUser(user);
                form.setFieldsValue({
                    name: user.name,
                    email: user.email,
                    address: user.address,
                    phoneNumber: user.phoneNumber,
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
        const { name, email, address, phoneNumber, role } = values;
        const newUserData = {
            name,
            email,
            address,
            phoneNumber,
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

    const dataSource = users.map((user) => ({
        key: user._id,
        avatarUrl: user.avatar?.url || '',
        phoneNumber: user.phoneNumber || 'N/A',
        address: user.address || 'N/A',
        name: user.name || 'N/A',
        email: user.email || 'N/A',
        role: user.role || 'N/A',
    }));

    return (
        <AdminLayout>
            <div>
                <div className={cx('options')}>
                    <Input.Search
                        placeholder="Search by name"
                        allowClear
                        enterButton
                        value={searchKeyword}
                        onChange={(e) => setSearchKeyword(e.target.value)}
                        onSearch={() => fetchUsers(currentPage, searchKeyword)}
                    />
                    <Button type="primary" style={{ marginLeft: '8px' }}>
                        <FontAwesomeIcon icon={faAdd} />
                    </Button>
                </div>
                <Table dataSource={dataSource} columns={columns} pagination={false} />
                {totalUsers && numberUsersPerPage && (
                    <Pagination
                        currentPage={currentPage}
                        totalPages={Math.ceil(totalUsers / numberUsersPerPage)}
                        onPageChange={(pageNumber) => {
                            setCurrentPage(pageNumber);
                            fetchUsers(pageNumber, searchKeyword);
                        }}
                    />
                )}
                <Modal
                    title="Edit User"
                    visible={isEditModalVisible}
                    onOk={handleEditModalOk}
                    onCancel={handleEditModalCancel}
                >
                    <Form form={form} onFinish={handleEditFormFinish}>
                        <Form.Item name="name" label="Name" rules={[{ required: true }]}>
                            <Input />
                        </Form.Item>
                        <Form.Item name="email" label="Email" rules={[{ required: true, type: 'email' }]}>
                            <Input />
                        </Form.Item>
                        <Form.Item name="address" label="Address" rules={[{ required: true }]}>
                            <Input />
                        </Form.Item>
                        <Form.Item name="phoneNumber" label="Phone Number" rules={[{ required: true }]}>
                            <Input />
                        </Form.Item>
                        <Form.Item name="role" label="Role" rules={[{ required: true }]}>
                            <Radio.Group>
                                <Radio value="admin">Admin</Radio>
                                <Radio value="user">User</Radio>
                            </Radio.Group>
                        </Form.Item>
                    </Form>
                </Modal>
            </div>
        </AdminLayout>
    );
}

export default ManageUser;
