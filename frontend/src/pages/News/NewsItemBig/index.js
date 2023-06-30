import classNames from 'classnames/bind';
import styles from './NewsItemBig.module.scss';
const cx = classNames.bind(styles);
function NewsItemBig({ imgUrl, blogUrl, heading }) {
    return (
        <div className={cx('new-item-big')}>
            <div className={cx('thumb')}>
                <a href={blogUrl}>
                    <img src={imgUrl} />
                </a>
            </div>
            <div className={cx('content-blog')}>
                <h3>
                    <a href={blogUrl}>{heading}</a>
                </h3>
            </div>
        </div>
    );
}

export default NewsItemBig;
