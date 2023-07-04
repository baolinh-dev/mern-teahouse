// Pages
import Home from '~/pages/Home'; 
import Login from '~/pages/Login'; 
import Register from '~/pages/Register';
import Contact from '~/pages/Contact';
import Products from '~/pages/Products';
import ProductDetails from '~/pages/ProductDetails';
import Introduce from '~/pages/Introduce';
import Menu from '~/pages/Menu';
import ProductCategory from '~/pages/ProductCategory';
import News from '~/pages/News';
import ForgotPassword from '~/pages/ForgotPassword';
import ResetPassword from '~/pages/ResetPassword';
import UserProfile from '~/pages/UserProfile';
// Public routes
const publicRoutes = [
    { path: '/', component: Home },   
    { path: '/user-profile', component: UserProfile },  
    { path: '/login', component: Login },  
    { path: '/register', component: Register }, 
    { path: '/api/v1/password/reset/:token', component: ResetPassword }, 
    { path: '/forgotpass', component: ForgotPassword }, 
    { path: '/menu', component: Menu},  
    { path: '/news', component: News}, 
    { path: '/productCategory', component: ProductCategory }, 
    { path: '/introduce', component: Introduce },  
    { path: '/contact', component: Contact },
    { path: '/products', component: Products },
    { path: '/products/:id', component: ProductDetails },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
