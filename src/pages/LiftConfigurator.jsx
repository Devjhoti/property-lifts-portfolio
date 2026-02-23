import React, { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, PerspectiveCamera } from '@react-three/drei';
import ElevatorScene from '../components/ElevatorScene';
import ConfiguratorUI from '../components/ConfiguratorUI';
import { EffectComposer, Bloom, N8AO } from '@react-three/postprocessing';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { gsap } from 'gsap';
import './LiftConfigurator.css';

const pricingMap = {
    body: { brushed_steel: 3500, gold: 5000, titanium: 4000, matte_black: 3000 },
    floor: { dark_marble: 1500, light_travertine: 1200, wooden: 900, terrazzo: 1100 },
    ceiling: { led_panel: 800, starlight: 1800, mirror: 700 },
    handle: { silver: 250, gold: 450, matte_black: 300 },
    button_pad: { touch_glass: 1200, brushed_steel: 600, vintage_gold: 1500 }
};

const labelsMap = {
    body: { brushed_steel: 'Brushed Steel', gold: 'Imperial Gold', titanium: 'Titanium Slate', matte_black: 'Obsidian Black' },
    floor: { dark_marble: 'Dark Marble', light_travertine: 'Light Travertine', wooden: 'Classic Oak', terrazzo: 'Milano Terrazzo' },
    ceiling: { led_panel: 'Luminous LED', starlight: 'Starlight Canopy', mirror: 'Infinity Mirror' },
    handle: { silver: 'Chrome Silver', gold: 'Brushed Gold', matte_black: 'Matte Black' },
    button_pad: { touch_glass: 'Smart Touch Glass', brushed_steel: 'Brushed Steel', vintage_gold: 'Vintage Gold' }
};

const LiftConfigurator = () => {
    const overlayRef = React.useRef(null);
    const [showQuote, setShowQuote] = useState(false);

    // Start with empty selections
    const [config, setConfig] = useState({
        body: null,
        floor: null,
        ceiling: null,
        handle: null,
        button_pad: null
    });

    const isComplete = Object.values(config).every(val => val !== null);
    const totalCost = Object.keys(config).reduce((acc, key) => acc + (config[key] ? pricingMap[key][config[key]] : 0), 0);

    // Animation for the overlay when requested
    React.useEffect(() => {
        if (showQuote && overlayRef.current) {
            const tl = gsap.timeline();

            // Initial centered, scaled up, invisible state
            gsap.set(overlayRef.current, {
                left: '50vw',
                bottom: '50vh',
                xPercent: -50,
                yPercent: 50,
                scale: 1.5,
                opacity: 0,
            });

            // Fade in centered
            tl.to(overlayRef.current, {
                opacity: 1,
                duration: 0.5,
                ease: 'power2.out',
            })
                // Hold for 1 second, then shrink and move to bottom-left corner
                .to(overlayRef.current, {
                    scale: 1,
                    left: '30px',
                    bottom: '30px',
                    xPercent: 0,
                    yPercent: 0,
                    duration: 1.2,
                    ease: 'power3.out',
                }, "+=1");
        }
    }, [showQuote]);
    return (
        <div className="configurator-wrapper">
            <Link to="/" className="back-btn">
                <ArrowLeft size={20} />
                <span>Return to Lobby</span>
            </Link>

            <div className="canvas-container">
                <Canvas shadows gl={{ antialias: false, toneMappingExposure: 1.2 }}>
                    <PerspectiveCamera makeDefault position={[-2, 2, 9]} fov={50} />

                    {/* Darker ambient light because the environment map provides realistic GI */}
                    <ambientLight intensity={0.2} />

                    {/* Main key light with soft shadows */}
                    <spotLight
                        position={[5, 10, 5]}
                        intensity={4}
                        angle={0.4}
                        penumbra={1}
                        castShadow
                        shadow-bias={-0.0001}
                    />

                    {/* Fill light to prevent completely black shadows */}
                    <directionalLight position={[-5, 5, -5]} intensity={1} color="#b0c4de" />

                    {/* High dynamic range premium environment for realistic reflections (hidden background to prevent excessive bloom) */}
                    <Environment preset="apartment" />

                    <ElevatorScene config={config} />

                    <EffectComposer disableNormalPass>
                        <N8AO aoRadius={1} intensity={2} color="black" />
                        <Bloom luminanceThreshold={1} mipmapBlur intensity={1.5} />
                    </EffectComposer>

                    <OrbitControls
                        enablePan={false}
                        enableDamping={true}
                        dampingFactor={0.05}
                        minPolarAngle={Math.PI / 4}
                        maxPolarAngle={Math.PI / 2}
                    />
                </Canvas>

                {/* Cost Estimation Overlay - only shows when requested */}
                {showQuote && (
                    <div ref={overlayRef} className="cost-overlay">
                        <h3>Configuration Specs</h3>
                        <ul>
                            <li><span className="spec-label">Cabin Body:</span> {config.body ? labelsMap.body[config.body] : '-'}</li>
                            <li><span className="spec-label">Floor:</span> {config.floor ? labelsMap.floor[config.floor] : '-'}</li>
                            <li><span className="spec-label">Ceiling:</span> {config.ceiling ? labelsMap.ceiling[config.ceiling] : '-'}</li>
                            <li><span className="spec-label">Handrail:</span> {config.handle ? labelsMap.handle[config.handle] : '-'}</li>
                            <li><span className="spec-label">Button Pad:</span> {config.button_pad ? labelsMap.button_pad[config.button_pad] : '-'}</li>
                        </ul>
                        <div className="cost-total">
                            <span>Estimated Total:</span>
                            <strong>${totalCost.toLocaleString()}</strong>
                        </div>
                    </div>
                )}
            </div>

            <div className="ui-container">
                <ConfiguratorUI
                    config={config}
                    setConfig={setConfig}
                    isComplete={isComplete}
                    onRequestQuote={() => setShowQuote(true)}
                />
            </div>
        </div>
    );
};

export default LiftConfigurator;
