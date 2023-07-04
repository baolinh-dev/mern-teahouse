import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping, faPhoneAlt, faUser } from '@fortawesome/free-solid-svg-icons';
import classNames from 'classnames/bind';
import styles from './Topbar.module.scss';
import { Link, Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import axios from 'axios';

const cx = classNames.bind({ ...styles, container: 'container' });

function Topbar() {
    const [isLoginDropdownOpen, setIsLoginDropdownOpen] = useState(false);
    const [shouldRedirect, setShouldRedirect] = useState(false);

    const handleLogout = async () => {
        try {
            const response = await axios.get('/api/v1/logout');
            if (response.status === 200) {
                localStorage.removeItem('lastRegisteredEmail');
                Cookies.remove('userName');
                Cookies.remove('userId');
                Cookies.remove('token');
                setShouldRedirect(true);
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            const loginDropdown = document.querySelector('#login-dropdown');
            if (loginDropdown && !loginDropdown.contains(event.target)) {
                setIsLoginDropdownOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    function renderAccountContent() {
        const userName = Cookies.get('userName');
        if (userName) {
            return userName;
        } else {
            return 'Tài khoản';
        }
    }

    return (
        <div className={cx('topbar-container')}>
            <div className={cx('topbar', 'container')}>
                <div className={cx('left-topbar')}>
                    <FontAwesomeIcon icon={faPhoneAlt} />
                    <span>Hotline: </span>
                    <a href='tel"19006750'>1900 6750</a>
                </div>
                <div className={cx('right-topbar')}>
                    <ul>
                        <li className={cx('account')}>
                            <FontAwesomeIcon icon={faUser} />
                            <Link to="/user-profile">
                                <span>{renderAccountContent()}</span>
                            </Link>

                            <div id="login-dropdown" className={cx('login-dropdown', { open: isLoginDropdownOpen })}>
                                <Link to="/login">Đăng nhập</Link>
                                <Link to="/register">Đăng ký</Link>
                                <button onClick={handleLogout}>Đăng xuất</button>
                            </div>
                        </li>
                        <li>
                            <FontAwesomeIcon icon={faCartShopping} />
                            <span>Giỏ hàng</span>
                        </li>
                    </ul>
                </div>
            </div>
            {shouldRedirect && <Navigate to="/" />}
        </div>
    );
}

export default Topbar;
