// Pages
import Home from '~/pages/Home'; 
import Login from '~/pages/Login'; 
import Register from '~/pages/Register';
import Contact from '~/pages/Contact';
import Products from '~/pages/Products';
import ProductDetails from '~/pages/ProductDetails';
import Introduce from '~/pages/Introduce';
import Menu from '~/pages/Menu';

// Public routes
const publicRoutes = [
    { path: '/', component: Home },  
    { path: '/menu', component: Menu}, 
    { path: '/login', component: Login }, 
    { path: '/register', component: Register }, 
    { path: '/introduce', component: Introduce },  
    { path: '/contact', component: Contact },
    { path: '/products', component: Products },
    { path: '/products/:id', component: ProductDetails },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
