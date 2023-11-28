// Pages
import Home from '~/pages/User/Home';
import Test from '~/pages/User/Test';
import Login from '~/pages/User/Authentication/Login';
import Register from '~/pages/User/Authentication/Register';
import Contact from '~/pages/User/Contact';
import ProductAll from '~/pages/User/Product/ProductAll';
import ProductDetails from '~/pages/User/ProductDetails';
import Introduce from '~/pages/User/Introduce';
import Menu from '~/pages/User/Menu';
import ProductCategory from '~/pages/User/Product/ProductCategory';
import News from '~/pages/User/News';
import ForgotPassword from '~/pages/User/Authentication/ForgotPassword';
import ResetPassword from '~/pages/User/Authentication/ResetPassword';
import UserProfile from '~/pages/User/Profile/UserProfile';
import EditProfile from '~/pages/User/Profile/EditProfile';
import ChangePassword from '~/pages/User/Profile/ChangePassword';
import MyOrders from '~/pages/User/Profile/MyOrders';
import Cart from '~/pages/User/Cart';
import PaymentForm from '~/pages/User/PaymentForm';
import AdminDashBoard from '~/pages/Admin/DashBoard';
import AdminHome from '~/pages/Admin/Home';
import ManageUser from '~/pages/Admin/ManageUser';
import ManageProducts from '~/pages/Admin/ManageProducts';
import ManageOrders from '~/pages/Admin/ManageOrders';
import AdminTest from '~/pages/User/AdminTest';
import ManageCategories from '~/pages/Admin/ManageCategories';
// Public routes
export const publicRoutes = [
    { path: '/', component: Home },
    { path: '/cart', component: Cart },
    { path: '/test', component: Test }, 
    { path: '/admintest', component: AdminTest },
    { path: '/paymentform', component: PaymentForm },
    { path: '/user-profile', component: UserProfile },
    { path: '/edit-profile', component: EditProfile },
    { path: '/my-orders', component: MyOrders },
    { path: '/change-password', component: ChangePassword },
    { path: '/login', component: Login },
    { path: '/register', component: Register },
    { path: '/api/v1/password/reset/:token', component: ResetPassword },
    { path: '/forgotpass', component: ForgotPassword },
    { path: '/menu', component: Menu },
    { path: '/news', component: News },
    { path: '/productCategory', component: ProductCategory },
    { path: '/introduce', component: Introduce },
    { path: '/contact', component: Contact },
    { path: '/products', component: ProductAll },
    { path: '/products/:id', component: ProductDetails },
];

export const privateRoutes = [
    { path: '/admin', component: AdminHome },
    { path: '/admin/dashboard', component: AdminDashBoard }, 
    { path: '/admin/users', component: ManageUser }, 
    { path: '/admin/products', component: ManageProducts }, 
    { path: '/admin/orders', component: ManageOrders },
    { path: '/admin/categories', component: ManageCategories },
];
