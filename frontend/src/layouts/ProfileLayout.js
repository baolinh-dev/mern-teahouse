import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Heading from '~/components/Heading';
import ContainerHeading from '~/components/ContainerHeading';
import classNames from 'classnames/bind';
import styles from './ProfileLayout.module.scss';
import Breadcrumb from '~/components/Breadcrumb';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Cookies from 'js-cookie';
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

function ProfileLayout({ children }) {
    const [userData, setUserData] = useState(null);
    const [error, setError] = useState(null);

    const breadcrumbItems = [
        { label: 'Trang chủ', link: '/' },
        { label: 'Change Password', link: '/caphe', active: true },
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

    // Kiểm tra định dạng hình ảnh
    const isImageFormat = (url) => {
        return fetch(url, { method: 'HEAD' })
          .then((res) => {
            const contentType = res.headers.get('content-type');
            return contentType.startsWith('image/');
          })
          .catch((error) => {
            console.error(error);
            throw error;
          });
      };

    // Lấy đường dẫn hình ảnh phù hợp
    const getAvatarUrl = () => {
        const userAvatar = userData?.avatar?.url;
        console.log(userAvatar);
        if (isImageFormat(userAvatar)) {
            return userAvatar;
        } else {
            return 'https://th.bing.com/th/id/R.b9838bf721d3dff150c954530b3856f3?rik=Uulm6lnhid2Giw&riu=http%3a%2f%2fshackmanlab.org%2fwp-content%2fuploads%2f2013%2f07%2fperson-placeholder.jpg&ehk=GGILj1W77t4L5TSfJq0peMYJY8na6RvFj0vx3uPQHkI%3d&risl=&pid=ImgRaw&r=0&sres=1&sresct=1';
        }
    };

    return (
        <>
            <Header />
            <div className={cx('user-profile', 'container')}>
                <Breadcrumb items={breadcrumbItems} />
                <ContainerHeading center>
                    <Heading content={'Change Password'} />
                </ContainerHeading>
                {/* If you have userData, then you are already logged in */}
                {userData ? (
                    <div className={cx('user-profile-content')}>
                        <div className={cx('left-module', 'col-6', 'col-lg-6', 'col-sm-12', 'col-xs-12')}>
                            <div className={cx('image')}>
                                <img src={getAvatarUrl()} alt="avatar" />
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
