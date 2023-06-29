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
                setTotalPages(Math.ceil(response.data.productCount / 4));
            })
            .catch((error) => {
                console.log(error);
            });
    }, [currentPage]);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    return (
        <>
            <Header />
            <div className={cx('container')}>
                <div className={cx('products')}>
                    <Breadcrumb items={breadcrumbItems} />
                    <ContainerHeading center>
                        <Heading content={'Tất cả sản phẩm'} />
                    </ContainerHeading>
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
                    <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
                </div>
            </div>
            <Footer />
        </>
    );
};

export default Products;
