import { useEffect, useState } from 'react';
import axios from 'axios';
import { Pagination } from 'antd';
import ProductRelatedItem from './ProductRelatedItem';

import classNames from 'classnames/bind';
import styles from './ProductRelated.module.scss';
import ContainerHeading from '~/components/ContainerHeading';
import Heading from '~/components/Heading';
const cx = classNames.bind({ ...styles, container: 'container', row: 'row' });

function ProductRelated({ id, category }) {
    const [relatedProducts, setRelatedProducts] = useState([]);
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchRelatedProducts = async () => {
            try {
                const response = await axios.get(`/api/v1/products`, {
                    params: { category, page: 'all'}, 
                });
                const data = response.data.products;
                // Lọc lại mảng sản phẩm trừ đi sản phẩm hiện tại (dựa trên id)
                const filteredProducts = data.filter((product) => product._id !== id);
                setRelatedProducts(filteredProducts);
                setProducts(data);
            } catch (error) {
                console.error('Error fetching related products:', error);
            }
        };

        fetchRelatedProducts();
    }, [id, category]);

    console.log('relatedProducts', relatedProducts);
    console.log('setProducts', products);

    return (
        <div className={cx('related-product-wrapper')}>
            <div className={cx('title')}>
                <ContainerHeading center>
                    <Heading content={'Có thể bạn sẽ thích'} />
                </ContainerHeading>
            </div>
            <div className={cx('related-product')}>
                {relatedProducts.map((product) => (
                    <>
                        <div key={product._id}>
                            <ProductRelatedItem
                                id={product._id}
                                imageUrl={product.images[0].url}
                                name={product.name}
                                price={product.price}
                            />
                        </div>
                    </>
                ))}
            </div>
        </div>
    );
}

export default ProductRelated;
