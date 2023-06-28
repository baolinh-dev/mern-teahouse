import classNames from 'classnames/bind';
import styles from './CategoryItem.module.scss';
import 'bootstrap/dist/css/bootstrap.min.css';

const cx = classNames.bind({ ...styles, container: 'container' });

function CategoryItem({ content, imageUrl }) {
    return (
      <div className={cx('category-item')}>
        <img src={imageUrl} alt={content} />
        <h3>{content}</h3> 
      </div>
    );
  }
  
  export default CategoryItem;
