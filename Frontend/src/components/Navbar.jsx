import React from 'react';

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0d0d0d] bg-opacity-70 backdrop-blur-sm p-4 flex justify-between items-center px-8 sm:px-16 lg:px-24">
      <div className="flex items-center space-x-2">
        {/* Stellar Logo */}
        <svg className="h-8 w-8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" fill="white" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        <span className="text-2xl font-bold">STELLAR</span>
      </div>
      
      <div className="flex items-center space-x-4">
        {/* Navigation Links - Hidden on small screens */}
        <div className="hidden lg:flex items-center space-x-6 text-gray-300">
          <a href="#" className="hover:text-white transition-colors duration-300">Home</a>
          <a href="#" className="hover:text-white transition-colors duration-300">About</a>
          <a href="#" className="hover:text-white transition-colors duration-300">Services</a>
          <a href="#" className="hover:text-white transition-colors duration-300">Contact</a>
        </div>
        
        {/* Action Button */}
        <button className="bg-yellow-400 text-black font-bold py-2 px-6 rounded-full shadow-lg hover:bg-yellow-500 transition-colors duration-300">
          Join Testing Team
        </button>
        
        {/* Hamburger Icon for mobile - Visible on small screens */}
        <div className="lg:hidden text-white cursor-pointer">
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
