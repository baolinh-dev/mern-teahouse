import React, { useState, useEffect } from 'react';
import axios from 'axios';
import classNames from 'classnames/bind';
import styles from './ChangePassword.module.scss';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
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

function ChangePassword() {
    const [userData, setUserData] = useState(null);
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [error, setError] = useState(null);

    useEffect(() => {
        axios
            .get('/api/v1/me')
            .then((response) => {
                setUserData(response.data.user);
            })
            .catch((err) => {
                const errorMessage = err.response.data.message;
                setError(errorMessage);
                console.log(error);
            });
    }, [error]);

    useEffect(() => {
        if (passwordError) {
            toast.error(passwordError);
        }
    }, [passwordError, error]);

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
            <ProfileLayout>
                {userData ? (
                    <div className={cx('right-module', 'col-6', 'col-lg-6', 'col-sm-12', 'col-xs-12')}>
                        <div className={cx('group-infor')}>
                            <b>Old password: </b>
                            <input
                                placeholder="Vui lòng nhập mật khẩu cũ"
                                value={oldPassword}
                                onChange={(e) => setOldPassword(e.target.value)}
                            />
                        </div>
                        <div className={cx('group-infor')}>
                            <b>New password: </b>
                            <input
                                placeholder="Vui lòng nhập mật khẩu mới"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                            />
                        </div>
                        <div className={cx('group-infor')}>
                            <b>Confirm password: </b>
                            <input
                                placeholder="Vui lòng xác nhận lại mật khẩu mới"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                            />
                        </div>
                        <div>
                            <button className={cx('btn')} onClick={handleChangePassword}>
                                Change Password
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
                                <Link to={'/change-password'}>Change Password</Link>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div>{error}</div>
                )}
            </ProfileLayout>
            <ToastContainer />
        </>
    );
}

export default ChangePassword;
