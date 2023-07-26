import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Heading from '~/components/Heading';
import ContainerHeading from '~/components/ContainerHeading';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import classNames from 'classnames/bind';
import styles from './UserProfile.module.scss';
import Header from '~/components/Header';
import Footer from '~/components/Footer';
import Breadcrumb from '~/components/Breadcrumb';
import avatar from '~/assets/images/avatar.jpg';
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';

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

    const breadcrumbItems = [
        { label: 'Trang chủ', link: '/' },
        { label: 'Edit Profile', link: '/caphe', active: true },
    ];

    useEffect(() => {
        axios
            .get('/api/v1/me')
            .then((response) => {
                setUserData(response.data.user); 
                console.log(response.data.user);
            })
            .catch((error) => {
                setError(error.response.data.message);
                toast.error(error.response.data.message); // display error message using toast.error
            });
    }, []);

    return (
        <>
            <Header />
            <div className={cx('user-profile', 'container')}>
                <Breadcrumb items={breadcrumbItems} />
                <ContainerHeading center>
                    <Heading content={'Edit Profile'} />
                </ContainerHeading>
                <div className={cx('user-profile-content')}>
                    <div className={cx('left-module', 'col-6', 'col-lg-6', 'col-sm-12', 'col-xs-12')}>
                        <div className={cx('image')}>
                            <img src={Cookies.get('userAvatar')} />
                        </div>
                    </div>
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
                </div>
            </div>
            <Footer />
            <ToastContainer /> 
        </>
    );
}

export default EditProfile;