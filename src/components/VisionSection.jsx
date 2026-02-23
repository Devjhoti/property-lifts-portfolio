import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './VisionSection.css';

gsap.registerPlugin(ScrollTrigger);

const slides = [
    {
        id: 0,
        title: "Leadership & Vision",
        quote: "\"At Property Lifts, we don't just move people; we elevate the architectural integrity of your spaces.\"",
        text: "Led by industry pioneers, our vision is to combine cutting-edge vertical mobility engineering with unparalleled luxury aesthetics. Every elevator is envisioned as a moving art piece, setting new benchmarks for safety, silence, and grandeur in Bangladesh.",
        imgSrc: "/CEO-chowdhury.webp",
        imgAlt: "Ahsan Khan Chowdhury - CEO",
        name: "Ahsan Khan Chowdhury",
        role: "CEO & Chairman",
        imgClass: "portrait-ceo",
        npClass: "np-ceo"
    },
    {
        id: 1,
        title: "Engineering Excellence",
        quote: "\"Innovation is the cornerstone of our engineering. We are committed to pushing the boundaries of what is possible.\"",
        text: "With a steadfast commitment to quality, we ensure that every installation not only meets but exceeds international standards. Our focus is on delivering flawless performance, unmatched reliability, and a customer experience that is simply extraordinary.",
        imgSrc: "/MD-paul.webp",
        imgAlt: "RN Paul - MD",
        name: "RN Paul",
        role: "Managing Director",
        imgClass: "portrait-md",
        npClass: "np-md"
    }
];

const VisionSection = () => {
    const sectionRef = useRef(null);
    const textRef = useRef(null);
    const indicatorsRef = useRef(null);
    const cardRef = useRef(null);
    const imageRef = useRef(null);
    const namePlateRef = useRef(null);
    const wrapperRef = useRef(null);

    const [currentSlide, setCurrentSlide] = useState(0);
    const isAnimating = useRef(false);
    const initialRender = useRef(true);

    useEffect(() => {
        if (initialRender.current) {
            initialRender.current = false;
            // Initial scroll trigger animation
            gsap.fromTo([textRef.current.children, indicatorsRef.current.children],
                { x: -50, opacity: 0 },
                {
                    x: 0, opacity: 1, stagger: 0.15, duration: 1, ease: 'power3.out',
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: 'top 60%',
                    }
                }
            );

            gsap.fromTo(wrapperRef.current,
                { x: 100, opacity: 0, rotationY: -15 },
                {
                    x: 0, opacity: 1, rotationY: 0, duration: 1.5, ease: 'power4.out',
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: 'top 60%',
                    }
                }
            );
        } else {
            // Slide change animation
            gsap.fromTo([textRef.current.children, imageRef.current, namePlateRef.current],
                { opacity: 0, filter: 'blur(10px)', scale: 0.95 },
                { opacity: 1, filter: 'blur(0px)', scale: 1, duration: 0.8, stagger: 0.1, ease: 'power3.out', onComplete: () => { isAnimating.current = false; } }
            );
        }
    }, [currentSlide]);

    const changeSlide = (newIndex) => {
        if (newIndex === currentSlide || isAnimating.current) return;
        isAnimating.current = true;

        gsap.to([textRef.current.children, imageRef.current, namePlateRef.current], {
            opacity: 0,
            filter: 'blur(10px)',
            scale: 0.95,
            duration: 0.5,
            stagger: 0.05,
            ease: 'power3.in',
            onComplete: () => {
                setCurrentSlide(newIndex);
            }
        });
    };

    // 3D Tilt Hover Effect
    const handleMouseMove = (e) => {
        if (!cardRef.current || !wrapperRef.current) return;
        const { left, top, width, height } = wrapperRef.current.getBoundingClientRect();
        const x = (e.clientX - left) / width - 0.5; // -0.5 to 0.5
        const y = (e.clientY - top) / height - 0.5;

        // Tilt the card depending on mouse position (interactive 3D effect)
        gsap.to(cardRef.current, {
            rotationY: x * 20, // up to 20 degrees
            rotationX: -y * 20,
            ease: 'power2.out',
            duration: 0.5
        });

        // Enhance depth by shifting the 3D portrait in the opposite direction
        gsap.to(imageRef.current, {
            x: -x * 30,
            y: -y * 30,
            ease: 'power2.out',
            duration: 0.5
        });
    };

    // Reset card when mouse leaves
    const handleMouseLeave = () => {
        if (!cardRef.current) return;
        gsap.to(cardRef.current, {
            rotationY: 0,
            rotationX: 0,
            ease: 'elastic.out(1, 0.4)',
            duration: 1.5
        });

        gsap.to(imageRef.current, {
            x: 0,
            y: 0,
            ease: 'elastic.out(1, 0.4)',
            duration: 1.5
        });
    };

    const slide = slides[currentSlide];

    return (
        <section id="vision-section" ref={sectionRef} className="vision-section">
            <div className="vision-container">
                <div className="vision-content-wrapper">
                    <div className="vision-content" ref={textRef}>
                        <h2 className="section-title">{slide.title}</h2>
                        <div className="vision-divider"></div>
                        <p className="vision-quote">{slide.quote}</p>
                        <p className="vision-text">{slide.text}</p>
                    </div>

                    <div className="carousel-indicators" ref={indicatorsRef}>
                        {slides.map((_, index) => (
                            <button
                                key={index}
                                className={`indicator-dot ${currentSlide === index ? 'active' : ''}`}
                                onClick={() => changeSlide(index)}
                                aria-label={`Go to slide ${index + 1}`}
                            />
                        ))}
                    </div>
                </div>

                <div
                    className="leadership-wrapper"
                    ref={wrapperRef}
                    onMouseMove={handleMouseMove}
                    onMouseLeave={handleMouseLeave}
                >
                    <div className="leadership-card" ref={cardRef}>
                        <div className="card-bg"></div>

                        <div className="portrait-container">
                            <div className="portrait-wrapper">
                                <img
                                    src={slide.imgSrc}
                                    alt={slide.imgAlt}
                                    className={`portrait ${slide.imgClass}`}
                                    ref={imageRef}
                                />
                            </div>
                        </div>

                        <div className="name-plate-container">
                            <div className={`name-plate ${slide.npClass}`} ref={namePlateRef}>
                                <h4>{slide.name}</h4>
                                <span>{slide.role}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default VisionSection;
