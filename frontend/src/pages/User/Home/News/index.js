import classNames from 'classnames/bind';
import styles from './News.module.scss';
import ContainerHeading from '~/components/ContainerHeading';
import NewsItem from './NewsItem';
import Heading from '~/components/Heading';
import { useEffect, useState } from 'react';
import axios from 'axios';

const cx = classNames.bind({ ...styles, container: 'container' });

function News() { 
    const [newsData, setNewsData] = useState([])
    const newsItems = [
        {
            imgUrl: 'https://bizweb.dktcdn.net/100/415/010/articles/untitled-1.jpg?v=1608884901087',
            heading: 'Nhâm nhi cà phê bao lâu nhưng bạn tận mắt nhìn kỹ xem hạt cà phê chưa?',
            content:
                'Cốc cafe vị đăng đắng, lẫn thêm chút ngọt bùi của sữa đặc sao mà gây nghiện đến thế. Không chỉ cuốn hút ở mùi vị, một cốc cafe sáng còn giúp ngày mới tràn đầy năng lượng với người trẻ, sẵn sàng cho một ngày lên giảng đường, hay vùi mình vào những công việc mới. Nhiều bạn thậm chí còn nhận xét vui "không có cafe không làm gì được".',
        },
        {
            imgUrl: 'https://bizweb.dktcdn.net/100/415/010/articles/untitled-5.jpg?v=1608884590463',
            heading: 'Uống 1-4 tách cà phê mỗi ngày giúp bệnh nhân ung thư kéo dài sự sống',
            content:
                'Uống từ một đến bốn tách cà phê mỗi ngày có thể giúp bệnh nhân ung thư đại trực tràng giai đoạn cuối sống lâu hơn và làm chậm sự tiến triển của bệnh. Phát hiện này được các nhà khoa học rút ra từ một nghiên cứu của Viện Ung thư Dana-Farber có trụ sở tại Boston, Hoa Kỳ.',
        },
        {
            imgUrl: 'https://bizweb.dktcdn.net/100/415/010/articles/untitled-3.jpg?v=1608884547463',
            heading: 'Dùng cốc giấy đựng cà phê nóng, thứ bạn uống đầy ắp những thứ đáng sợ này',
            content:
                'Đối với nhiều người, một ngày mới chỉ có thể khởi đầu tốt đẹp bằng một tách cà phê nóng. Nhờ cafein, bộ não dường như không thể nhận được tín hiệu "mệt mỏi", từ đó tạo cho con người ta một nguồn năng lượng. Với những người làm việc trí óc căng thẳng, một vài tách cà phê mỗi ngày đã trở thành thức uống "cứu mạng".',
        },
    ]; 

    useEffect(() => {
        // Gọi API để lấy dữ liệu tin tức
        axios
            .get('/api/v1/news?page=all')
            .then((response) => {
                setNewsData(response.data.news); // Lưu trữ dữ liệu tin tức vào state
            })
            .catch((error) => {
                console.error('Error fetching news data:', error);
            });
    }, []);

    return (
        <div className={cx('news')}>
            <ContainerHeading center>
                <Heading content={'Tin tức nổi bật'} />
            </ContainerHeading>
            <div className={cx('container')}>
                <div className={cx('news-content')}>
                    {newsData.map((newsItem, index) => (
                        <NewsItem
                            key={index}
                            imgUrl={newsItem.imgUrl}
                            title={newsItem.title}
                            blogUrl={newsItem.blogUrl}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default News;
