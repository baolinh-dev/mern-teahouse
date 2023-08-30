import classNames from 'classnames/bind';
import styles from './Sidebar.module.scss';   

const cx = classNames.bind({ ...styles, container: 'container' }); 

function Sidebar() {
    return (   
        <div className={cx('sidebar')}>
            sidebar
        </div>
    );
}

export default Sidebar;