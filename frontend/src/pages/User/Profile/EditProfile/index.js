import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import classNames from 'classnames/bind';
import styles from './EditProfile.module.scss';
import { Link } from 'react-router-dom';
import ProfileLayout from '~/layouts/ProfileLayout';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from '../../../../firebase';
import { v4 } from 'uuid';

const cx = classNames.bind({
    ...styles,
    container: 'container',
    'col-xl-6': 'col-xl-6',
    'col-lg-6': 'col-lg-6',
    'col-sm-12': 'col-sm-12',
    'col-xs-12': 'col-xs-12',
    row: 'row',
});

function EditProfile() {
    // address state
    const host = 'https://provinces.open-api.vn/api/';
    const [provinces, setProvinces] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [wards, setWards] = useState([]);
    const [selectedProvince, setSelectedProvince] = useState('');
    const [selectedDistrict, setSelectedDistrict] = useState('');
    const [selectedWard, setSelectedWard] = useState('');
    const [houseNumber, setHouseNumber] = useState('');
    // state
    const [error, setError] = useState(null);
    const [imageUrl, setImageUrl] = useState('');
    const [updatedProfile, setUpdatedProfile] = useState({
        name: '',
        email: '',
        phoneNumber: '',
        address: '',
        avatar: {
            public_id: '',
            url: '', // Update avatar object structure
        },
    });

    // Hàm để gọi API và render dữ liệu
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

    // Hàm để tạo chuỗi kết quả đầy đủ của địa chỉ
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
        setUpdatedProfile((prevCustomerInfo) => ({
            ...prevCustomerInfo,
            address: updatedAddress,
        }));
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

    useEffect(() => {
        console.log('Image URL changed:', imageUrl);
        setUpdatedProfile((prevProfile) => ({
            ...prevProfile,
            avatar: {
                public_id: v4(),
                url: imageUrl,
            },
        }));
    }, [imageUrl]);

    console.log(updatedProfile.avatar.url);

    useEffect(() => {
        axios
            .get('/api/v1/me')
            .then((response) => {
                setUpdatedProfile(response.data.user);
                console.log('response.data.user', response.data.user);
            })
            .catch((err) => {
                setError(err.response.data.message);
                console.log(error);
                toast.error(err.response.data.message);
            });
    }, [error]);

    const handleInputChange = (e) => {
        setUpdatedProfile((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };

    const handleFileUpload = (e) => {
        const file = e.target.files[0];
        const storageRef = ref(storage, 'profile-images/' + v4());

        uploadBytes(storageRef, file).then(() => {
            getDownloadURL(storageRef).then((downloadURL) => {
                setImageUrl(downloadURL);

                setUpdatedProfile((prevUpdatedProfile) => ({
                    ...prevUpdatedProfile,
                    avatar: {
                        public_id: v4(),
                        url: downloadURL,
                    },
                }));
            });
        });
    };

    const handleUpdateProfile = () => {
        const updatedProfileClone = { ...updatedProfile }; // Clone the updatedProfile to avoid modifying the state directly
        updatedProfileClone.avatar.url = imageUrl; // Update the avatar URL in the cloned object

        console.log(updatedProfileClone.avatar.url); // https://firebasestorage.googleapis.com/v0/b/mern-teahouse.appspot.com/o/profile-images%2F0d395d6d-70d0-4de9-8bb4-00baeeec80d5?alt=media&token=0b9959d1-c7f7-4d03-93e2-775ba3898bf9
        axios
            .put('/api/v1/me/update', updatedProfileClone)
            .then((response) => {
                toast.success('Profile updated successfully');
                window.location.reload();
            })
            .catch((error) => {
                toast.error('Failed to update profile');
                console.error(error);
            });
    };

    return (
        <>
            <ProfileLayout title={'Edit Profile'}>
                {updatedProfile ? (
                    <div className={cx('right-module', 'col-6', 'col-lg-6', 'col-sm-12', 'col-xs-12')}>
                        <div className={cx('group-infor')}>
                            <b>Name: </b>
                            <input name="name" value={updatedProfile.name} onChange={handleInputChange} />
                        </div>
                        <div className={cx('group-infor')}>
                            <b>Email: </b>
                            <input name="email" value={updatedProfile.email} onChange={handleInputChange} />
                        </div>
                        <div className={cx('group-infor')}>
                            <b>Phone Number: </b>
                            <input name="phoneNumber" value={updatedProfile.phoneNumber} onChange={handleInputChange} />
                        </div>
                        {/* Địa chỉ */}
                        <div>
                            <b>Address: </b>
                            <div className={cx('group-select')}>
                                <div className={cx('group-infor')}>
                                    <select id="province" onChange={handleProvinceChange}>
                                        <option value="">Chọn tỉnh/thành phố</option>
                                        {provinces}
                                    </select>
                                </div>
                                <div className={cx('group-infor')}>
                                    <select id="district" onChange={handleDistrictChange}>
                                        <option value="">Chọn quận/huyện</option>
                                        {districts}
                                    </select>
                                </div>
                                <div className={cx('group-infor')}>
                                    <select id="ward" onChange={handleWardChange}>
                                        <option value="">Chọn phường/xã</option>
                                        {wards}
                                    </select>
                                </div>
                            </div>

                            <div className={cx('group-infor')}>
                                <input
                                    type="text"
                                    placeholder="Số nhà"
                                    value={houseNumber}
                                    onChange={handleHouseNumberChange}
                                />
                            </div>
                            <div className={cx('group-infor')}>
                                <input
                                    onChange={(e) => setUpdatedProfile({ ...updatedProfile, address: e.target.value })}
                                    value={updatedProfile.address ? updatedProfile.address : createFullAddress()}
                                    placeholder="Địa chỉ"
                                />
                            </div>
                        </div>

                        <div className={cx('group-infor')}>
                            <input type="file" accept="image/*" onChange={handleFileUpload} />
                        </div>

                        <div>
                            <button className={cx('btn')} onClick={handleUpdateProfile}>
                                Update Profile
                            </button>
                        </div>

                        <div className={cx('buttons')}>
                            <div className={cx('button')}>
                                <Link to={'/edit-profile'}>Edit profile</Link>
                            </div>
                            <div className={cx('button')}>
                                <Link to={'/user-profile'}>User Profile</Link>
                            </div>
                            <div className={cx('button')}>
                                <Link to={'/my-orders'}>My orders</Link>
                            </div>
                            <div className={cx('button')}>
                                <Link to={'/change-password'}>Change password</Link>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div>Error: {error}</div>
                )}
            </ProfileLayout>
            <ToastContainer />
        </>
    );
}

export default EditProfile;
