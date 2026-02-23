import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import './HeroSection.css';

const HeroSection = () => {
    const sectionRef = useRef(null);
    const textRef = useRef(null);

    useEffect(() => {
        const tl = gsap.timeline();
        // Entry animation
        tl.fromTo(textRef.current.children,
            { y: 100, opacity: 0 },
            { y: 0, opacity: 1, duration: 1.5, stagger: 0.2, ease: 'power4.out', delay: 0.5 }
        );

        // Scroll parallax
        gsap.to(sectionRef.current, {
            scrollTrigger: {
                trigger: sectionRef.current,
                start: 'top top',
                end: 'bottom top',
                scrub: true,
            },
            y: 200,
            opacity: 0.5,
            scale: 0.95,
            ease: 'none'
        });
    }, []);

    return (
        <section id="hero-section" ref={sectionRef} className="hero-section">
            <video
                autoPlay
                muted
                loop
                playsInline
                className="bg-video"
            >
                <source src="https://assets.mixkit.co/videos/preview/mixkit-aerial-view-of-city-traffic-at-night-11-large.mp4" type="video/mp4" />
            </video>
            <div className="hero-overlay"></div>

            <div className="hero-content" ref={textRef}>
                <h1 className="hero-title">Property Lifts</h1>
                <p className="hero-subtitle">Elevating Luxury. Redefining Motion.</p>
                <button className="premium-btn">
                    <span>Discover Collection</span>
                </button>
            </div>
        </section>
    );
};

export default HeroSection;
