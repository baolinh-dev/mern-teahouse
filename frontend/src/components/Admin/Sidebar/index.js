import classNames from 'classnames/bind';
import styles from './Sidebar.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import CategoryItem from './CategoryItem';
const cx = classNames.bind({ ...styles, container: 'container' });

function Sidebar({ categories }) {
    return (
        <div className={cx('sidebar')}>
            <div className={cx('logo')}>
                <a href="/">
                    <img src="/static/media/logo.91b6b6a21e219dadbfab.webp" alt="Logo" />
                </a>
            </div>
            <div className={cx('list-category')}>
                {categories.map((category, index) => (
                    <CategoryItem
                        key={index}
                        categoryName={category.categoryName}
                        categoryIcon={category.categoryIcon}
                    />
                ))}
            </div>
        </div>
    );
}

export default Sidebar;
