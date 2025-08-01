import React, { useEffect, useMemo, useRef, useState } from 'react';

// --- CSS Styles ---
const styles = `
    @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@800&display=swap');

    .text-animation-wrapper {
        --text-color: #E0E0E0;
        --background-color: #111111;
        --font-size: 5.5rem;
        --line-height: 1.1;
        --padding: 2rem;
        
        background-color: var(--background-color);
        color: var(--text-color);
        font-family: 'Montserrat', sans-serif;
        position: relative;
        min-height: 400px; /* Adjust based on your content needs */
    }

    /* Main container for the text section */
    .text-section-container {
        padding: var(--padding);
        box-sizing: border-box;
        position: relative;
    }

    /* Styling for each individual line of text */
    .text-line {
        font-size: var(--font-size);
        font-weight: 800;
        line-height: var(--line-height);
        text-transform: uppercase;
        transition: transform 0.1s linear;
        margin: 0;
        padding: 0;
    }

    /* Responsive adjustments */
    @media (max-width: 768px) {
        .text-animation-wrapper {
            --font-size: 3rem;
            --padding: 1rem;
        }
    }
`;

// Text to be animated
const text = "WE CREATE";

export default function TextAnimationSection() {
    const textLines = useMemo(() => {
        const lines = [];
        for (let i = 1; i <= text.length; i++) {
            lines.push(text.substring(0, i));
        }
        return lines;
    }, []);

    // A ref to hold an array of refs, one for each text line element
    const lineRefs = useRef([]);
    // State to store the initial top offset of each line
    const [initialTops, setInitialTops] = useState([]);
    // Ref for the wrapper to calculate relative positions
    const wrapperRef = useRef(null);

    // 1. On mount, get the initial top position of each line relative to the page
    useEffect(() => {
        const calculateInitialPositions = () => {
            if (wrapperRef.current) {
                const wrapperRect = wrapperRef.current.getBoundingClientRect();
                const wrapperTop = wrapperRect.top + window.scrollY;
                
                const tops = lineRefs.current.map(el => {
                    if (!el) return 0;
                    const rect = el.getBoundingClientRect();
                    return rect.top + window.scrollY - wrapperTop;
                });
                setInitialTops(tops);
            }
        };

        // Calculate positions after a short delay to ensure DOM is ready
        const timer = setTimeout(calculateInitialPositions, 100);
        
        // Also recalculate on window resize
        window.addEventListener('resize', calculateInitialPositions);
        
        return () => {
            clearTimeout(timer);
            window.removeEventListener('resize', calculateInitialPositions);
        };
    }, [textLines]);

    // 2. On scroll, apply the reverse transform effect
    useEffect(() => {
        const handleScroll = () => {
            if (!wrapperRef.current) return;
            
            const wrapperRect = wrapperRef.current.getBoundingClientRect();
            const wrapperTop = wrapperRect.top + window.scrollY;
            const scrollY = window.scrollY;
            
            lineRefs.current.forEach((el, i) => {
                if (!el || initialTops[i] === undefined) return;

                const elementAbsoluteTop = wrapperTop + initialTops[i];

                // Check if the user has scrolled past the element's initial top position
                if (scrollY > elementAbsoluteTop) {
                    // Calculate how far past we've scrolled
                    const distanceScrolledPast = scrollY - elementAbsoluteTop;
                    // Apply a transform to move the element DOWN by that distance
                    el.style.transform = `translateY(${distanceScrolledPast}px)`;
                } else {
                    // If we haven't scrolled past it yet, it should have no transform
                    el.style.transform = 'translateY(0px)';
                }
            });
        };

        window.addEventListener('scroll', handleScroll, { passive: true });

        return () => window.removeEventListener('scroll', handleScroll);
    }, [initialTops]);

    return (
        <div className="text-animation-wrapper" ref={wrapperRef}>
            <style>{styles}</style>
            
            <div className="text-section-container">
                {textLines.map((lineContent, index) => (
                    <div
                        key={index}
                        className="text-line"
                        ref={el => lineRefs.current[index] = el}
                    >
                        {lineContent}
                    </div>
                ))}
            </div>
        </div>
    );
}