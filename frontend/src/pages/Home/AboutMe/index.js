import classNames from 'classnames/bind';
import styles from './AboutMe.module.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import Heading from '~/components/Heading';
import AboutMeItem from './AboutMeItem';

// col-xl-6 col-lg-6 col-12
const cx = classNames.bind({
    ...styles,
    container: 'container',
    row: 'row',
    'col-xl-6': 'col-xl-6',
    'col-lg-6': 'col-lg-6',
    'col-12': 'col-12',
});

function AboutMe() {
    const aboutmeItems = [
        {
            iconUrl: 'https://bizweb.dktcdn.net/100/415/010/themes/894852/assets/icon_why_1.png?1676274744913',
            heading: 'Giá cả phải chăng',
            content: 'Cam kết chỉ cung cấp cà phê có nguồn gốc được kiểm soát chất lượng',
        },
        {
            iconUrl: 'https://bizweb.dktcdn.net/100/415/010/themes/894852/assets/icon_why_2.png?1676274744913',
            heading: 'Hương vị tuyệt hảo',
            content: 'Những đọt trà được lựa chọn cẩn thận ngay từ lúc đang ngâm mình trong sương',
        },
        {
            iconUrl: 'https://bizweb.dktcdn.net/100/415/010/themes/894852/assets/icon_why_3.png?1676274744913',
            heading: 'Sản phẩm tự nhiên',
            content: 'Cam kết chỉ cung cấp lá trà có nguồn gốc được kiểm soát chất lượng chặt',
        },
    ];

    return (
        <section className={cx('about-me')}>
            <div className={cx('container')}>
                <div className={cx('row')}>
                    <div className={cx('col-xl-6', 'col-lg-6', 'col-12', 'infor')}>
                        <Heading content={'tại sao chọn chúng tôi'} />
                        <p>
                            Với những nghệ nhân rang tâm huyết và đội ngũ tài năng cùng những câu chuyện trà đầy cảm
                            hứng, ngôi nhà Tea House là không gian dành riêng cho những ai trót yêu say đắm hương vị của
                            những lá trà tuyệt hảo.
                        </p>
                        {aboutmeItems.map((item, index) => (
                            <AboutMeItem
                                key={index}
                                iconUrl={item.iconUrl}
                                heading={item.heading}
                                content={item.content}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}

export default AboutMe;
