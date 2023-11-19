import classNames from 'classnames/bind';
import styles from './Pagination.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind({ ...styles, container: 'container' });

function Pagination({ currentPage, totalPages, onPageChange }) {
    const pageNumbers = [];

    if (totalPages > 1) {
        if (currentPage > 1) {
            pageNumbers.push(
                <li key="previous" className={cx('pagi-nav')}>
                    <button onClick={() => onPageChange(currentPage - 1)}>
                        <FontAwesomeIcon icon={faAngleLeft} />
                    </button>
                </li>,
            );
        }

        if (totalPages <= 10) {
            for (let i = 1; i <= totalPages; i++) {
                pageNumbers.push(
                    <li key={i} className={currentPage === i ? cx('active') : null}>
                        <button onClick={() => onPageChange(i)}>{i}</button>
                    </li>,
                );
            }
        } else {
            // trang hiện tại nằm trong 5 trang đầu tiên
            if (currentPage <= 5) {
                for (let i = 1; i <= 7; i++) {
                    pageNumbers.push(
                        <li key={i} className={currentPage === i ? cx('active') : null}>
                            <button onClick={() => onPageChange(i)}>{i}</button>
                        </li>,
                    );
                }
                pageNumbers.push(
                    <li key="ellipsis" className={cx('ellipsis')}>
                        ...
                    </li>,
                );
                pageNumbers.push(
                    <li key={totalPages} className={cx('last')}>
                        <button onClick={() => onPageChange(totalPages)}>{totalPages}</button>
                    </li>,
                );
                // trang hiện tại nằm trong 5 trang cuối cùng
            } else if (currentPage > totalPages - 5) {
                pageNumbers.push(
                    <li key={1} className={cx('first')}>
                        <button onClick={() => onPageChange(1)}>1</button>
                    </li>,
                );
                pageNumbers.push(
                    <li key="ellipsis" className={cx('ellipsis')}>
                        ...
                    </li>,
                );
                for (let i = totalPages - 6; i <= totalPages; i++) {
                    pageNumbers.push(
                        <li key={i} className={currentPage === i ? cx('active') : null}>
                            <button onClick={() => onPageChange(i)}>{i}</button>
                        </li>,
                    );
                }
                // trang hiện tại nằm giữa 6 trang đầu tiên và 6 trang cuối cùng)
            } else {
                pageNumbers.push(
                    <li key={1} className={cx('first')}>
                        <button onClick={() => onPageChange(1)}>1</button>
                    </li>,
                );
                pageNumbers.push(
                    <li key="ellipsis1" className={cx('ellipsis')}>
                        ...
                    </li>,
                );
                for (let i = currentPage - 2; i <= currentPage + 2; i++) {
                    pageNumbers.push(
                        <li key={i} className={currentPage === i ? cx('active') : null}>
                            <button onClick={() => onPageChange(i)}>{i}</button>
                        </li>,
                    );
                }
                pageNumbers.push(
                    <li key="ellipsis2" className={cx('ellipsis')}>
                        ...
                    </li>,
                );
                pageNumbers.push(
                    <li key={totalPages} className={cx('last')}>
                        <button onClick={() => onPageChange(totalPages)}>{totalPages}</button>
                    </li>,
                );
            }
        }

        if (currentPage < totalPages) {
            pageNumbers.push(
                <li key="next" className={cx('pagi-nav')}>
                    <button onClick={() => onPageChange(currentPage + 1)}>
                        <FontAwesomeIcon icon={faAngleRight} />
                    </button>
                </li>,
            );
        }
    }

    return <ul className={cx('pagination')}>{pageNumbers}</ul>;
}

export default Pagination;
