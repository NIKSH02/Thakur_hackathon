// src/components/ImageSection.jsx
import React, { useRef, useState, useEffect, useCallback } from 'react';
import {motion,  useInView, useScroll, useTransform } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

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

// Enhanced card variants for scroll-based transitions
const scrollCardVariants = {
  hidden: { 
    opacity: 0, 
    y: 100, 
    scale: 0.9,
    rotateX: 10 
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    rotateX: 0,
    transition: {
      type: 'spring',
      stiffness: 120,
      damping: 20,
      duration: 0.8,
    },
  },
  scrollUp: {
    opacity: 1,
    y: -30, // Move upward during scroll
    scale: 1.02,
    rotateX: -5,
    transition: {
      type: 'spring',
      stiffness: 150,
      damping: 25,
      duration: 0.6,
    },
  },
};

const ImageSection = () => {
  // Additional images for carousel functionality - Only 2 images
  const carouselImages = [
    "/images/fest1.jpg",
    "/images/fest2.jpg"
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
        src: "/images/fest4.jpg",
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
  const navigate = useNavigate();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [section2ImageIndex, setSection2ImageIndex] = useState(0);
  const [slideDirection, setSlideDirection] = useState('right'); // 'left' or 'right'
  const [section2SlideDirection, setSection2SlideDirection] = useState('right');
  const [scrollDirection, setScrollDirection] = useState('down'); // Track scroll direction
  
  // Refs for intervals to manage them properly
  const section1IntervalRef = useRef(null);
  const section2IntervalRef = useRef(null);
  
  // Refs for tracking when sections are in view
  const section1Ref = useRef(null);
  const section2Ref = useRef(null);
  const isSection1InView = useInView(section1Ref, { once: false, amount: 0.3, margin: "0px 0px -100px 0px" }); // Better detection
  const isSection2InView = useInView(section2Ref, { once: false, amount: 0.3, margin: "0px 0px -100px 0px" }); // Better detection

  // Scroll direction detection
  const prevScrollY = useRef(0);
  
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > prevScrollY.current) {
        setScrollDirection('down');
      } else if (currentScrollY < prevScrollY.current) {
        setScrollDirection('up');
      }
      prevScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Check if this is section 2 (More Featured Products)
  const isSection2 = data.title === "More Featured Products";

  // Function to clear and restart section 1 interval
  const restartSection1Interval = useCallback(() => {
    if (section1IntervalRef.current) {
      clearInterval(section1IntervalRef.current);
    }
    
    section1IntervalRef.current = setInterval(() => {
      setCurrentImageIndex((prevIndex) => {
        const nextIndex = (prevIndex + 1) % carouselImages.length;
        const direction = nextIndex === 1 ? 'right' : 'left';
        setSlideDirection(direction);
        return nextIndex;
      });
    }, 1000); // Faster: 3 seconds between auto transitions
  }, [carouselImages.length]);

  // Function to clear and restart section 2 interval
  const restartSection2Interval = useCallback(() => {
    if (section2IntervalRef.current) {
      clearInterval(section2IntervalRef.current);
    }
    
    const section2Images = ["/images/fest5.jpg", "/images/fest6.jpg"];
    section2IntervalRef.current = setInterval(() => {
      setSection2ImageIndex((prevIndex) => {
        const nextIndex = (prevIndex + 1) % section2Images.length;
        const direction = nextIndex === 1 ? 'right' : 'left';
        setSection2SlideDirection(direction);
        return nextIndex;
      });
    }, 1500); // Faster: 3.5 seconds between auto transitions
  }, []);

  // Auto-play effect for section 1 carousel
  useEffect(() => {
    if (!isSection2 && isSection1InView && carouselImages.length > 1) {
      // Add a small delay when first coming into view
      const startDelay = setTimeout(() => {
        restartSection1Interval();
      }, 500); // Faster start when scrolling back

      return () => {
        clearTimeout(startDelay);
        if (section1IntervalRef.current) {
          clearInterval(section1IntervalRef.current);
        }
      };
    } else {
      if (section1IntervalRef.current) {
        clearInterval(section1IntervalRef.current);
      }
    }
  }, [isSection1InView, isSection2, carouselImages.length, restartSection1Interval]);

  // Auto-play effect for section 2 carousel
  useEffect(() => {
    if (isSection2 && isSection2InView) {
      const section2Images = [
        "/images/fest5.jpg",
        "/images/fest6.jpg"
      ];
      
      if (section2Images.length > 1) {
        // Add a small delay when first coming into view
        const startDelay = setTimeout(() => {
          restartSection2Interval();
        }, 600); // Faster start when scrolling back

        return () => {
          clearTimeout(startDelay);
          if (section2IntervalRef.current) {
            clearInterval(section2IntervalRef.current);
          }
        };
      }
    } else {
      if (section2IntervalRef.current) {
        clearInterval(section2IntervalRef.current);
      }
    }
  }, [isSection2InView, isSection2, restartSection2Interval]);

  // Function to handle shop now button click
  const handleShopNow = (productId = null) => {
    // Default product ID that matches ProductDetailPage
    const DEFAULT_PRODUCT_ID = '507f1f77bcf86cd799439011';
    const id = productId || DEFAULT_PRODUCT_ID;
    console.log('Navigating to product:', id);
    
    // Navigate to product page
    navigate(`/product/${id}`);
    
    // Scroll to top of the page after navigation
    setTimeout(() => {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth'
      });
    }, 100); // Small delay to ensure navigation completes
  };

  // Section 1 navigation - proper directional sliding with interval restart
  const nextImage = () => {
    // Clear current interval to prevent conflicts
    if (section1IntervalRef.current) {
      clearInterval(section1IntervalRef.current);
    }
    
    setSlideDirection('right'); // Moving forward = slide from right
    setCurrentImageIndex((prev) => (prev + 1) % carouselImages.length);
    
    // Restart interval after manual navigation
    setTimeout(() => {
      if (isSection1InView) {
        restartSection1Interval();
      }
    }, 1500); // Faster restart: Wait 2.5 seconds after manual click before resuming auto-play
  };

  const prevImage = () => {
    // Clear current interval to prevent conflicts
    if (section1IntervalRef.current) {
      clearInterval(section1IntervalRef.current);
    }
    
    setSlideDirection('left'); // Moving backward = slide from left
    setCurrentImageIndex((prev) => (prev - 1 + carouselImages.length) % carouselImages.length);
    
    // Restart interval after manual navigation
    setTimeout(() => {
      if (isSection1InView) {
        restartSection1Interval();
      }
    }, 1500); // Faster restart: Wait 2.5 seconds after manual click before resuming auto-play
  };

  // Section 2 navigation with different images - Only 2 images
  const section2Images = [
    "/images/fest5.jpg",
    "/images/fest6.jpg"
  ];

  // Section 2 navigation - proper directional sliding with interval restart
  const nextSection2Image = () => {
    // Clear current interval to prevent conflicts
    if (section2IntervalRef.current) {
      clearInterval(section2IntervalRef.current);
    }
    
    setSection2SlideDirection('right'); // Moving forward = slide from right
    setSection2ImageIndex((prev) => (prev + 1) % section2Images.length);
    
    // Restart interval after manual navigation
    setTimeout(() => {
      if (isSection2InView) {
        restartSection2Interval();
      }
    }, 1500); // Faster restart: Wait 2.5 seconds after manual click before resuming auto-play
  };

  const prevSection2Image = () => {
    // Clear current interval to prevent conflicts
    if (section2IntervalRef.current) {
      clearInterval(section2IntervalRef.current);
    }
    
    setSection2SlideDirection('left'); // Moving backward = slide from left
    setSection2ImageIndex((prev) => (prev - 1 + section2Images.length) % section2Images.length);
    
    // Restart interval after manual navigation
    setTimeout(() => {
      if (isSection2InView) {
        restartSection2Interval();
      }
    }, 2500); // Faster restart: Wait 2.5 seconds after manual click before resuming auto-play
  };

  return (
    <div ref={isSection2 ? section2Ref : section1Ref}>
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
                    <button 
                      onClick={() => handleShopNow()}
                      className="mt-2 bg-white text-gray-800 text-sm font-semibold px-4 py-2 rounded-full hover:bg-gray-200 transition-colors duration-300"
                    >
                      Shop Now
                    </button>
                  </div>
                )}
              </AnimatedCard>
            ))}
          </div>

          {/* Right side: Large image with auto-slideshow and slide animation */}
          <AnimatedCard className="relative overflow-hidden shadow-lg col-span-1 md:col-span-1 lg:col-span-2 row-span-2 group">
            <motion.img
              key={section2ImageIndex} // Key change triggers re-animation
              src={section2Images[section2ImageIndex]}
              alt={data.items[0].alt}
              className="w-full h-full object-cover"
              initial={{ 
                x: section2SlideDirection === 'right' ? '100%' : '-100%'
              }}
              animate={{ 
                x: 0
              }}
              exit={{ 
                x: section2SlideDirection === 'right' ? '-100%' : '100%'
              }}
              transition={{ 
                duration: 2.0, // Faster and smoother transition
                ease: [0.25, 0.1, 0.25, 1], // Smoother custom cubic-bezier
                x: { type: "spring", stiffness: 200, damping: 25 } // Faster spring
              }}
              style={{
                transformOrigin: 'center center'
              }}
              whileHover={{
                scale: 1.03,
                transition: { duration: 0.3, ease: "easeOut" }
              }}
            />
            
            {/* Enhanced navigation buttons for section 2 */}
            <div className="absolute bottom-4 right-4 flex space-x-3 z-10">
              <motion.button
                onClick={prevSection2Image}
                className="bg-black/80 hover:bg-black/95 text-white p-3 rounded-full shadow-xl"
                whileHover={{ 
                  scale: 1.1,
                  backgroundColor: "rgba(0, 0, 0, 0.95)",
                  boxShadow: "0 10px 25px rgba(0, 0, 0, 0.3)"
                }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
              >
                <motion.svg 
                  className="w-5 h-5" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                  whileHover={{ x: -2 }}
                  transition={{ duration: 0.2 }}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </motion.svg>
              </motion.button>
              
              <motion.button
                onClick={nextSection2Image}
                className="bg-black/80 hover:bg-black/95 text-white p-3 rounded-full shadow-xl"
                whileHover={{ 
                  scale: 1.1,
                  backgroundColor: "rgba(0, 0, 0, 0.95)",
                  boxShadow: "0 10px 25px rgba(0, 0, 0, 0.3)"
                }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
              >
                <motion.svg 
                  className="w-5 h-5" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                  whileHover={{ x: 2 }}
                  transition={{ duration: 0.2 }}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </motion.svg>
              </motion.button>
            </div>
            
            {/* Enhanced progress indicators */}
            <div className="absolute bottom-4 left-4 flex space-x-2">
              {section2Images.map((_, index) => (
                <motion.div
                  key={index}
                  className={`w-3 h-3 rounded-full cursor-pointer ${
                    index === section2ImageIndex 
                      ? 'bg-white shadow-lg' 
                      : 'bg-white/50 hover:bg-white/70'
                  }`}
                  whileHover={{ scale: 1.2 }}
                  animate={{
                    scale: index === section2ImageIndex ? 1.1 : 1,
                    opacity: index === section2ImageIndex ? 1 : 0.6
                  }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  onClick={() => {
                    setSection2SlideDirection(index > section2ImageIndex ? 'right' : 'left');
                    setSection2ImageIndex(index);
                  }}
                />
              ))}
            </div>
          </AnimatedCard>
        </div>
      ) : (
        // Original layout for section 1 with auto-slideshow
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
          {/* First large image with carousel, auto-slideshow and slide animation */}
          <AnimatedCard className="relative overflow-hidden shadow-lg col-span-1 lg:col-span-2 row-span-2 group">
            <motion.img
              key={currentImageIndex} // Key change triggers re-animation
              src={carouselImages[currentImageIndex]}
              alt={data.items[0].alt}
              className="w-full h-full object-cover"
              initial={{ 
                x: slideDirection === 'right' ? '100%' : '-100%'
              }}
              animate={{ 
                x: 0
              }}
              exit={{ 
                x: slideDirection === 'right' ? '-100%' : '100%'
              }}
              transition={{ 
                duration: 2.0, // Faster and smoother transition
                ease: [0.25, 0.1, 0.25, 1], // Smoother custom cubic-bezier
                x: { type: "spring", stiffness: 200, damping: 25 } // Faster spring
              }}
              style={{
                transformOrigin: 'center center'
              }}
              whileHover={{
                scale: 1.03,
                transition: { duration: 0.3, ease: "easeOut" }
              }}
            />
            
            {/* Enhanced navigation buttons */}
            <div className="absolute bottom-4 right-4 flex space-x-3 z-10">
              <motion.button
                onClick={prevImage}
                className="bg-black/80 hover:bg-black/95 text-white p-3 rounded-full shadow-xl"
                whileHover={{ 
                  scale: 1.1,
                  backgroundColor: "rgba(0, 0, 0, 0.95)",
                  boxShadow: "0 10px 25px rgba(0, 0, 0, 0.3)"
                }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
              >
                <motion.svg 
                  className="w-5 h-5" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                  whileHover={{ x: -2 }}
                  transition={{ duration: 0.2 }}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </motion.svg>
              </motion.button>
              
              <motion.button
                onClick={nextImage}
                className="bg-black/80 hover:bg-black/95 text-white p-3 rounded-full shadow-xl"
                whileHover={{ 
                  scale: 1.1,
                  backgroundColor: "rgba(0, 0, 0, 0.95)",
                  boxShadow: "0 10px 25px rgba(0, 0, 0, 0.3)"
                }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
              >
                <motion.svg 
                  className="w-5 h-5" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                  whileHover={{ x: 2 }}
                  transition={{ duration: 0.2 }}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </motion.svg>
              </motion.button>
            </div>
            
            {/* Enhanced progress indicators */}
            <div className="absolute bottom-4 left-4 flex space-x-2">
              {carouselImages.map((_, index) => (
                <motion.div
                  key={index}
                  className={`w-3 h-3 rounded-full cursor-pointer ${
                    index === currentImageIndex 
                      ? 'bg-white shadow-lg' 
                      : 'bg-white/50 hover:bg-white/70'
                  }`}
                  whileHover={{ scale: 1.2 }}
                  animate={{
                    scale: index === currentImageIndex ? 1.1 : 1,
                    opacity: index === currentImageIndex ? 1 : 0.6
                  }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  onClick={() => {
                    setSlideDirection(index > currentImageIndex ? 'right' : 'left');
                    setCurrentImageIndex(index);
                  }}
                />
              ))}
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
                  <button 
                    onClick={() => handleShopNow()}
                    className="mt-2 bg-white text-gray-800 text-sm font-semibold px-4 py-2 rounded-full hover:bg-gray-200 transition-colors duration-300"
                  >
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
