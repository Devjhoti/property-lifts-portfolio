import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import './NewsSection.css';

const newsItems = [
    { id: 1, title: 'Property Lifts Installs Tallest Panoramic Lift in Dhaka', date: 'Oct 15, 2026', image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1000&auto=format&fit=crop' },
    { id: 2, title: 'Awarded Best Vertical Mobility Solution 2026', date: 'Sep 22, 2026', image: 'https://images.unsplash.com/photo-1542314831-c53cd4b85ca4?q=80&w=1000&auto=format&fit=crop' },
    { id: 3, title: 'Unveiling the the "Obsidian Class" Elevator Cabin', date: 'Aug 05, 2026', image: 'https://images.unsplash.com/photo-1579308215570-381c8ea39fa3?q=80&w=1000&auto=format&fit=crop' }
];

const NewsSection = () => {
    const sectionRef = useRef(null);
    const cardsRef = useRef([]);

    useEffect(() => {
        gsap.fromTo(cardsRef.current,
            { y: 150, opacity: 0, rotationX: 45 },
            {
                y: 0, opacity: 1, rotationX: 0, duration: 1.2, stagger: 0.2, ease: 'power4.out',
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top 60%',
                }
            }
        );
    }, []);

    return (
        <section id="news-section" ref={sectionRef} className="news-section">
            <h2 className="section-title text-center">Latest Intel</h2>
            <div className="news-grid">
                {newsItems.map((news, i) => (
                    <div
                        key={news.id}
                        className="news-card"
                        ref={el => cardsRef.current[i] = el}
                    >
                        <div className="news-img-wrapper">
                            <img src={news.image} alt={news.title} className="news-img" />
                        </div>
                        <div className="news-content">
                            <span className="news-date">{news.date}</span>
                            <h3 className="news-title">{news.title}</h3>
                            <a href="#!" className="read-more">Read Full Brief →</a>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default NewsSection;
