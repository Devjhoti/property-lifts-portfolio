import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { gsap } from 'gsap';
import './ProductsSection.css';

const products = [
    { id: 1, name: 'Obsidian Black', image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=1000&auto=format&fit=crop' },
    { id: 2, name: 'Brushed Gold', image: 'https://images.unsplash.com/photo-1542316274-95193eb74052?q=80&w=1000&auto=format&fit=crop' },
    { id: 3, name: 'Glass Panoramics', image: 'https://images.unsplash.com/photo-1579308215570-381c8ea39fa3?q=80&w=1000&auto=format&fit=crop' },
    { id: 4, name: 'Titanium Slate', image: 'https://images.unsplash.com/photo-1596788068894-3a9d9e79ab70?q=80&w=1000&auto=format&fit=crop' }
];

const ProductsSection = () => {
    const sectionRef = useRef(null);
    const titleRef = useRef(null);
    const cardsRef = useRef([]);
    const navigate = useNavigate();

    useEffect(() => {
        // Title reveal
        gsap.fromTo(titleRef.current,
            { y: 50, opacity: 0, scale: 0.9 },
            {
                y: 0, opacity: 1, scale: 1, duration: 1, ease: 'back.out(1.7)',
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top 60%',
                }
            }
        );

        // Cards staggered "wild" entry
        cardsRef.current.forEach((card, i) => {
            gsap.fromTo(card,
                { y: 200, opacity: 0, rotationY: 90, scale: 0.5 },
                {
                    y: 0, opacity: 1, rotationY: 0, scale: 1,
                    duration: 1.5,
                    ease: 'power4.out',
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: 'top 50%',
                    },
                    delay: i * 0.2
                }
            );
        });
    }, []);

    const handleDesignClick = () => {
        // Navigate to 3D Lift Configurator
        navigate('/design-your-lift');
        window.scrollTo(0, 0); // Ensure window resets to top
    };

    return (
        <section id="products-section" ref={sectionRef} className="products-section">
            <div className="products-container">
                <div className="products-header" ref={titleRef}>
                    <h2 className="section-title">The Collection</h2>
                    <p className="subtitle">Masterpieces of engineering.</p>
                </div>

                <div className="products-grid">
                    {products.map((p, i) => (
                        <div
                            key={p.id}
                            className="product-card"
                            ref={el => cardsRef.current[i] = el}
                        >
                            <div className="product-image-wrapper">
                                <img src={p.image} alt={p.name} className="product-image" />
                                <div className="product-overlay">
                                    <h3>{p.name}</h3>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="design-action-wrapper">
                    <p>Want a completely custom experience?</p>
                    <button className="premium-btn action-btn" onClick={handleDesignClick}>
                        <span>Design your Lift</span>
                    </button>
                </div>
            </div>
        </section>
    );
};

export default ProductsSection;
