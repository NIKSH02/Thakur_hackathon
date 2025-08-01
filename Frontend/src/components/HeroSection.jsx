import React from 'react';
import { motion } from 'framer-motion';

const words = ["SEI", "SEIZ", "SEIZE", "SEIZE G", "SEIZE GR", "SEIZE GRE"];

const HeroSection = () => {
  return (
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
  );
};

export default HeroSection;
