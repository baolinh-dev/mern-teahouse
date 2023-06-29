import classNames from 'classnames/bind';
import styles from './Navi.module.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import logo from '~/assets/images/logo.webp';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind({ ...styles, container: 'container' });
const active = cx('active');

function Navigation() {
    return (
        <div className={cx('navi', 'container')}>
            <div className={cx('navi-left')}>
                <ul>
                    <li>
                        <Link className={active} to="/">
                            Trang chủ
                        </Link>
                    </li>
                    <li>
                        <Link to="/menu">Thực đơn</Link>
                    </li>

                    <li className={cx('item-product')}>
                        <Link to="/products">
                            Sản phẩm
                            <FontAwesomeIcon icon={faCaretDown} />
                        </Link>
                        <div className={cx('dropdown')}>
                            <Link to="/productCategory?category=Cà phê">Cà phê</Link>
                            <Link to="/productCategory?category=Bánh ngọt">Bánh ngọt</Link>
                            <Link to="/productCategory?category=Smoothies">Smoothies</Link>
                            <Link to="/productCategory?category=Trà hoa quả">Trà hoa quả</Link>
                        </div>
                    </li>
                </ul>
            </div>
            <div className={cx('logo-center')}>
                <img src={logo} alt="Logo" />
            </div>
            <div className={cx('navi-right')}>
                <ul>
                    <li>
                        <Link to="/news">Tin tức</Link>
                    </li>
                    <li>
                        <Link to="/introduce">Giới thiệu</Link>
                    </li>
                    <li>
                        <Link to="/contact">Liên hệ</Link>
                    </li>
                </ul>
            </div>
        </div>
    );
}

export default Navigation;
