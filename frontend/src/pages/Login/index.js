import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { NavLink, Navigate } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './Login.module.scss';
import Heading from '~/components/Heading';
import ContainerHeading from '~/components/ContainerHeading';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const cx = classNames.bind(styles);

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [redirect, setRedirect] = useState(false);
    const [lastRegisteredEmail, setLastRegisteredEmail] = useState(''); // Thêm state để lưu email được lấy từ localStorage
    const [lastForgotEmail, setLastForgotEmail] = useState(''); // Thêm state để lưu email được lấy từ localStorage

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        if (name === 'email') {
            setEmail(value);
        } else if (name === 'password') {
            setPassword(value);
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        axios
            .post('/api/v1/login', { email, password })
            .then((response) => {
                const { user, token } = response.data;
                Cookies.set('userId', user._id);
                Cookies.set('userName', user.name);
                Cookies.set('userAvatar', user.avatar.url);
                setEmail('');
                setPassword('');
                setRedirect(true);
                localStorage.removeItem('lastRegisteredEmail');
            })
            .catch((error) => { 
                const errorMessage = error.response.data.message
                setError(errorMessage); 
                toast.error(errorMessage)
            });
    }; 

    useEffect(() => {
        const lastEmail = localStorage.getItem('lastRegisteredEmail'); // Lấy email đã lưu từ localStorage
        if (lastEmail) {
            setEmail(lastEmail);
            setLastRegisteredEmail(lastEmail);
        }
    }, []);

    if (redirect) {
        return <Navigate to="/" />;
    }

    return (
        <div className={cx('login')}>
            <form onSubmit={handleSubmit}>
                <ContainerHeading center>
                    <Heading content={'Đăng nhập'} />
                </ContainerHeading>
                {lastRegisteredEmail && <p>Bạn đã đăng ký với email: {lastRegisteredEmail}</p>}{' '}
                {/* Hiển thị thông báo với email được lấy từ localStorage */}
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
                    <label htmlFor="password">Password:</label>
                    <input
                        placeholder="Nhập mật khẩu"
                        type="password"
                        id="password"
                        name="password"
                        value={password}
                        onChange={handleInputChange}
                    />
                </div>
                <div className={cx('other-options')}>
                    <NavLink to="/forgotpass">For got password?</NavLink>
                    <NavLink to="/register">Đăng kí tại đây</NavLink>
                </div>
                <button type="submit">Login</button>
            </form>
        </div>
    );
}

export default Login;
