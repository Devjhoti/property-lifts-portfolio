import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import './VisionSection.css';

const VisionSection = () => {
    const sectionRef = useRef(null);
    const containerRef = useRef(null);
    const textRef = useRef(null);
    const imageRef = useRef(null);

    useEffect(() => {
        // 3D Depth Parallax Effect (Wild entry animation)
        gsap.fromTo(containerRef.current,
            { scale: 0.5, rotationX: 45, opacity: 0 },
            {
                scale: 1, rotationX: 0, opacity: 1,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top 80%',
                    end: 'top 30%',
                    scrub: 1
                }
            }
        );

        // Text & Image stagger reveals
        gsap.fromTo(textRef.current.children,
            { x: -100, opacity: 0 },
            {
                x: 0, opacity: 1, stagger: 0.2, duration: 1, ease: 'power3.out',
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top 50%',
                }
            }
        );

        gsap.fromTo(imageRef.current,
            { x: 100, opacity: 0, scale: 0.8 },
            {
                x: 0, opacity: 1, scale: 1, duration: 1.5, ease: 'power3.out',
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top 50%',
                }
            }
        );
    }, []);

    return (
        <section id="vision-section" ref={sectionRef} className="vision-section">
            <div className="vision-container" ref={containerRef}>
                <div className="vision-content" ref={textRef}>
                    <h2 className="section-title">Vision & Architecture</h2>
                    <div className="vision-divider"></div>
                    <p>
                        At Property Lifts, we don't just move people; we elevate the architectural integrity of your spaces.
                        Combining cutting-edge engineering with unparalleled aesthetics.
                    </p>
                    <p>
                        Our elevators are crafted as moving art pieces, ensuring an experience of absolute luxury, safety, and silence.
                    </p>
                </div>
                <div className="vision-image-wrapper" ref={imageRef}>
                    <img src="https://images.unsplash.com/photo-1541888047910-dc053fc1efbe?q=80&w=1000&auto=format&fit=crop" alt="Abstract Elevator Shaft Architecture" className="vision-image" />
                </div>
            </div>
        </section>
    );
};

export default VisionSection;
