import classNames from 'classnames/bind';
import styles from './NewsItem.module.scss';
import { Link } from 'react-router-dom';

const cx = classNames.bind({ ...styles, container: 'container' });

function NewsItem({ imgUrl, title, blogUrl }) {
    return (
        <div className={cx('news-item')}>
            <div className={cx('news-item-thumb')}>
                <Link to={blogUrl} target="_blank" >
                    <img src={imgUrl} alt='news-item-thumb'/>
                </Link>
            </div>
            <div className={cx('news-item-blog')}>
                <h3>
                    <a href="/">{title}</a>
                </h3>
            </div>
        </div>
    );
}

export default NewsItem;
