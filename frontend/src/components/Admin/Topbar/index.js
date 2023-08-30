import classNames from 'classnames/bind';
import styles from './Topbar.module.scss';   

const cx = classNames.bind({ ...styles, container: 'container' }); 

function Topbar() {
    return (   
        <div className={cx('topbar')}>
            topbar
        </div>
    );
}

export default Topbar;