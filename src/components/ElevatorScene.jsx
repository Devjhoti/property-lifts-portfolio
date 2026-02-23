import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const materialMap = {
    body: {
        brushed_steel: new THREE.MeshStandardMaterial({ color: '#cccccc', metalness: 0.9, roughness: 0.2, envMapIntensity: 1.5 }),
        gold: new THREE.MeshStandardMaterial({ color: '#F08F24', metalness: 1.0, roughness: 0.15, envMapIntensity: 2.0 }),
        titanium: new THREE.MeshStandardMaterial({ color: '#4d4d4d', metalness: 0.8, roughness: 0.35, envMapIntensity: 1.2 }),
        matte_black: new THREE.MeshStandardMaterial({ color: '#0f0f0f', metalness: 0.1, roughness: 0.9, envMapIntensity: 0.3 })
    },
    floor: {
        dark_marble: new THREE.MeshStandardMaterial({ color: '#0a0a0a', metalness: 0.2, roughness: 0.05, envMapIntensity: 1.5 }),
        light_travertine: new THREE.MeshStandardMaterial({ color: '#e6dfd1', metalness: 0.0, roughness: 0.4, envMapIntensity: 0.5 }),
        wooden: new THREE.MeshStandardMaterial({ color: '#2b170b', metalness: 0.0, roughness: 0.6, envMapIntensity: 0.2 }),
        terrazzo: new THREE.MeshStandardMaterial({ color: '#d9d9d9', metalness: 0.0, roughness: 0.4, envMapIntensity: 0.6 })
    },
    ceiling: {
        led_panel: new THREE.MeshStandardMaterial({ color: '#ffffff', emissive: '#ffffff', emissiveIntensity: 2.5, toneMapped: false }),
        starlight: new THREE.MeshStandardMaterial({ color: '#050505', emissive: '#222222', emissiveIntensity: 1.5, toneMapped: false }),
        mirror: new THREE.MeshStandardMaterial({ color: '#dddddd', metalness: 1.0, roughness: 0.0, envMapIntensity: 3.0 })
    },
    handle: {
        silver: new THREE.MeshStandardMaterial({ color: '#eeeeee', metalness: 1.0, roughness: 0.1, envMapIntensity: 2.5 }),
        gold: new THREE.MeshStandardMaterial({ color: '#F08F24', metalness: 1.0, roughness: 0.1, envMapIntensity: 2.5 }),
        matte_black: new THREE.MeshStandardMaterial({ color: '#0d0d0d', metalness: 0.3, roughness: 0.8, envMapIntensity: 0.4 })
    },
    button_pad: {
        touch_glass: new THREE.MeshStandardMaterial({ color: '#000000', metalness: 0.9, roughness: 0.1, envMapIntensity: 2.0 }),
        brushed_steel: new THREE.MeshStandardMaterial({ color: '#cccccc', metalness: 0.9, roughness: 0.3, envMapIntensity: 1.5 }),
        vintage_gold: new THREE.MeshStandardMaterial({ color: '#F08F24', metalness: 1.0, roughness: 0.2, envMapIntensity: 2.0 })
    }
};

const outerMaterial = new THREE.MeshStandardMaterial({ color: '#2a2a2a', metalness: 0.3, roughness: 0.9 });

import { Text } from '@react-three/drei';

const FlyingPart = ({ visible, children, flyFrom = [0, 5, 0] }) => {
    const groupRef = useRef();

    useFrame((state, delta) => {
        if (!groupRef.current) return;

        const targetX = visible ? 0 : flyFrom[0];
        const targetY = visible ? 0 : flyFrom[1];
        const targetZ = visible ? 0 : flyFrom[2];
        const targetScale = visible ? 1 : 0.001;

        groupRef.current.position.x = THREE.MathUtils.lerp(groupRef.current.position.x, targetX, delta * 4);
        groupRef.current.position.y = THREE.MathUtils.lerp(groupRef.current.position.y, targetY, delta * 4);
        groupRef.current.position.z = THREE.MathUtils.lerp(groupRef.current.position.z, targetZ, delta * 4);

        const s = THREE.MathUtils.lerp(groupRef.current.scale.x, targetScale, delta * 6);
        groupRef.current.scale.setScalar(s);

        groupRef.current.visible = s > 0.01;
    });

    return (
        <group ref={groupRef} position={flyFrom} scale={0.001} visible={visible}>
            {children}
        </group>
    );
};

// Custom Component that hides the wall if it's blocking the view
const SmartWall = ({ normal, children }) => {
    const groupRef = useRef();
    const vecNormal = new THREE.Vector3(...normal);

    useFrame(({ camera }) => {
        if (groupRef.current) {
            // Calculate dot product of camera position and wall's outward normal.
            // If the camera is "outside" this wall, the dot product will be positive.
            // We hide the wall if dot > 0.5 to create a seamless cutaway view.
            groupRef.current.visible = camera.position.dot(vecNormal) < 0.5;
        }
    });

    return <group ref={groupRef}>{children}</group>;
};

