import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './DoorReveal.css';

gsap.registerPlugin(ScrollTrigger);

const DoorReveal = ({ children }) => {
    const containerRef = useRef(null);
    const leftDoorRef = useRef(null);
    const rightDoorRef = useRef(null);

    useEffect(() => {
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: containerRef.current,
                start: 'top 75%', // trigger when top of section comes into view
                once: true, // Only play the door opening once
            }
        });

        tl.to(leftDoorRef.current, { xPercent: -100, duration: 1.5, ease: 'power4.inOut' }, 0)
            .to(rightDoorRef.current, { xPercent: 100, duration: 1.5, ease: 'power4.inOut' }, 0);

    }, []);

    return (
        <div className="door-reveal-container" ref={containerRef}>
            <div className="door-panel door-left" ref={leftDoorRef}>
                <div className="door-texture"></div>
                <div className="door-indicator"></div>
            </div>
            <div className="door-panel door-right" ref={rightDoorRef}>
                <div className="door-texture"></div>
                <div className="door-indicator"></div>
            </div>
            <div className="door-content">
                {children}
            </div>
        </div>
    );
};

export default DoorReveal;
