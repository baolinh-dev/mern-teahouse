import Header from '../components/Header';
import Footer from '../components/Footer';

const MainLayout = ({ children }) => {
  return (
    <div className='container'>
      <Header />
      {children}
      <Footer />
    </div>
  );
};

export default MainLayout;