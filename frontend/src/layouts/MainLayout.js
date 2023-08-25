import Header from '../components/Header';
import Footer from '../components/Footer';

const MainLayout = ({ children }) => {
    return (
        <>
            <div className="container">
                <Header />
                {children}
            </div>
            <Footer />
        </>
    );
};

export default MainLayout;
