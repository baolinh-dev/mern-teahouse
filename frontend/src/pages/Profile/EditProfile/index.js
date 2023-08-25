import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import classNames from 'classnames/bind';
import styles from './EditProfile.module.scss';
import { Link } from 'react-router-dom';
import ProfileLayout from '~/layouts/ProfileLayout';

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
  const [updatedProfile, setUpdatedProfile] = useState({
    name: '',
    email: '',
    phoneNumber: '',
    address: '',
    avatarUrl: '',
  });

  useEffect(() => {
    axios
      .get('/api/v1/me')
      .then((response) => {
        setUserData(response.data.user);
        console.log(response.data.user);
        setUpdatedProfile({
          name: response.data.user.name,
          email: response.data.user.email,
          phoneNumber: response.data.user.phoneNumber,
          address: response.data.user.address,
          avatarUrl: response.data.user.avatarUrl,
        });
      })
      .catch((err) => {
        setError(err.response.data.message);
        toast.error(err.response.data.message);
        console.log(error);
      });
  }, [error]);

  const handleInputChange = (e) => {
    setUpdatedProfile((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleUpdateProfile = () => {
    axios
      .put('/api/v1/me/update', updatedProfile)
      .then((response) => {
        toast.success('Profile updated successfully');
        console.log(response.data);
      })
      .catch((error) => {
        toast.error('Failed to update profile');
        console.error(error);
      });
  };

  return (
    <>
      <ProfileLayout>
        {userData ? (
          <div className={cx('right-module', 'col-6', 'col-lg-6', 'col-sm-12', 'col-xs-12')}>
            <div className={cx('group-infor')}>
              <b>Name: </b>
              <input
                name="name"
                value={updatedProfile.name}
                onChange={handleInputChange}
              />
            </div>
            <div className={cx('group-infor')}>
              <b>Email: </b>
              <input
                name="email"
                value={updatedProfile.email}
                onChange={handleInputChange}
              />
            </div>
            <div className={cx('group-infor')}>
              <b>Phone Number: </b>
              <input
                name="phoneNumber"
                value={updatedProfile.phoneNumber}
                onChange={handleInputChange}
              />
            </div>
            <div className={cx('group-infor')}>
              <b>Address: </b>
              <input
                name="address"
                value={updatedProfile.address}
                onChange={handleInputChange}
              />
            </div>

            <div className={cx('group-infor')}>
              <input type="file" />
            </div>

            <div>
              <button className={cx('btn')} onClick={handleUpdateProfile}>Update Profile</button>
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