import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import './ContactSection.css';

const ContactSection = () => {
    const sectionRef = useRef(null);
    const contentRef = useRef(null);

    useEffect(() => {
        gsap.fromTo(contentRef.current.children,
            { y: 50, opacity: 0 },
            {
                y: 0, opacity: 1, duration: 1, stagger: 0.1, ease: 'power3.out',
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top 70%',
                }
            }
        );
    }, []);

    return (
        <section id="contact-section" ref={sectionRef} className="contact-section">
            <div className="contact-container" ref={contentRef}>
                <h2>Experience Elevation</h2>
                <p>Get in touch to begin planning your bespoke vertical mobility solution.</p>
                <div className="contact-form">
                    <input type="text" placeholder="Your Name" className="form-input" />
                    <input type="email" placeholder="Your Email" className="form-input" />
                    <textarea placeholder="Tell us about your project" className="form-input" rows="4"></textarea>
                    <button className="premium-btn"><span>Submit Inquiry</span></button>
                </div>
            </div>
            <footer className="footer">
                <p>&copy; 2026 Property Lifts Bangladesh. All rights reserved.</p>
            </footer>
        </section>
    );
};

export default ContactSection;
