import AdminLayout from '~/layouts/AdminLayout';

function AdminHome() {
    const breadcrumbItems = [
        { label: 'Trang chủ', link: '/' },
        { label: 'Dashboard', active: true },
    ];
    return (
        <AdminLayout heading={'Home'}>
            Đây là Home
        </AdminLayout>
    );
}

export default AdminHome;
