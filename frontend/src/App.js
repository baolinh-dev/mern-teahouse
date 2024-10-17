import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { publicRoutes, privateRoutes } from '~/routes';
import NotFound from './pages/NotFound';

function App() {
    const userRoleFromLocalStorage = localStorage.getItem('userRole');

    const renderRoutes = () => {
        const allowedRoutes = userRoleFromLocalStorage === 'user' ? publicRoutes : [...publicRoutes, ...privateRoutes];
        return allowedRoutes;
    };

    return (
        <Router>
            <div className="App">

                <Routes>
                    {renderRoutes().map((route, index) => {
                        const Page = route.component;
                        return <Route key={index} path={route.path} element={<Page />} />;
                    })}
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
