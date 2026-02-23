import React, { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, PerspectiveCamera } from '@react-three/drei';
import ElevatorScene from '../components/ElevatorScene';
import ConfiguratorUI from '../components/ConfiguratorUI';
import { EffectComposer, Bloom, N8AO } from '@react-three/postprocessing';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
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
    const [config, setConfig] = useState({
        body: 'brushed_steel',
        floor: 'dark_marble',
        ceiling: 'led_panel',
        handle: 'gold',
        button_pad: 'touch_glass'
    });

    const totalCost = Object.keys(config).reduce((acc, key) => acc + pricingMap[key][config[key]], 0);


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

                {/* Cost Estimation Overlay */}
                <div className="cost-overlay">
                    <h3>Configuration Specs</h3>
                    <ul>
                        <li><span className="spec-label">Cabin Body:</span> {labelsMap.body[config.body]}</li>
                        <li><span className="spec-label">Floor:</span> {labelsMap.floor[config.floor]}</li>
                        <li><span className="spec-label">Ceiling:</span> {labelsMap.ceiling[config.ceiling]}</li>
                        <li><span className="spec-label">Handrail:</span> {labelsMap.handle[config.handle]}</li>
                        <li><span className="spec-label">Button Pad:</span> {labelsMap.button_pad[config.button_pad]}</li>
                    </ul>
                    <div className="cost-total">
                        <span>Estimated Total:</span>
                        <strong>${totalCost.toLocaleString()}</strong>
                    </div>
                </div>
            </div>

            <div className="ui-container">
                <ConfiguratorUI config={config} setConfig={setConfig} />
            </div>
        </div>
    );
};

export default LiftConfigurator;
