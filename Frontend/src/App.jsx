import React from 'react';
import './App.css';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import NextSection from './components/NextSection';
import InfiniteMarquee from './components/InfiniteMarquee';
import ImageGridEffect from './components/ImageGridEffect';
import ImageSection from './components/ImageSection';
import Footer from './components/Footer';

const App = () => {
  return (
    <div className="bg-[#0d0d0d] text-white font-['Inter']">
      <Navbar />
      <HeroSection />

      <InfiniteMarquee />
      <ImageGridEffect />
      <ImageSection />
      <Footer />
    </div>
  );
};

export default App;
