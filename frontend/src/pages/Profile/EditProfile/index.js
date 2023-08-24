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

    useEffect(() => {
        axios
            .get('/api/v1/me')
            .then((response) => {
                setUserData(response.data.user);
                console.log(response.data.user);
            })
            .catch((err) => {
                setError(err.response.data.message);
                toast.error(err.response.data.message);
                console.log(error);
            });
    }, [error]);
    return (
        <>
            <ProfileLayout>
                {userData ? (
                    <div className={cx('right-module', 'col-6', 'col-lg-6', 'col-sm-12', 'col-xs-12')}>
                        <div className={cx('group-infor')}>
                            <b>Name: </b>
                            <input value={userData.email} />
                        </div>
                        <div className={cx('group-infor')}>
                            <b>Email: </b>
                            <input value={userData.email} />
                        </div>
                        <div className={cx('group-infor')}>
                            <b>Role: </b>
                            <input value={userData.role} />
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
