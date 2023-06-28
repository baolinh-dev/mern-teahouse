import classNames from 'classnames/bind';
import styles from './AboutMeItem.module.scss';

// col-xl-6 col-lg-6 col-12
const cx = classNames.bind(styles);

function AboutMeItem({ iconUrl, heading, content }) {
    return (
        <div className={cx('about-me-item')}>
            <div className={cx('icon')}>
                <img src={iconUrl} />
            </div>
            <div className={cx('infor')}>
                <h3>{heading}</h3>
                <p>{content}</p>
            </div>
        </div>
    );
}

export default AboutMeItem;
