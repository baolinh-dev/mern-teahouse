import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell, faLocationDot, faPhoneAlt } from '@fortawesome/free-solid-svg-icons';
import NotificationItem from './NotificationItem';
import classNames from 'classnames/bind';
import styles from './Notification.module.scss';
import ContainerHeading from '~/components/ContainerHeading';
import Heading from '~/components/Heading';

const cx = classNames.bind({ ...styles, container: 'container' });

function Notification({ notifications }) {
    const [showNotifications, setShowNotifications] = useState(false);

    const handleToggleNotifications = () => {
        setShowNotifications(!showNotifications);
    };
    console.log(notifications);
    return (
        <div className={cx('noti')}>
            <div className={cx('noti-icon-wrapper')} onClick={handleToggleNotifications}>
                <FontAwesomeIcon className={cx('noti-icon')} icon={faBell}  />
                <span>{notifications.length}</span>
            </div>

            {showNotifications && notifications.length > 0 && (
                    <div className={cx('noti-box')}>
                        {notifications.length > 0 &&
                            notifications.map((notification) => (
                                <>
                                    <NotificationItem key={notification.id} noti={notification} />
                                </>
                            ))}
                    </div>
                )}
        </div>
    );
}

export default Notification;
