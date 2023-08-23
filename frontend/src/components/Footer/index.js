import './Footer.module.scss';
import TitleFooter from './TitleFooter';
import logo from '~/assets/images/logo.webp';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot, faPhoneAlt } from '@fortawesome/free-solid-svg-icons';
import { faFacebook, faGoogle, faPinterest, faTwitter, faYoutube } from '@fortawesome/free-brands-svg-icons';
import classNames from 'classnames/bind';
import styles from './Footer.module.scss';

// col-4 col-lg-4 col-md-12 col-12
const cx = classNames.bind({
    ...styles,
    container: 'container',
    row: 'row',
    'col-4': 'col-4',
    'col-lg-4': 'col-lg-4',
    'col-md-12': 'col-md-12 ',
    'col-12': 'col-12',
    'col-xl-12': 'col-xl-12',
});

function Footer() {
    return (
        <div className={cx('footer-container')}>
            <footer className={cx('container')}>
                <div className={cx('row')}>
                    <div className={cx('col-4', 'col-lg-4', 'col-md-12', 'col-12', 'right-footer')}>
                        <div className={cx('logo-footer')}>
                            <img src={logo} alt="logo-footer" />
                        </div>
                        <p>
                            Chúng tôi mong muốn Tea House sẽ trở thành “Nhà Trà", nơi mọi người xích lại gần nhau và tìm
                            thấy niềm vui, sự sẻ chia thân tình bên những tách cà phê đượm hương, chất lượng.
                        </p>
                        <div className={cx('socials')}>
                            <a href="/">
                                <FontAwesomeIcon icon={faTwitter} />
                            </a>
                            <a href="/">
                                <FontAwesomeIcon icon={faFacebook} />
                            </a>
                            <a href="/">
                                <FontAwesomeIcon icon={faPinterest} />
                            </a>
                            <a href="/">
                                <FontAwesomeIcon icon={faGoogle} />
                            </a>
                            <a href="/">
                                <FontAwesomeIcon icon={faYoutube} />
                            </a>
                        </div>
                    </div>
                    <div className={cx('col-4', 'col-lg-4', 'col-md-12', 'col-12', 'center-footer')}>
                        <TitleFooter content="LIÊN HỆ VỚI CHÚNG TÔI" />
                        <div className={cx('time-work')}>
                            <div className={cx('content-contact')}>
                                <FontAwesomeIcon icon={faLocationDot} />
                                <span>
                                    <b>Địa chỉ: </b> Tâng 6 toà nhà Ladeco, 266 Đội Cấn, phường Liễu Giai, Hà Nội,
                                </span>
                            </div>
                            <div className={cx('content-contact')}>
                                <FontAwesomeIcon icon={faPhoneAlt} />
                                <div className={cx('content-contact-inner')}>
                                    <span>
                                        <b>Hotline đặt bàn: </b>
                                        <a href="tell:19006750">1900 6750</a>
                                    </span>
                                    <span>
                                        <b>Hotline đặt bàn: </b>
                                        <a href="tell:19006750">1900 6750</a>
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={cx('col-4', 'col-lg-4', 'col-md-12', 'col-12', 'left-footer')}>
                        <TitleFooter content="ĐĂNG KÝ NHẬN KHUYẾN MÃI" />
                        <p>Đừng bỏ lỡ những sản phẩm và chương trình khuyến mãi hấp dẫn</p>
                        <div className={cx('input-group')}>
                            <input placeholder="Email của bạn" name="email" />
                            <button>Đăng kí</button>
                        </div>
                    </div>
                </div>
            </footer>
            <div className={cx('container')}>
                <div className={cx('row')}>
                    <div className={cx('copyright', 'col-12', 'col-xl-12')}>
                        <span>
                            © Bản quyền thuộc về
                            <b> Cafein Team </b>
                            Cung cấp bởi
                            <strong> Sapo</strong>
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Footer;
