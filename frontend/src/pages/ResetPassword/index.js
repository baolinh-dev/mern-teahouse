import { useState } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import axios from 'axios';

import classNames from 'classnames/bind';
import styles from './ResetPassword.module.scss';
import ContainerHeading from '~/components/ContainerHeading';
import Heading from '~/components/Heading';

const cx = classNames.bind(styles);

function ResetPassword() {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);
    const [redirect, setRedirect] = useState(false);
    const { token } = useParams();

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleConfirmPasswordChange = (event) => {
        setConfirmPassword(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }
        axios
            .put(`http://localhost:4000/api/v1/password/reset/${token}`, {
                password,
                confirmPassword,
            })
            .then((response) => {
                setSuccess(true);
                setRedirect(true);
            })
            .catch((error) => {
                console.error(error);
                setError('Failed to reset password. Please try again later.');
            });
    };

    if (redirect) {
        return <Navigate to="/login" />;
    }

    if (success) {
        return <p>Password reset successfully. Please login with your new password.</p>;
    }

    return (
        <div className={cx('resetpass')}>
            <form onSubmit={handleSubmit}>
                <ContainerHeading center>
                    <Heading content={'Đăng kí'} />
                </ContainerHeading>
                <div className={cx('form-group')}>
                    <label>New Password:</label>
                    <input type="password" value={password} onChange={handlePasswordChange} />
                </div>

                <div className={cx('form-group')}>
                    <label>Confirm Password:</label>
                    <input type="password" value={confirmPassword} onChange={handleConfirmPasswordChange} />
                </div>
                {error && <p>{error}</p>}
                <button type="submit">Reset Password</button>
            </form>
        </div>
    );
}

export default ResetPassword;
