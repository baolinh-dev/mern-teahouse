import classNames from 'classnames/bind';
import styles from './News.module.scss';
import Header from '~/components/Header';
import Breadcrumb from '~/components/Breadcrumb';
import Footer from '~/components/Footer';
import NewsItemBig from './NewsItemBig';
import NewsItemSmall from './NewsItemSmall';
// col-lg-6 col-md-6 col-sm-12 col-12
// blog_left_base col-xl-3 col-lg-3 col-md-12 col-sm-12 col-xs-12
const cx = classNames.bind({ ...styles, container: 'container' });

function News() {
    const breadcrumbItems = [
        { label: 'Trang chủ', link: '/' },
        {
            label: 'Tin tức',
            active: true,
            'col-sm-12': 'col-sm-12',
            'col-xs-12': 'col-xs-12',
            'col-12': 'col-12',
            'col-lg-9': 'col-lg-9',
            'col-md-9': 'col-md-9',
            'col-sm-9': 'col-sm-9',
            'col-lg-6': 'col-lg-6',
            'col-md-6': 'col-md-6',
            'col-sm-6': 'col-sm-6',
            'col-xl-3': 'col-xl-3',
            'col-lg-3': 'col-lg-3',
            'col-md-12': 'col-md-12',
        },
    ];
    return (
        <>
            <Header />
            <div className={cx('news', 'container')}>
                <Breadcrumb items={breadcrumbItems} />
                <div className={cx('blog_left_base', 'col-lg-9', 'col-md-9', 'col-sm-9', 'col-12')}>
                    <div className={cx('new-item-bigs')}>
                        <div className={cx('col-lg-6', 'col-md-6', 'col-sm-6', 'col-12')}>
                            <NewsItemBig
                                imgUrl={'https://bizweb.dktcdn.net/100/415/010/articles/untitled-1.jpg?v=1608884901087'}
                                blogUrl={
                                    'https://bizweb.dktcdn.net/100/415/010/articles/untitled-1.jpg?v=1608884901087'
                                }
                                heading={'Nhâm nhi cà phê bao lâu nhưng bạn tận mắt nhìn kỹ xem hạt cà phê chưa?'}
                            />
                        </div>
                        <div className={cx('col-lg-6', 'col-md-6', 'col-sm-6', 'col-12')}>
                            <NewsItemBig
                                imgUrl={'https://bizweb.dktcdn.net/100/415/010/articles/untitled-1.jpg?v=1608884901087'}
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
                                imgUrl={'https://bizweb.dktcdn.net/100/415/010/articles/untitled-1.jpg?v=1608884901087'}
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
                                imgUrl={'https://bizweb.dktcdn.net/100/415/010/articles/untitled-1.jpg?v=1608884901087'}
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
                                imgUrl={'https://bizweb.dktcdn.net/100/415/010/articles/untitled-1.jpg?v=1608884901087'}
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
                                imgUrl={'https://bizweb.dktcdn.net/100/415/010/articles/untitled-1.jpg?v=1608884901087'}
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
            </div>
            <Footer />
        </>
    );
}

export default News;
