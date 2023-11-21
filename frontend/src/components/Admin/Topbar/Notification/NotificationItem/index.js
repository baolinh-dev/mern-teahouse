import classNames from 'classnames/bind';
import styles from './NotificationItem.module.scss';
import { Link } from 'react-router-dom';
import { useState } from 'react';

const cx = classNames.bind({ ...styles, container: 'container' });

function NotificationItem({ noti, onClick }) {
    const [isHovered, setIsHovered] = useState(false);

    const handleMouseEnter = () => {
        setIsHovered(true);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
    };
    return (
        <Link to={'/admin/orders'}>
            <div
                className={cx('noti-item', { hovered: isHovered })}
                onClick={onClick}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
            >
                <div className={cx('noti-infor')}>
                    <img src={noti.authorAvatar} />
                    <p>{noti.authorName}</p>
                </div>
                <div className={cx('noti-content')}>
                    <p>{noti.content}</p>
                    <span>{noti.date}</span>
                </div>
            </div>
        </Link>
    );
}

export default NotificationItem;
