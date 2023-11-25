import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, Button, Space, Popconfirm, Modal, Form, Input, Select } from 'antd'; // Remove Radio import
import AdminLayout from '~/layouts/AdminLayout';
import { toast } from 'react-toastify';
import Pagination from '~/components/Pagination';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from '~/firebase';
import { v4 } from 'uuid';
import { Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import classNames from 'classnames/bind';
import styles from './ManageProducts.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAdd } from '@fortawesome/free-solid-svg-icons';

function ManageProducts() {
    const cx = classNames.bind({ ...styles, container: 'container' });
    const [products, setProducts] = useState([]);
    const [searchKeyword, setSearchKeyword] = useState('');
    const [productCount, setProductCount] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [numberProductsPerPage, setNumberProductsPerPage] = useState(null);

    const [selectedEditProduct, setSelectedEditProduct] = useState(null);
    const [isEditModalVisible, setIsEditModalVisible] = useState(false);
    const [editForm] = Form.useForm();
    const [selectedEditFile, setSelectedEditFile] = useState(null);

    const [selectedAddProduct, setSelectedAddProduct] = useState(null);
    const [isAddModalVisible, setIsAddModalVisible] = useState(false);
    const [addForm] = Form.useForm();
    const [selectedAddFile, setSelectedAddFile] = useState(null);

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
                setSelectedEditProduct(product);
                editForm.setFieldsValue({
                    name: product.name,
                    price: product.price,
                    description: product.description,
                    category: product.category,
                    image: product.images[0].url,
                });
                setIsEditModalVisible(true);
            })
            .catch((error) => {
                console.error('Error fetching product:', error);
            });
    };

    const handleAdd = () => {
        setIsAddModalVisible(true);
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
    const handleAddModalOk = () => {
        addForm.submit();
    };

    const handleEditModalCancel = () => {
        setIsEditModalVisible(false);
    };
    const handleAddModalCancel = () => {
        setIsAddModalVisible(false);
    };

    const handleEditFormFinish = async (values) => {
        const { name, price, description, category, images } = values;
        const newProductData = {
            name,
            price,
            description,
            category,
            images,
        };

        const imageName = v4(); // Generate a unique name for the image
        const storageRef = ref(storage, `products/${imageName}`);

        try {
            await uploadBytes(storageRef, selectedEditFile);

            const imageUrl = await getDownloadURL(storageRef);

            const imagesValue = {
                public_id: imageName,
                url: imageUrl,
            };

            newProductData.images = imagesValue;

            console.log(newProductData);

            axios
                .put(`/api/v1/admin/product/${selectedEditProduct._id}`, newProductData)
                .then((response) => {
                    toast.success('Product updated successfully');
                    setIsEditModalVisible(false);
                    setProducts(
                        products.map((product) =>
                            product._id === selectedEditProduct._id ? response.data.product : product,
                        ),
                    );
                })
                .catch((error) => {
                    console.error('Error updating product:', error);
                    toast.error('Error updating product');
                });
        } catch (error) {
            console.error('Error uploading image:', error);
            toast.error('Error uploading image');
        }
    };
    const handleAddFormFinish = async (values) => {
        const { name, price, description, category, images } = values;
        addForm.setFieldsValue({
            name,
            price,
            description,
            category,
            images,
        });
        const newProductData = {
            name,
            price,
            description,
            category,
            images,
        };

        const imageName = v4(); // Tạo tên duy nhất cho hình ảnh
        const storageRef = ref(storage, `products/${imageName}`);

        try {
            await uploadBytes(storageRef, selectedAddFile);

            const imageUrl = await getDownloadURL(storageRef);

            const imagesValue = {
                public_id: imageName,
                url: imageUrl,
            };

            newProductData.images = imagesValue;

            console.log(newProductData);

            axios
                .post(`/api/v1/admin/product/new`, newProductData)
                .then((response) => {
                    toast.success('Product added successfully');
                    setIsAddModalVisible(false);
                    setProducts([...products, response.data.product]); 
                    addForm.resetFields();
                })
                .catch((error) => {
                    console.error('Error adding product:', error);
                    toast.error('Error adding product');
                });
        } catch (error) {
            console.error('Error uploading image:', error);
            toast.error('Error uploading image');
        }
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
            <div className={cx('options')} style={{ marginBottom: '16px' }}>
                <Input.Search
                    placeholder="Search by name"
                    allowClear
                    enterButton
                    value={searchKeyword}
                    onChange={(e) => setSearchKeyword(e.target.value)}
                    onSearch={() => fetchProducts(currentPage, searchKeyword)}
                />
                <Button type="primary" style={{ marginLeft: '8px' }} onClick={handleAdd}>
                    <FontAwesomeIcon icon={faAdd} />
                </Button>
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
            {/* Modal Edit */}
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
                            <Select.Option value="Nước ngọt">Nước ngọt</Select.Option>
                        </Select>
                    </Form.Item>
                    <Form.Item
                        name="images"
                        label="Image"
                        rules={[{ required: true, message: 'Please upload an image' }]}
                    >
                        <Upload
                            accept="image/*"
                            beforeUpload={(file) => {
                                setSelectedEditFile(file);
                                return false;
                            }}
                            fileList={selectedEditFile ? [selectedEditFile] : []}
                            showUploadList={{
                                showRemoveIcon: false,
                            }}
                        >
                            <Button icon={<UploadOutlined />}>Select Image</Button>
                        </Upload>
                    </Form.Item>
                </Form>
            </Modal>
            {/* Modal Add */}
            <Modal
                title="Add Product"
                visible={isAddModalVisible}
                onOk={handleAddModalOk}
                onCancel={handleAddModalCancel}
            >
                <Form form={addForm} onFinish={handleAddFormFinish}>
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
                            <Select.Option value="Nước ngọt">Nước ngọt</Select.Option>
                        </Select>
                    </Form.Item>
                    <Form.Item
                        name="images"
                        label="Image"
                        rules={[{ required: true, message: 'Please upload an image' }]}
                    >
                        <Upload
                            accept="image/*"
                            beforeUpload={(file) => {
                                setSelectedAddFile(file);
                                return false;
                            }}
                            fileList={selectedAddFile ? [selectedAddFile] : []}
                            showUploadList={{
                                showRemoveIcon: false,
                            }}
                        >
                            <Button icon={<UploadOutlined />}>Select Image</Button>
                        </Upload>
                    </Form.Item>
                </Form>
            </Modal>
        </AdminLayout>
    );
}

export default ManageProducts;
