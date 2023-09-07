import AdminLayout from '~/layouts/AdminLayout';
import Cards from './Cards';
import OrderAppoval from './OrderAppoval';

function AdminHome() {
    return (
        <AdminLayout >
            <Cards />
            <OrderAppoval />
        </AdminLayout>
    );
}

export default AdminHome;
