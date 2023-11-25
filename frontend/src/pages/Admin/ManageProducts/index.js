import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, Button, Space, Popconfirm, Modal, Form, Input, Select } from 'antd'; // Remove Radio import
import AdminLayout from '~/layouts/AdminLayout';
import { toast } from 'react-toastify';
import Pagination from '~/components/Pagination';

function ManageProducts() {
    const [products, setProducts] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [isEditModalVisible, setIsEditModalVisible] = useState(false);
    const [editForm] = Form.useForm();
    const [searchKeyword, setSearchKeyword] = useState('');
    const [productCount, setProductCount] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [numberProductsPerPage, setNumberProductsPerPage] = useState(null);

    const fetchProducts = (currentPage, keyword) => {
        axios
            .get(`/api/v1/products?page=${currentPage}&keyword=${keyword}`)
            .then((response) => {
                setProducts(response.data.products);
                setNumberProductsPerPage(response.data.numberProductsPerPage);
                setProductCount(response.data.productCount);
            })
            .catch((error) => {
                console.error('Error fetching products:', error);
            });
    };

    useEffect(() => {
        fetchProducts(currentPage, searchKeyword);
    }, [currentPage, searchKeyword]);

    const handleEdit = (productId) => {
        axios
            .get(`/api/v1/product/${productId}`)
            .then((response) => {
                const product = response.data.product;
                setSelectedProduct(product);
                editForm.setFieldsValue({
                    name: product.name,
                    price: product.price,  
                    description: product.description, 
                    category: product.category, 
                    image: product.images[0].url
                });
                setIsEditModalVisible(true);
            })
            .catch((error) => {
                console.error('Error fetching product:', error);
            });
    };

    const handleDelete = (productId) => {
        console.log(productId);
        axios
            .delete(`/api/v1/admin/product/${productId}`)
            .then(() => {
                toast.success('Product deleted successfully');
                setProducts(products.filter((product) => product._id !== productId));
            })
            .catch((error) => {
                console.error('Error deleting product:', error);
                toast.error('Error deleting product');
            });
    };

    const handleEditModalOk = () => {
        editForm.submit();
    };

    const handleEditModalCancel = () => {
        setIsEditModalVisible(false);
    };

    const handleEditFormFinish = (values) => {
        const { name, price, description, category, image } = values;
        const newProductData = {
            name,
            price, 
            description, 
            category,  
            image
        };

        axios
            .put(`/api/v1/admin/product/${selectedProduct._id}`, newProductData)
            .then((response) => {
                toast.success('Product updated successfully');
                setIsEditModalVisible(false);
                setProducts(
                    products.map((product) => (product._id === selectedProduct._id ? response.data.product : product)),
                );
            })
            .catch((error) => {
                console.error('Error updating product:', error);
                toast.error('Error updating product');
            });
    };

    // Data to pass into UI
    const columns = [
        { title: 'Name', dataIndex: 'name', key: 'name' },
        { title: 'Price', dataIndex: 'price', key: 'price' },
        { title: 'Ratings', dataIndex: 'ratings', key: 'ratings' },
        { title: 'Number of Reviews', dataIndex: 'numOfReviews', key: 'numOfReviews' },
        { title: 'Description', dataIndex: 'description', key: 'description' },
        { title: 'Category', dataIndex: 'category', key: 'category' },
        {
            title: 'Images',
            dataIndex: 'images',
            key: 'images',
            render: (images) => (
                <div>
                    {images.map((image) => (
                        <img
                            key={image._id}
                            src={image.url}
                            alt={image.public_id}
                            style={{ width: '50px', height: '50px', objectFit: 'cover' }}
                        />
                    ))}
                </div>
            ),
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

    const dataSource = products.map((product) => ({
        key: product._id,
        name: product.name || 'N/A',
        price:
            product.price.toLocaleString('vi-VN', {
                style: 'currency',
                currency: 'VND',
            }) || 'N/A',
        ratings: product.ratings || 'N/A',
        numOfReviews: product.numOfReviews || 'N/A',
        description: product.description || 'N/A',
        category: product.category || 'N/A',
        images: product.images || [],
    }));

    return (
        <AdminLayout>
            <div style={{ marginBottom: '16px' }}>
                <Input.Search
                    placeholder="Search by name"
                    allowClear
                    enterButton
                    value={searchKeyword}
                    onChange={(e) => setSearchKeyword(e.target.value)}
                    onSearch={() => fetchProducts(currentPage, searchKeyword)}
                />
            </div>
            <Table dataSource={dataSource} columns={columns} pagination={false} />

            <Pagination
                currentPage={currentPage}
                totalPages={Math.ceil(productCount / numberProductsPerPage)}
                onPageChange={(pageNumber) => {
                    setCurrentPage(pageNumber);
                    fetchProducts(pageNumber, searchKeyword);
                }}
            />

            <Modal
                title="Edit Product"
                visible={isEditModalVisible}
                onOk={handleEditModalOk}
                onCancel={handleEditModalCancel}
            >
                <Form form={editForm} onFinish={handleEditFormFinish}>
                    <Form.Item
                        name="name"
                        label="Name"
                        rules={[{ required: true, message: 'Please enter the product name' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="price"
                        label="Price"
                        rules={[{ required: true, message: 'Please enter the product price' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="description"
                        label="Description"
                        rules={[{ required: true, message: 'Please enter the product description' }]}
                    >
                        <Input.TextArea />
                    </Form.Item>
                    <Form.Item name="category" label="Category">
                        <Select>
                            <Select.Option value="Trà hoa quả">Trà hoa quả</Select.Option>
                            <Select.Option value="Cà phê">Cà phê</Select.Option>
                            <Select.Option value="Bánh ngọt">Bánh ngọt</Select.Option>
                            <Select.Option value="Smoothies">Smoothies</Select.Option>
                            <Select.Option value="Trà sữa">Trà sữa</Select.Option>
                        </Select>
                    </Form.Item>
                    <Form.Item
                        name="image"
                        label="Image"
                        rules={[{ required: true, message: 'Please enter the product image' }]}
                    >
                        <Input />
                    </Form.Item>
                </Form>
            </Modal>
        </AdminLayout>
    );
}

export default ManageProducts;
