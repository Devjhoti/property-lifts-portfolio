import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './StickyElevatorPad.css';

const floors = [
    { id: 7, name: 'Contact', target: '#contact-section' },
    { id: 6, name: 'News', target: '#news-section' },
    { id: 5, name: 'FAQ', target: '#faq-section' },
    { id: 4, name: 'Collection', target: '#products-section' },
    { id: 3, name: 'About Us', target: '#about-section' },
    { id: 2, name: 'Vision', target: '#vision-section' },
    { id: 1, name: 'Lobby', target: '#hero-section' },
];

const StickyElevatorPad = () => {
    const [activeFloor, setActiveFloor] = useState(1);
    const isTravelling = useRef(false);

    // Sound effect
    const playDing = () => {
        const audio = new Audio('https://assets.mixkit.co/active_storage/sfx/2568/2568-preview.mp3'); // Simple ding placeholder
        audio.volume = 0.5;
        audio.play().catch(e => console.log('Audio play failed:', e));
    };

    useEffect(() => {
        // Setup scroll triggers to update active floor on scroll
        const sections = floors.map(f => document.querySelector(f.target));

        const triggers = sections.map((sec, idx) => {
            if (!sec) return null;
            return ScrollTrigger.create({
                trigger: sec,
                start: 'top 50%',
                end: 'bottom 50%',
                onEnter: () => { if (!isTravelling.current) setActiveFloor(floors[idx].id) },
                onEnterBack: () => { if (!isTravelling.current) setActiveFloor(floors[idx].id) },
            });
        });

        return () => {
            triggers.forEach(t => t && t.kill());
        };
    }, []);

    const handleFloorClick = (floor) => {
        if (isTravelling.current || activeFloor === floor.id) return;
        isTravelling.current = true;
        setActiveFloor(floor.id);

        gsap.to(window, {
            duration: 1.5,
            scrollTo: floor.target,
            ease: 'power3.inOut',
            onComplete: () => {
                isTravelling.current = false;
                playDing();
            }
        });
    };

    return (
        <div className="elevator-pad">
            <div className="pad-display">
                <span className="floor-number">{activeFloor === 1 ? 'G' : activeFloor - 1}</span>
                {isTravelling.current && <span className="arrow">↑↓</span>}
            </div>
            <div className="buttons-grid">
                {floors.map((floor) => (
                    <button
                        key={floor.id}
                        className={`floor-btn ${activeFloor === floor.id ? 'active' : ''}`}
                        onClick={() => handleFloorClick(floor)}
                        title={floor.name}
                    >
                        <span>{floor.id === 1 ? 'G' : floor.id - 1}</span>
                    </button>
                ))}
            </div>
        </div>
    );
};

export default StickyElevatorPad;
