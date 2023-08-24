import slider1 from '~/assets/images/slider_1.webp';
import classNames from 'classnames/bind';
import styles from './Slider.module.scss';   

const cx = classNames.bind({ ...styles, container: 'container' }); 

function Slider() {
    return (   
        <div className={cx('slider')}>
            <img src={slider1} alt='slider'/>
        </div>
    );
}

export default Slider;