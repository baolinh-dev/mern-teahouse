import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartPlus } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

function AuthLink({ linkTo }) {
    const [userData, setUserData] = useState(null);
    const [error, setError] = useState(null);
    // Chuyển hướng người dùng đến trang Payment hoặc trang đăng nhập
    const redirectLink = userData?.name ? linkTo : '/login';

    useEffect(() => {
        axios
            .get('/api/v1/me')
            .then((response) => {
                setUserData(response.data.user);
            })
            .catch((err) => {
                setError(err.response.data.message);
            });
    }, [error]);

    return (
        <Link to={redirectLink}>
            <FontAwesomeIcon icon={faCartPlus} />
            Tới giỏ hàng và thanh toán
        </Link>
    );
}

export default AuthLink;
