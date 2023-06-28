import ContainerHeading from '~/components/ContainerHeading';
import Heading from '~/components/Heading';
import CategoryItem from './CategoryItem';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import classNames from 'classnames/bind';
import styles from './Category.module.scss';
import 'bootstrap/dist/css/bootstrap.min.css';

const cx = classNames.bind({ ...styles, container: 'container' });

function Category() {
    const categories = [
        {
            content: 'Trà nóng',
            imageUrl: 'https://bizweb.dktcdn.net/100/415/010/themes/894852/assets/sec_category_1.jpg?1676274744913',
        },
        {
            content: 'Trà hoa quả',
            imageUrl: 'https://bizweb.dktcdn.net/100/415/010/themes/894852/assets/sec_category_2.jpg?1676274744913',
        },
        {
            content: 'Smoothies',
            imageUrl: 'https://bizweb.dktcdn.net/100/415/010/themes/894852/assets/sec_category_3.jpg?1676274744913',
        },
        {
            content: 'Bánh ngọt',
            imageUrl: 'https://bizweb.dktcdn.net/100/415/010/themes/894852/assets/sec_category_4.jpg?1676274744913',
        },
        {
            content: 'Bánh ngọt',
            imageUrl: 'https://bizweb.dktcdn.net/100/415/010/themes/894852/assets/sec_category_4.jpg?1676274744913',
        },
        {
            content: 'Bánh ngọt',
            imageUrl: 'https://bizweb.dktcdn.net/100/415/010/themes/894852/assets/sec_category_4.jpg?1676274744913',
        },
        {
            content: 'Bánh ngọt',
            imageUrl: 'https://bizweb.dktcdn.net/100/415/010/themes/894852/assets/sec_category_4.jpg?1676274744913',
        },
        {
            content: 'Bánh ngọt',
            imageUrl: 'https://bizweb.dktcdn.net/100/415/010/themes/894852/assets/sec_category_4.jpg?1676274744913',
        },
        {
            content: 'Bánh ngọt',
            imageUrl: 'https://bizweb.dktcdn.net/100/415/010/themes/894852/assets/sec_category_4.jpg?1676274744913',
        },
    ];

    return (
        <div className={cx('category-container')}>
            <div className={cx('category')}>
                <div className={cx('container-heading')}>
                    <ContainerHeading center>
                        <Heading content={'Danh mục sản phẩm'} />
                    </ContainerHeading>
                </div>
                <div className={cx('category-item-wrapper', 'container')}>
                    <Swiper
                        slidesPerView={4}
                        spaceBetween={30}
                        loop={true}
                        pagination={{
                            clickable: true,
                        }}
                        navigation={true}
                    >
                        {categories.map((category, key) => (
                            <SwiperSlide key={key}>
                                <CategoryItem key={key} content={category.content} imageUrl={category.imageUrl} />
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </div>
        </div>
    );
}

export default Category;
