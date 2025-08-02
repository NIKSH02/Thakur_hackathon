
import Navbar from '../components/Navbar.jsx'
import HeroSection from '../components/HeroSection.jsx';
import InfiniteMarquee from '../components/InfiniteMarquee.jsx';
import ImageGridEffect from '../components/ImageGridEffect.jsx';
import ImageSection from '../components/ImageSection.jsx';
import Dock from '../components/Dock.jsx'
import Footer from '../components/Footer.jsx';

import {
  VscHome,
  VscArchive,
  VscAccount,
  VscSettingsGear,
  VscBell,
  VscMail,
  VscGraphLine,
} from 'react-icons/vsc';



const LandingPage = () => {

const items = [
  { icon: <VscHome size={18} />, label: 'Home', onClick: () => alert('Home!') },
  { icon: <VscArchive size={18} />, label: 'Archive', onClick: () => alert('Archive!') },
  { icon: <VscAccount size={18} />, label: 'Profile', onClick: () => alert('Profile!') },
  { icon: <VscSettingsGear size={18} />, label: 'Settings', onClick: () => alert('Settings!') },
  { icon: <VscBell size={18} />, label: 'Notifications', onClick: () => alert('Notifications!') },
//   { icon: <VscMail size={18} />, label: 'Messages', onClick: () => alert('Messages!') },
  { icon: <VscGraphLine size={18} />, label: 'Analytics', onClick: () => alert('Analytics!') },
];

  return (
    <div className=" text-white font-['Inter'] relative">
      <Navbar />
      <HeroSection />
      <InfiniteMarquee />
      <ImageGridEffect />
       <div className="my-class" style={{ zIndex: "10", position: 'fixed', bottom: "0",left: "50%"}}>
           <Dock
            items={items}
            className="my-class"
            panelHeight={80}
            baseItemSize={50}
            magnification={90}
            />
       </div>
       <ImageSection/>
       <Footer/>
    </div>
  );
};

export default LandingPage;