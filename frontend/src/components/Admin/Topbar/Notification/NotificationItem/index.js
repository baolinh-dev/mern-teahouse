import classNames from 'classnames/bind';
import styles from './NotificationItem.module.scss';
import { Link } from 'react-router-dom';

const cx = classNames.bind({ ...styles, container: 'container' });

function NotificationItem({ noti, onClick }) {
    return (
        <Link to={'/admin/orders'}>
            <div className={cx('noti-item')} onClick={onClick}>
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
