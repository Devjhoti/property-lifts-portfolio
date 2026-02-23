import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import './AboutSection.css';

const AboutSection = () => {
    const sectionRef = useRef(null);
    const contentRef = useRef(null);

    useEffect(() => {
        gsap.fromTo(contentRef.current.children,
            { y: 50, opacity: 0, scale: 0.95 },
            {
                y: 0, opacity: 1, scale: 1, duration: 1.2, stagger: 0.2, ease: 'power3.out',
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top 70%',
                }
            }
        );
    }, []);

    return (
        <section id="about-section" ref={sectionRef} className="about-section">
            <div className="about-container" ref={contentRef}>
                <h2 className="section-title">About Us</h2>
                <div className="about-divider"></div>
                <p className="about-text">
                    Founded on the principles of immaculate design and robust engineering, Property Lifts Bangladesh represents the pinnacle of vertical mobility.
                    We partner with legendary architects and forward-thinking builders to redefine the way people traverse premium spaces.
                </p>
                <div className="stats-row">
                    <div className="stat-box">
                        <h3>25+</h3>
                        <span>Years of Excellence</span>
                    </div>
                    <div className="stat-box">
                        <h3>1000+</h3>
                        <span>Successful Installations</span>
                    </div>
                    <div className="stat-box">
                        <h3>100%</h3>
                        <span>Safety Record</span>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AboutSection;
