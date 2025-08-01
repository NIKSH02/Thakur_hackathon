import React from 'react';
import { motion } from 'framer-motion';

import Beams from '../components/Beams.jsx'

const words = ["SEI", "SEIZ", "SEIZE", "SEIZE G", "SEIZE GR", "SEIZE GRE"];

const HeroSection = () => {
  return (
    <div style={{ width: '100%', height: '100vh', position: 'relative' }}>
      <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 10 }}>
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
    <div className="relative w-full h-screen bg-black overflow-hidden flex items-center justify-center">
      {/* Background Image (optional) */}
      <div className="absolute inset-0 opacity-20">
        <img
          src="your-background.jpg" // Replace with actual path
          alt="bg"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Typographic Animation */}
      <div className="z-10 text-white font-extrabold text-[80px] leading-none tracking-tight uppercase">
        {words.map((word, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.3, duration: 0.5 }}
            className="overflow-hidden"
          >
            {word}
          </motion.div>
        ))}
      </div>
    </div>
    </div>
  );
};

export default HeroSection;
