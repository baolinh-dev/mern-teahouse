import classNames from 'classnames/bind';
import styles from './InforItem.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const cx = classNames.bind(styles);

function InforItem({ icon, label, text }) {
    return (
        <>
            <div className={cx('infor-item')}>
                <div className={cx('icon')}>
                    <FontAwesomeIcon icon={icon} />
                </div>
                <div className={cx('text')}>
                    <p>
                        <span>{label}: </span>
                        {text}
                    </p>
                </div>
            </div>
        </>
    );
}

export default InforItem;