const ElevatorScene = ({ config }) => {
    const groupRef = useRef();

    useFrame((state) => {
        if (groupRef.current) {
            groupRef.current.position.y = Math.sin(state.clock.elapsedTime) * 0.03;
        }
    });

    return (
        <group ref={groupRef} position={[0, -0.5, 0]}>
            {/* Initial Text when nothing is selected */}
            <FlyingPart visible={!config.body && !config.floor && !config.ceiling && !config.handle && !config.button_pad} flyFrom={[0, -5, 0]}>
                <Text position={[0, 2, 0]} fontSize={0.4} color="#F08F24" anchorX="center" anchorY="middle" textAlign="center">
                    Please Select Components{'\n'}to Visualise
                </Text>
            </FlyingPart>

            {/* Floor */}
            <FlyingPart visible={!!config.floor} flyFrom={[0, -10, 0]}>
                <mesh position={[0, -3, 0]} rotation={[-Math.PI / 2, 0, 0]} material={config.floor ? materialMap.floor[config.floor] : null} receiveShadow>
                    <planeGeometry args={[4, 4]} />
                </mesh>
            </FlyingPart>

            {/* Ceiling */}
            <FlyingPart visible={!!config.ceiling} flyFrom={[0, 10, 0]}>
                <mesh position={[0, 3, 0]} rotation={[Math.PI / 2, 0, 0]} material={config.ceiling ? materialMap.ceiling[config.ceiling] : null}>
                    <planeGeometry args={[4, 4]} />
                </mesh>
            </FlyingPart>

            {/* Body Walls (Outer structure and inner walls together) */}
            <FlyingPart visible={!!config.body} flyFrom={[-10, 0, 0]}>
                {/* Back Wall Group */}
                <SmartWall normal={[0, 0, -1]}>
                    <mesh position={[0, 0, -2.1]} material={outerMaterial} castShadow>
                        <boxGeometry args={[4.4, 6, 0.2]} />
                    </mesh>
                    <mesh position={[0, 0, -1.99]} material={config.body ? materialMap.body[config.body] : null} receiveShadow>
                        <planeGeometry args={[4, 6]} />
                    </mesh>
                </SmartWall>

                {/* Left Wall Group */}
                <SmartWall normal={[-1, 0, 0]}>
                    <mesh position={[-2.1, 0, 0]} material={outerMaterial} castShadow>
                        <boxGeometry args={[0.2, 6, 4.4]} />
                    </mesh>
                    <mesh position={[-1.99, 0, 0]} rotation={[0, Math.PI / 2, 0]} material={config.body ? materialMap.body[config.body] : null} receiveShadow>
                        <planeGeometry args={[4, 6]} />
                    </mesh>
                </SmartWall>

                {/* Right Wall Group */}
                <SmartWall normal={[1, 0, 0]}>
                    <mesh position={[2.1, 0, 0]} material={outerMaterial} castShadow>
                        <boxGeometry args={[0.2, 6, 4.4]} />
                    </mesh>
                    <mesh position={[1.99, 0, 0]} rotation={[0, -Math.PI / 2, 0]} material={config.body ? materialMap.body[config.body] : null} receiveShadow>
                        <planeGeometry args={[4, 6]} />
                    </mesh>
                </SmartWall>

                {/* Front Wall Group (Includes Doors) */}
                <SmartWall normal={[0, 0, 1]}>
                    <mesh position={[0, 2.6, 2.1]} material={outerMaterial} castShadow>
                        <boxGeometry args={[4.4, 0.8, 0.2]} />
                    </mesh>
                    <mesh position={[-1.75, -0.4, 2.1]} material={outerMaterial} castShadow>
                        <boxGeometry args={[0.9, 5.2, 0.2]} />
                    </mesh>
                    <mesh position={[1.75, -0.4, 2.1]} material={outerMaterial} castShadow>
                        <boxGeometry args={[0.9, 5.2, 0.2]} />
                    </mesh>

                    {/* Doors slightly open */}
                    <mesh position={[-0.85, -0.4, 2]} material={config.body ? materialMap.body[config.body] : null} castShadow>
                        <boxGeometry args={[0.9, 5.2, 0.06]} />
                    </mesh>
                    <mesh position={[0.85, -0.4, 2]} material={config.body ? materialMap.body[config.body] : null} castShadow>
                        <boxGeometry args={[0.9, 5.2, 0.06]} />
                    </mesh>
                </SmartWall>
            </FlyingPart>

            {/* Handleboard */}
            <FlyingPart visible={!!config.handle && !!config.body} flyFrom={[0, 0, -10]}>
                <mesh position={[0, -1.0, -1.9]} rotation={[0, 0, Math.PI / 2]} material={config.handle ? materialMap.handle[config.handle] : null} castShadow>
                    <cylinderGeometry args={[0.05, 0.05, 3, 16]} />
                </mesh>
            </FlyingPart>

            {/* Button Pad */}
            <FlyingPart visible={!!config.button_pad && !!config.body} flyFrom={[10, 0, 0]}>
                {/* Configurable Button Pad on Right Inner Frame facing inwards */}
                <group position={[1.5, -0.6, 1.975]} rotation={[0, Math.PI, 0]}>
                    <mesh material={config.button_pad ? materialMap.button_pad[config.button_pad] : null} castShadow>
                        <boxGeometry args={[0.4, 1.2, 0.05]} />
                    </mesh>

                    {/* Screens */}
                    <mesh position={[0, 0.35, 0.03]}>
                        <planeGeometry args={[0.25, 0.25]} />
                        <meshStandardMaterial color="#ffffff" emissive="#10b5b2" emissiveIntensity={1.5} toneMapped={false} />
                    </mesh>
                    <mesh position={[0, -0.2, 0.03]}>
                        <planeGeometry args={[0.2, 0.5]} />
                        <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={0.5} />
                    </mesh>
                </group>
            </FlyingPart>
        </group>
    );
};

export default ElevatorScene;
