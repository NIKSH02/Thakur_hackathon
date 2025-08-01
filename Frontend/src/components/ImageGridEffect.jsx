// src/components/ImageGridSection.jsx
import React, { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';

const benefits = [
  {
    icon: '/images/mob3.jpg',
    title: '100% Quality',
    desc: 'We provide the best quality as per your needs.',
  },
  {
    icon: '/images/mob5.jpg',
    title: 'Free Shipping',
    desc: 'Two-day delivery on thousands of items.',
  },
  {
    icon: '/images/mob6.jpg',
    title: '100% Secure Payment',
    desc: 'We secure your all transactions from fraud.',
  },
];

const section1 = [
  {
    image: '/images/mob1.jpg',
    title: 'Minimal Desk',
    price: '$600',
    button: true,
  },
  {
    image: '/images/mob2.jpg',
    title: 'Beautiful Lamps',
    price: '$150',
    button: true,
  },
 
];

const cardVariants = {
  hidden: { opacity: 0, y: 80 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 80,
      damping: 15,
    },
  },
};

const ImageGridSection = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  // Additional images for carousel functionality
  const carouselImages = [
    "/images/mob1.jpg",
    "/images/mob2.jpg", 
    "/images/mob3.jpg",
    "/images/mob5.jpg",
    "/images/mob6.jpg",
    "/images/mob7.jpg",
    "/images/mob8.jpg",
    "/images/mob9.jpg"
  ];

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % carouselImages.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + carouselImages.length) % carouselImages.length);
  };
  return (
    <div className="bg-white text-gray-800">
      {/* Benefits Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-6 py-12 text-center bg-[#fcf7f2]">
        {benefits.map((item, i) => (
          <div key={i}>
            <img src={item.icon} alt={item.title} className="mx-auto w-16 h-16 mb-4" />
            <h3 className="font-bold text-lg">{item.title}</h3>
            <p className="text-sm mt-1">{item.desc}</p>
          </div>
        ))}
      </div>

      {/* Masonry-style Grid with Motion */}
      <div className="columns-1 md:columns-2 gap-6 px-6 py-10 space-y-6">
        {section1.map((item, i) => {
          return (
            <ImageCard 
              key={i} 
              item={item} 
              carouselImages={carouselImages}
              currentImageIndex={currentImageIndex}
              nextImage={nextImage}
              prevImage={prevImage}
            />
          );
        })}
      </div>
    </div>
  );
};

// Separate component for each image card
const ImageCard = ({ item, carouselImages, currentImageIndex, nextImage, prevImage }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.2 });

  return (
    <motion.div
      ref={ref}
      variants={cardVariants}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      className="relative overflow-hidden rounded-xl break-inside-avoid group"
    >
      <img
        src={carouselImages[currentImageIndex]}
        alt={item.title}
        className="w-full h-auto max-h-[400px] object-cover rounded-xl transition-transform duration-500 hover:scale-105"
      />
      
      {/* Navigation buttons - always visible */}
      <div className="absolute bottom-4 right-4 flex space-x-3 z-10 opacity-100">
        <button
          onClick={prevImage}
          className="bg-black/70 hover:bg-black/90 text-white p-3 rounded-full transition-all duration-300 shadow-lg"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        
        <button
          onClick={nextImage}
          className="bg-black/70 hover:bg-black/90 text-white p-3 rounded-full transition-all duration-300 shadow-lg"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      <div className="absolute inset-0 bg-black/30 flex flex-col justify-center items-start p-6">
        <h2 className="text-white text-xl md:text-2xl mb-2">{item.title}</h2>
        <p className="text-white font-semibold mb-3">Starting from {item.price}</p>
        {item.button && (
          <button className="bg-[#855437] text-white px-4 py-2 rounded hover:bg-[#6d4329] transition-colors duration-300">
            Shop Now
          </button>
        )}
      </div>
    </motion.div>
  );
};

export default ImageGridSection;
