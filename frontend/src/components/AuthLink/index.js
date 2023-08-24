import React from 'react';
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartPlus } from '@fortawesome/free-solid-svg-icons';

function AuthLink({ linkTo }) {
    // Kiểm tra xem người dùng đã đăng nhập hay chưa
    const isLoggedIn = Cookies.get('userName') !== undefined;

    // Chuyển hướng người dùng đến trang Payment hoặc trang đăng nhập
    const redirectLink = isLoggedIn ? linkTo : '/login';

    return (
        <Link to={redirectLink}>
            <FontAwesomeIcon icon={faCartPlus} />
            Tới giỏ hàng và thanh toán
        </Link>
    );
}

export default AuthLink;
