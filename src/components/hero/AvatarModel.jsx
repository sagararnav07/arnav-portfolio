import React, { useRef, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, Environment, ContactShadows, Float, Text, Sparkles } from '@react-three/drei';
import * as THREE from 'three';

function Avatar({ mousePosition, onRotationChange }) {
  const group = useRef();
  const { scene } = useGLTF('/avatar.glb');
  const rotationRef = useRef(0);
  const direction = useRef(1);
  
  useFrame((state) => {
    if (group.current) {
      // Ping-pong rotation - only front to sides, never showing back
      rotationRef.current += 0.008 * direction.current;
      
      // Reverse direction at 45 degrees (about 0.78 radians)
      if (rotationRef.current >= 0.7) {
        direction.current = -1;
      } else if (rotationRef.current <= -0.7) {
        direction.current = 1;
      }
      
      // Calculate how close we are to the edge (0 at center, 1 at sides)
      const edgeProximity = Math.abs(rotationRef.current) / 0.7;
      onRotationChange(edgeProximity, direction.current);
      
      group.current.rotation.y = rotationRef.current;
    }
  });

  return (
    <Float
      speed={2}
      rotationIntensity={0.05}
      floatIntensity={0.3}
    >
      <group ref={group} position={[0, -1.8, 0]} scale={1.6}>
        <primitive object={scene} />
      </group>
    </Float>
  );
}

function TransitionEffect({ intensity, direction }) {
  const groupRef = useRef();
  const particlesRef = useRef();
  
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.5;
      groupRef.current.scale.setScalar(0.5 + intensity * 0.5);
    }
  });

  // Only show when near the edge of rotation
  if (intensity < 0.6) return null;

  const adjustedIntensity = (intensity - 0.6) / 0.4; // 0 to 1 when intensity is 0.6 to 1

  return (
    <group ref={groupRef}>
      {/* Glowing energy burst */}
      <mesh position={[direction * 1.5, 0.5, 0]}>
        <sphereGeometry args={[0.3 + adjustedIntensity * 0.3, 32, 32]} />
        <meshBasicMaterial 
          color="#8b5cf6" 
          transparent 
          opacity={adjustedIntensity * 0.6}
        />
      </mesh>
      
      {/* Secondary glow */}
      <mesh position={[direction * 1.2, 0.8, 0.5]}>
        <sphereGeometry args={[0.2 + adjustedIntensity * 0.2, 32, 32]} />
        <meshBasicMaterial 
          color="#06b6d4" 
          transparent 
          opacity={adjustedIntensity * 0.5}
        />
      </mesh>
      
      {/* Energy ring */}
      <mesh position={[direction * 1.3, 0.5, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.5 + adjustedIntensity * 0.3, 0.02, 16, 50]} />
        <meshBasicMaterial 
          color="#8b5cf6" 
          transparent 
          opacity={adjustedIntensity * 0.7}
        />
      </mesh>
    </group>
  );
}

function CodeSymbols({ intensity, direction }) {
  const groupRef = useRef();
  const symbols = ['</', '/>', '{ }', '( )', '[ ]', '&&', '=>'];
  
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.children.forEach((child, i) => {
        child.position.y = Math.sin(state.clock.elapsedTime * 2 + i) * 0.3 + 0.5;
        child.rotation.z = Math.sin(state.clock.elapsedTime + i * 0.5) * 0.1;
      });
    }
  });

  if (intensity < 0.5) return null;
  
  const adjustedIntensity = (intensity - 0.5) / 0.5;

  return (
    <group ref={groupRef} position={[direction * 2, 0, 0]}>
      {symbols.slice(0, Math.ceil(adjustedIntensity * 7)).map((symbol, i) => (
        <Text
          key={i}
          position={[
            Math.sin(i * 0.9) * 0.8,
            i * 0.25 - 0.5,
            Math.cos(i * 0.9) * 0.5
          ]}
          fontSize={0.15}
          color={i % 2 === 0 ? "#8b5cf6" : "#06b6d4"}
          anchorX="center"
          anchorY="middle"
          fillOpacity={adjustedIntensity}
        >
          {symbol}
        </Text>
      ))}
    </group>
  );
}

function GlowRing({ radius, speed, color, position = [0, 0, 0] }) {
  const ringRef = useRef();
  
  useFrame((state) => {
    if (ringRef.current) {
      ringRef.current.rotation.x = Math.sin(state.clock.elapsedTime * speed) * 0.5;
      ringRef.current.rotation.y = state.clock.elapsedTime * speed;
    }
  });

  return (
    <mesh ref={ringRef} position={position}>
      <torusGeometry args={[radius, 0.015, 16, 100]} />
      <meshBasicMaterial color={color} transparent opacity={0.5} />
    </mesh>
  );
}

function OrbitingLights() {
  const groupRef = useRef();
  
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.3;
    }
  });

  return (
    <group ref={groupRef}>
      <pointLight position={[3, 1, 0]} intensity={0.5} color="#8b5cf6" />
      <pointLight position={[-3, 1, 0]} intensity={0.5} color="#06b6d4" />
      <pointLight position={[0, 1, 3]} intensity={0.3} color="#8b5cf6" />
    </group>
  );
}

const AvatarModel = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [rotationState, setRotationState] = useState({ intensity: 0, direction: 1 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: -(e.clientY / window.innerHeight) * 2 + 1,
      });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleRotationChange = (intensity, direction) => {
    setRotationState({ intensity, direction });
  };

  return (
    <div className="avatar-model-container">
      <Canvas
        camera={{ position: [0, 0.8, 5], fov: 35 }}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={1} />
        <directionalLight position={[5, 5, 5]} intensity={1.5} />
        <directionalLight position={[-5, 5, -5]} intensity={0.8} color="#8b5cf6" />
        
        <OrbitingLights />
        
        <Avatar mousePosition={mousePosition} onRotationChange={handleRotationChange} />
        
        {/* Transition effects when rotating to sides */}
        <TransitionEffect intensity={rotationState.intensity} direction={rotationState.direction} />
        <CodeSymbols intensity={rotationState.intensity} direction={rotationState.direction} />
        
        {/* Sparkles that intensify at rotation edges */}
        <Sparkles
          count={30 + Math.floor(rotationState.intensity * 50)}
          scale={4}
          size={2 + rotationState.intensity * 3}
          speed={0.5}
          opacity={0.3 + rotationState.intensity * 0.5}
          color="#8b5cf6"
        />
        
        <GlowRing radius={1.5} speed={0.5} color="#8b5cf6" position={[0, 0, 0]} />
        <GlowRing radius={1.8} speed={-0.3} color="#06b6d4" position={[0, 0.2, 0]} />
        
        <ContactShadows
          position={[0, -2.2, 0]}
          opacity={0.4}
          scale={6}
          blur={2}
          far={4}
        />
        
        <Environment preset="studio" />
      </Canvas>
    </div>
  );
};

useGLTF.preload('/avatar.glb');

export default AvatarModel;
