import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping, faPhoneAlt, faSearch, faUser } from '@fortawesome/free-solid-svg-icons';
import classNames from 'classnames/bind';
import styles from './Topbar.module.scss';

const cx = classNames.bind({ ...styles, container: 'container' });

function Topbar() {
    return (
        <div className={cx('topbar-container')}>
            <div className={cx('topbar', 'container')}>
                <div className={cx('left-topbar')}>
                    <FontAwesomeIcon icon={faPhoneAlt} />
                    <span>Hotline: </span>
                    <a href='tel"19006750'>1900 6750</a>
                </div>
                <div className={cx('right-topbar')}>
                    <ul>
                        <li className={cx('search')}>
                            <FontAwesomeIcon icon={faSearch} />
                            <span>Tìm kiếm</span>
                            <div className={cx('search-box')}>
                                <form>
                                    <input type="text" placeholder="Nhập từ khóa tìm kiếm" /> 
                                    <button> 
                                        <FontAwesomeIcon icon={faSearch}/>
                                    </button>
                                </form>
                            </div>
                        </li>
                        <li className={cx('account')}>
                            <FontAwesomeIcon icon={faUser} />
                            <span>Tài khoản</span>
                            <div className={cx('login-dropdown')}>
                                <a href="/">Đăng nhập</a>
                                <a href="/">Đăng ký</a>
                            </div>
                        </li>
                        <li>
                            <FontAwesomeIcon icon={faCartShopping} />
                            <span>Giỏ hàng</span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default Topbar;
