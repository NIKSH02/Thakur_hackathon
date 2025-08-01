// src/components/ImageSection.jsx
import React, { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';

const cardVariants = {
  hidden: { opacity: 0, y: 60, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: 'spring',
      stiffness: 100,
      damping: 15,
    },
  },
};

const ImageSection = () => {
  // Additional images for carousel functionality
  const carouselImages = [
    "/images/fest2.jpg",
    "/images/fest1.jpg", 
 
  ];

  const section1 = {
    title: "Featured Products",
    description:
      "A fusion of comfort, style and quality without compromise. An investment in unrivaled craftsmanship and design to make your home a very special place. A collection aimed to make the ordinary extraordinary and the everyday more desirable.",
    items: [
      {
        src: "/images/mob1.jpg",
        alt: "A living room with a grey sofa and a window",
        layout: "large",
      },
      {
        src: "/images/mob9.jpg",
        alt: "A single dark wooden chair",
        layout: "small",
      },
      {
        src: "/images/mob2.jpg",
        alt: "A small sofa with pillows",
        layout: "small",
        title: "Golden Oslo Sofa",
        price: "$250",
      },
      {
        src: "/images/fest5.jpg",
        alt: "An icon of a chair and a sofa",
        layout: "small",
        textOverlay: "CHAIR & SOFA",
      },
      {
        src: "/images/mob17.jpg",
        alt: "A small wooden stool",
        layout: "small",
      },
    ],
  };

  const section2 = {
    title: "More Featured Products",
    description: "Discover additional items to complete your home decor. From lighting to timepieces, find the perfect accent for any room.",
    items: [
      {
        src: "/images/mob1.jpg",
        alt: "A round wooden table with a mug",
        layout: "large",
      },
      {
        src: "/images/mob6.jpg",
        alt: "A stylish copper lamp",
        layout: "small",
        title: "Golden Oslo Sofa",
        price: "$250",
      },
      {
        src: "/images/mob2.jpg",
        alt: "A simple wall clock",
        layout: "small",
      },
      {
        src: "/images/mob9.jpg",
        alt: "A black sofa with a plant",
        layout: "small",
      },
      {
        src: "/images/mob23.jpg",
        alt: "An icon for accessories",
        layout: "small",
        textOverlay: "ACCESSORIES",
      },
    ],
  };

  return (
    <div className="font-sans bg-white text-gray-800">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-light text-gray-600 mb-4 tracking-widest">
            {section1.title}
          </h2>
          <p className="max-w-3xl mx-auto text-gray-500 text-sm leading-relaxed">
            {section1.description}
          </p>
        </div>
        
        {/* Section 1 */}
        <ImageGrid data={section1} carouselImages={carouselImages} />
        
        {/* Section 2 - directly connected */}
        <ImageGrid data={section2} carouselImages={carouselImages} />
      </div>
    </div>
  );
};

