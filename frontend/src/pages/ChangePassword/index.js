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

function ChangePassword() {
    const [error, setError] = useState(null);
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isProcessing, setIsProcessing] = useState(false);

    const breadcrumbItems = [
        { label: 'Trang chủ', link: '/' },
        { label: 'Change Password', link: '/caphe', active: true },
    ];

    const handlePasswordChange = () => {
        setIsProcessing(true);
        setError(null);
        axios
            .put('/api/v1/password/update', {
                oldPassword,
                newPassword,
                confirmPassword,
            })
            .then((response) => {
                console.log(response.data);
                setIsProcessing(false);
            })
            .catch((error) => {
                console.log(error);
                setError(error);
                setIsProcessing(false);
            });
    };

    if (error) {
        return <div>Error: Bạn chưa đăng nhập</div>;
    }  else {
        return (
            <>
                <Header />
                <div className={cx('user-profile', 'container')}>
                    <Breadcrumb items={breadcrumbItems} />
                    <ContainerHeading center>
                        <Heading content={'Change password'} />
                    </ContainerHeading>
                    <div className={cx('user-profile-content')}>
                        <div className={cx('left-module', 'col-6', 'col-lg-6', 'col-sm-12', 'col-xs-12')}>
                            <div className={cx('image')}>
                                <img src={Cookies.get('userAvatar')} />
                            </div>
                        </div>
                        <div className={cx('right-module', 'col-6', 'col-lg-6', 'col-sm-12', 'col-xs-12')}>
                            <div className={cx('group-infor')}>
                                <b>Old password: </b>
                                <input value={oldPassword} onChange={(e) => setOldPassword(e.target.value)} />
                            </div>
                            <div className={cx('group-infor')}>
                                <b>New password: </b>
                                <input value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
                            </div>
                            <div className={cx('group-infor')}>
                                <b>Confirm password: </b>
                                <input value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                            </div>
                            {error && <div className={cx('error')}>{error}</div>}
                            {!isProcessing && <button onClick={handlePasswordChange}>Change password</button>}
                            {isProcessing && <div>Loading...</div>}
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
                                    <Link to={'/my-orders'}>My orders</Link>
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

export default ChangePassword;
