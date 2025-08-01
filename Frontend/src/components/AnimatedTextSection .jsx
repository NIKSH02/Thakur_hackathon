import React, { useState, useEffect, useRef } from 'react';

const AnimatedTextSection = () => {
  const [scrollDirection, setScrollDirection] = useState(null);
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const scrollPosRef = useRef(0);

  const lines = [
    "SEIZE",
    "SEIZE",
    "SEIZE",
    "SEIZE",
    "SEIZE GREAT", // This combines some words based on your second screenshot
    "SEIZE GREATNESS"
  ];

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.pageYOffset;

      if (currentScrollPos > scrollPosRef.current) {
        setScrollDirection('down');
      } else if (currentScrollPos < scrollPosRef.current) {
        setScrollDirection('up');
      }
      scrollPosRef.current = currentScrollPos;

      // Logic to change active line based on scroll position
      // This is a simplified example. In a real scenario, you'd calculate
      // trigger points based on the position of your component on the page.
      const sectionTop = textSectionRef.current.getBoundingClientRect().top;
      const viewportHeight = window.innerHeight;

      // Adjust this threshold based on when you want the lines to change
      if (sectionTop < viewportHeight / 2 && sectionTop > -textSectionRef.current.offsetHeight + viewportHeight / 2) {
        const progress = Math.abs(sectionTop) / (textSectionRef.current.offsetHeight - viewportHeight / 2);
        const newIndex = Math.min(Math.floor(progress * lines.length * 0.8), lines.length - 1); // Adjust multiplier for speed
        setCurrentLineIndex(newIndex);
      } else if (sectionTop >= viewportHeight / 2) {
          setCurrentLineIndex(0); // Reset when scrolling above the section
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [lines.length]); // Added lines.length to dependency array

  const textSectionRef = useRef(null);

  return (
    <div ref={textSectionRef} className="relative h-screen flex items-center justify-center overflow-hidden bg-gray-900 text-white">
      {/* Background imagery - You'd replace this with your actual images */}
      <div className="absolute inset-0 z-0 flex">
        <div className="w-1/2 bg-gray-700 opacity-50" style={{ backgroundImage: `url('/images/football_player_image.jpg')`, backgroundSize: 'cover', backgroundPosition: 'center' }}></div>
        <div className="w-1/2 bg-gray-800 opacity-50" style={{ backgroundImage: `url('/images/golf_course_image.jpg')`, backgroundSize: 'cover', backgroundPosition: 'center' }}></div>
      </div>

      <div className="relative z-10 text-center">
        {lines.map((line, index) => (
          <div
            key={index}
            className={`
              font-bold text-6xl md:text-8xl lg:text-9xl
              transition-transform duration-700 ease-out
              ${index === currentLineIndex
                ? 'translate-y-0 opacity-100'
                : scrollDirection === 'down'
                  ? '-translate-y-full opacity-0'
                  : 'translate-y-full opacity-0'
              }
              ${index < currentLineIndex ? '-translate-y-full opacity-0 absolute' : ''} /* Make previous lines hide and move up */
              ${index > currentLineIndex ? 'translate-y-full opacity-0 absolute' : ''} /* Make next lines hide and move down */
              ${index === currentLineIndex ? 'relative' : ''} /* Keep current line in flow */
            `}
            style={{
                // Adjust this to fine-tune the "inside another line" effect
                // You might need to set a specific height for each line container
                // and adjust translateY based on that.
                // For a true 'inside' effect, each line would need to occupy
                // the same vertical space, and the 'active' line would be
                // animated into view within that space.
                height: '1.2em', // Example height, adjust as needed
                overflow: 'hidden',
                width: 'fit-content', // Or a fixed width
                margin: '0 auto', // Center the text if it's not full width
            }}
          >
            <div className="relative">
                {line.split('').map((char, charIndex) => (
                    <span key={charIndex} className="inline-block">
                        {char}
                    </span>
                ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AnimatedTextSection;