import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell, faLocationDot, faPhoneAlt } from '@fortawesome/free-solid-svg-icons';
import NotificationItem from './NotificationItem';
import classNames from 'classnames/bind';
import styles from './Notification.module.scss';
import axios from 'axios';

const cx = classNames.bind({ ...styles, container: 'container' });

function Notification({ notifications }) {
    const [showNotifications, setShowNotifications] = useState(false);

    const handleToggleNotifications = () => {
        setShowNotifications(!showNotifications);
    };

    const deleteNotification = (notificationId) => {
        axios
            .delete(`http://localhost:4000/api/v1/noti/${notificationId}`)
            .then((response) => {
                // Xử lý thành công
                console.log('Notification deleted'); 
                setShowNotifications(false)
            })
            .catch((error) => {
                // Xử lý lỗi
                console.error('Error deleting notification:', error);
            });
    };
    return (
        <div className={cx('noti')}>
            <div className={cx('noti-icon-wrapper')} onClick={handleToggleNotifications}>
                <FontAwesomeIcon className={cx('noti-icon')} icon={faBell} />
                <span>{notifications.length}</span>
            </div>

            {showNotifications && notifications.length > 0 && (
                <div className={cx('noti-box')}>
                    {notifications.length > 0 &&
                        notifications.map((notification) => (
                            <>
                                <NotificationItem
                                    key={notification.id}
                                    noti={notification}
                                    onClick={() => deleteNotification(notification._id)}
                                />
                            </>
                        ))}
                </div>
            )}
        </div>
    );
}

export default Notification;
