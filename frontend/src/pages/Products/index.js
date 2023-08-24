import React, { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import axios from 'axios';

import styles from './Products.module.scss';
import Header from '~/components/Header';
import Breadcrumb from '~/components/Breadcrumb';
import ProductItem from '~/components/ProductItem';
import Footer from '~/components/Footer';
import Pagination from '~/components/Pagination';
import ContainerHeading from '~/components/ContainerHeading';
import Heading from '~/components/Heading';
import { Range } from 'react-range';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind({ ...styles, container: 'container' });

const Products = () => {
    const breadcrumbItems = [
        { label: 'Trang chủ', link: '/' },
        { label: 'Tất cả sản phẩm', active: true },
    ];
    const [products, setProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [searchKeyword, setSearchKeyword] = useState('');
    const [searchStatus, setSearchStatus] = useState(false);
    const [values, setValues] = useState([20000, 80000]); // giá trị mặc định
    const min = 20000;
    const max = 80000;

    function handleChange(newValues) {
        setValues(newValues);
    }

    useEffect(() => {
        axios
            .get(
                `/api/v1/products?page=${currentPage}&keyword=${searchKeyword}&price[gte]=${values[0]}&price[lte]=${values[1]}`,
            )
            .then((response) => {
                setProducts(response.data.products);
                setTotalPages(Math.ceil(response.data.productCount / 4));
                setSearchStatus(response.data.products.length > 0);
            })
            .catch((error) => {
                console.log(error);
                setSearchStatus(false);
            });
    }, [currentPage, searchKeyword, values]); // thêm values vào mảng dependencies của useEffect

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const handleInputChange = (event) => {
        setSearchKeyword(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        setCurrentPage(1);
    };

    return (
        <>
            <Header />
            <div className={cx('container')}>
                <div className={cx('products')}>
                    <div className={cx('sub')}>
                        <Breadcrumb items={breadcrumbItems} />
                        <div className={cx('options')}>
                            <div className={cx('filter')}>
                                <Range
                                    className={cx('range')}
                                    values={values}
                                    step={5000}
                                    min={min}
                                    max={max}
                                    onChange={handleChange}
                                    renderTrack={({ props, children }) => (
                                        <div className={cx('range-line')} {...props}>
                                            {children}
                                        </div>
                                    )}
                                    renderThumb={({ props }) => <div className={cx('range-dot')} {...props} />}
                                />
                                <div className={cx('range-value')}>
                                    <span>
                                        {values[0].toLocaleString('vi-VN', {
                                            style: 'currency',
                                            currency: 'VND',
                                        })}
                                    </span>
                                    <span>
                                        {values[1].toLocaleString('vi-VN', {
                                            style: 'currency',
                                            currency: 'VND',
                                        })}
                                    </span>
                                </div>
                            </div>
                            <div className={cx('search')}>
                                <div className={cx('search-box')}>
                                    <form onSubmit={handleSubmit}>
                                        <input
                                            type="text"
                                            placeholder="Nhập từ khóa tìm kiếm"
                                            value={searchKeyword}
                                            onChange={handleInputChange}
                                        />
                                        <button>
                                            <FontAwesomeIcon icon={faSearch} />
                                        </button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                    <ContainerHeading center>
                        <Heading content={'Tất cả sản phẩm'} />
                    </ContainerHeading>
                    {!searchStatus ? ( // kiểm tra trạng thái tìm kiếm
                        <h1>Không tìm thấy sản phẩm</h1>
                    ) : (
                        <ul className={cx('list')}>
                            {products.map((product) => (
                                <ProductItem
                                    key={product._id}
                                    imageUrl={product.images[0].url}
                                    price={product.price}
                                    nameProduct={product.name}
                                    id={product._id}
                                />
                            ))}
                        </ul>
                    )}
                    <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
                </div>
            </div>
            <Footer />
        </>
    );
};

export default Products;
