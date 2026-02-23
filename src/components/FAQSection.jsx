import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import './FAQSection.css';

const faqs = [
    { question: 'What is the standard warranty on your elevators?', answer: 'We offer a comprehensive 10-year warranty on all structural and mechanical components, with 24/7 priority support.' },
    { question: 'Can the interior materials be fully customized?', answer: 'Absolutely. Use our 3D Lift Configurator to design the exact material combinations, or contact our bespoke design team for ultra-premium materials like exotic woods or custom metals.' },
    { question: 'How long does a typical installation take?', answer: 'From engineering sign-off to final testing, installation typically spans 4 to 8 weeks depending on building complexity.' }
];

const FAQSection = () => {
    const sectionRef = useRef(null);
    const contentRef = useRef(null);
    const [openIdx, setOpenIdx] = useState(0);

    useEffect(() => {
        gsap.fromTo(contentRef.current.children,
            { x: -50, opacity: 0 },
            {
                x: 0, opacity: 1, duration: 1, stagger: 0.15, ease: 'power2.out',
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top 70%',
                }
            }
        );
    }, []);

    return (
        <section id="faq-section" ref={sectionRef} className="faq-section">
            <div className="faq-container" ref={contentRef}>
                <h2 className="section-title">Frequently Asked Questions</h2>
                <div className="faq-list">
                    {faqs.map((f, i) => (
                        <div
                            key={i}
                            className={`faq-item ${openIdx === i ? 'open' : ''}`}
                            onClick={() => setOpenIdx(openIdx === i ? -1 : i)}
                        >
                            <div className="faq-question">
                                <h3>{f.question}</h3>
                                <span className="toggle-icon">{openIdx === i ? '−' : '+'}</span>
                            </div>
                            <div className="faq-answer">
                                <p>{f.answer}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FAQSection;
