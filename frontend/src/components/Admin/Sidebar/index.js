import classNames from 'classnames/bind';
import styles from './Sidebar.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import CategoryItem from './CategoryItem';
import { Link } from 'react-router-dom';
const cx = classNames.bind({ ...styles, container: 'container' });

function Sidebar({ categories }) {
    return (
        <div className={cx('sidebar')}>
            <div className={cx('logo')}>
                <Link to={categories[0].url}>
                    <img src="/static/media/logo.91b6b6a21e219dadbfab.webp" alt="Logo" />
                </Link>
            </div>
            <div className={cx('list-category')}>
                {categories.map((category, index) => (
                    <CategoryItem
                        key={index}
                        categoryName={category.categoryName}
                        categoryIcon={category.categoryIcon}
                        categoryUrl={category.url}
                    />
                ))}
            </div>
        </div>
    );
}

export default Sidebar;
