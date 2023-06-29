import { useEffect, useState } from 'react';
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

    useEffect(() => {
        const fetchProducts = async () => {
            const response = await axios.get('http://localhost:4000/api/v1/products', {
                params: { 
                    page: currentPage,
                    category: category,
                },
            });
            setProducts(response.data.products); 
            setTotalPages(Math.ceil(response.data.productCount / 4));
        };

        fetchProducts();
    }, [category, currentPage]); 

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    return (
        <>
            <Header />
            <div className={cx('container')}>
                <div className={cx('product-category')}>
                    <Breadcrumb items={breadcrumbItems} />
                    <ContainerHeading center>
                        <Heading content={category} />
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
        </>
    );
}

export default ProductCategory;
