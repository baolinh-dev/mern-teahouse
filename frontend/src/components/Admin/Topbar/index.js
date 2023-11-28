import classNames from 'classnames/bind';
import styles from './Topbar.module.scss';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import io from 'socket.io-client';
import socket from '~/socket';
import Notification from './Notification';

const cx = classNames.bind({ ...styles, container: 'container' });

function Topbar() {
    const [userData, setUserData] = useState(null);
    const [error, setError] = useState(null);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [notifications, setNotifications] = useState([]);
    const [notificationsDisplay, setNotificationsDisplay] = useState([]);

    useEffect(() => {
        axios
            .get('/api/v1/notis')
            .then((response) => {
                setNotificationsDisplay(response.data.notifications); // Cập nhật thông báo từ phản hồi của API
            })
            .catch((error) => {
                console.log(error);
            });
    }, [notifications, notificationsDisplay]);

    useEffect(() => {
        // Socket event listener setup
        const handleSocketResponse = async (data) => {
            console.log('data array', typeof data);
            setNotifications(data);
            console.log(data.length); // 2
            try {
                for (const obj of data) {
                    await axios.post('/api/v1/noti/new', obj).then(() => {
                        console.log('Notification sent successfully');
                    });
                }
            } catch (error) {
                console.log(error);
            }
        };

        socket.on('response', handleSocketResponse);

        // Cleanup the event listener when the component unmounts
        return () => {
            socket.off('response', handleSocketResponse);
        };
    }, []);

    useEffect(() => {
        axios
            .get('/api/v1/me')
            .then((response) => {
                setUserData(response.data.user);
            })
            .catch((err) => {
                setError(err.response.data.message);
            });
    }, [error, userData]);

    const handleMouseEnter = () => {
        setIsDropdownOpen(true);
    };

    const handleMouseLeave = () => {
        setIsDropdownOpen(false);
    };

    function clearAllCookies() {
        const cookies = document.cookie.split(';');

        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i];
            const eqPos = cookie.indexOf('=');
            const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
            document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/';
        }
    }

    const handleLogout = async () => {
        try {
            const response = await axios.get('/api/v1/logout');
            if (response.status === 200) {
                localStorage.clear();
                clearAllCookies(); // Xóa tất cả các cookie
                window.location.href = '/login';
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className={cx('topbar')}>
            <div className={cx('search')}>
                <h2>Admin Page - TeaHouse </h2>
            </div>
            <div className={cx('info-admin')}>
                <Notification notifications={notificationsDisplay} />
                <div className={cx('info-admin-box')} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                    <div className={cx('info-admin-box-infor')}>
                        <img
                            src={
                                userData?.avatar?.url ||
                                'https://th.bing.com/th/id/R.b9838bf721d3dff150c954530b3856f3?rik=Uulm6lnhid2Giw&riu=http%3A%2F%2Fshackmanlab.org%2Fwp-content%2Fuploads%2F2013%2F07%2Fperson-placeholder.jpg&ehk=GGILj1W77t4L5TSfJq0peMYJY8na6RvFj0vx3uPQHkI%3D&risl=&pid=ImgRaw&r=0&sres=1&sresct=1'
                            }
                            alt={userData?.name}
                        />
                    </div>

                    <span>{userData?.name}</span>
                    {isDropdownOpen && (
                        <div className={cx('dropdown')}>
                            <ul>
                                <li>
                                    <Link to="/">
                                        <FontAwesomeIcon icon={faHome} />
                                        <p>Sales page</p>
                                    </Link>
                                </li>
                                <li>
                                    <button onClick={handleLogout}>
                                        <FontAwesomeIcon icon={faSignOutAlt} />
                                        <p>Sign out</p>
                                    </button>
                                </li>
                            </ul>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Topbar;
