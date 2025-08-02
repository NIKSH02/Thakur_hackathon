import '../components/ScrollTextAnimation.css'; 
import Beams from '../components/Beams.jsx'
import ScrollTextAnimation from '../components/AnimatedTextSection.jsx'
import Lanyard from '../components/Lanyard.jsx'


// const fontUrl = "https://fonts.googleapis.com/css2?family=Montserrat:wght@800&display=swap";
// const link = document.createElement('link');
// link.href = fontUrl;
// link.rel = 'stylesheet';
// document.head.appendChild(link);


const words = ["SEI", "SEIZ", "SEIZE", "SEIZE G", "SEIZE GR", "SEIZE GRE"];

const HeroSection = () => {

  return (
    <div style={{ width: '100%', height: '150vh', position: 'relative' }}>
      <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: "cover" }}>
        {/* <Beams
          beamWidth={2}
          beamHeight={15}
          beamNumber={12}
          lightColor="#ffffff"
          speed={2}
          noiseIntensity={1.75}
          scale={0.2}
          rotation={30}
        /> */}
        <video autoPlay muted loop playsInline className="video-bg">
          <source src="/image.mp4" type="video/mp4"/>
        </video>
      </div>

    </div>
  );
};

export default HeroSection;
