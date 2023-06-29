import classNames from 'classnames/bind';
import styles from './Menu.module.scss';   

const cx = classNames.bind({ ...styles, container: 'container' }); 

function Menu() {
    return (   
        <div className={cx('menu')}> 
        Đây là Menu
        </div>
    );
}

export default Menu;