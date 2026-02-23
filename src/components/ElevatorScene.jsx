import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const materialMap = {
    body: {
        brushed_steel: new THREE.MeshStandardMaterial({ color: '#cccccc', metalness: 0.8, roughness: 0.3 }),
        gold: new THREE.MeshStandardMaterial({ color: '#F08F24', metalness: 0.9, roughness: 0.2 }),
        titanium: new THREE.MeshStandardMaterial({ color: '#555555', metalness: 0.7, roughness: 0.4 }),
        matte_black: new THREE.MeshStandardMaterial({ color: '#1a1a1a', metalness: 0.2, roughness: 0.8 })
    },
    floor: {
        dark_marble: new THREE.MeshStandardMaterial({ color: '#0d0d0d', roughness: 0.1 }),
        light_travertine: new THREE.MeshStandardMaterial({ color: '#e6dfd1', roughness: 0.4 }),
        wooden: new THREE.MeshStandardMaterial({ color: '#3d2314', roughness: 0.6 }),
        terrazzo: new THREE.MeshStandardMaterial({ color: '#d9d9d9', roughness: 0.5 })
    },
    ceiling: {
        led_panel: new THREE.MeshStandardMaterial({ color: '#ffffff', emissive: '#ffffff', emissiveIntensity: 0.5 }),
        starlight: new THREE.MeshStandardMaterial({ color: '#000000', emissive: '#111111', emissiveIntensity: 0.8 }),
        mirror: new THREE.MeshStandardMaterial({ color: '#dddddd', metalness: 1, roughness: 0 })
    },
    handle: {
        silver: new THREE.MeshStandardMaterial({ color: '#dddddd', metalness: 0.9, roughness: 0.1 }),
        gold: new THREE.MeshStandardMaterial({ color: '#F08F24', metalness: 0.9, roughness: 0.1 }),
        matte_black: new THREE.MeshStandardMaterial({ color: '#111111', metalness: 0.3, roughness: 0.7 })
    }
};

const ElevatorScene = ({ config }) => {
    const groupRef = useRef();

    // Basic continuous slight rotation for a dynamic feel
    useFrame((state) => {
        if (groupRef.current) {
            // Just a very slow floating idle animation
            groupRef.current.position.y = Math.sin(state.clock.elapsedTime) * 0.05;
        }
    });

    return (
        <group ref={groupRef} position={[0, -2, 0]}>
            {/* Floor */}
            <mesh position={[0, 0, 0]} rotation={[-Math.PI / 2, 0, 0]} material={materialMap.floor[config.floor]} receiveShadow>
                <planeGeometry args={[4, 4]} />
            </mesh>

            {/* Ceiling */}
            <mesh position={[0, 4, 0]} rotation={[Math.PI / 2, 0, 0]} material={materialMap.ceiling[config.ceiling]}>
                <planeGeometry args={[4, 4]} />
            </mesh>

            {/* Back Wall */}
            <mesh position={[0, 2, -2]} material={materialMap.body[config.body]} castShadow receiveShadow>
                <planeGeometry args={[4, 4]} />
            </mesh>

            {/* Left Wall */}
            <mesh position={[-2, 2, 0]} rotation={[0, Math.PI / 2, 0]} material={materialMap.body[config.body]} castShadow receiveShadow>
                <planeGeometry args={[4, 4]} />
            </mesh>

            {/* Right Wall */}
            <mesh position={[2, 2, 0]} rotation={[0, -Math.PI / 2, 0]} material={materialMap.body[config.body]} castShadow receiveShadow>
                <planeGeometry args={[4, 4]} />
            </mesh>

            {/* Handle Rail (Back Wall) */}
            <mesh position={[0, 1.5, -1.8]} rotation={[0, 0, Math.PI / 2]} material={materialMap.handle[config.handle]} castShadow>
                <cylinderGeometry args={[0.05, 0.05, 3, 16]} />
            </mesh>

            {/* Simple Button Panel Placeholder */}
            <mesh position={[1.8, 1.5, -1]} rotation={[0, -Math.PI / 2, 0]}>
                <boxGeometry args={[0.4, 0.8, 0.05]} />
                <meshStandardMaterial color="#000000" metalness={0.8} />
            </mesh>

            {/* Dummy Door Frame front */}
            <mesh position={[-1.75, 2, 2]} material={materialMap.body[config.body]}>
                <boxGeometry args={[0.5, 4, 0.2]} />
            </mesh>
            <mesh position={[1.75, 2, 2]} material={materialMap.body[config.body]}>
                <boxGeometry args={[0.5, 4, 0.2]} />
            </mesh>
            <mesh position={[0, 3.75, 2]} material={materialMap.body[config.body]}>
                <boxGeometry args={[3, 0.5, 0.2]} />
            </mesh>
        </group>
    );
};

export default ElevatorScene;
