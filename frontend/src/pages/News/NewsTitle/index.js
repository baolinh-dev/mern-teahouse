import classNames from 'classnames/bind';
import styles from './NewsTitle.module.scss';   

const cx = classNames.bind({ ...styles, container: 'container' }); 

function NewsTitle({title}) {
    return (   
        <div className={cx('news-title')}>
            <h3>
                {title}
            </h3>
        </div>
    );
}

export default NewsTitle;