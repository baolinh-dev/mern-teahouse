import React from 'react';
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';

function AuthLink({ linkTo }) {
  // Kiểm tra xem người dùng đã đăng nhập hay chưa
  const isLoggedIn = Cookies.get('userName') !== undefined;

  // Chuyển hướng người dùng đến trang Payment hoặc trang đăng nhập
  const redirectLink = isLoggedIn ? linkTo : '/login';

  return <Link to={redirectLink}>Thanh toán</Link>;
}

export default AuthLink;