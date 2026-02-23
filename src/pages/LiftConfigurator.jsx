import React, { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, PerspectiveCamera } from '@react-three/drei';
import ElevatorScene from '../components/ElevatorScene';
import ConfiguratorUI from '../components/ConfiguratorUI';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import './LiftConfigurator.css';

const LiftConfigurator = () => {
    const [config, setConfig] = useState({
        body: 'brushed_steel',
        floor: 'dark_marble',
        ceiling: 'led_panel',
        handle: 'gold'
    });

    return (
        <div className="configurator-wrapper">
            <Link to="/" className="back-btn">
                <ArrowLeft size={20} />
                <span>Return to Lobby</span>
            </Link>

            <div className="canvas-container">
                <Canvas shadows>
                    <PerspectiveCamera makeDefault position={[0, 2, 8]} fov={50} />
                    <ambientLight intensity={0.5} />
                    <spotLight position={[5, 10, 5]} intensity={2} angle={0.3} penumbra={1} castShadow />
                    <Environment preset="city" />

                    <ElevatorScene config={config} />

                    <OrbitControls
                        enablePan={false}
                        minPolarAngle={Math.PI / 4}
                        maxPolarAngle={Math.PI / 2}
                        minAzimuthAngle={-Math.PI / 4}
                        maxAzimuthAngle={Math.PI / 4}
                    />
                </Canvas>
            </div>

            <div className="ui-container">
                <ConfiguratorUI config={config} setConfig={setConfig} />
            </div>
        </div>
    );
};

export default LiftConfigurator;
