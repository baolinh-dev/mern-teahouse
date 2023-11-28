import React from 'react';
import classNames from 'classnames/bind';
import styles from './AdminLayout.module.scss';
import Topbar from '~/components/Admin/Topbar';
import Sidebar from '~/components/Admin/Sidebar';
import Breadcrumb from '~/components/Breadcrumb';

import { faHome, faChartSimple, faUser, faWarehouse, faCartShopping, faFolderOpen  } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind({ ...styles, container: 'container' });

const categories = [
    { categoryName: 'Home', categoryIcon: faHome, url: '/admin' },
    { categoryName: 'Dashboard', categoryIcon: faChartSimple, url: '/admin/dashboard' },
    { categoryName: 'Orders', categoryIcon: faCartShopping, url: '/admin/orders' },
    { categoryName: 'Products', categoryIcon: faWarehouse, url: '/admin/products' }, 
    { categoryName: 'User', categoryIcon: faUser, url: '/admin/users' },
    { categoryName: 'Categories', categoryIcon: faFolderOpen, url: '/admin/categories' },

];

function AdminLayout({ breadcrumb, children }) {
    return (
        <div className={cx('adminlayout')}>
            <Sidebar categories={categories} />
            <div className={cx('right')}>
                <Topbar />
                <div className={cx('wrapper')}>
                    <div className={cx('content')}>
                        {breadcrumb ? <Breadcrumb items={breadcrumb} /> : <></>}
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AdminLayout;
