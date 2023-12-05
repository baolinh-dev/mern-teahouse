import React, { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import { Table, Button, Space, Popconfirm, Modal, Form, Input, Radio } from 'antd';
import AdminLayout from '~/layouts/AdminLayout';
import { toast } from 'react-toastify';
import Pagination from '~/components/Pagination';
import classNames from 'classnames/bind';
import styles from './ManageNews.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAdd, faPlus } from '@fortawesome/free-solid-svg-icons';

function ManageNews() {
    const cx = classNames.bind({ ...styles, container: 'container' });
    const [news, setNews] = useState([]);
    const [searchKeyword, setSearchKeyword] = useState('');
    const [totalNews, setTotalNews] = useState(null);
    const [numberNewsPerPage, setNumberNewsPerPage] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    // Edit Modal
    const [isEditModalVisible, setIsEditModalVisible] = useState(false);
    const [editForm] = Form.useForm();
    const [selectedEditNews, setSelectedEditNews] = useState(null);
    // Add Modal
    const [isAddModalVisible, setIsAddModalVisible] = useState(false);
    const [addForm] = Form.useForm();

    const fetchNews = useCallback((currentPage, keyword) => {
        axios
            .get(`/api/v1/news?page=${currentPage}&keyword=${keyword}`)
            .then((response) => {
                setNews(response.data.news);
                setTotalNews(response.data.totalNews);
                setNumberNewsPerPage(response.data.numberNewsPerPage);
            })
            .catch((error) => {
                console.error('Error fetching news:', error);
            });
    }, []);

    useEffect(() => {
        fetchNews(currentPage, searchKeyword);
    }, [currentPage, searchKeyword]);

    const handleEdit = (newsId) => {
        console.log('newsId', newsId);
        axios
            .get(`/api/v1/news/${newsId}`)
            .then((response) => {
                const news = response.data.news;
                setSelectedEditNews(news);
                editForm.setFieldsValue({
                    title: news.title,
                    blogUrl: news.blogUrl,
                    imgUrl: news.imgUrl,
                });
                setIsEditModalVisible(true);
            })
            .catch((error) => {
                console.error('Error fetching news:', error);
            });
    };

    const handleEditFormFinish = async (values) => {
        const { imgUrl, blogUrl, title } = values;

        const updatedNewsData = {
            imgUrl,
            blogUrl,
            title,
        };

        try {
            const response = await axios.put(`/api/v1/news/${selectedEditNews._id}`, updatedNewsData);
            toast.success('News updated successfully');
            setIsEditModalVisible(false);
            setNews(news.map((item) => (item._id === selectedEditNews._id ? response.data.news : item)));
        } catch (error) {
            toast.error('Error updating news');
        }
    };

    const handleDelete = (newsId) => {
        axios
            .delete(`/api/v1/news/${newsId}`)
            .then(() => {
                toast.success('News deleted successfully');
                setNews(news.filter((item) => item._id !== newsId));
            })
            .catch((error) => {
                toast.error('Error deleting news');
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

    const handleAddFormFinish = async (values) => {
        const { imgUrl, blogUrl, title } = values;

        const newNewsData = {
            imgUrl,
            blogUrl,
            title,
        };

        try {
            const response = await axios.post(`/api/v1/news`, newNewsData);
            toast.success('News added successfully');
            setIsAddModalVisible(false);
            addForm.resetFields();
            fetchNews(currentPage, searchKeyword);
        } catch (error) {
            console.error('Error adding news:', error);
            toast.error('Error adding news');
        }
    };

    const columns = [
        {
            title: 'Title',
            dataIndex: 'title',
            key: 'title',
        },
        {
            title: 'Image',
            key: 'imgUrl',
            render: (text, record) => <img src={record.imgUrl} alt="News Image" style={{ width: '100px' }} />,
        },
        {
            title: 'Blog URL',
            dataIndex: 'blogUrl',
            key: 'blogUrl',
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

    const dataSource = news.map((newsItem) => ({
        key: newsItem._id,
        imgUrl: newsItem.imgUrl || '',
        blogUrl: newsItem.blogUrl || '',
        title: newsItem.title || '',
    }));

    return (
        <AdminLayout>
          <div>
            <div className={cx('options')}>
              <Input.Search
                placeholder="Search by title"
                allowClear
                enterButton
                value={searchKeyword}
                onChange={(e) => setSearchKeyword(e.target.value)}
                onSearch={() => fetchNews(currentPage, searchKeyword)}
              />
              <Button type="primary" style={{ marginLeft: '8px' }} onClick={() => setIsAddModalVisible(true)}>
                <FontAwesomeIcon icon={faPlus} />
              </Button>
            </div>
            <Table dataSource={dataSource} columns={columns} pagination={false} />
            {totalNews && numberNewsPerPage && (
              <Pagination
                currentPage={currentPage}
                totalPages={Math.ceil(totalNews / numberNewsPerPage)}
                onPageChange={(pageNumber) => {
                  setCurrentPage(pageNumber);
                  fetchNews(pageNumber, searchKeyword);
                }}
              />
            )}
            {/* Modal Edit */}
            <Modal
              title="Edit News"
              visible={isEditModalVisible}
              onOk={handleEditModalOk}
              onCancel={handleEditModalCancel}
            >
              <Form form={editForm} onFinish={handleEditFormFinish}>
                <Form.Item name="title" label="Title" rules={[{ required: true }]}>
                  <Input />
                </Form.Item>
                <Form.Item name="imgUrl" label="Image URL" rules={[{ required: true }]}>
                  <Input />
                </Form.Item>
                <Form.Item name="blogUrl" label="Blog URL" rules={[{ required: true }]}>
                  <Input />
                </Form.Item>
              </Form>
            </Modal>
            {/* Modal Add */}
            <Modal
              title="Add News"
              visible={isAddModalVisible}
              onOk={handleAddModalOk}
              onCancel={handleAddModalCancel}
            >
              <Form form={addForm} onFinish={handleAddFormFinish}>
                <Form.Item name="title" label="Title" rules={[{ required: true }]}>
                  <Input />
                </Form.Item>
                <Form.Item name="imgUrl" label="Image URL" rules={[{ required: true }]}>
                  <Input />
                </Form.Item>
                <Form.Item name="blogUrl" label="Blog URL" rules={[{ required: true }]}>
                  <Input />
                </Form.Item>
              </Form>
            </Modal>
          </div>
        </AdminLayout>
      );
}

export default ManageNews;
