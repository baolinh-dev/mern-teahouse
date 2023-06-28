// Pages
import Home from '~/pages/Home';
import Contact from '~/pages/Contact';
import Products from '~/pages/Products';
import ProductDetails from '~/pages/ProductDetails';
import Introduce from '~/pages/Introduce';

// Public routes
const publicRoutes = [
    { path: '/', component: Home }, 
    { path: '/introduce', component: Introduce },
    { path: '/contact', component: Contact },
    { path: '/products', component: Products },
    { path: '/products/:id', component: ProductDetails },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
