import React, { useEffect, useMemo, useRef } from 'react';

// --- CSS Styles ---
// We've updated the styles to support the new animation direction and layout.
const styles = `
    @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@800&display=swap');

    :root {
        --text-color: #E0E0E0;
        --background-color: transparent;
        --font-size: 5.5rem; /* Made font slightly larger */
        --line-height: 1.2;
        --animation-speed: 0.5s; /* Made animation slightly faster */
        --padding: 5vw; 
    }

    body {
        background-color: var(--background-color);
        color: var(--text-color);
        font-family: 'Montserrat', sans-serif;
        margin: 0;
    }

    .info-section {
        height: 100vh;
        display: flex;
        justify-content: center;
        align-items: center;
        text-align: center;
    }

    /* 1. The Animation Track */
    /* This container provides the scrollable height for the animation to play out. */
    /* Adjusted height for the shorter text. */
    .animation-track {
        position: relative;
        height: 200vh; 
    }

    /* 2. The Sticky Container */
    /* This container "sticks" to the top of the viewport. */
    .sticky-container {
        position: sticky;
        top: 0;
        height: 100vh;
        width: 100%;
        overflow: hidden; 
        display: flex; 
        flex-direction: column;
        justify-content: flex-start; 
        padding-left: var(--padding);
        padding-top: var(--padding);
        box-sizing: border-box;
    }

    /* This div holds the absolutely positioned text lines */
    .text-lines-wrapper {
        position: absolute;
        width: 100%;
        height: 100%;
        background-color: var(--background-color);
        z-index: 10;
    }

    /* 3. The Animated Text Line */
    .text-line {
        position: absolute;
        font-size: var(--font-size);
        font-weight: 800;
        line-height: var(--line-height);
        text-transform: uppercase;
        white-space: nowrap;
        /* Using a clean and crisp transition */
        transition: 
            opacity var(--animation-speed) cubic-bezier(0.65, 0, 0.35, 1), 
            transform var(--animation-speed) cubic-bezier(0.65, 0, 0.35, 1);
        
        transform: translateY(calc(var(--i) * var(--font-size) * var(--line-height)));
    }

    /* 4. The Hidden State (MODIFIED) */
    /* The animation now slides UPWARDS to match the video reference. */
    .text-line.hidden {
        opacity: 0;
        /* Slides UP into the line above it. Removed blur and scale for a cleaner look. */
        transform: 
            translateY(calc((var(--i) - 1) * var(--font-size) * var(--line-height)));
    }

    /* Responsive adjustments */
    @media (max-width: 768px) {
        :root {
            --font-size: 3rem;
        }
    }
`;

// Text updated to match the video reference
const text = "CRATE";

// The main component which is now a self-contained animation section
export default function TextAnimationSection() {
    const textLines = useMemo(() => {
        const lines = [];
        for (let i = 1; i <= text.length; i++) {
            lines.push(text.substring(0, i));
        }
        return lines;
    }, []);

    const trackRef = useRef(null);
    const textWrapperRef = useRef(null);

    // useEffect handles the scroll logic within the track
    useEffect(() => {
        const track = trackRef.current;
        const textLinesElements = textWrapperRef.current?.children;
        if (!track || !textLinesElements || textLinesElements.length === 0) return;

        const handleScroll = () => {
            const trackRect = track.getBoundingClientRect();
            
            if (trackRect.bottom < 10 || trackRect.top >= window.innerHeight) {
                return;
            }

            const scrollDistance = track.scrollHeight - window.innerHeight;
            // Prevent division by zero if scrollDistance is 0
            if (scrollDistance <= 0) return;

            const scrollYInTrack = -trackRect.top;
            const progress = Math.max(0, Math.min(1, scrollYInTrack / scrollDistance));
            
            const hiddenCount = Math.floor(progress * (textLines.length + 1));

            Array.from(textLinesElements).forEach((line, index) => {
                if (index < hiddenCount) {
                    line.classList.add('hidden');
                } else {
                    line.classList.remove('hidden');
                }
            });
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll(); // Initial call

        return () => window.removeEventListener('scroll', handleScroll);
    }, [textLines.length]);


    return (
        <div>
            <style>{styles}</style>
            
            {/* The initial info-section has been removed to start animation at the top */}

            <div className="animation-track" ref={trackRef}>
                <div className="sticky-container">
                    <div className="text-lines-wrapper" ref={textWrapperRef}>
                        {textLines.map((lineContent, index) => (
                            <div
                                key={index}
                                className="text-line"
                                style={{ '--i': index }} 
                            >
                                {lineContent}
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="info-section">
                <h1>End of Animation</h1>
            </div>
        </div>
    );
}
