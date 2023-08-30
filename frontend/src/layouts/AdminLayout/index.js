import React from 'react';
import classNames from 'classnames/bind';
import styles from './AdminLayout.module.scss';
import Topbar from '~/components/Admin/Topbar';
import Sidebar from '~/components/Admin/Sidebar';
import Breadcrumb from '~/components/Breadcrumb';

import { faHome, faUser, faCogs } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind({ ...styles, container: 'container' });

const categories = [
  { categoryName: 'Home', categoryIcon: faHome },
  { categoryName: 'User', categoryIcon: faUser },
  { categoryName: 'Settings', categoryIcon: faCogs }
];

function AdminLayout({ heading, breadcrumb, children }) {
  return (
    <div className={cx('adminlayout')}>
      <Sidebar categories={categories} />
      <div className={cx('right')}>
        <Topbar />
        <div className={cx('content')}>
          <h2>{heading}</h2>
          <Breadcrumb items={breadcrumb} />
          {children}
        </div>
      </div>
    </div>
  );
}

export default AdminLayout;