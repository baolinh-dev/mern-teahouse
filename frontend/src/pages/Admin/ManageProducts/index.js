import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, Button, Space, Popconfirm, Modal, Form, Input } from 'antd'; // Remove Radio import
import AdminLayout from '~/layouts/AdminLayout';
import { toast } from 'react-toastify';
import Pagination from '~/components/Pagination';

function ManageProducts() {
    const [products, setProducts] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [isEditModalVisible, setIsEditModalVisible] = useState(false);
    const [form] = Form.useForm();
    const [searchKeyword, setSearchKeyword] = useState('');
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [productCount, setProductCount] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [numberProductsPerPage, setNumberProductsPerPage] = useState(null);


    const fetchProducts = (currentPage) => {
        axios
            .get(`/api/v1/products?page=${currentPage}`)
            .then((response) => {
                setProducts(response.data.products);
                setNumberProductsPerPage(response.data.numberProductsPerPage);
                setProductCount(response.data.productCount);
            })
            .catch((error) => {
                console.error('Error fetching products:', error);
            });
    };  

    const filterProducts = (products, keyword) => {
        const filteredProducts = products.filter((product) =>
            product.name.toLowerCase().includes(keyword.toLowerCase()),
        );
        setFilteredProducts(filteredProducts);
    }; 

    const handleEdit = (productId) => {
        axios
            .get(`/api/v1/product/${productId}`)
            .then((response) => {
                const product = response.data.product;
                setSelectedProduct(product);
                form.setFieldsValue({
                    name: product.name,
                    price: product.price,
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
        form.submit();
    };

    const handleEditModalCancel = () => {
        setIsEditModalVisible(false);
    };

    const handleEditFormFinish = (values) => {
        const { name, price } = values;
        const newProductData = {
            name,
            price,
            category: selectedProduct.category,
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

    useEffect(() => {
        fetchProducts(currentPage);
    }, [currentPage]);

    useEffect(() => {
        filterProducts(products, searchKeyword);
    }, [products, searchKeyword]);

    const columns = [
        { title: 'Name', dataIndex: 'name', key: 'name' },
        { title: 'Price', dataIndex: 'price', key: 'price' },
        { title: 'Ratings', dataIndex: 'ratings', key: 'ratings' },
        { title: 'Number of Reviews', dataIndex: 'numOfReviews', key: 'numOfReviews' },
        { title: 'Category', dataIndex: 'category', key: 'category' },
        // Remove 'category' field from columns
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

    const dataSource = filteredProducts.map((product) => ({
        key: product._id,
        name: product.name || 'N/A',
        price:
            product.price.toLocaleString('vi-VN', {
                style: 'currency',
                currency: 'VND',
            }) || 'N/A',
        ratings: product.ratings || 'N/A',
        numOfReviews: product.numOfReviews || 'N/A',
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
                />
            </div>
            <Table dataSource={dataSource} columns={columns} pagination={false} />

            <Pagination
                currentPage={currentPage}
                totalPages={Math.ceil(productCount / numberProductsPerPage)}
                onPageChange={(pageNumber) => {
                    setCurrentPage(pageNumber);
                }}
            />

            <Modal
                title="Edit Product"
                visible={isEditModalVisible}
                onOk={handleEditModalOk}
                onCancel={handleEditModalCancel}
            >
                <Form form={form} onFinish={handleEditFormFinish}>
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
                </Form>
            </Modal>
        </AdminLayout>
    );
}

export default ManageProducts;
