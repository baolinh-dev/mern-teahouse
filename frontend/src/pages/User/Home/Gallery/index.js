import classNames from 'classnames/bind';
import styles from './Gallery.module.scss';

const cx = classNames.bind(styles);

const images = [
    {
        imgUrl: 'https://bizweb.dktcdn.net/thumb/large/100/415/010/themes/894852/assets/picture_1.jpg?1676274744913',
    },
    {
        imgUrl: 'https://bizweb.dktcdn.net/thumb/large/100/415/010/themes/894852/assets/picture_2.jpg?1676274744913',
    },
    {
        imgUrl: 'https://bizweb.dktcdn.net/thumb/large/100/415/010/themes/894852/assets/picture_3.jpg?1676274744913',
    },
    {
        imgUrl: 'https://bizweb.dktcdn.net/thumb/large/100/415/010/themes/894852/assets/picture_4.jpg?1676274744913',
    },
    {
        imgUrl: 'https://bizweb.dktcdn.net/thumb/large/100/415/010/themes/894852/assets/picture_5.jpg?1676274744913',
    },
];

function Gallery() {
    const imageElements = images.map((image, index) => (
        <img key={index} src={image.imgUrl} alt='gallary'/>
    ));

    return (
        <div className={cx('gallery')}>
            <div className={cx('images')}>
                {imageElements}
            </div>
        </div>
    );
}

export default Gallery;