const ImageGrid = ({ data, carouselImages }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [section2ImageIndex, setSection2ImageIndex] = useState(0);

  // Section 1 navigation
  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % carouselImages.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + carouselImages.length) % carouselImages.length);
  };

  // Section 2 navigation with different images
  const section2Images = [
    "/images/fest3.jpg",
    "/images/fest4.jpg", 
  
  ];

  const nextSection2Image = () => {
    setSection2ImageIndex((prev) => (prev + 1) % section2Images.length);
  };

  const prevSection2Image = () => {
    setSection2ImageIndex((prev) => (prev - 1 + section2Images.length) % section2Images.length);
  };

  // Check if this is section 2 (More Featured Products)
  const isSection2 = data.title === "More Featured Products";

  return (
    <div>
      {isSection2 ? (
        // Layout for section 2: 4 smaller images on left, 1 large image on right
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
          {/* Left side: 4 smaller images in 2x2 grid */}
          <div className="col-span-1 md:col-span-1 lg:col-span-2 grid grid-cols-2">
            {data.items.slice(1).map((item, index) => (
              <AnimatedCard
                key={index}
                className="relative overflow-hidden shadow-lg"
              >
                <img
                  src={item.src}
                  alt={item.alt}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                />
                {(item.title || item.textOverlay) && (
                  <div className="absolute inset-0 bg-black/30 flex flex-col justify-end p-4 text-white">
                    {item.title && (
                      <>
                        <h3 className="text-lg font-semibold">{item.title}</h3>
                        {item.price && <p className="text-sm">{item.price}</p>}
                      </>
                    )}
                    {item.textOverlay && (
                      <div className="flex flex-col items-center justify-center p-4">
                        <div className="w-10 h-10 border-2 border-white mb-2 rounded-full flex items-center justify-center">
                          <span className="text-xl">🪑</span>
                        </div>
                        <p className="text-sm font-semibold">{item.textOverlay}</p>
                      </div>
                    )}
                    <button className="mt-2 bg-white text-gray-800 text-sm font-semibold px-4 py-2 rounded-full hover:bg-gray-200 transition-colors duration-300">
                      Shop Now
                    </button>
                  </div>
                )}
              </AnimatedCard>
            ))}
          </div>

          {/* Right side: Large image - positioned to the right */}
          <AnimatedCard className="relative overflow-hidden shadow-lg col-span-1 md:col-span-1 lg:col-span-2 row-span-2 group">
            <img
              src={section2Images[section2ImageIndex]}
              alt={data.items[0].alt}
              className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
            />
            
            {/* Navigation buttons for section 2 - always visible */}
            <div className="absolute bottom-4 right-4 flex space-x-3 z-10 opacity-100">
              <button
                onClick={prevSection2Image}
                className="bg-black/70 hover:bg-black/90 text-white p-3 rounded-full transition-all duration-300 shadow-lg"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              
              <button
                onClick={nextSection2Image}
                className="bg-black/70 hover:bg-black/90 text-white p-3 rounded-full transition-all duration-300 shadow-lg"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </AnimatedCard>
        </div>
      ) : (
        // Original layout for section 1
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
          {/* First large image with carousel */}
          <AnimatedCard className="relative overflow-hidden shadow-lg col-span-1 lg:col-span-2 row-span-2 group">
            <img
              src={carouselImages[currentImageIndex]}
              alt={data.items[0].alt}
              className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
            />
            
            {/* Navigation buttons at bottom */}
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
          </AnimatedCard>

          {/* Other images */}
          {data.items.slice(1).map((item, index) => (
            <AnimatedCard
              key={index}
              className={`relative overflow-hidden shadow-lg ${
                item.layout === "large"
                  ? "col-span-1 md:col-span-2 row-span-1"
                  : "col-span-1"
              }`}
            >
              <img
                src={item.src}
                alt={item.alt}
                className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
              />
              {(item.title || item.textOverlay) && (
                <div className="absolute inset-0 bg-black/30 flex flex-col justify-end p-4 text-white">
                  {item.title && (
                    <>
                      <h3 className="text-lg font-semibold">{item.title}</h3>
                      {item.price && <p className="text-sm">{item.price}</p>}
                    </>
                  )}
                  {item.textOverlay && (
                    <div className="flex flex-col items-center justify-center p-4">
                      <div className="w-10 h-10 border-2 border-white mb-2 rounded-full flex items-center justify-center">
                        <span className="text-xl">🪑</span>
                      </div>
                      <p className="text-sm font-semibold">{item.textOverlay}</p>
                    </div>
                  )}
                  <button className="mt-2 bg-white text-gray-800 text-sm font-semibold px-4 py-2 rounded-full hover:bg-gray-200 transition-colors duration-300">
                    Shop Now
                  </button>
                </div>
              )}
            </AnimatedCard>
          ))}
        </div>
      )}
    </div>
  );
};

// Reusable animated container
const AnimatedCard = ({ children, className }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.2 });

  return (
    <motion.div
      ref={ref}
      variants={cardVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default ImageSection;
