import classNames from 'classnames/bind';
import styles from './Header.module.scss';

const cx = classNames.bind({ ...styles, container: 'container' });

function Header() {
    return (  
        <p className={cx('box')}> đây là header</p>
    );
}

export default Header;