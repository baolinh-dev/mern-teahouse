import classNames from 'classnames/bind';
import styles from './CardItem.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
const cx = classNames.bind({ ...styles, container: 'container' });

function CardItem({ icon, quantity, heading }) {
    return (
        <div className={cx('card-item')}>
            <div className={cx('icon')}>
                <FontAwesomeIcon icon={icon} />
            </div>
            <div className={cx('infor')}>
                <h4 className={cx('heading')}>{heading}</h4>
                <h2 className={cx('quantity')}>{quantity}</h2>
            </div>
        </div>
    );
}

export default CardItem;
