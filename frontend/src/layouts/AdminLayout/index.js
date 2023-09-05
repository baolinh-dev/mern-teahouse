import React from 'react';
import classNames from 'classnames/bind';
import styles from './AdminLayout.module.scss';
import Topbar from '~/components/Admin/Topbar';
import Sidebar from '~/components/Admin/Sidebar';
import Breadcrumb from '~/components/Breadcrumb';

import { faHome, faChartSimple, faUser, faCogs } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind({ ...styles, container: 'container' });

const categories = [
    { categoryName: 'Home', categoryIcon: faHome, url: '/admin' },
    { categoryName: 'Dashboard', categoryIcon: faChartSimple, url: '/admin/dashboard' },
    { categoryName: 'User', categoryIcon: faUser, url: '/admin/users' },
    { categoryName: 'Settings', categoryIcon: faCogs, url: '/admin/settings' },
];

function AdminLayout({ heading, breadcrumb, children }) {
    return (
        <div className={cx('adminlayout')}>
            <Sidebar categories={categories} />
            <div className={cx('right')}>
                <Topbar/> 
                <h2>{heading}</h2>
                <div className={cx('content')}>
                    {breadcrumb ? <Breadcrumb items={breadcrumb} /> : <></>}
                    {children}
                </div>
            </div>
        </div>
    );
}

export default AdminLayout;
