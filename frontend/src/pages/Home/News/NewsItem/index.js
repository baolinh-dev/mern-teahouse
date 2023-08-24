import classNames from 'classnames/bind';
import styles from './NewsItem.module.scss';

const cx = classNames.bind({ ...styles, container: 'container' });

function NewsItem({ imgUrl, heading, content }) {
    return (
        <div className={cx('news-item')}>
            <div className={cx('news-item-thumb')}>
                <a href="/">
                    <img src={imgUrl} alt='news-item-thumb'/>
                </a>
            </div>
            <div className={cx('news-item-blog')}>
                <h3>
                    <a href="/">{heading}</a>
                </h3>
                <p>{content}</p>
            </div>
        </div>
    );
}

export default NewsItem;
