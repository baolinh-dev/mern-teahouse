// Pages
import Home from '~/pages/Home'; 
import Login from '~/pages/Authentication/Login'; 
import Register from '~/pages/Authentication/Register';
import Contact from '~/pages/Contact';
import ProductAll from '~/pages/Product/ProductAll';
import ProductDetails from '~/pages/ProductDetails';
import Introduce from '~/pages/Introduce';
import Menu from '~/pages/Menu';
import ProductCategory from '~/pages/Product/ProductCategory';
import News from '~/pages/News';
import ForgotPassword from '~/pages/Authentication/ForgotPassword';
import ResetPassword from '~/pages/Authentication/ResetPassword';
import UserProfile from '~/pages/Profile/UserProfile';
import EditProfile from '~/pages/Profile/EditProfile'; 
import ChangePassword from '~/pages/Profile/ChangePassword'; 
import MyOrders from '~/pages/Profile/MyOrders';
import Cart from '~/pages/Cart';
import PaymentForm from '~/pages/PaymentForm';
// Public routes
const publicRoutes = [
    { path: '/', component: Home },     
    { path: '/cart', component: Cart },    
    { path: '/paymentform', component: PaymentForm }, 
    { path: '/user-profile', component: UserProfile },  
    { path: '/edit-profile', component: EditProfile },   
    { path: '/my-orders', component: MyOrders },   
    { path: '/change-password', component: ChangePassword },  
    { path: '/login', component: Login },  
    { path: '/register', component: Register }, 
    { path: '/api/v1/password/reset/:token', component: ResetPassword }, 
    { path: '/forgotpass', component: ForgotPassword }, 
    { path: '/menu', component: Menu},  
    { path: '/news', component: News}, 
    { path: '/productCategory', component: ProductCategory }, 
    { path: '/introduce', component: Introduce },  
    { path: '/contact', component: Contact },
    { path: '/products', component: ProductAll },
    { path: '/products/:id', component: ProductDetails },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
