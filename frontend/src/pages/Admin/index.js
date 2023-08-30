import AdminLayout from '~/layouts/AdminLayout';

function Admin() {
    const breadcrumbItems = [
        { label: 'Trang chủ', link: '/' },
        { label: 'Dashboard', active: true },
    ];
    return (
        <AdminLayout heading={'Dashboard'} breadcrumb={breadcrumbItems}>
            Đây là content
        </AdminLayout>
    );
}

export default Admin;
