import React, { useRef, useMemo, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, useTexture, MeshDistortMaterial, Sparkles, Environment } from '@react-three/drei';
import * as THREE from 'three';

// Detect mobile for performance optimization (sync initial value to avoid buffer resize)
const getIsMobile = () => typeof window !== 'undefined' && window.innerWidth <= 738;

const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(getIsMobile);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 738);
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);
  return isMobile;
};

// Floating Avatar Image
function AvatarPlane() {
  const meshRef = useRef();
  const texture = useTexture('/avatar.png');
  
  // Make texture transparent
  texture.minFilter = THREE.LinearFilter;
  
  useFrame((state) => {
    if (meshRef.current) {
      // Gentle rotation following mouse
      meshRef.current.rotation.y = THREE.MathUtils.lerp(
        meshRef.current.rotation.y,
        (state.mouse.x * Math.PI) / 10,
        0.05
      );
      meshRef.current.rotation.x = THREE.MathUtils.lerp(
        meshRef.current.rotation.x,
        (state.mouse.y * Math.PI) / 10,
        0.05
      );
    }
  });

  return (
    <Float
      speed={2}
      rotationIntensity={0.2}
      floatIntensity={0.5}
      floatingRange={[-0.1, 0.1]}
    >
      <mesh ref={meshRef}>
        <planeGeometry args={[3, 3.5]} />
        <meshBasicMaterial 
          map={texture} 
          transparent={true}
          side={THREE.DoubleSide}
        />
      </mesh>
    </Float>
  );
}

// Glowing background orb
function GlowOrb() {
  const meshRef = useRef();
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.2;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.3;
    }
  });

  return (
    <mesh ref={meshRef} position={[0, 0, -1]}>
      <icosahedronGeometry args={[2, 2]} />
      <MeshDistortMaterial
        color="#8b5cf6"
        transparent
        opacity={0.15}
        distort={0.3}
        speed={2}
        roughness={0}
      />
    </mesh>
  );
}

// Floating particles — key forces clean remount when count changes
function FloatingParticles({ isMobile }) {
  const count = isMobile ? 15 : 50;
  return (
    <Sparkles
      key={`sparkles-${count}`}
      count={count}
      scale={isMobile ? 4 : 5}
      size={isMobile ? 1.5 : 2}
      speed={0.4}
      opacity={0.5}
      color="#8b5cf6"
    />
  );
}

// Animated ring
function AnimatedRing() {
  const ringRef = useRef();
  
  useFrame((state) => {
    if (ringRef.current) {
      ringRef.current.rotation.z = state.clock.elapsedTime * 0.5;
      ringRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.2;
    }
  });

  return (
    <mesh ref={ringRef} position={[0, 0, -0.5]}>
      <torusGeometry args={[2.2, 0.02, 16, 100]} />
      <meshBasicMaterial color="#06b6d4" transparent opacity={0.6} />
    </mesh>
  );
}

// Second animated ring
function AnimatedRing2() {
  const ringRef = useRef();
  
  useFrame((state) => {
    if (ringRef.current) {
      ringRef.current.rotation.z = -state.clock.elapsedTime * 0.3;
      ringRef.current.rotation.y = Math.cos(state.clock.elapsedTime * 0.2) * 0.3;
    }
  });

  return (
    <mesh ref={ringRef} position={[0, 0, -0.3]}>
      <torusGeometry args={[2.5, 0.015, 16, 100]} />
      <meshBasicMaterial color="#8b5cf6" transparent opacity={0.4} />
    </mesh>
  );
}

// Orbiting dots
function OrbitingDots() {
  const groupRef = useRef();
  const dots = useMemo(() => {
    return Array.from({ length: 8 }, (_, i) => ({
      angle: (i / 8) * Math.PI * 2,
      radius: 2.3,
      speed: 0.5 + Math.random() * 0.3,
      size: 0.03 + Math.random() * 0.02,
    }));
  }, []);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.z = state.clock.elapsedTime * 0.2;
    }
  });

  return (
    <group ref={groupRef}>
      {dots.map((dot, i) => (
        <mesh
          key={i}
          position={[
            Math.cos(dot.angle) * dot.radius,
            Math.sin(dot.angle) * dot.radius,
            0
          ]}
        >
          <sphereGeometry args={[dot.size, 16, 16]} />
          <meshBasicMaterial color={i % 2 === 0 ? "#8b5cf6" : "#06b6d4"} />
        </mesh>
      ))}
    </group>
  );
}

const Avatar3D = () => {
  const isMobile = useIsMobile();

  return (
    <div className="avatar3d-container">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 45 }}
        style={{ background: 'transparent' }}
        dpr={isMobile ? 1 : Math.min(window.devicePixelRatio, 2)}
        performance={{ min: 0.5 }}
        gl={{ antialias: !isMobile, failIfMajorPerformanceCaveat: true }}
        onCreated={({ gl }) => {
          // Suppress noisy WebGL warnings for vertex buffer edge cases
          const ctx = gl.getContext();
          if (ctx) {
            const origGetError = ctx.getError.bind(ctx);
            ctx.getError = () => {
              const err = origGetError();
              return err;
            };
          }
        }}
      >
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        {!isMobile && (
          <pointLight position={[-10, -10, -10]} color="#8b5cf6" intensity={0.5} />
        )}
        
        <GlowOrb />
        {!isMobile && <AnimatedRing />}
        {!isMobile && <AnimatedRing2 />}
        {!isMobile && <OrbitingDots />}
        <AvatarPlane />
        <FloatingParticles isMobile={isMobile} />
      </Canvas>
    </div>
  );
};

export default Avatar3D;
