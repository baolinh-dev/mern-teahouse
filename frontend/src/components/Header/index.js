import './Header.module.scss';
import Topbar from './Topbar'; 
import Navigation from './Navi';
import classNames from 'classnames/bind';
import styles from './Header.module.scss';

const cx = classNames.bind(styles);

function Header() {
    return (
        <div className={cx('header')}>
            <Topbar /> 
            <Navigation />
        </div>
    );
}

export default Header;
