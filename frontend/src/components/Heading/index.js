import classNames from 'classnames/bind';
import styles from './Heading.module.scss';
import 'bootstrap/dist/css/bootstrap.min.css';

const cx = classNames.bind({ ...styles, container: 'container' });

function Heading({content, color}) {
    const textColorClass = color === 'white' ? 'text-white' : 'text-black';

    return (   
        <div className={cx('heading', textColorClass)}> 
            <h2>{content}</h2>
        </div>
    );
}

export default Heading;
