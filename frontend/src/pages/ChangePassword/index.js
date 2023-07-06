import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Heading from '~/components/Heading';
import ContainerHeading from '~/components/ContainerHeading';
import classNames from 'classnames/bind';
import styles from './ChangePassword.module.scss';
import Header from '~/components/Header';
import Footer from '~/components/Footer';
import Breadcrumb from '~/components/Breadcrumb';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
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
    const [userData, setUserData] = useState(null);
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordError, setPasswordError] = useState('');
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

    useEffect(() => {
        if (passwordError) {
            toast.error(passwordError);
        }
    }, [passwordError]);

    const handleChangePassword = () => {
        setPasswordError('');

        if (!oldPassword || !newPassword || !confirmPassword) {
            setPasswordError('Please fill in all fields.');
            return;
        }

        if (newPassword !== confirmPassword) {
            setPasswordError('New password and confirm password do not match.');
            return;
        }

        axios
            .put('/api/v1/password/update', {
                oldPassword,
                newPassword,
                confirmPassword,
            })
            .then(() => {
                setOldPassword('');
                setNewPassword('');
                setConfirmPassword('');
                toast.success('Password updated successfully.');
            })
            .catch((error) => {
                const errorMessage = error.response.data.message;
                setOldPassword('');
                setNewPassword('');
                setConfirmPassword('');
                setPasswordError(errorMessage);
            });
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
                                <img src={Cookies.get('userAvatar')} />
                            </div>
                        </div>
                        <div className={cx('right-module', 'col-6', 'col-lg-6', 'col-sm-12', 'col-xs-12')}>
                            <div className={cx('group-infor')}>
                                <b>Old password: </b>
                                <input placeholder='Vui lòng nhập mật khẩu cũ' value={oldPassword} onChange={(e) => setOldPassword(e.target.value)} />
                            </div>
                            <div className={cx('group-infor')}>
                                <b>New password: </b>
                                <input placeholder='Vui lòng nhập mật khẩu mới' value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
                            </div>
                            <div className={cx('group-infor')}>
                                <b>Confirm password: </b>
                                <input placeholder='Vui lòng xác nhận lại mật khẩu mới' value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                            </div>
                            <button onClick={handleChangePassword}>Change Password</button>
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
                                    <Link to={'/change-password'}>Change Password</Link>
                                </div>
                            </div>
                        </div>
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

export default ChangePassword;
