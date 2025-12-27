import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Sphere, MeshDistortMaterial, Stars } from '@react-three/drei';
import * as THREE from 'three';

interface ParticlesProps {
  count: number;
  activeService: number;
}

function Particles({ count, activeService }: ParticlesProps) {
  const mesh = useRef<THREE.Points>(null);
  
  const colors = useMemo(() => [
    new THREE.Color('#7C3AED'), // Web - Purple
    new THREE.Color('#EC4899'), // App - Pink
    new THREE.Color('#06B6D4'), // AI - Cyan
    new THREE.Color('#8B5CF6'), // Cloud - Violet
  ], []);

  const particlesPosition = useMemo(() => {
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const radius = 3 + Math.random() * 4;
      
      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = radius * Math.cos(phi);
    }
    return positions;
  }, [count]);

  useFrame((state) => {
    if (mesh.current) {
      mesh.current.rotation.y = state.clock.getElapsedTime() * 0.05;
      mesh.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.03) * 0.1;
      
      const material = mesh.current.material as THREE.PointsMaterial;
      material.color.lerp(colors[activeService], 0.02);
    }
  });

  return (
    <points ref={mesh}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={particlesPosition}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.03}
        color={colors[0]}
        transparent
        opacity={0.8}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

interface FloatingOrbProps {
  activeService: number;
}

function FloatingOrb({ activeService }: FloatingOrbProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  
  const colors = useMemo(() => [
    '#7C3AED', // Web - Purple
    '#EC4899', // App - Pink
    '#06B6D4', // AI - Cyan
    '#8B5CF6', // Cloud - Violet
  ], []);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.getElapsedTime() * 0.2;
      meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.3;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
      <Sphere ref={meshRef} args={[1.5, 64, 64]}>
        <MeshDistortMaterial
          color={colors[activeService]}
          attach="material"
          distort={0.4}
          speed={2}
          roughness={0.2}
          metalness={0.8}
          emissive={colors[activeService]}
          emissiveIntensity={0.3}
        />
      </Sphere>
    </Float>
  );
}

function NetworkLines({ activeService }: { activeService: number }) {
  const linesRef = useRef<THREE.Group>(null);
  
  const lines = useMemo(() => {
    const lineData = [];
    const nodeCount = 20;
    
    for (let i = 0; i < nodeCount; i++) {
      const x = (Math.random() - 0.5) * 10;
      const y = (Math.random() - 0.5) * 6;
      const z = (Math.random() - 0.5) * 4 - 2;
      lineData.push({ position: [x, y, z] as [number, number, number] });
    }
    
    return lineData;
  }, []);

  useFrame((state) => {
    if (linesRef.current) {
      linesRef.current.rotation.y = Math.sin(state.clock.getElapsedTime() * 0.1) * 0.1;
    }
  });

  const colors = ['#7C3AED', '#EC4899', '#06B6D4', '#8B5CF6'];

  return (
    <group ref={linesRef}>
      {lines.map((line, i) => (
        <mesh key={i} position={line.position}>
          <sphereGeometry args={[0.03, 16, 16]} />
          <meshBasicMaterial color={colors[activeService]} transparent opacity={0.6} />
        </mesh>
      ))}
    </group>
  );
}

interface HeroSceneProps {
  activeService: number;
}

export function HeroScene({ activeService }: HeroSceneProps) {
  return (
    <Canvas
      camera={{ position: [0, 0, 6], fov: 60 }}
      style={{ position: 'absolute', inset: 0 }}
      gl={{ antialias: true, alpha: true }}
    >
      <color attach="background" args={['#0a0a0f']} />
      
      {/* Ambient lighting */}
      <ambientLight intensity={0.2} />
      <pointLight position={[10, 10, 10]} intensity={0.5} color="#7C3AED" />
      <pointLight position={[-10, -10, -10]} intensity={0.3} color="#EC4899" />
      
      {/* Background stars */}
      <Stars radius={50} depth={50} count={2000} factor={4} saturation={0} fade speed={1} />
      
      {/* Main floating orb */}
      <FloatingOrb activeService={activeService} />
      
      {/* Particle system */}
      <Particles count={1500} activeService={activeService} />
      
      {/* Network nodes */}
      <NetworkLines activeService={activeService} />
    </Canvas>
  );
}
