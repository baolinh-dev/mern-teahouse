import React, { useState } from 'react';
import axios from 'axios';
import { Navigate } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './ForgotPassword.module.scss';
import Heading from '~/components/Heading';
import ContainerHeading from '~/components/ContainerHeading';
import { ToastContainer, toast } from 'react-toastify'; 
import Cookies from 'js-cookie';
import 'react-toastify/dist/ReactToastify.css';

const cx = classNames.bind(styles);

function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    if (name === 'email') {
      setEmail(value);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setLoading(true);
    axios
      .post('http://localhost:4000/api/v1/password/forgot', { email })
      .then((response) => {
        const { user, token } = response.data; 
        setEmail('');
        localStorage.removeItem('lastRegisteredEmail');
        toast.success('A password reset link has been sent to your email.');
      })
      .catch((error) => {
        toast.error('Failed to send password reset link. Please try again later.');
      })
      .finally(() => setLoading(false));
  };

  return (
    <div className={cx('forgot')}>
      <form onSubmit={handleSubmit}>
        <ContainerHeading center>
          <Heading content={'Quên mật khẩu'} />
        </ContainerHeading>
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
        <button type="submit" disabled={loading}>
          {loading ? 'Loading...' : 'Send Request'}
        </button>
      </form>
      <ToastContainer />
    </div>
  );
}

export default ForgotPassword;