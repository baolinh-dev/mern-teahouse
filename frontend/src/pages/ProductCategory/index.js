import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './ProductCategory.module.scss';
import axios from 'axios';
import Header from '~/components/Header';
import Breadcrumb from '~/components/Breadcrumb';
import ContainerHeading from '~/components/ContainerHeading';
import Heading from '~/components/Heading';
import ProductItem from '~/components/ProductItem';
import Pagination from '~/components/Pagination';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import Footer from '~/components/Footer';

const cx = classNames.bind({ ...styles, container: 'container' });

function ProductCategory() {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const category = searchParams.get('category');
    const breadcrumbItems = [
        { label: 'Trang chủ', link: '/' },
        { label: category, active: true },
    ];

    const [products, setProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [searchKeyword, setSearchKeyword] = useState('');
    const [searchStatus, setSearchStatus] = useState(false); // Thêm state searchStatus để lưu trạng thái tìm kiếm

    useEffect(() => {
        const fetchProducts = async () => {
            const response = await axios.get('http://localhost:4000/api/v1/products', {
                params: {
                    page: currentPage,
                    category: category,
                    keyword: searchKeyword,
                },
            });
            setProducts(response.data.products);
            setTotalPages(Math.ceil(response.data.productCount / 4));
            setSearchStatus(response.data.products.length > 0); // Cập nhật trạng thái tìm kiếm
        };

        fetchProducts();
    }, [category, currentPage, searchKeyword]);

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
                <div className={cx('product-category')}>
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
                        <Heading content={category} />
                    </ContainerHeading>
                    {searchStatus ? ( // Hiển thị danh sách sản phẩm nếu tìm thấy sản phẩm
                        <>
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
                        </>
                    ) : ( // Hiển thị thông báo nếu không tìm thấy sản phẩm
                        <h1>Không tìm thấy sản phẩm</h1>
                    )}
                </div>
            </div> 
            <Footer />
        </>
    );
}

export default ProductCategory;