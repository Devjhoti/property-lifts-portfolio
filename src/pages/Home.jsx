import React, { useEffect } from 'react';
import HeroSection from '../components/HeroSection';
import VisionSection from '../components/VisionSection';
import ProductsSection from '../components/ProductsSection';
import ContactSection from '../components/ContactSection';
import StickyElevatorPad from '../components/StickyElevatorPad';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

const Home = () => {
    useEffect(() => {
        // Basic setup for smooth scroll interactions if any global ones are needed.
        // Each section handles its own ScrollTrigger reveals.
    }, []);

    return (
        <div className="home-container">
            <StickyElevatorPad />
            <HeroSection />
            <VisionSection />
            <ProductsSection />
            <ContactSection />
        </div>
    );
};

export default Home;
