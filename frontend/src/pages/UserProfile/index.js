import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Heading from '~/components/Heading';
import ContainerHeading from '~/components/ContainerHeading';

import classNames from 'classnames/bind';
import styles from './UserProfile.module.scss';
import Header from '~/components/Header'; 
import Footer from '~/components/Footer';
import Breadcrumb from '~/components/Breadcrumb';
import avatar from '~/assets/images/avatar.jpg';
import { Link } from 'react-router-dom';

const cx = classNames.bind({
    ...styles,
    container: 'container',
    'col-xl-6': 'col-xl-6',
    'col-lg-6': 'col-lg-6',
    'col-sm-12': 'col-sm-12',
    'col-xs-12': 'col-xs-12',
    row: 'row',
});

function Test() {
    const [userData, setUserData] = useState(null);
    const [error, setError] = useState(null);

    const breadcrumbItems = [
        { label: 'Trang chủ', link: '/' },
        { label: 'User Profile', link: '/caphe', active: true },
    ];

    useEffect(() => {
        axios
            .get('/api/v1/me')
            .then((response) => {
                setUserData(response.data.user);
            })
            .catch((error) => {
                setError(error);
            });
    }, []);

    if (error) {
        return <div>Error: Bạn chưa đăng nhập</div>;
    } else if (!userData) {
        return <div>Loading...</div>;
    } else {
        return (
            <>
                <Header />
                <div className={cx('user-profile', 'container')}>
                    <Breadcrumb items={breadcrumbItems} />

                    <div className={cx('user-profile-content')}> 
                    <div className={cx('left-module', 'col-6', 'col-lg-6', 'col-sm-12', 'col-xs-12')}>
                        <div className={cx('image')}>
                            <img src={avatar} />
                        </div>
                        <div className={cx('button')}>
                            <Link to={'/edit-profile'}>Edit profile</Link>
                        </div>
                    </div>
                    <div className={cx('right-module', 'col-6', 'col-lg-6', 'col-sm-12', 'col-xs-12')}>
                        <ContainerHeading center>
                            <Heading content={'User Profile'} />
                        </ContainerHeading>
                        <div className={cx('group-infor')}>
                            <b>Name: </b>
                            <p>{userData.name}</p>
                        </div>
                        <div className={cx('group-infor')}>
                            <b>Email: </b>
                            <p>{userData.email}</p>
                        </div>
                        <div className={cx('group-infor')}>
                            <b>Role: </b>
                            <p>{userData.role}</p>
                        </div>
                        <div className={cx('buttons')}>
                            <div className={cx('button')}>
                                <Link to={'/my-orders'}>Edit profile</Link>
                            </div>
                            <div className={cx('button')}>
                                <Link to={'/change-password'}>Change password</Link>
                            </div>
                        </div>
                    </div>
                    </div>

                </div> 
                <Footer />
            </>
        );
    }
}

export default Test;
