import classNames from 'classnames/bind';
import styles from './Pagination.module.scss';   

const cx = classNames.bind({ ...styles, container: 'container' }); 

function Pagination({ currentPage, totalPages, onPageChange }) {
    const pageNumbers = [];
  
    if (totalPages > 1) {
      if (currentPage > 1) {
        pageNumbers.push(
          <li key="previous" className={cx('pagi-nav')}>
            <button onClick={() => onPageChange(currentPage - 1)}>Previous</button>
          </li>,
        );
      }
  
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(
          <li key={i} className={currentPage === i ? 'active' : null}>
            <button onClick={() => onPageChange(i)}>{i}</button>
          </li>,
        );
      }
  
      if (currentPage < totalPages) {
        pageNumbers.push(
          <li key="next" className={cx('pagi-nav')}>
            <button onClick={() => onPageChange(currentPage + 1)}>Next</button>
          </li>,
        );
      }
    }
  
    return <ul className={cx('pagination')}>{pageNumbers}</ul>;
  } 

  export default Pagination;