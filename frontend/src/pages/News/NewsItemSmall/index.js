import classNames from 'classnames/bind';
import styles from './NewsItemSmall.module.scss';
const cx = classNames.bind(styles);
function NewsItemSmall({ imgUrl, blogUrl, heading, text}) {
    return (
        <div className={cx('new-item-small')}>
            <div className={cx('thumb')}>
                <a href={blogUrl}>
                    <img src={imgUrl} />
                </a>
            </div>
            <div className={cx('content-blog')}>
                <h3>
                    <a href={blogUrl}>{heading}</a>
                </h3> 
                <p> 
                    {text}
                </p>
            </div>
        </div>
    );
}

export default NewsItemSmall;
