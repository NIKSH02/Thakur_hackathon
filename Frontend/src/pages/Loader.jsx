import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Loader = ({ onComplete }) => {
  const [counter, setCounter] = useState(1);
  const [isVisible, setIsVisible] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);
  const [textVisible, setTextVisible] = useState([false, false, false, false]);
  const [darkening, setDarkening] = useState(false);
  

  useEffect(() => {
    // Text animation - sequential appearance
    const textTimers = [
      setTimeout(() => setTextVisible(prev => [true, ...prev.slice(1)]), 300),
      setTimeout(() => setTextVisible(prev => [prev[0], true, ...prev.slice(2)]), 600),
      setTimeout(() => setTextVisible(prev => [...prev.slice(0, 2), true, prev[3]]), 900),
      setTimeout(() => setTextVisible(prev => [...prev.slice(0, 3), true]), 1200),
    ];

    // Counter animation
     const counterInterval = setInterval(() => {
      setCounter(prev => {
        if (prev >= 96 && prev < 100) {
          setDarkening(true);
        }
        if (prev >= 100) {
          clearInterval(counterInterval);
          // Start fade out animation
          setTimeout(() => {
            setFadeOut(true);
            setTimeout(() => {
              setIsVisible(false);
              if (onComplete) onComplete();
            }, 1000);
          }, 500);
          return 100;
        }
        return prev + 1;
      });
    }, 40);

    return () => {
      textTimers.forEach(timer => clearTimeout(timer));
      clearInterval(counterInterval);
    };
  }, [onComplete]);

  if (!isVisible) return null;

  return (
    <div className={`loader-container ${fadeOut ? 'fade-out' : ''}`}>
      <div className="counter">
        {counter.toString().padStart(2, '0')} - 100
      </div>
      
      <div className="content">
        <div className="main-text">
          <div className={`text-line ${textVisible[0] ? 'visible' : ''}`}>
            YOUR
          </div>
          <div className={`text-line ${textVisible[1] ? 'visible' : ''}`}>
            WEB EXPERIENCE
          </div>
          <div className={`text-line ${textVisible[2] ? 'visible' : ''}`}>
            IS LOADING RIGHT <span className={`now-text ${textVisible[3] ? 'visible' : ''}`}>NOW</span>
          </div>
        </div>
      </div>

      <div className="bottom-text">
        Please wait<br />a few seconds
      </div>

      <style jsx>{`
        .loader-container {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          background: #000;
          color: white;
          font-family: 'Inter', 'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          z-index: 9999;
          animation: fadeIn 0.5s ease-in-out;
        }

        .loader-container.fade-out {
          animation: fadeOut 1s ease-in-out forwards;
        }

        .loader-container.fade-out .text-line {
          animation: textBlurOut 1s ease-in-out forwards;
        }

        .loader-container.fade-out .now-text {
          animation: textBlurOut 1s ease-in-out forwards;
        }

        .loader-container.fade-out .counter {
          animation: textBlurOut 1s ease-in-out forwards;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes fadeOut {
          to {
            opacity: 0;
            filter: blur(10px);
          }
        }

        @keyframes textBlurOut {
          to {
            filter: blur(15px);
            opacity: 0;
            transform: translateY(-20px);
          }
        }

        .counter {
          position: absolute;
          top: 40px;
          left: 40px;
          color: rgb(215, 215, 215);  
          font-size: clamp(2rem, 4vw, 3rem);
          font-weight: 300;
          font-style: italic;
          letter-spacing: 2px;
          animation: counterColorFade 2s ease-in-out;
        }

        @keyframes counterColorFade {
          0% {
            opacity: 0;
            color: #333;
            transform: translateY(-10px);
          }
          50% {
            opacity: 0.7;
            color: #888;
          }
          100% {
            opacity: 1;
            color: white;
            transform: translateY(0);
          }
        }

        .content {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: left;
        }

        .main-text {
          font-size: clamp(3rem, 8vw, 8rem);
          font-weight: 700;
          line-height: 0.9;
          letter-spacing: -0.02em;
        }

        .text-line {
          opacity: 0;
          color: #333;
          transform: translateY(30px);
          transition: all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
          margin-bottom: 0.1em;
        }

        .text-line.visible {
          opacity: 1;
          color: white;
          transform: translateY(0);
        }

        .now-text {
          opacity: 0;
          font-style: italic;
          font-weight: 800;
          color: #333;
          transition: all 0.8s ease;
          animation: blinkWithColorFade 1.5s infinite;
        }

        .now-text.visible {
          opacity: 1;
          color: white;
        }

        @keyframes blinkWithColorFade {
          0%, 30% {
            color: white;
            -webkit-text-stroke: none;
          }
          31%, 70% {
            color: transparent;
            -webkit-text-stroke: 2px white;
          }
          71%, 100% {
            color: white;
            -webkit-text-stroke: none;
          }
        }

        .bottom-text {
          position: absolute;
          bottom: 40px;
          left: 40px;
          font-size: 14px;
          font-weight: 300;
          color: #aaa;
          line-height: 1.4;
          text-transform: lowercase;
          animation: bottomTextFade 1s ease-in-out 1.5s both;
        }

        @keyframes bottomTextFade {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        /* Responsive Design */
        @media (max-width: 768px) {
          .counter {
            top: 20px;
            left: 20px;
            font-size: clamp(1.5rem, 6vw, 2.5rem);
          }

          .main-text {
            font-size: clamp(2rem, 12vw, 4rem);
            padding: 0 20px;
          }

          .bottom-text {
            bottom: 20px;
            left: 20px;
            font-size: 12px;
          }
        }

        @media (max-width: 480px) {
          .main-text {
            font-size: clamp(1.5rem, 15vw, 3rem);
          }
          
          .counter {
            font-size: clamp(1.2rem, 8vw, 2rem);
          }
        }
      `}</style>
    </div>
  );
};

// Demo wrapper to show the loader in action
const LoaderDemo = () => {
  const [showLoader, setShowLoader] = useState(true);
  const nav = useNavigate();

  const handleLoaderComplete = () => {
    setShowLoader(false);
    // Here you would typically load your main application
    // nav('/auth')
    console.log('Loader completed - Main app can now load');
  };

  return (
    <div style={{ width: '100vw', height: '100vh', background: '#f0f0f0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      {showLoader && <Loader onComplete={handleLoaderComplete} />}
      
      {!showLoader && (
        <div style={{ textAlign: 'center', padding: '40px' }}>
          <h1 style={{ color: '#333', marginBottom: '20px' }}>Welcome to Your Web Experience!</h1>
          <p style={{ color: '#666', marginBottom: '20px' }}>The loader has completed successfully.</p>
          <button 
            onClick={() => setShowLoader(true)}
            style={{
              padding: '12px 24px',
              background: '#000',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
              fontSize: '16px'
            }}
          >
            Show Loader Again
          </button>
        </div>
      )}
    </div>
  );
};

export default LoaderDemo;