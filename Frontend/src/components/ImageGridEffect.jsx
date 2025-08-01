// src/components/ImageGridSection.jsx
import React from 'react';

const benefits = [
  {
    icon: '/icons/quality.png',
    title: '100% Quality',
    desc: 'We provide the best quality as per your needs.',
  },
  {
    icon: '/icons/shipping.png',
    title: 'Free Shipping',
    desc: 'Two-day delivery on thousands of items.',
  },
  {
    icon: '/icons/secure.png',
    title: '100% Secure Payment',
    desc: 'We secure your all transactions from fraud.',
  },
];

const section1 = [
  {
    image: '/images/desk.jpg',
    title: 'Minimal Desk',
    price: '$600',
    button: true,
  },
  {
    image: '/images/lamp.jpg',
    title: 'Beautiful Lamps',
    price: '$150',
    button: true,
  },
];

const section2 = [
  { image: '/images/sofa.jpg', title: 'Golden Oslo Sofa', price: '$250' },
  { image: '/images/chair.jpg' },
  { icon: '/icons/sofa.png', label: 'CHAIR & SOFA', button: true },
  { image: '/images/stool.jpg' },
  { image: '/images/lamp2.jpg', title: 'Golden Oslo Sofa', price: '$250' },
  { image: '/images/clock.jpg' },
  { icon: '/icons/accessory.png', label: 'ACCESSORIES', button: true },
  { image: '/images/mug.jpg' },
  { image: '/images/pendant.jpg' },
];

const ImageGridSection = () => {
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

      {/* Section 1 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 px-6 py-10">
        {section1.map((item, i) => (
          <div key={i} className="relative overflow-hidden">
            <img
              src={item.image}
              alt={item.title}
              className="w-full h-[350px] object-cover rounded-xl"
            />
            <div className="absolute inset-0 bg-black/20 flex flex-col justify-center items-start p-6">
              <h2 className="text-white text-2xl mb-2">{item.title}</h2>
              <p className="text-white font-semibold mb-3">Starting from {item.price}</p>
              {item.button && (
                <button className="bg-[#855437] text-white px-4 py-2 rounded">Shop Now</button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Section 2 */}
      <div className="px-6 pb-16">
        <h2 className="text-center text-2xl font-semibold mb-4">Featured Products</h2>
        <p className="text-center mb-10 max-w-3xl mx-auto text-sm">
          A fusion of comfort, style and quality without compromise. A collection aimed to make the ordinary extraordinary.
        </p>
        <div className="grid grid-cols-3 md:grid-cols-5 gap-4">
          {section2.map((item, i) => (
            <div key={i} className="relative group h-[200px]">
              {item.image && (
                <img
                  src={item.image}
                  alt={item.title || `grid-${i}`}
                  className="w-full h-full object-cover rounded-md"
                />
              )}
              {item.icon && (
                <div className="bg-white border rounded-md h-full flex flex-col justify-center items-center text-center">
                  <img src={item.icon} alt={item.label} className="w-12 h-12 mb-2" />
                  <p className="font-medium text-sm mb-2">{item.label}</p>
                  {item.button && (
                    <button className="bg-[#855437] text-white px-3 py-1 rounded text-sm">Shop Now</button>
                  )}
                </div>
              )}
              {item.title && (
                <div className="absolute bottom-0 left-0 bg-black/70 text-white text-sm p-2 w-full">
                  <p>{item.title}</p>
                  <strong>{item.price}</strong>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ImageGridSection;
