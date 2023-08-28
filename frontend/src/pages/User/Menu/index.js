import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import Breadcrumb from '~/components/Breadcrumb';
import MenuItem from './MenuItem';
import classNames from 'classnames/bind';
import styles from './Menu.module.scss';
import Pagination from '~/components/Pagination';
import MainLayout from '~/layouts/MainLayout';

const cx = classNames.bind({ ...styles, container: 'container' });

function Menu() {
    const [caPheProducts, setCaPheProducts] = useState([]);
    const [caPheCurrentPage, setCaPheCurrentPage] = useState(1);
    const [caPheTotalPages, setCaPheTotalPages] = useState(0);

    const [banhNgotProducts, setBanhNgotProducts] = useState([]);
    const [banhNgotCurrentPage, setBanhNgotCurrentPage] = useState(1);
    const [banhNgotTotalPages, setBanhNgotTotalPages] = useState(0);

    const [smoothiesProducts, setSmoothiesProducts] = useState([]);
    const [smoothiesCurrentPage, setSmoothiesCurrentPage] = useState(1);
    const [smoothiesTotalPages, setSmoothiesTotalPages] = useState(0);

    const [traHoaQuaProducts, setTraHoaQuaProducts] = useState([]);
    const [traHoaQuaCurrentPage, setTraHoaQuaCurrentPage] = useState(1);
    const [traHoaQuaTotalPages, setTraHoaQuaTotalPages] = useState(0);

    const [traSuaProducts, setTraSuaProducts] = useState([]);
    const [traSuaCurrentPage, setTraSuaCurrentPage] = useState(1);
    const [traSuaTotalPages, setTraSuaTotalPages] = useState(0);

    const fetchProducts = useCallback((category, currentPage, setProducts, setTotalPages) => {
        axios
            .get(`/api/v1/products?category=${category}&page=${currentPage}`)
            .then((response) => {
                setProducts(response.data.products);
                setTotalPages(Math.ceil(response.data.productCount / 4));
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    useEffect(() => {
        fetchProducts('Cà phê', caPheCurrentPage, setCaPheProducts, setCaPheTotalPages);
    }, [caPheCurrentPage, fetchProducts]);

    useEffect(() => {
        fetchProducts('Bánh ngọt', banhNgotCurrentPage, setBanhNgotProducts, setBanhNgotTotalPages);
    }, [banhNgotCurrentPage, fetchProducts]);

    useEffect(() => {
        fetchProducts('Smoothies', smoothiesCurrentPage, setSmoothiesProducts, setSmoothiesTotalPages);
    }, [smoothiesCurrentPage, fetchProducts]);

    useEffect(() => {
        fetchProducts('Trà hoa quả', traHoaQuaCurrentPage, setTraHoaQuaProducts, setTraHoaQuaTotalPages);
    }, [traHoaQuaCurrentPage, fetchProducts]);

    useEffect(() => {
        fetchProducts('Trà sữa', traSuaCurrentPage, setTraSuaProducts, setTraSuaTotalPages);
    }, [traSuaCurrentPage, fetchProducts]);

    const handleTraHoaQuaPageChange = (pageNumber) => {
        setTraHoaQuaCurrentPage(pageNumber);
    };

    const handleCaPhePageChange = (pageNumber) => {
        setCaPheCurrentPage(pageNumber);
    };

    const handleBanhNgotPageChange = (pageNumber) => {
        setBanhNgotCurrentPage(pageNumber);
    };

    const handleSmoothiesPageChange = (pageNumber) => {
        setSmoothiesCurrentPage(pageNumber);
    };

    const handleTraSuaPageChange = (pageNumber) => {
        setTraSuaCurrentPage(pageNumber);
    };

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
                    <div className={cx('item')}>
                        <MenuItem
                            contentHeading={'TRÀ HOA QUẢ'}
                            desc={
                                'Hương vị tự nhiên, thơm ngon của Trà Việt với phong cách hiện đại tại Tea House sẽ giúp bạn gợi mở vị giác của bản thân và tận hưởng một cảm giác thật khoan khoái, tươi mới.'
                            }
                            listItem={traHoaQuaProducts}
                        />
                        <Pagination
                            currentPage={traHoaQuaCurrentPage}
                            totalPages={traHoaQuaTotalPages}
                            onPageChange={handleTraHoaQuaPageChange}
                        />
                    </div>
                    <div className={cx('item')}>
                        <MenuItem
                            contentHeading={'CÀ PHÊ'}
                            desc={
                                'Hương vị tự nhiên, thơm ngon của Trà Việt với phong cách hiện đại tại Tea House sẽ giúp bạn gợi mở vị giác của bản thân và tận hưởng một cảm giác thật khoan khoái, tươi mới.'
                            }
                            listItem={caPheProducts}
                        />
                        <Pagination
                            currentPage={caPheCurrentPage}
                            totalPages={caPheTotalPages}
                            onPageChange={handleCaPhePageChange}
                        />
                    </div>
                    <div className={cx('item')}>
                        <MenuItem
                            contentHeading={'BÁNH NGỌT'}
                            desc={
                                'Hương vị tự nhiên, thơm ngon của Trà Việt với phong cách hiện đại tại Tea House sẽ giúp bạn gợi mở vị giác của bản thân và tận hưởng một cảm giác thật khoan khoái, tươi mới.'
                            }
                            listItem={banhNgotProducts}
                        />
                        <Pagination
                            currentPage={banhNgotCurrentPage}
                            totalPages={banhNgotTotalPages}
                            onPageChange={handleBanhNgotPageChange}
                        />
                    </div>
                    <div className={cx('item')}>
                        <MenuItem
                            contentHeading={'SMOOTHIES'}
                            desc={
                                'Hương vị tự nhiên, thơm ngon của Trà Việt với phong cách hiện đại tại Tea House sẽ giúp bạn gợi mở vị giác của bản thân và tận hưởng một cảm giác thật khoan khoái, tươi mới.'
                            }
                            listItem={smoothiesProducts}
                        />
                        <Pagination
                            currentPage={smoothiesCurrentPage}
                            totalPages={smoothiesTotalPages}
                            onPageChange={handleSmoothiesPageChange}
                        />
                    </div>
                    <div className={cx('item')}>
                        <MenuItem
                            contentHeading={'TRÀ SỮA'}
                            desc={
                                'Hương vị tự nhiên, thơm ngon của Trà Việt với phong cách hiện đại tại Tea House sẽ giúp bạn gợi mở vị giác của bản thân và tận hưởng một cảm giác thật khoan khoái, tươi mới.'
                            }
                            listItem={traSuaProducts}
                        />
                        <Pagination
                            currentPage={traSuaCurrentPage}
                            totalPages={traSuaTotalPages}
                            onPageChange={handleTraSuaPageChange}
                        />
                    </div>
                </div>
            </MainLayout>
        </>
    );
}

export default Menu;
