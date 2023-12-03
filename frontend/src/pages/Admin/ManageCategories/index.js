import React, { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import { Table, Button, Space, Popconfirm, Modal, Form, Input, Radio } from 'antd';
import AdminLayout from '~/layouts/AdminLayout';
import { toast } from 'react-toastify';
import Pagination from '~/components/Pagination';
import classNames from 'classnames/bind';
import styles from './ManageCategories.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAdd } from '@fortawesome/free-solid-svg-icons';

function ManageCategories() {
    const cx = classNames.bind({ ...styles, container: 'container' });
    const [categories, setCategories] = useState([]);
    const [searchKeyword, setSearchKeyword] = useState('');
    const [totalCategory, setTotalCategory] = useState(null);
    const [numberCategoriesPerPage, setNumberCategoriesPerPage] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    // Edit Modal
    const [isEditModalVisible, setIsEditModalVisible] = useState(false);
    const [editForm] = Form.useForm();
    const [selectedEditCategory, setSelectedEditCategory] = useState(null);
    // Add Modal
    const [isAddModalVisible, setIsAddModalVisible] = useState(false);
    const [addForm] = Form.useForm();

    const fetchCategories = (currentPage, keyword) => {
        axios
            .get(`/api/v1/categories?page=${currentPage}&keyword=${keyword}`)
            .then((response) => {
                setCategories(response.data.categories);
                setTotalCategory(response.data.totalCategories);
                setNumberCategoriesPerPage(response.data.numberCategoriesPerPage);
            })
            .catch((error) => {
                console.error('Error fetching users:', error);
            });
    };

    useEffect(() => {
        fetchCategories(currentPage, searchKeyword);
    }, [currentPage, searchKeyword]);

    const handleEdit = (categoryId) => {
        console.log('categoryId', categoryId);
        axios
            .get(`/api/v1/category/${categoryId}`)
            .then((response) => {
                const category = response.data.category;
                setSelectedEditCategory(category);
                editForm.setFieldsValue({
                    name: category.name,
                });
                setIsEditModalVisible(true);
            })
            .catch((error) => {
                console.error('Error fetching category:', error);
            });
    };

    const handleDelete = (categoryId) => {
        axios
            .delete(`/api/v1/category/${categoryId}`)
            .then(() => {
                toast.success('Category deleted successfully');
                setCategories(categories.filter((category) => category._id !== categoryId));
            })
            .catch((error) => {
                toast.error('Error deleting category');
            });
    };

    const handleEditModalOk = () => {
        editForm.submit();
    };

    const handleEditModalCancel = () => {
        setIsEditModalVisible(false);
    };

    const handleAddModalOk = () => {
        addForm.submit();
    };

    const handleAddModalCancel = () => {
        setIsAddModalVisible(false);
    };

    const handleEditFormFinish = async (values) => {
        const { name } = values;

        const newCategoryData = {
            name,
        };

        axios
            .put(`/api/v1/category/${selectedEditCategory._id}`, newCategoryData)
            .then((response) => {
                toast.success('Category updated successfully');
                setIsEditModalVisible(false);
                setCategories(
                    categories.map((category) =>
                        category._id === selectedEditCategory._id ? response.data.category : category,
                    ),
                );
            })
            .catch((error) => {
                toast.error('Error updating category');
            });
    };
    const handleAddFormFinish = async (values) => {
        const { name } = values;

        addForm.setFieldsValue({
            name,
        });

        const newCategoryData = {
            name,
        };

        axios
            .post(`/api/v1/category`, newCategoryData)
            .then((response) => {
                toast.success('Category added successfully');
                setIsAddModalVisible(false);
                addForm.resetFields();
                fetchCategories(currentPage, searchKeyword);
            })
            .catch((error) => {
                console.error('Error updating category:', error);
                toast.error('Error updating category');
            });
    };

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
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

    const dataSource = categories.map((category) => ({
        key: category._id,
        name: category.name || '',
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
                        onSearch={() => fetchCategories(currentPage, searchKeyword)}
                    />
                    <Button type="primary" style={{ marginLeft: '8px' }} onClick={() => setIsAddModalVisible(true)}>
                        <FontAwesomeIcon icon={faAdd} />
                    </Button>
                </div>
                <Table dataSource={dataSource} columns={columns} pagination={false} />
                {totalCategory && numberCategoriesPerPage && (
                    <Pagination
                        currentPage={currentPage}
                        totalPages={Math.ceil(totalCategory / numberCategoriesPerPage)}
                        onPageChange={(pageNumber) => {
                            setCurrentPage(pageNumber);
                            fetchCategories(pageNumber, searchKeyword);
                        }}
                    />
                )}
                {/* Modal Edit */}
                <Modal
                    title="Edit Category"
                    visible={isEditModalVisible}
                    onOk={handleEditModalOk}
                    onCancel={handleEditModalCancel}
                >
                    <Form form={editForm} onFinish={handleEditFormFinish}>
                        <Form.Item name="name" label="Name" rules={[{ required: true }]}>
                            <Input />
                        </Form.Item>
                    </Form>
                </Modal>
                {/* Modal Add */}
                <Modal
                    title="Add Category"
                    visible={isAddModalVisible}
                    onOk={handleAddModalOk}
                    onCancel={handleAddModalCancel}
                >
                    <Form form={addForm} onFinish={handleAddFormFinish}>
                        <Form.Item name="name" label="Name" rules={[{ required: true }]}>
                            <Input />
                        </Form.Item>
                    </Form>
                </Modal>
            </div>
        </AdminLayout>
    );
}

export default ManageCategories;
