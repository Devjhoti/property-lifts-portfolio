import React, { useState, useEffect } from 'react';
import { gsap } from 'gsap';
import './Navbar.css';

const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 50) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        gsap.fromTo('.navbar',
            { y: -100, opacity: 0 },
            { y: 0, opacity: 1, duration: 1, ease: 'power3.out', delay: 0.2 }
        );
    }, []);

    return (
        <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
            <div className="navbar-container">
                <a href="#hero-section" className="logo-wrapper">
                    <img src="/propertly-lifts-logo-white.webp" alt="Property Lifts White Logo" className="logo-img logo-default" />
                    <img src="/propertly-lifts-logo-white.webp" alt="Property Lifts Logo" className="logo-img logo-scrolled" />
                </a>

                <div className="nav-links">
                    <a href="#vision-section" className="nav-link">Vision</a>
                    <a href="#about-section" className="nav-link">About Us</a>
                    <a href="#products-section" className="nav-link">Collection</a>
                    <a href="#faq-section" className="nav-link">FAQ</a>
                    <a href="#news-section" className="nav-link">News</a>
                    <a href="#contact-section" className="nav-link premium-text">Contact</a>
                </div>

                <button className="mobile-menu-btn">
                    <span></span>
                    <span></span>
                    <span></span>
                </button>
            </div>
        </nav>
    );
};

export default Navbar;
