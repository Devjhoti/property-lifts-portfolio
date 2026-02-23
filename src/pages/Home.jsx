import React, { useEffect } from 'react';
import Navbar from '../components/Navbar';
import HeroSection from '../components/HeroSection';
import VisionSection from '../components/VisionSection';
import ProductsSection from '../components/ProductsSection';
import ContactSection from '../components/ContactSection';
import AboutSection from '../components/AboutSection';
import FAQSection from '../components/FAQSection';
import NewsSection from '../components/NewsSection';
import StickyElevatorPad from '../components/StickyElevatorPad';
import DoorReveal from '../components/DoorReveal';
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
            <Navbar />
            <StickyElevatorPad />
            <HeroSection />
            <DoorReveal>
                <VisionSection />
            </DoorReveal>
            <DoorReveal>
                <AboutSection />
            </DoorReveal>
            <DoorReveal>
                <ProductsSection />
            </DoorReveal>
            <DoorReveal>
                <FAQSection />
            </DoorReveal>
            <DoorReveal>
                <NewsSection />
            </DoorReveal>
            <DoorReveal>
                <ContactSection />
            </DoorReveal>
        </div>
    );
};

export default Home;
