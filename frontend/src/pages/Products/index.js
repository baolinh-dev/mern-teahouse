import React, { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import axios from 'axios';

import styles from './Products.module.scss';
import Header from '~/components/Header';
import Breadcrumb from '~/components/Breadcrumb';
import ProductItem from '~/components/ProductItem';
import Footer from '~/components/Footer';

const cx = classNames.bind({ ...styles, container: 'container' });

const Products = () => {
    const breadcrumbItems = [
        { label: 'Trang chủ', link: '/' },
        { label: 'Tất cả sản phẩm', active: true },
    ];
    const [products, setProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);

    useEffect(() => {
        axios
            .get(`http://localhost:4000/api/v1/products?page=${currentPage}`)
            .then((response) => {
                setProducts(response.data.products);
                setTotalPages(Math.ceil(response.data.productCount / 5));
            })
            .catch((error) => {
                console.log(error);
            });
    }, [currentPage]);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const renderPageNumbers = () => {
        const pageNumbers = [];

        if (totalPages > 1) {
            if (currentPage > 1) {
                pageNumbers.push(
                    <li key="previous" className={cx('pagi-nav')}>
                        <button onClick={() => handlePageChange(currentPage - 1)}>Previous</button>
                    </li>,
                );
            }

            for (let i = 1; i <= totalPages; i++) {
                pageNumbers.push(
                    <li key={i} className={currentPage === i ? 'active' : null}>
                        <button onClick={() => handlePageChange(i)}>{i}</button>
                    </li>,
                );
            }

            if (currentPage < totalPages) {
                pageNumbers.push(
                    <li key="next" className={cx('pagi-nav')}>
                        <button onClick={() => handlePageChange(currentPage + 1)}>Next</button>
                    </li>,
                );
            }
        }

        return pageNumbers;
    };

    return (
        <>
            <Header />
            <div className={cx('container')}>
                <div className={cx('products')}>
                    <Breadcrumb items={breadcrumbItems} />
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
                    <ul className={cx('pagination')}>{renderPageNumbers()}</ul>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default Products;
