import axios from 'axios';
import Heading from '~/components/Heading';

import ContainerHeading from '~/components/ContainerHeading';
import { useEffect, useState } from 'react';
import ProductItem from '~/components/ProductItem';

import classNames from 'classnames/bind';
import styles from './Menu.module.scss';

const cx = classNames.bind({ ...styles, container: 'container' });

const tabtitles = [
    {
        content: 'Cà phê',
    },
    {
        content: 'Bánh ngọt',
    },
    {
        content: 'Smoothies',
    },
    {
        content: 'Trà hoa quả',
    },
    {
        content: 'Trà sữa',
    },
];

function Menu() {
    const [selectedTab, setSelectedTab] = useState(0);
    const [products, setProducts] = useState([]);

    const handleTabClick = (index) => {
        setSelectedTab(index);
    };

    useEffect(() => {
        const category = tabtitles[selectedTab].content;
        axios
            .get(`http://localhost:4000/api/v1/products?category=${category}`)
            .then((response) => {
                setProducts(response.data.products);
            })
            .catch((error) => {
                console.log(error);
            });
    }, [selectedTab]);

    return (
        <div className={cx('menu')}>
            <div className={cx('tabs-title')}>
                <ul>
                    {tabtitles.map((tabtitle, index) => (
                        <li
                            key={index}
                            className={selectedTab === index ? cx('active') : ''}
                            onClick={() => handleTabClick(index)}
                        >
                            {tabtitle.content}
                        </li>
                    ))}
                </ul>
            </div>
            <div className={cx('products', 'container')}>
                {products.map((product, index) => (
                    <ProductItem
                        id={product._id}
                        key={index}
                        imageUrl={product.images[0].url}
                        price={product.price}
                        nameProduct={product.nameProduct}
                    />
                ))}
            </div>
        </div>
    );
}

export default Menu;
