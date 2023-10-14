import AdminLayout from '~/layouts/AdminLayout';
import Cards from './Cards';
import OrderAppoval from './OrderAppoval';
import DashBoardApproval from './DashBoardApproval'; 

import classNames from 'classnames/bind';
import styles from './Home.module.scss';

const cx = classNames.bind({ ...styles, container: 'container' });

function AdminHome() {
    return (
        <AdminLayout >
            <Cards /> 
            <main className={cx('main-admin')}>
                <OrderAppoval />   
                <DashBoardApproval />
            </main>
        </AdminLayout>
    );
}

export default AdminHome;
