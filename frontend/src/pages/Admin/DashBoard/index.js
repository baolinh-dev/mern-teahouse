import AdminLayout from '~/layouts/AdminLayout';
import Cards from './Cards';

function AdminDashBoard() {
    const breadcrumbItems = [
        { label: 'Trang chủ', link: '/' },
        { label: 'Dashboard', active: true },
    ];
    return (
        <AdminLayout heading={'Dashboard'} breadcrumb={breadcrumbItems}>
            <Cards />
        </AdminLayout>
    );
}

export default AdminDashBoard;
