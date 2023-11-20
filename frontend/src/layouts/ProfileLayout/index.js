import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Heading from '~/components/Heading';
import ContainerHeading from '~/components/ContainerHeading';
import classNames from 'classnames/bind';
import styles from './ProfileLayout.module.scss';
import Breadcrumb from '~/components/Breadcrumb';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from '~/components/Header';
import Footer from '~/components/Footer';

const cx = classNames.bind({
    ...styles,
    container: 'container',
    'col-xl-6': 'col-xl-6',
    'col-lg-6': 'col-lg-6',
    'col-sm-12': 'col-sm-12',
    'col-xs-12': 'col-xs-12',
    row: 'row',
});

function ProfileLayout({ children, title }) {
    const [userData, setUserData] = useState(null);
    const [error, setError] = useState(null);

    const breadcrumbItems = [
        { label: 'Trang chủ', link: '/' },
        { label: `${title}`, link: '/caphe', active: true },
    ];

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
    }, []);

    return (
        <>
            <Header />
            <div className={cx('user-profile', 'container')}>
                <Breadcrumb items={breadcrumbItems} />
                <ContainerHeading center>
                    <Heading content={title} />
                </ContainerHeading>
                {/* If you have userData, then you are already logged in */}
                {userData ? (
                    <div className={cx('user-profile-content')}>
                        <div className={cx('left-module', 'col-6', 'col-lg-6', 'col-sm-12', 'col-xs-12')}>
                            <div className={cx('image')}>
                                <img src={userData?.avatar?.url} alt="avatar" />
                            </div>
                        </div>
                        {children}
                    </div>
                ) : (
                    // If you are not logged in, show error message
                    <div className={cx('error-message')}>{error}</div>
                )}
            </div>
            <Footer />
            <ToastContainer />
        </>
    );
}

export default ProfileLayout;