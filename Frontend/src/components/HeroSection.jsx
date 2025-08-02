import React from 'react';
import Beams from '../components/Beams.jsx'


import ScrollTextAnimation from './AnimatedTextSection.jsx'


import '../components/ScrollTextAnimation.css'; // Make sure global styles are available

// Importing a font from Google Fonts for a better look
// You can also add this link to your public/index.html file
const fontUrl = "https://fonts.googleapis.com/css2?family=Montserrat:wght@800&display=swap";
const link = document.createElement('link');
link.href = fontUrl;
link.rel = 'stylesheet';
document.head.appendChild(link);


const words = ["SEI", "SEIZ", "SEIZE", "SEIZE G", "SEIZE GR", "SEIZE GRE"];

const HeroSection = () => {
  return (
    <div id="hero-section" style={{ width: '100%', height: '150vh', position: 'relative' }}>
      <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 2 }}>
        <Beams
          beamWidth={2}
          beamHeight={15}
          beamNumber={12}
          lightColor="#ffffff"
          speed={2}
          noiseIntensity={1.75}
          scale={0.2}
          rotation={30}
        />
      </div>
      <div style={{position: "relative", zIndex: 3  }}>
        <ScrollTextAnimation />
      </div>

    </div>
  );
};

export default HeroSection;
