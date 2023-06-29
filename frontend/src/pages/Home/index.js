import './Home.module.scss';
import Header from '~/components/Header';
import Slider from '~/pages/Home/Slider';
import AboutMe from '~/pages/Home/AboutMe';
import Category from '~/pages/Home/Category';
import Menu from '~/pages/Home/Menu';
import Footer from '~/components/Footer';
import TimeOpening from '~/pages/Home/TimeOpening';
import News from './News';
import Gallery from './Gallery'; 
import Cookies from 'js-cookie';

function Home() { 
    console.log('userName', Cookies.get('userName'));
    console.log('userId', Cookies.get('userId'));
    console.log('Token', Cookies.get('token'));
    return (
        <>
            <Header />
            <Slider />
            <Category />
            <AboutMe />
            <Menu />
            <TimeOpening />
            <News /> 
            <Gallery />
            <Footer />
        </>
    );
}

export default Home;
