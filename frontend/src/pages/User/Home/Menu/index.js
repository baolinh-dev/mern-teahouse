import axios from 'axios';
import Heading from '~/components/Heading';
import ContainerHeading from '~/components/ContainerHeading';
import { useEffect, useState } from 'react';
import ProductItem from '~/components/ProductItem';
import classNames from 'classnames/bind';
import styles from './Menu.module.scss';

const cx = classNames.bind({ ...styles, container: 'container' });

function Menu() {
    const [selectedTab, setSelectedTab] = useState(0);
    const [categories, setCategories] = useState([]);
    const [categoryNames, setCategoryNames] = useState([]);
    const [products, setProducts] = useState([]);

    const handleTabClick = (index) => {
        setSelectedTab(index);
    };

    useEffect(() => {
        axios
            .get('/api/v1/categories?page=all')
            .then((response) => {
                setCategories(response.data.categories);
                if (response.data.categories.length > 0) {
                    setSelectedTab(0);
                    const names = response.data.categories.map((category) => category.name);
                    setCategoryNames(names);
                }
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    useEffect(() => {
        if (categories.length > 0) {
            const category = categoryNames[selectedTab]; 
            console.log("category", category.name);

            axios
                .get(`/api/v1/products?category=${category}`)
                .then((response) => {
                    setProducts(response.data.products);
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    }, [selectedTab, categories]);

    return (
        <div className={cx('menu')}>
            <div className={cx('menu-header')}>
                <ContainerHeading center>
                    <Heading content={'Thực đơn'} />
                </ContainerHeading>
            </div>
            <div className={cx('tabs-title')}>
                <ul>
                    {categoryNames.map((categoryName, index) => (
                        <li
                            key={index}
                            className={selectedTab === index ? cx('active') : ''}
                            onClick={() => handleTabClick(index)}
                        >
                            {categoryName}
                        </li>
                    ))}
                </ul>
            </div>
            <div className={cx('products', 'container')}>
                {products !== undefined && products.length > 0 ? (
                    products.map((product, index) => (
                        <ProductItem
                            id={product._id}
                            key={index}
                            imageUrl={product.images[0].url}
                            price={product.price}
                            nameProduct={product.name}
                        />
                    ))
                ) : (
                    <p>No products available.</p>
                )}
            </div>
        </div>
    );
}

export default Menu;