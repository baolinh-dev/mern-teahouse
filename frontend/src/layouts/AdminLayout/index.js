import classNames from 'classnames/bind';
import styles from './AdminLayout.module.scss';
import Topbar from '~/components/Admin/Topbar';
import Sidebar from '~/components/Admin/Sidebar';
import Breadcrumb from '~/components/Breadcrumb';

const cx = classNames.bind({ ...styles, container: 'container' });

function AdminLayout({ heading, breadcrumb, children }) {
    return (
        <div className={cx('adminlayout')}>
            <Sidebar />
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
