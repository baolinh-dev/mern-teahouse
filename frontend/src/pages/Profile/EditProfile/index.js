import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import classNames from 'classnames/bind';
import styles from './EditProfile.module.scss';
import { Link } from 'react-router-dom';
import ProfileLayout from '~/layouts/ProfileLayout';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from '../../../firebase';
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
    const [userData, setUserData] = useState(null);
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

    console.log(updatedProfile.avatar.url); // https://firebasestorage.googleapis.com/v0/b/mern-teahouse.appspot.com/o/profile-images%2Fa229aa4f-08c0-4dcd-b6e4-88e927c2a8dd?alt=media&token=070b79c5-4509-4b74-bf86-4c1586f61f2

    useEffect(() => {
        axios
            .get('/api/v1/me')
            .then((response) => {
                setUpdatedProfile(response.data.user);
                console.log('response.data.user', response.data.user);
            })
            .catch((err) => {
                setError(err.response.data.message);
                toast.error(err.response.data.message);
                console.log(error);
            });
    }, []);

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
                window.location.reload()
            })
            .catch((error) => {
                toast.error('Failed to update profile');
                console.error(error);
            });
    };

    return (
        <>
            <ProfileLayout>
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
                        <div className={cx('group-infor')}>
                            <b>Address: </b>
                            <input name="address" value={updatedProfile.address} onChange={handleInputChange} />
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
