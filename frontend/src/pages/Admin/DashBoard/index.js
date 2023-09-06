import AdminLayout from '~/layouts/AdminLayout';
import Cards from '../Home/Cards';

function AdminDashBoard() {
    const breadcrumbItems = [
        { label: 'Trang chủ', link: '/' },
        { label: 'Dashboard', active: true },
    ];
    return (
        <AdminLayout heading={'Dashboard'} breadcrumb={breadcrumbItems}>
            
            Đây là Dashboard 
        </AdminLayout>
    );
}

export default AdminDashBoard;
