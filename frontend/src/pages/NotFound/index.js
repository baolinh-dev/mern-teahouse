import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './NotFound.module.scss';

const cx = classNames.bind({ ...styles, container: 'container' });

function NotFound() {
    return (
        <div className={cx('not-found')}>
            <div className={cx('not-found__wrapper')}>
                <h1>404 - Page Not Found</h1>
                <p>The requested page does not exist.</p>
                <Link to="/">Quay trở lại trang chủ</Link>
            </div>
        </div>
    );
}

export default NotFound;
