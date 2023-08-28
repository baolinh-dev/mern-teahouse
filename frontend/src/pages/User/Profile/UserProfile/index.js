import React, { useState, useEffect } from 'react';
import axios from 'axios';

import classNames from 'classnames/bind';
import styles from './UserProfile.module.scss';
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

function UserProfile() {
    const [userData, setUserData] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        axios
            .get('/api/v1/me')
            .then((response) => {
                setUserData(response.data.user);
            })
            .catch((error) => {
                const errorMessage = error.response.data.message;
                setError(errorMessage);
            });
    }, [error]);
    console.log("userData", userData);
    return (
        <>
            <ProfileLayout>
                {userData ? (
                    <div className={cx('right-module', 'col-6', 'col-lg-6', 'col-sm-12', 'col-xs-12')}>
                        <div className={cx('group-infor')}>
                            <b>Name: </b>
                            <p>{userData.name}</p>
                        </div>
                        <div className={cx('group-infor')}>
                            <b>Email: </b>
                            <p>{userData.email}</p>
                        </div>
                        <div className={cx('group-infor')}>
                            <b>Phone Number: </b>
                            <p>{userData.phoneNumber ? userData.phoneNumber : 'Chưa có số điện thoại'}</p>
                        </div>
                        <div className={cx('group-infor')}>
                            <b>Address: </b>
                            <p>{userData.address ? userData.address : 'Chưa có địa chỉ'}</p>
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
                    <div>{error}</div>
                )}
            </ProfileLayout>
        </>
    );
}

export default UserProfile;
