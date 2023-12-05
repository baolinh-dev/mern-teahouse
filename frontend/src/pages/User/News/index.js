import Breadcrumb from '~/components/Breadcrumb';
import NewsItemBig from './NewsItemBig';
import NewsItemSmall from './NewsItemSmall';
import NewsTitle from './NewsTitle';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown, faCaretRight } from '@fortawesome/free-solid-svg-icons';

import classNames from 'classnames/bind';
import styles from './News.module.scss';
import { useState } from 'react';
import MainLayout from '~/layouts/MainLayout';

const cx = classNames.bind({
    ...styles,
    container: 'container',
    row: 'row',
});

function News() {
    const [showMenu, setShowMenu] = useState(false); // Khởi tạo state cho menu

    const toggleMenu = () => {
        setShowMenu(!showMenu); // Cập nhật trạng thái của menu khi click vào icon
    };
    const breadcrumbItems = [
        { label: 'Trang chủ', link: '/' },
        {
            label: 'Tin tức',
            active: true,
        },
    ];
    return (
        <>
            <MainLayout>
                <div className={cx('news', 'container')}>
                    <Breadcrumb items={breadcrumbItems} />
                    <div className={cx('row')}>
                        <div className={cx('blog_left_base', 'col-lg-9', 'col-md-9', 'col-sm-9', 'col-12')}>
                            <div className={cx('new-item-bigs')}>
                                <div className={cx('col-lg-6', 'col-md-6', 'col-sm-6', 'col-12')}>
                                    <NewsItemBig
                                        imgUrl={
                                            'https://bizweb.dktcdn.net/100/415/010/articles/untitled-1.jpg?v=1608884901087'
                                        }
                                        blogUrl={
                                            'https://bizweb.dktcdn.net/100/415/010/articles/untitled-1.jpg?v=1608884901087'
                                        }
                                        title={'Nhâm nhi cà phê bao lâu nhưng bạn tận mắt nhìn kỹ xem hạt cà phê chưa?'}
                                    />
                                </div>
                                <div className={cx('col-lg-6', 'col-md-6', 'col-sm-6', 'col-12')}>
                                    <NewsItemBig
                                        imgUrl={
                                            'https://bizweb.dktcdn.net/100/415/010/articles/untitled-5.jpg?v=1608884590463'
                                        }
                                        blogUrl={
                                            'https://bizweb.dktcdn.net/100/415/010/articles/untitled-5.jpg?v=1608884590463'
                                        }
                                        title={'Uống 1-4 tách cà phê mỗi ngày giúp bệnh nhân ung thư kéo dài sự sống'}
                                    />
                                </div>
                            </div>
                        </div>
                        <div
                            className={cx(
                                'blog_right_base',
                                'col-lg-3',
                                'col-md-3',
                                'col-md-12',
                                'col-sm-12',
                                'col-12',
                            )}
                        >
                            <section className={cx('category')}>
                                <NewsTitle title="Danh mục" />
                                <div className={cx('aside-content')}>
                                    <nav className={cx('nav-category')}>
                                        <ul className={cx('nav', 'navbar-pills')}>
                                            <li className={cx('nav-item')}>
                                                <Link className={cx('nav-link')} to="/">
                                                    Trang chủ
                                                </Link>
                                            </li>

                                            <li className={cx('nav-item')}>
                                                <Link className={cx('nav-link')} to="/menu">
                                                    Thực đơn
                                                </Link>
                                            </li>

                                            <li className={cx(['nav-item', 'active', 'products'])}>
                                                <div className={cx('product-title')}>
                                                    <Link to="/products" className={cx('nav-link')}>
                                                        Sản phẩm
                                                    </Link>
                                                    <FontAwesomeIcon
                                                        icon={showMenu ? faCaretDown : faCaretRight}
                                                        onClick={toggleMenu}
                                                    />
                                                </div>
                                            </li>
                                            <ul className={cx('dropdown-menu', { 'd-block': showMenu })}>
                                                <li className={cx('nav-item-dropdown')}>
                                                    <Link to="/productCategory?category=Cà phê">Cà phê</Link>
                                                </li>

                                                <li className={cx('nav-item-dropdown')}>
                                                    <Link to="/productCategory?category=Bánh ngọt">Bánh ngọt</Link>
                                                </li>

                                                <li className={cx('nav-item-dropdown')}>
                                                    <Link to="/productCategory?category=Smoothies">Smoothies</Link>
                                                </li>

                                                <li className={cx('nav-item-dropdown')}>
                                                    <Link to="/productCategory?category=Trà hoa quả">Trà hoa quả</Link>
                                                </li>
                                            </ul>

                                            <li className={cx('nav-item')}>
                                                <Link className={cx('nav-link')} to="/news">
                                                    Tin tức
                                                </Link>
                                            </li>

                                            <li className={cx('nav-item')}>
                                                <Link className={cx('nav-link')} to="/introduce">
                                                    Giới thiệu
                                                </Link>
                                            </li>

                                            <li className={cx('nav-item')}>
                                                <Link className={cx('nav-link')} to="/contact">
                                                    Liên hệ
                                                </Link>
                                            </li>
                                        </ul>
                                    </nav>
                                </div>
                            </section>
                            <section className={cx('about-me')}>
                                <NewsTitle title="Về chúng tôi" />
                                <div className={cx('image')}>
                                    <a href="https://bizweb.dktcdn.net/100/415/010/themes/894852/assets/banner_about.jpg?1676274744913">
                                        <img
                                            alt="hinh anh"
                                            src="https://bizweb.dktcdn.net/100/415/010/themes/894852/assets/banner_about.jpg?1676274744913"
                                        />
                                    </a>
                                </div>
                                <p>
                                    Tea House được sinh ra từ niềm đam mê bất tận với lá trà Việt Nam. Chúng tôi đã
                                    không ngừng mang đến những sản phẩm trà thơm ngon, sánh đượm trong không gian thoải
                                    mái và lịch sự với mức giá hợp lý.
                                </p>
                                <button>đọc tiếp</button>
                            </section>
                            <section className={cx('gallery')}>
                                <NewsTitle title="Hình ảnh" />
                                <img
                                    alt="hinh anh"
                                    src="https://bizweb.dktcdn.net/thumb/large/100/415/010/themes/894852/assets/pictureblog_1.jpg?1676274744913"
                                />
                                <img
                                    alt="hinh anh"
                                    src="https://bizweb.dktcdn.net/thumb/large/100/415/010/themes/894852/assets/pictureblog_3.jpg?1676274744913"
                                />
                                <img
                                    alt="hinh anh"
                                    src="https://bizweb.dktcdn.net/thumb/large/100/415/010/themes/894852/assets/pictureblog_4.jpg?1676274744913"
                                />
                                <img
                                    alt="hinh anh"
                                    src="https://bizweb.dktcdn.net/thumb/large/100/415/010/themes/894852/assets/pictureblog_5.jpg?1676274744913"
                                />
                                <img
                                    alt="hinh anh"
                                    src="https://bizweb.dktcdn.net/thumb/large/100/415/010/themes/894852/assets/pictureblog_6.jpg?1676274744913"
                                />
                                <img
                                    alt="hinh anh"
                                    src="https://bizweb.dktcdn.net/thumb/large/100/415/010/themes/894852/assets/pictureblog_2.jpg?1676274744913"
                                />
                            </section>
                        </div>
                    </div>
                </div>
            </MainLayout>
        </>
    );
}

export default News;
