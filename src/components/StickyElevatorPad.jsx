import React, { useState, useEffect } from 'react';
import { gsap } from 'gsap';
import './StickyElevatorPad.css';

const floors = [
    { id: 4, name: 'Contact', target: '#contact-section' },
    { id: 3, name: 'Products', target: '#products-section' },
    { id: 2, name: 'Vision', target: '#vision-section' },
    { id: 1, name: 'Lobby', target: '#hero-section' },
];

const StickyElevatorPad = () => {
    const [activeFloor, setActiveFloor] = useState(1);
    const [isTravelling, setIsTravelling] = useState(false);

    // Sound effect
    const playDing = () => {
        const audio = new Audio('https://assets.mixkit.co/active_storage/sfx/2568/2568-preview.mp3'); // Simple ding placeholder
        audio.volume = 0.5;
        audio.play().catch(e => console.log('Audio play failed:', e));
    };

    useEffect(() => {
        // Setup scroll triggers to update active floor on scroll
        const sections = floors.map(f => document.querySelector(f.target));

        sections.forEach((sec, idx) => {
            if (!sec) return;
            gsap.to(sec, {
                scrollTrigger: {
                    trigger: sec,
                    start: 'top center',
                    end: 'bottom center',
                    onEnter: () => !isTravelling && setActiveFloor(floors[idx].id),
                    onEnterBack: () => !isTravelling && setActiveFloor(floors[idx].id),
                }
            });
        });
    }, [isTravelling]);

    const handleFloorClick = (floor) => {
        if (isTravelling || activeFloor === floor.id) return;
        setIsTravelling(true);
        setActiveFloor(floor.id);

        gsap.to(window, {
            duration: 1.5,
            scrollTo: floor.target,
            ease: 'power3.inOut',
            onComplete: () => {
                setIsTravelling(false);
                playDing();
                // The door open animation event could be triggered here or handled by scroll triggers within components
            }
        });
    };

    return (
        <div className="elevator-pad">
            <div className="pad-display">
                <span className="floor-number">{activeFloor === 1 ? 'G' : activeFloor - 1}</span>
                {isTravelling && <span className="arrow">↑↓</span>}
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
