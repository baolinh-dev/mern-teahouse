import classNames from 'classnames/bind';
import styles from './NewsItemBig.module.scss';
import { Link } from 'react-router-dom';
const cx = classNames.bind(styles);
function NewsItemBig({ imgUrl, blogUrl, title }) {
    return (
        <div className={cx('new-item-big')}>
            <div className={cx('thumb')}>
                <Link to={blogUrl} target="_blank">
                    <img src={imgUrl} alt="thumb" />
                </Link>
            </div>
            <div className={cx('content-blog')}>
                <h3>
                    <Link to={blogUrl} target="_blank">
                        {title}
                    </Link>
                </h3>
            </div>
        </div>
    );
}

export default NewsItemBig;
