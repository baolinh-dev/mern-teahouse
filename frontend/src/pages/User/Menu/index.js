import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Breadcrumb from '~/components/Breadcrumb';
import MenuItem from './MenuItem';
import classNames from 'classnames/bind';
import styles from './Menu.module.scss';
import Pagination from '~/components/Pagination';
import MainLayout from '~/layouts/MainLayout';

const cx = classNames.bind({ ...styles, container: 'container' });

function Menu() {
    const [categories, setCategories] = useState([]);
    const [categoryNames, setCategoryNames] = useState([]);
    const [products, setProducts] = useState({});
    const [currentPage, setCurrentPage] = useState({});
    const [totalPages, setTotalPages] = useState({});
    const descs = {
        'Cà phê':
            'Một món đồ uống tuyệt vời để bắt đầu ngày mới. Vị đắng đặc trưng của cà phê hòa quyện với hương thơm thảo mộc, mang lại sự tỉnh táo và sảng khoái.',
        'Bánh ngọt':
            'Những món bánh ngọt ngon lành, được làm từ những nguyên liệu tươi ngon và tinh túy. Vị ngọt ngào sẽ làm tan chảy trái tim bạn.',
        Smoothies:
            'Thức uống trái cây tươi mát, giàu chất dinh dưỡng và hương vị tuyệt vời. Được làm từ những loại trái cây tươi ngon, smoothies là lựa chọn hoàn hảo cho một ngày nắng nóng.',
        'Trà hoa quả':
            'Trà hoa quả là sự kết hợp tuyệt vời giữa hương vị tự nhiên của trái cây và hương thơm của trà. Thức uống này không chỉ thỏa mãn khát, mà còn mang lại cảm giác sảng khoái và thư giãn.',
        'Trà sữa':
            'Trà sữa là sự kết hợp hoàn hảo giữa trà thảo mộc đậm đà và sữa béo ngậy. Với hương vị đặc trưng và đa dạng, trà sữa là một thức uống phổ biến và được ưa chuộng.',
        'Nước ngọt':
            'Một loại nước giải khát ngon lành để giải quyết cơn khát vào những ngày nóng bức. Với vị ngon ngọt và mát lạnh, nước ngọt là lựa chọn tuyệt vời để thưởng thức.',
    };

    useEffect(() => {
        axios
            .get('/api/v1/categories?page=all')
            .then((response) => {
                setCategories(response.data.categories);
                if (response.data.categories.length > 0) {
                    const names = response.data.categories.map((category) => category.name);
                    setCategoryNames(names);
                }
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    useEffect(() => {
        const fetchProducts = async () => {
            if (categoryNames.length > 0) {
                const fetchedProducts = {};
                const fetchedTotalPages = {};

                for (const category of categoryNames) {
                    try {
                        const response = await axios.get(`/api/v1/products?category=${category}`);
                        fetchedProducts[category] = response.data.products;
                        fetchedTotalPages[category] = Math.ceil(
                            response.data.productCount / response.data.numberProductsPerPage,
                        );
                    } catch (error) {
                        console.log(error);
                    }
                }

                setProducts(fetchedProducts);
                setTotalPages(fetchedTotalPages);
                setCurrentPage({}); // Đặt trang hiện tại về trống khi danh sách sản phẩm thay đổi
            }
        };

        fetchProducts();
    }, [categoryNames]);

    const handlePageChange = (category, page) => {
        setCurrentPage((prevCurrentPage) => {
            return {
                ...prevCurrentPage,
                [category]: page,
            };
        });
    };

    console.log('categories', categories);

    return (
        <>
            <MainLayout>
                <div className={cx('menu', 'container')}>
                    <Breadcrumb
                        items={[
                            { label: 'Trang chủ', link: '/' },
                            { label: 'Thực đơn', active: true },
                        ]}
                    />
                    {categories.map((category) => (
                        <div className={cx('item')} key={category.id}>
                            <MenuItem
                                contentHeading={category.name}
                                desc={descs[category.name]}
                                listItem={products[category.name] || []}
                            />
                            <Pagination
                                currentPage={currentPage[category.name] || 1}
                                totalPages={totalPages[category.name] || 1}
                                onPageChange={(page) => handlePageChange(category.name, page)}
                            />
                        </div>
                    ))}
                </div>
            </MainLayout>
        </>
    );
}

export default Menu;
