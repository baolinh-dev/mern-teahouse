import classNames from "classnames/bind";
import styles from './NotificationItem.module.scss';

const cx = classNames.bind({ ...styles, container: 'container' });

function NotificationItem({ noti }) {
    return (
        <div className={cx('noti-item')}>
            <div className={cx('noti-infor')}>
                <img src={noti.authorAvatar} />
                <p>{noti.authorName}</p>
            </div>
            <div className={cx('noti-content')}>
                <p>{noti.content}</p>
                <span>{noti.date}</span>
            </div>
        </div>
    );
}

export default NotificationItem;
