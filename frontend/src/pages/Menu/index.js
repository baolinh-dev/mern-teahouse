import React, { useState, useEffect } from 'react';
import axios from 'axios';

import Header from '~/components/Header';
import Breadcrumb from '~/components/Breadcrumb';
import MenuItem from './MenuItem';
import classNames from 'classnames/bind';
import styles from './Menu.module.scss';
import Footer from '~/components/Footer';
import Pagination from '~/components/Pagination';

const cx = classNames.bind({ ...styles, container: 'container' });

function Menu() {
    const [traHoaQuaProducts, setTraHoaQuaProducts] = useState([]);
    const [caPheProducts, setCaPheProducts] = useState([]);
    const [banhNgotProducts, setBanhNgotProducts] = useState([]);
    const [smoothiesProducts, setSmoothiesProducts] = useState([]);
    const [traSuaProducts, setTraSuaProducts] = useState([]);

    const [traHoaQuaCurrentPage, setTraHoaQuaCurrentPage] = useState(1);
    const [caPheCurrentPage, setCaPheCurrentPage] = useState(1);
    const [banhNgotCurrentPage, setBanhNgotCurrentPage] = useState(1);
    const [smoothiesCurrentPage, setSmoothiesCurrentPage] = useState(1);
    const [traSuaCurrentPage, setTraSuaCurrentPage] = useState(1);

    const [traHoaQuaTotalPages, setTraHoaQuaTotalPages] = useState(0);
    const [caPheTotalPages, setCaPheTotalPages] = useState(0);
    const [banhNgotTotalPages, setBanhNgotTotalPages] = useState(0);
    const [smoothiesTotalPages, setSmoothiesTotalPages] = useState(0);
    const [traSuaTotalPages, setTraSuaTotalPages] = useState(0);

    useEffect(() => {
        axios
            .get('http://localhost:4000/api/v1/products?category=Trà hoa quả&page=' + traHoaQuaCurrentPage)
            .then((response) => {
                setTraHoaQuaProducts(response.data.products);
                setTraHoaQuaTotalPages(Math.ceil(response.data.productCount / 4));
            })
            .catch((error) => {
                console.log(error);
            });
    }, [traHoaQuaCurrentPage]);

    useEffect(() => {
        axios
            .get('http://localhost:4000/api/v1/products?category=Cà phê&page=' + caPheCurrentPage)
            .then((response) => {
                setCaPheProducts(response.data.products);
                setCaPheTotalPages(Math.ceil(response.data.productCount / 4));
            })
            .catch((error) => {
                console.log(error);
            });
    }, [caPheCurrentPage]);

    useEffect(() => {
        axios
            .get('http://localhost:4000/api/v1/products?category=Bánh ngọt&page=' + banhNgotCurrentPage)
            .then((response) => {
                setBanhNgotProducts(response.data.products);
                setBanhNgotTotalPages(Math.ceil(response.data.productCount / 4));
            })
            .catch((error) => {
                console.log(error);
            });
    }, [banhNgotCurrentPage]);

    useEffect(() => {
        axios
            .get('http://localhost:4000/api/v1/products?category=Smoothies&page=' + smoothiesCurrentPage)
            .then((response) => {
                setSmoothiesProducts(response.data.products);
                setSmoothiesTotalPages(Math.ceil(response.data.productCount / 4));
            })
            .catch((error) => {
                console.log(error);
            });
    }, [smoothiesCurrentPage]);

    useEffect(() => {
        axios
            .get('http://localhost:4000/api/v1/products?category=Trà sữa&page=' + traSuaCurrentPage)
            .then((response) => {
                setTraSuaProducts(response.data.products);
                setTraSuaTotalPages(Math.ceil(response.data.productCount / 4));
            })
            .catch((error) => {
                console.log(error);
            });
    }, [traSuaCurrentPage]);

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
            <Header />
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
                    <Pagination currentPage={traHoaQuaCurrentPage} totalPages={traHoaQuaTotalPages} onPageChange={handleTraHoaQuaPageChange} />
                </div>
                <div className={cx('item')}>
                    <MenuItem
                        contentHeading={'CÀ PHÊ'}
                        desc={
                            'Hương vị tự nhiên, thơm ngon của Trà Việt với phong cách hiện đại tại Tea House sẽ giúp bạn gợi mở vị giác của bản thân và tận hưởng một cảm giác thật khoan khoái, tươi mới.'
                        }
                        listItem={caPheProducts}
                    />
                    <Pagination currentPage={caPheCurrentPage} totalPages={caPheTotalPages} onPageChange={handleCaPhePageChange} />
                </div>
                <div className={cx('item')}>
                    <MenuItem
                        contentHeading={'BÁNH NGỌT'}
                        desc={
                            'Hương vị tự nhiên, thơm ngon của Trà Việt với phong cách hiện đại tại Tea House sẽ giúp bạn gợi mở vị giác của bản thân và tận hưởng một cảm giác thật khoan khoái, tươi mới.'
                        }
                        listItem={banhNgotProducts}
                    />
                    <Pagination currentPage={banhNgotCurrentPage} totalPages={banhNgotTotalPages} onPageChange={handleBanhNgotPageChange} />
                </div>
                <div className={cx('item')}>
                    <MenuItem
                        contentHeading={'SMOOTHIES'}
                        desc={
                            'Hương vị tự nhiên, thơm ngon của Trà Việt với phong cách hiện đại tại Tea House sẽ giúp bạn gợi mở vị giác của bản thân và tận hưởng một cảm giác thật khoan khoái, tươi mới.'
                        }
                        listItem={smoothiesProducts}
                    />
                    <Pagination currentPage={smoothiesCurrentPage} totalPages={smoothiesTotalPages} onPageChange={handleSmoothiesPageChange} />
                </div>
                <div className={cx('item')}>
                    <MenuItem
                        contentHeading={'TRÀ SỮA'}
                        desc={
                            'Hương vị tự nhiên, thơm ngon của Trà Việt với phong cách hiện đại tại Tea House sẽ giúp bạn gợi mở vị giác của bản thân và tận hưởng một cảm giác thật khoan khoái, tươi mới.'
                        }
                        listItem={traSuaProducts}
                    />
                    <Pagination currentPage={traSuaCurrentPage} totalPages={traSuaTotalPages} onPageChange={handleTraSuaPageChange} />
                </div>
            </div>
            <Footer />
        </>
    );
}

export default Menu;
