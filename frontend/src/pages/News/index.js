import Header from '~/components/Header';
import Breadcrumb from '~/components/Breadcrumb';
import Footer from '~/components/Footer';
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
                                        heading={
                                            'Nhâm nhi cà phê bao lâu nhưng bạn tận mắt nhìn kỹ xem hạt cà phê chưa?'
                                        }
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
                                        heading={'Uống 1-4 tách cà phê mỗi ngày giúp bệnh nhân ung thư kéo dài sự sống'}
                                    />
                                </div>
                            </div>
                            <div className={cx('new-item-smalls')}>
                                <div className={cx('col-lg-6', 'col-md-6', 'col-sm-6', 'col-12')}>
                                    <NewsItemSmall
                                        imgUrl={
                                            'https://bizweb.dktcdn.net/thumb/large/100/415/010/articles/untitled-2.jpg?v=1608884443517'
                                        }
                                        blogUrl={
                                            'https://bizweb.dktcdn.net/thumb/large/100/415/010/articles/untitled-2.jpg?v=1608884443517'
                                        }
                                        heading={'Uống trà có mất ngủ không?'}
                                        text={
                                            'Uống trà có mất ngủ không? Đây có lẽ là câu hỏi kinh điển, nhất là với những người mới tập uống trà. Có những người chỉ nhấp một chén trà thôi cũng có thể khiến họ trằn trọc khó ngủ cả đêm. Nhưng cũng có những người có thể uống trà từ sáng đến khuya mà vẫn có thể ngủ một cách ngon lành. Tại sao lại có sự khác biệt này?'
                                        }
                                    />
                                </div>
                                <div className={cx('col-lg-6', 'col-md-6', 'col-sm-6', 'col-12')}>
                                    <NewsItemSmall
                                        imgUrl={
                                            'https://bizweb.dktcdn.net/thumb/large/100/415/010/articles/untitled-3.jpg?v=1608884547463'
                                        }
                                        blogUrl={
                                            'https://bizweb.dktcdn.net/thumb/large/100/415/010/articles/untitled-3.jpg?v=1608884547463'
                                        }
                                        heading={
                                            'Dùng cốc giấy đựng cà phê nóng, thứ bạn uống đầy ắp những thứ đáng sợ này'
                                        }
                                        text={
                                            'Đối với nhiều người, một ngày mới chỉ có thể khởi đầu tốt đẹp bằng một tách cà phê nóng. Nhờ cafein, bộ não dường như không thể nhận được tín hiệu "mệt mỏi", từ đó tạo cho con người ta một nguồn năng lượng. Với những người làm việc trí óc căng thẳng, một vài tách cà phê mỗi ngày đã trở thành thức uống "cứu mạng".'
                                        }
                                    />
                                </div>
                            </div>
                            <div className={cx('new-item-smalls')}>
                                <div className={cx('col-lg-6', 'col-md-6', 'col-sm-6', 'col-12')}>
                                    <NewsItemSmall
                                        imgUrl={
                                            'https://bizweb.dktcdn.net/thumb/large/100/415/010/articles/untitled-6.jpg?v=1608884367517'
                                        }
                                        blogUrl={
                                            'https://bizweb.dktcdn.net/thumb/large/100/415/010/articles/untitled-6.jpg?v=1608884367517'
                                        }
                                        heading={'Cà phê hay thể dục: Lựa chọn nào giúp đánh bại cơn buồn ngủ tốt hơn?'}
                                        text={
                                            'Có hai trường phái để đánh bại những cơn buồn ngủ vào sáng sớm và đầu giờ chiều, hai thời điểm trong ngày mà bạn cần lấy lại sự tỉnh táo của mình nhất. Một số người sẽ chọn giải pháp nhanh chóng với caffeine, một số khác dựa vào dopamine và epinephrine có được từ quá trình tập thể dục.'
                                        }
                                    />
                                </div>
                                <div className={cx('col-lg-6', 'col-md-6', 'col-sm-6', 'col-12')}>
                                    <NewsItemSmall
                                        imgUrl={
                                            'https://bizweb.dktcdn.net/thumb/large/100/415/010/articles/untitled-4.jpg?v=1608884303023'
                                        }
                                        blogUrl={
                                            'https://bizweb.dktcdn.net/thumb/large/100/415/010/articles/untitled-4.jpg?v=1608884303023'
                                        }
                                        heading={
                                            'Bạn đã bao giờ thắc mắc tên gọi chính xác của cà phê bắt nguồn từ đâu chưa?'
                                        }
                                        text={
                                            'Nói về cà phê thì người dân Việt Nam lẫn trên thế giới đều không còn xa lạ gì. Đây được xem là một trong những loại "thức uống quốc dân" được người người, nhà nhà yêu thích bởi vị đắng và thơm lừng đặc trưng.'
                                        }
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
                                <NewsTitle title="Hình ảnh Tea House" />
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
