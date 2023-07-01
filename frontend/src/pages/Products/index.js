import React, { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import axios from 'axios';

import styles from './Products.module.scss';
import Header from '~/components/Header';
import Breadcrumb from '~/components/Breadcrumb';
import ProductItem from '~/components/ProductItem';
import Footer from '~/components/Footer';
import Pagination from '~/components/Pagination';
import Contact from '../Contact';
import ContainerHeading from '~/components/ContainerHeading';
import Heading from '~/components/Heading';
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
    const [searchStatus, setSearchStatus] = useState(false); // lưu trạng thái tìm kiếm

    useEffect(() => {
        axios
            .get(`http://localhost:4000/api/v1/products?page=${currentPage}&keyword=${searchKeyword}`)
            .then((response) => {
                setProducts(response.data.products);
                setTotalPages(Math.ceil(response.data.productCount / 4));
                setSearchStatus(response.data.products.length > 0); // cập nhật trạng thái tìm kiếm
            })
            .catch((error) => {
                console.log(error);
                setSearchStatus(false); // cập nhật trạng thái tìm kiếm
            });
    }, [currentPage, searchKeyword]);

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