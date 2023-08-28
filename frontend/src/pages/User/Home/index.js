import './Home.module.scss';
import Header from '~/components/Header';
import Slider from '~/pages/User/Home/Slider';
import AboutMe from '~/pages/User/Home/AboutMe';
import Category from '~/pages/User/Home/Category';
import Menu from '~/pages/User/Home/Menu';
import Footer from '~/components/Footer';
import TimeOpening from '~/pages/User/Home/TimeOpening';
import News from './News';
import Gallery from './Gallery';

function Home() {
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
