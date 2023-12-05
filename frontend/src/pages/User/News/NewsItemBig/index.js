import classNames from 'classnames/bind';
import styles from './NewsItemBig.module.scss';
const cx = classNames.bind(styles);
function NewsItemBig({ imgUrl, blogUrl, title }) {
    return (
        <div className={cx('new-item-big')}>
            <div className={cx('thumb')}>
                <a href={blogUrl}>
                    <img src={imgUrl} alt='thumb'/>
                </a>
            </div>
            <div className={cx('content-blog')}>
                <h3>
                    <a href={blogUrl}>{title}</a>
                </h3>
            </div>
        </div>
    );
}

export default NewsItemBig;
