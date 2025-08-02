import React, { useState, useEffect } from 'react';
import { Menu, X, LogIn, UserPlus, LogOut } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const MinimalNavbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const { isLoggedIn, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Projects', href: '#projects' },
    { name: 'Contact', href: '#contact' }
  ];

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ease-out ${
        isVisible ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'
      }`}
      style={{
        background: 'rgba(255, 255, 255, 0.05)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        boxShadow: '0 4px 20px rgba(255, 255, 255, 0.1)'
      }}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <div 
              className="text-xl font-semibold text-white cursor-pointer transition-all duration-300 hover:scale-105"
              style={{
                textShadow: '0 0 10px rgba(255, 255, 255, 0.3)'
              }}
            >
              STELLAR
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="flex items-center space-x-8">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.href}
                  className="relative px-3 py-2 text-white font-medium transition-all duration-300 hover:scale-105"
                  style={{
                    textShadow: '0 0 8px rgba(255, 255, 255, 0.2)'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.textShadow = '0 0 15px rgba(255, 255, 255, 0.5)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.textShadow = '0 0 8px rgba(255, 255, 255, 0.2)';
                  }}
                >
                  {link.name}
                </Link>
              ))}
              
              {/* Authentication Buttons */}
              <div className="flex items-center space-x-4">
                {isLoggedIn ? (
                  <button
                    onClick={handleLogout}
                    className="flex items-center space-x-2 px-4 py-2 text-white font-medium transition-all duration-300 hover:scale-105 rounded-lg"
                    style={{
                      background: 'rgba(255, 255, 255, 0.1)',
                      border: '1px solid rgba(255, 255, 255, 0.2)',
                      textShadow: '0 0 8px rgba(255, 255, 255, 0.2)',
                      boxShadow: '0 0 10px rgba(255, 255, 255, 0.1)'
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.background = 'rgba(255, 255, 255, 0.15)';
                      e.target.style.textShadow = '0 0 15px rgba(255, 255, 255, 0.4)';
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.background = 'rgba(255, 255, 255, 0.1)';
                      e.target.style.textShadow = '0 0 8px rgba(255, 255, 255, 0.2)';
                    }}
                  >
                    <LogOut size={18} />
                    <span>Logout</span>
                  </button>
                ) : (
                  <>
                    <Link
                      to="/login"
                      className="flex items-center space-x-2 px-4 py-2 text-white font-medium transition-all duration-300 hover:scale-105 rounded-lg"
                      style={{
                        background: 'rgba(255, 255, 255, 0.1)',
                        border: '1px solid rgba(255, 255, 255, 0.2)',
                        textShadow: '0 0 8px rgba(255, 255, 255, 0.2)',
                        boxShadow: '0 0 10px rgba(255, 255, 255, 0.1)'
                      }}
                      onMouseEnter={(e) => {
                        e.target.style.background = 'rgba(255, 255, 255, 0.15)';
                        e.target.style.textShadow = '0 0 15px rgba(255, 255, 255, 0.4)';
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.background = 'rgba(255, 255, 255, 0.1)';
                        e.target.style.textShadow = '0 0 8px rgba(255, 255, 255, 0.2)';
                      }}
                    >
                      <LogIn size={18} />
                      <span>Login</span>
                    </Link>
                    
                    <Link
                      to="/signup"
                      className="flex items-center space-x-2 px-4 py-2 text-white font-medium transition-all duration-300 hover:scale-105 rounded-lg"
                      style={{
                        background: 'rgba(255, 255, 255, 0.1)',
                        border: '1px solid rgba(255, 255, 255, 0.2)',
                        textShadow: '0 0 8px rgba(255, 255, 255, 0.2)',
                        boxShadow: '0 0 10px rgba(255, 255, 255, 0.1)'
                      }}
                      onMouseEnter={(e) => {
                        e.target.style.background = 'rgba(255, 255, 255, 0.15)';
                        e.target.style.textShadow = '0 0 15px rgba(255, 255, 255, 0.4)';
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.background = 'rgba(255, 255, 255, 0.1)';
                        e.target.style.textShadow = '0 0 8px rgba(255, 255, 255, 0.2)';
                      }}
                    >
                      <UserPlus size={18} />
                      <span>Sign Up</span>
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="p-2 rounded-lg text-white transition-all duration-300 hover:scale-110"
              style={{
                background: 'rgba(255, 255, 255, 0.1)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                boxShadow: '0 0 10px rgba(255, 255, 255, 0.2)'
              }}
            >
              <div className="relative w-6 h-6">
                <Menu 
                  className={`absolute inset-0 transition-all duration-300 ${
                    isMenuOpen ? 'opacity-0 rotate-90 scale-0' : 'opacity-100 rotate-0 scale-100'
                  }`} 
                />
                <X 
                  className={`absolute inset-0 transition-all duration-300 ${
                    isMenuOpen ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 -rotate-90 scale-0'
                  }`} 
                />
              </div>
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        <div 
          className={`md:hidden transition-all duration-500 ease-out overflow-hidden ${
            isMenuOpen ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <div 
            className="px-2 pt-2 pb-4 space-y-1 mt-2 rounded-lg"
            style={{
              background: 'rgba(255, 255, 255, 0.05)',
              backdropFilter: 'blur(15px)',
              WebkitBackdropFilter: 'blur(15px)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              boxShadow: '0 4px 15px rgba(255, 255, 255, 0.1)'
            }}
          >
            {navLinks.map((link, index) => (
              <Link
                key={link.name}
                to={link.href}
                onClick={() => setIsMenuOpen(false)}
                className={`block px-4 py-3 rounded-lg text-white font-medium transition-all duration-500 transform ${
                  isMenuOpen 
                    ? 'translate-x-0 opacity-100' 
                    : 'translate-x-full opacity-0'
                } hover:scale-105`}
                style={{
                  transitionDelay: `${index * 50}ms`,
                  textShadow: '0 0 8px rgba(255, 255, 255, 0.2)'
                }}
                onMouseEnter={(e) => {
                  e.target.style.background = 'rgba(255, 255, 255, 0.1)';
                  e.target.style.textShadow = '0 0 15px rgba(255, 255, 255, 0.4)';
                  e.target.style.boxShadow = '0 0 10px rgba(255, 255, 255, 0.2)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = 'transparent';
                  e.target.style.textShadow = '0 0 8px rgba(255, 255, 255, 0.2)';
                  e.target.style.boxShadow = 'none';
                }}
              >
                {link.name}
              </Link>
            ))}
            
            {/* Mobile Authentication Buttons */}
            <div className="flex space-x-3 px-4 py-3">
              {isLoggedIn ? (
                <button
                  onClick={() => {
                    handleLogout();
                    setIsMenuOpen(false);
                  }}
                  className={`flex items-center space-x-2 px-4 py-2 text-white font-medium transition-all duration-500 transform rounded-lg flex-1 justify-center ${
                    isMenuOpen 
                      ? 'translate-x-0 opacity-100' 
                      : 'translate-x-full opacity-0'
                  }`}
                  style={{
                    transitionDelay: `${navLinks.length * 50}ms`,
                    background: 'rgba(255, 255, 255, 0.1)',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    textShadow: '0 0 8px rgba(255, 255, 255, 0.2)',
                    boxShadow: '0 0 10px rgba(255, 255, 255, 0.1)'
                  }}
                >
                  <LogOut size={16} />
                  <span>Logout</span>
                </button>
              ) : (
                <>
                  <Link
                    to="/login"
                    onClick={() => setIsMenuOpen(false)}
                    className={`flex items-center space-x-2 px-4 py-2 text-white font-medium transition-all duration-500 transform rounded-lg flex-1 justify-center ${
                      isMenuOpen 
                        ? 'translate-x-0 opacity-100' 
                        : 'translate-x-full opacity-0'
                    }`}
                    style={{
                      transitionDelay: `${navLinks.length * 50}ms`,
                      background: 'rgba(255, 255, 255, 0.1)',
                      border: '1px solid rgba(255, 255, 255, 0.2)',
                      textShadow: '0 0 8px rgba(255, 255, 255, 0.2)',
                      boxShadow: '0 0 10px rgba(255, 255, 255, 0.1)'
                    }}
                  >
                    <LogIn size={16} />
                    <span>Login</span>
                  </Link>
                  
                  <Link
                    to="/signup"
                    onClick={() => setIsMenuOpen(false)}
                    className={`flex items-center space-x-2 px-4 py-2 text-white font-medium transition-all duration-500 transform rounded-lg flex-1 justify-center ${
                      isMenuOpen 
                        ? 'translate-x-0 opacity-100' 
                        : 'translate-x-full opacity-0'
                    }`}
                    style={{
                      transitionDelay: `${(navLinks.length + 1) * 50}ms`,
                      background: 'rgba(255, 255, 255, 0.1)',
                      border: '1px solid rgba(255, 255, 255, 0.2)',
                      textShadow: '0 0 8px rgba(255, 255, 255, 0.2)',
                      boxShadow: '0 0 10px rgba(255, 255, 255, 0.1)'
                    }}
                  >
                    <UserPlus size={16} />
                    <span>Sign Up</span>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default MinimalNavbar;