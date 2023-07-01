import classNames from 'classnames/bind';
import styles from './Navi.module.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import logo from '~/assets/images/logo.webp';
import { Link, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind({ ...styles, container: 'container' });
const active = cx('active');

function Navigation() {
    const location = useLocation(); 
    const isActive = (path) => {
        if (location.pathname.startsWith('/productCategory')) {
            return path === '/products' ? active : '';
        } else {
            return location.pathname === path ? active : '';
        }
    };
    return (
        <div className={cx('navi', 'container')}>
            <div className={cx('navi-left')}>
                <ul>
                    <li>
                        <Link className={isActive('/')} to="/">
                            Trang chủ
                        </Link>
                    </li>
                    <li>
                        <Link className={isActive('/menu')} to="/menu">
                            Thực đơn
                        </Link>
                    </li>

                    <li className={cx('item-product')}>
                        <Link className={isActive('/products')} to="/products">
                            Sản phẩm
                            <FontAwesomeIcon icon={faCaretDown} />
                        </Link>
                        <div className={cx('dropdown')}>
                            <Link className={isActive('/productCategory?category=Cà phê')} to="/productCategory?category=Cà phê">
                                Cà phê
                            </Link>
                            <Link className={isActive('/productCategory?category=Bánh ngọt')} to="/productCategory?category=Bánh ngọt">
                                Bánh ngọt
                            </Link>
                            <Link className={isActive('/productCategory?category=Smoothies')} to="/productCategory?category=Smoothies">
                                Smoothies
                            </Link>
                            <Link className={isActive('/productCategory?category=Trà hoa quả')} to="/productCategory?category=Trà hoa quả">
                                Trà hoa quả
                            </Link>
                            <Link className={isActive('/productCategory?category=Trà sữa')} to="/productCategory?category=Trà sữa">
                                Trà sữa
                            </Link>
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
                        <Link className={isActive('/news')} to="/news">
                            Tin tức
                        </Link>
                    </li>
                    <li>
                        <Link className={isActive('/introduce')} to="/introduce">
                            Giới thiệu
                        </Link>
                    </li>
                    <li>
                        <Link className={isActive('/contact')} to="/contact">
                            Liên hệ
                        </Link>
                    </li>
                </ul>
            </div>
        </div>
    );
}

export default Navigation;
