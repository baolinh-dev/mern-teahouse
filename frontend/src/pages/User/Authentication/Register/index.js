import React, { useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { Navigate } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './Register.module.scss';
import Heading from '~/components/Heading';
import ContainerHeading from '~/components/ContainerHeading';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const cx = classNames.bind(styles);

function Register() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState(null);
    const [redirect, setRedirect] = useState(false);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        if (name === 'name') {
            setName(value);
        } else if (name === 'email') {
            setEmail(value);
        } else if (name === 'password') {
            setPassword(value);
        } else if (name === 'confirmPassword') {
            setConfirmPassword(value);
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (password !== confirmPassword) {
            setError('Mật khẩu không khớp');
            return;
        }
        axios
            .post('/api/v1/register', { name, email, password })
            .then((response) => {
                const { user } = response.data;
                Cookies.set('userId', user._id);
                Cookies.set('userName', user.name);
                localStorage.setItem('lastRegisteredEmail', email); // Lưu email vào localStorage
                setEmail('');
                setPassword('');
                setConfirmPassword('');
                setRedirect(true);
            })
            .catch((error) => {
                console.log(error);
                setError(error.response.data.message);
                toast.error(error.response.data.message);
            });
    };

    if (redirect) {
        return <Navigate to="/login" />;
    }

    return (
        <div className={cx('register')}>
            <form onSubmit={handleSubmit}>
                <ContainerHeading center>
                    <Heading content={'Đăng kí'} />
                </ContainerHeading>
                <div className={cx('form-group')}>
                    <label htmlFor="name">Họ và tên:</label>
                    <input
                        placeholder="Nhập tên đăng nhập"
                        type="text"
                        id="name"
                        name="name"
                        value={name}
                        onChange={handleInputChange}
                    />
                </div>
                <div className={cx('form-group')}>
                    <label htmlFor="email">Email:</label>
                    <input
                        placeholder="Nhập email"
                        type="email"
                        id="email"
                        name="email"
                        value={email}
                        onChange={handleInputChange}
                    />
                </div>
                <div className={cx('form-group')}>
                    <label htmlFor="password">Mật khẩu:</label>
                    <input
                        placeholder="Nhập mật khẩu"
                        type="password"
                        id="password"
                        name="password"
                        value={password}
                        onChange={handleInputChange}
                    />
                </div>
                <div className={cx('form-group')}>
                    <label htmlFor="confirmPassword">Xác nhận mật khẩu:</label>
                    <input
                        placeholder="Xác nhận mật khẩu"
                        type="password"
                        id="confirmPassword"
                        name="confirmPassword"
                        value={confirmPassword}
                        onChange={handleInputChange}
                    />
                </div>
                <button type="submit">Đăng kí</button>
                {error && <div className={cx('error')}>{error}</div>}
            </form>
            <ToastContainer />
        </div>
    );
}

export default Register;
