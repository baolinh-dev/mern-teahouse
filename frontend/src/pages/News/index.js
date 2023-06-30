import classNames from 'classnames/bind';
import styles from './News.module.scss';
import Header from '~/components/Header';
import Breadcrumb from '~/components/Breadcrumb';
import Footer from '~/components/Footer';
import NewsItemBig from './NewsItemBig';
import NewsItemSmall from './NewsItemSmall';
import NewsTitle from './NewsTitle';
// col-lg-6 col-md-6 col-sm-12 col-12
// blog_left_base col-xl-3 col-lg-3 col-md-12 col-sm-12 col-xs-12
const cx = classNames.bind({
    ...styles,
    container: 'container',
    row: 'row',
});

function News() {
    const breadcrumbItems = [
        { label: 'Trang chủ', link: '/' },
        {
            label: 'Tin tức',
            active: true,
        },
    ];
    return (
        <>
            <Header />
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
                                    heading={'Nhâm nhi cà phê bao lâu nhưng bạn tận mắt nhìn kỹ xem hạt cà phê chưa?'}
                                />
                            </div>
                            <div className={cx('col-lg-6', 'col-md-6', 'col-sm-6', 'col-12')}>
                                <NewsItemBig
                                    imgUrl={
                                        'https://bizweb.dktcdn.net/100/415/010/articles/untitled-1.jpg?v=1608884901087'
                                    }
                                    blogUrl={
                                        'https://bizweb.dktcdn.net/100/415/010/articles/untitled-1.jpg?v=1608884901087'
                                    }
                                    heading={'Nhâm nhi cà phê bao lâu nhưng bạn tận mắt nhìn kỹ xem hạt cà phê chưa?'}
                                />
                            </div>
                        </div>
                        <div className={cx('new-item-smalls')}>
                            <div className={cx('col-lg-6', 'col-md-6', 'col-sm-6', 'col-12')}>
                                <NewsItemSmall
                                    imgUrl={
                                        'https://bizweb.dktcdn.net/100/415/010/articles/untitled-1.jpg?v=1608884901087'
                                    }
                                    blogUrl={
                                        'https://bizweb.dktcdn.net/100/415/010/articles/untitled-1.jpg?v=1608884901087'
                                    }
                                    heading={'Nhâm nhi cà phê bao lâu nhưng bạn tận mắt nhìn kỹ xem hạt cà phê chưa?'}
                                    text={
                                        'Đối với nhiều người, một ngày mới chỉ có thể khởi đầu tốt đẹp bằng một tách cà phê nóng. Nhờ cafein, bộ não dường như không thể nhận được tín hiệu "mệt mỏi", từ đó tạo cho con người ta một nguồn năng lượng. Với những người làm việc trí óc căng thẳng, một vài tách cà phê mỗi ngày đã trở thành thức uống "cứu mạng'
                                    }
                                />
                            </div>
                            <div className={cx('col-lg-6', 'col-md-6', 'col-sm-6', 'col-12')}>
                                <NewsItemSmall
                                    imgUrl={
                                        'https://bizweb.dktcdn.net/100/415/010/articles/untitled-1.jpg?v=1608884901087'
                                    }
                                    blogUrl={
                                        'https://bizweb.dktcdn.net/100/415/010/articles/untitled-1.jpg?v=1608884901087'
                                    }
                                    heading={'Nhâm nhi cà phê bao lâu nhưng bạn tận mắt nhìn kỹ xem hạt cà phê chưa?'}
                                    text={
                                        'Đối với nhiều người, một ngày mới chỉ có thể khởi đầu tốt đẹp bằng một tách cà phê nóng. Nhờ cafein, bộ não dường như không thể nhận được tín hiệu "mệt mỏi", từ đó tạo cho con người ta một nguồn năng lượng. Với những người làm việc trí óc căng thẳng, một vài tách cà phê mỗi ngày đã trở thành thức uống "cứu mạng'
                                    }
                                />
                            </div>
                        </div>
                        <div className={cx('new-item-smalls')}>
                            <div className={cx('col-lg-6', 'col-md-6', 'col-sm-6', 'col-12')}>
                                <NewsItemSmall
                                    imgUrl={
                                        'https://bizweb.dktcdn.net/100/415/010/articles/untitled-1.jpg?v=1608884901087'
                                    }
                                    blogUrl={
                                        'https://bizweb.dktcdn.net/100/415/010/articles/untitled-1.jpg?v=1608884901087'
                                    }
                                    heading={'Nhâm nhi cà phê bao lâu nhưng bạn tận mắt nhìn kỹ xem hạt cà phê chưa?'}
                                    text={
                                        'Đối với nhiều người, một ngày mới chỉ có thể khởi đầu tốt đẹp bằng một tách cà phê nóng. Nhờ cafein, bộ não dường như không thể nhận được tín hiệu "mệt mỏi", từ đó tạo cho con người ta một nguồn năng lượng. Với những người làm việc trí óc căng thẳng, một vài tách cà phê mỗi ngày đã trở thành thức uống "cứu mạng'
                                    }
                                />
                            </div>
                            <div className={cx('col-lg-6', 'col-md-6', 'col-sm-6', 'col-12')}>
                                <NewsItemSmall
                                    imgUrl={
                                        'https://bizweb.dktcdn.net/100/415/010/articles/untitled-1.jpg?v=1608884901087'
                                    }
                                    blogUrl={
                                        'https://bizweb.dktcdn.net/100/415/010/articles/untitled-1.jpg?v=1608884901087'
                                    }
                                    heading={'Nhâm nhi cà phê bao lâu nhưng bạn tận mắt nhìn kỹ xem hạt cà phê chưa?'}
                                    text={
                                        'Đối với nhiều người, một ngày mới chỉ có thể khởi đầu tốt đẹp bằng một tách cà phê nóng. Nhờ cafein, bộ não dường như không thể nhận được tín hiệu "mệt mỏi", từ đó tạo cho con người ta một nguồn năng lượng. Với những người làm việc trí óc căng thẳng, một vài tách cà phê mỗi ngày đã trở thành thức uống "cứu mạng'
                                    }
                                />
                            </div>
                        </div>
                    </div>
                    <div className={cx('blog_right_base', 'col-lg-3', 'col-md-3', 'col-md-12', 'col-sm-12', 'col-12')}>
                        <section className={cx('category')}>
                            <NewsTitle title="Danh mục" />
                            <div className={cx('aside-content')}>
                                <nav className={cx('nav-category')}>
                                    <ul className={cx('nav', 'navbar-pills')}>
                                        <li className={cx('nav-item')}>
                                            <a className={cx('nav-link')} href="/">
                                                Trang chủ
                                            </a>
                                        </li>

                                        <li className={cx('nav-item')}>
                                            <a className={cx('nav-link')} href="/gioi-thieu">
                                                Giới thiệu
                                            </a>
                                        </li>

                                        <li className={cx('nav-item', 'active')}>
                                            <a href="/collections/all" className={cx('nav-link')}>
                                                Sản phẩm
                                            </a>
                                            <i className={cx('fa', 'fa-caret-down', 'fa-caret-right')}></i>
                                        </li>

                                        <li className={cx('nav-item')}>
                                            <a className={cx('nav-link')} href="/tin-tuc">
                                                Tin tức
                                            </a>
                                        </li>

                                        <li className={cx('nav-item')}>
                                            <a className={cx('nav-link')} href="/thuc-don">
                                                Thực đơn
                                            </a>
                                        </li>

                                        <li className={cx('nav-item')}>
                                            <a className={cx('nav-link')} href="/lien-he">
                                                Liên hệ
                                            </a>
                                        </li>
                                    </ul>
                                </nav>
                            </div>
                        </section>
                        <section className={cx('about-me')}>
                            <NewsTitle title="Về chúng tôi" />
                            <div className={cx('image')}>
                                <a href="https://bizweb.dktcdn.net/100/415/010/themes/894852/assets/banner_about.jpg?1676274744913">
                                    <img src="https://bizweb.dktcdn.net/100/415/010/themes/894852/assets/banner_about.jpg?1676274744913" />
                                </a>
                            </div>
                            <p>
                                Tea House được sinh ra từ niềm đam mê bất tận với lá trà Việt Nam. Chúng tôi đã không
                                ngừng mang đến những sản phẩm trà thơm ngon, sánh đượm trong không gian thoải mái và
                                lịch sự với mức giá hợp lý.
                            </p>
                            <button>đọc tiếp</button>
                        </section>
                        <section className={cx('gallery')}>
                            <NewsTitle title="Hình ảnh Tea House" />
                            <img src="https://bizweb.dktcdn.net/thumb/large/100/415/010/themes/894852/assets/pictureblog_1.jpg?1676274744913" />
                            <img src="https://bizweb.dktcdn.net/thumb/large/100/415/010/themes/894852/assets/pictureblog_1.jpg?1676274744913" />
                            <img src="https://bizweb.dktcdn.net/thumb/large/100/415/010/themes/894852/assets/pictureblog_1.jpg?1676274744913" />
                            <img src="https://bizweb.dktcdn.net/thumb/large/100/415/010/themes/894852/assets/pictureblog_1.jpg?1676274744913" />
                            <img src="https://bizweb.dktcdn.net/thumb/large/100/415/010/themes/894852/assets/pictureblog_1.jpg?1676274744913" />
                            <img src="https://bizweb.dktcdn.net/thumb/large/100/415/010/themes/894852/assets/pictureblog_1.jpg?1676274744913" />
                        </section>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}

export default News;
