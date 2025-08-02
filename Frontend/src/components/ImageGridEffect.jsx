// src/components/ImageGridSection.jsx
import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

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
    image: '/images/mob9.jpg',
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
  // Additional images for carousel functionality
  const carouselImages = [
    "/images/mob1.jpg",
    "/images/fest3.jpg", 

  ];

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
              currentImageIndex={i} // Use different image for each card
            />
          );
        })}
      </div>
    </div>
  );
};

// Separate component for each image card
const ImageCard = ({ item, carouselImages, currentImageIndex }) => {
  const ref = useRef(null);
  const navigate = useNavigate();
  const isInView = useInView(ref, { once: false, amount: 0.2 });

  // Function to handle shop now button click
  const handleShopNow = () => {
    // Default product ID that matches ProductDetailPage
    const DEFAULT_PRODUCT_ID = '507f1f77bcf86cd799439011';
    console.log('Navigating to product:', DEFAULT_PRODUCT_ID);
    
    // Navigate to product page
    navigate(`/product/${DEFAULT_PRODUCT_ID}`);
    
    // Scroll to top of the page after navigation
    setTimeout(() => {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth'
      });
    }, 100); // Small delay to ensure navigation completes
  };

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

      <div className="absolute inset-0 bg-black/30 flex flex-col justify-center items-start p-6">
        <h2 className="text-white text-xl md:text-2xl mb-2">{item.title}</h2>
        <p className="text-white font-semibold mb-3">Starting from {item.price}</p>
        {item.button && (
          <button 
            onClick={handleShopNow}
            className="bg-[#855437] text-white px-4 py-2 rounded hover:bg-[#6d4329] transition-colors duration-300"
          >
            Shop Now
          </button>
        )}
      </div>
    </motion.div>
  );
};

export default ImageGridSection;
