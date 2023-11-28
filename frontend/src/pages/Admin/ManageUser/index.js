import React, { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import { Table, Button, Space, Popconfirm, Modal, Form, Input, Radio, Select } from 'antd';
import AdminLayout from '~/layouts/AdminLayout';
import { toast } from 'react-toastify';
import Pagination from '~/components/Pagination';
import classNames from 'classnames/bind';
import styles from './ManageUser.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAdd } from '@fortawesome/free-solid-svg-icons';
// Upload
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from '~/firebase';
import { v4 } from 'uuid';
import { Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

function ManageUser() {
    const cx = classNames.bind({ ...styles, container: 'container' });
    const [users, setUsers] = useState([]);
    const [searchKeyword, setSearchKeyword] = useState('');
    const [totalUsers, setTotalUser] = useState(null);
    const [numberUsersPerPage, setNumberUsersPerPage] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    // Edit
    const [isEditModalVisible, setIsEditModalVisible] = useState(false);
    const [editForm] = Form.useForm();
    const [selectedEditUser, setSelectedEditUser] = useState(null);
    const [selectedEditFile, setSelectedEditFile] = useState(null);
    // Add
    const [isAddModalVisible, setIsAddModalVisible] = useState(false);
    const [addForm] = Form.useForm();
    const [selectedAddFile, setSelectedAddFile] = useState(null);
    // address
    const host = 'https://provinces.open-api.vn/api/';
    const [provinces, setProvinces] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [wards, setWards] = useState([]);
    const [selectedProvince, setSelectedProvince] = useState('');
    const [selectedDistrict, setSelectedDistrict] = useState('');
    const [selectedWard, setSelectedWard] = useState('');
    const [houseNumber, setHouseNumber] = useState('');
    const [editAddressConplete, setEditAddressConplete] = useState('');
    const [addAddressConplete, setAddAddressConplete] = useState('');

    console.log('selectedAddFile', selectedAddFile);

    const callAPI = async (api, renderCallback) => {
        try {
            const response = await axios.get(api);
            renderCallback(response.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const renderData = (array, select) => {
        const row = array.map((element) => (
            <option key={element.code} value={element.code}>
                {element.name}
            </option>
        ));
        select === 'province' ? setProvinces(row) : select === 'district' ? setDistricts(row) : setWards(row);
    };

    const createFullAddress = useCallback(() => {
        let address = '';

        if (houseNumber !== '') {
            address += `${houseNumber} | `;
        }

        if (selectedProvince !== '') {
            const provinceOption = document.querySelector(`#province option[value="${selectedProvince}"]`);
            address += provinceOption.textContent;
        }

        if (selectedDistrict !== '') {
            const districtOption = document.querySelector(`#district option[value="${selectedDistrict}"]`);
            address += ` | ${districtOption.textContent}`;
        }

        if (selectedWard !== '') {
            const wardOption = document.querySelector(`#ward option[value="${selectedWard}"]`);
            address += ` | ${wardOption.textContent}`;
        }

        return address;
    }, [houseNumber, selectedProvince, selectedDistrict, selectedWard]);

    useEffect(() => {
        const updatedAddress = createFullAddress();

        editForm.setFieldsValue({
            address: updatedAddress,
        });

        addForm.setFieldsValue({
            address: updatedAddress,
        });

        setEditAddressConplete(updatedAddress);
        setAddAddressConplete(updatedAddress);

        console.log('updatedAddress', updatedAddress);
    }, [houseNumber, selectedProvince, selectedDistrict, selectedWard, createFullAddress]);

    useEffect(() => {
        // Lấy danh sách tỉnh/thành phố và render vào select box
        callAPI(host + '?depth=1', (data) => renderData(data, 'province'));
    }, []);

    // Xử lý sự kiện thay đổi select box tỉnh/thành phố
    const handleProvinceChange = (e) => {
        setSelectedProvince(e.target.value);
        setSelectedDistrict('');
        setSelectedWard('');
        callAPI(host + 'p/' + e.target.value + '?depth=2', (data) => renderData(data.districts, 'district'));
    };

    // Xử lý sự kiện thay đổi select box quận/huyện
    const handleDistrictChange = (e) => {
        setSelectedDistrict(e.target.value);
        setSelectedWard('');
        callAPI(host + 'd/' + e.target.value + '?depth=2', (data) => renderData(data.wards, 'ward'));
    };

    // Xử lý sự kiện thay đổi select box phường/xã
    const handleWardChange = (e) => {
        setSelectedWard(e.target.value);
    };

    // Xử lý sự kiện thay đổi input số nhà
    const handleHouseNumberChange = (e) => {
        setHouseNumber(e.target.value);
    };

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
                setSelectedEditUser(user);
                editForm.setFieldsValue({
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
    const handleAdd = () => {};

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
        const { name, email, address, phoneNumber, role } = values;

        const newUserData = {
            name,
            email,
            address,
            phoneNumber,
            role,
        };

        const imageName = v4(); // Tạo tên duy nhất cho hình ảnh
        const storageRef = ref(storage, `profile-images/${imageName}`);

        try {
            await uploadBytes(storageRef, selectedEditFile);

            const imageUrl = await getDownloadURL(storageRef);

            const avatarValue = {
                public_id: imageName,
                url: imageUrl,
            };

            newUserData.avatar = avatarValue;

            console.log('selectedEditUser._id', selectedEditUser._id);

            console.log('newUserData', newUserData);

            axios
                .put(`/api/v1/admin/user/${selectedEditUser._id}`, newUserData)
                .then((response) => {
                    toast.success('User updated successfully');
                    setIsEditModalVisible(false);
                    setUsers(users.map((user) => (user._id === selectedEditUser._id ? response.data.user : user)));
                })
                .catch((error) => {
                    console.error('Error updating user:', error);
                    toast.error('Error updating user');
                });
        } catch (error) {
            console.error('Error uploading image:', error);
            toast.error('Error uploading image');
        }
    };
    const handleAddFormFinish = async (values) => {
        const { name, email, address, password, phoneNumber, role } = values;

        addForm.setFieldsValue({
            name,
            email,
            password,
            address,
            phoneNumber,
            role,
        });

        const newUserData = {
            name,
            email,
            password,
            address,
            phoneNumber,
            role,
        };

        const imageName = v4(); // Tạo tên duy nhất cho hình ảnh
        const storageRef = ref(storage, `profile-images/${imageName}`);

        try {
            await uploadBytes(storageRef, selectedAddFile);

            const imageUrl = await getDownloadURL(storageRef);

            const avatarValue = {
                public_id: imageName,
                url: imageUrl,
            };

            newUserData.avatar = avatarValue;

            console.log('newUserData', newUserData);

            axios
                .post(`/api/v1/admin/user/`, newUserData)
                .then((response) => {
                    toast.success('User added successfully');
                    setIsAddModalVisible(false);
                    addForm.resetFields();
                })
                .catch((error) => {
                    console.error('Error updating user:', error);
                    toast.error('Error updating user');
                });
        } catch (error) {
            console.error('Error uploading image:', error);
            toast.error('Error uploading image');
        }
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
                    <Button type="primary" style={{ marginLeft: '8px' }} onClick={() => setIsAddModalVisible(true)}>
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
                {/* Modal Edit */}
                <Modal
                    title="Edit User"
                    visible={isEditModalVisible}
                    onOk={handleEditModalOk}
                    onCancel={handleEditModalCancel}
                >
                    <Form form={editForm} onFinish={handleEditFormFinish}>
                        <Form.Item name="name" label="Name" rules={[{ required: true }]}>
                            <Input />
                        </Form.Item>
                        <Form.Item name="email" label="Email" rules={[{ required: true, type: 'email' }]}>
                            <Input />
                        </Form.Item>

                        <Form.Item name="address" label="Address" rules={[{ required: true }]}>
                            <div className={cx('form-group')}>
                                <select id="province" onChange={handleProvinceChange}>
                                    <option value="">Chọn tỉnh/thành phố</option>
                                    {provinces}
                                </select>
                            </div>
                            <div className={cx('form-group')}>
                                <select id="district" onChange={handleDistrictChange}>
                                    <option value="">Chọn quận/huyện</option>
                                    {districts}
                                </select>
                            </div>
                            <div className={cx('form-group')}>
                                <select id="ward" onChange={handleWardChange}>
                                    <option value="">Chọn phường/xã</option>
                                    {wards}
                                </select>
                            </div>
                            <div className={cx('form-group')}>
                                <Input
                                    type="text"
                                    placeholder="Số nhà"
                                    value={houseNumber}
                                    onChange={handleHouseNumberChange}
                                />
                            </div>
                            <div className={cx('form-group')}>
                                <Input
                                    onChange={() =>
                                        editForm.setFieldsValue({
                                            address: editAddressConplete,
                                        })
                                    }
                                    placeholder="Địa chỉ"
                                    value={editAddressConplete}
                                />
                            </div>
                        </Form.Item>
                        <Form.Item name="phoneNumber" label="Phone Number" rules={[{ required: true }]}>
                            <Input />
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
                        <Form.Item name="role" label="Role" rules={[{ required: true }]}>
                            <Radio.Group>
                                <Radio value="admin">Admin</Radio>
                                <Radio value="user">User</Radio>
                            </Radio.Group>
                        </Form.Item>
                    </Form>
                </Modal>
                {/* Modal Add */}
                <Modal
                    title="Add User"
                    visible={isAddModalVisible}
                    onOk={handleAddModalOk}
                    onCancel={handleAddModalCancel}
                >
                    <Form form={addForm} onFinish={handleAddFormFinish}>
                        <Form.Item name="name" label="Name" rules={[{ required: true }]}>
                            <Input />
                        </Form.Item>
                        <Form.Item name="email" label="Email" rules={[{ required: true, type: 'email' }]}>
                            <Input />
                        </Form.Item>
                        <Form.Item name="password" label="Password" rules={[{ required: true, type: 'password' }]}>
                            <Input />
                        </Form.Item>
                        <Form.Item name="address" label="Address" rules={[{ required: true }]}>
                            <div className={cx('form-group')}>
                                <select id="province" onChange={handleProvinceChange}>
                                    <option value="">Chọn tỉnh/thành phố</option>
                                    {provinces}
                                </select>
                            </div>
                            <div className={cx('form-group')}>
                                <select id="district" onChange={handleDistrictChange}>
                                    <option value="">Chọn quận/huyện</option>
                                    {districts}
                                </select>
                            </div>
                            <div className={cx('form-group')}>
                                <select id="ward" onChange={handleWardChange}>
                                    <option value="">Chọn phường/xã</option>
                                    {wards}
                                </select>
                            </div>
                            <div className={cx('form-group')}>
                                <Input
                                    type="text"
                                    placeholder="Số nhà"
                                    value={houseNumber}
                                    onChange={handleHouseNumberChange}
                                />
                            </div>
                            <div className={cx('form-group')}>
                                <Input
                                    onChange={() =>
                                        addForm.setFieldsValue({
                                            address: editAddressConplete,
                                        })
                                    }
                                    placeholder="Địa chỉ"
                                    value={editAddressConplete}
                                />
                            </div>
                        </Form.Item>
                        <Form.Item name="phoneNumber" label="Phone Number" rules={[{ required: true }]}>
                            <Input />
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
