import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { useNavigate } from 'react-router-dom';
import './HeroSection.css';

const HeroSection = () => {
    const sectionRef = useRef(null);
    const textRef = useRef(null);
    const navigate = useNavigate();

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

    const handleScrollToProducts = () => {
        const element = document.getElementById('products-section');
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <section id="hero-section" ref={sectionRef} className="hero-section">
            <video
                autoPlay
                muted
                loop
                playsInline
                className="bg-video"
            >
                <source src="https://res.cloudinary.com/dxez9kmnn/video/upload/v1771813091/2818559-Uhd_3840_2160_24Fps_rjvqsu.mp4" type="video/mp4" />
            </video>
            <div className="hero-overlay"></div>

            <div className="hero-content" ref={textRef}>
                <h1 className="hero-title">Property Lifts</h1>
                <p className="hero-subtitle">Elevating Luxury. Redefining Motion.</p>

                <div className="hero-buttons">
                    <button className="premium-btn primary" onClick={handleScrollToProducts}>
                        <span>Discover Collection</span>
                    </button>
                    <button className="premium-btn secondary" onClick={() => navigate('/design-your-lift')}>
                        <span>Design Your Lift</span>
                    </button>
                </div>
            </div>
        </section>
    );
};

export default HeroSection;
