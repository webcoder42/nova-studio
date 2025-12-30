import { useRef, useMemo, useState, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Float, Sphere, MeshDistortMaterial, Stars, Line } from '@react-three/drei';
import * as THREE from 'three';

// Service-specific animated backgrounds
const serviceConfigs = [
  { // Web Development - Code/Grid theme
    particleColor: '#7C3AED',
    orbColor: '#7C3AED',
    emissive: '#4C1D95',
    gridEnabled: true,
    linesEnabled: true,
  },
  { // App Development - Mobile/Cards theme
    particleColor: '#EC4899',
    orbColor: '#EC4899',
    emissive: '#9D174D',
    gridEnabled: false,
    linesEnabled: true,
  },
  { // AI - Neural network theme
    particleColor: '#06B6D4',
    orbColor: '#06B6D4',
    emissive: '#0E7490',
    gridEnabled: false,
    linesEnabled: true,
  },
  { // Cloud & Blockchain - Cubes/Network theme
    particleColor: '#8B5CF6',
    orbColor: '#8B5CF6',
    emissive: '#5B21B6',
    gridEnabled: true,
    linesEnabled: true,
  },
];

interface ParticlesProps {
  count: number;
  activeService: number;
}

function Particles({ count, activeService }: ParticlesProps) {
  const mesh = useRef<THREE.Points>(null);
  const config = serviceConfigs[activeService];
  
  const targetColor = useMemo(() => new THREE.Color(config.particleColor), [config.particleColor]);

  const [positions, velocities] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const vel = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const radius = 2 + Math.random() * 6;
      
      pos[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = radius * Math.cos(phi);
      
      vel[i * 3] = (Math.random() - 0.5) * 0.01;
      vel[i * 3 + 1] = (Math.random() - 0.5) * 0.01;
      vel[i * 3 + 2] = (Math.random() - 0.5) * 0.01;
    }
    return [pos, vel];
  }, [count]);

  useFrame((state) => {
    if (mesh.current) {
      const time = state.clock.getElapsedTime();
      mesh.current.rotation.y = time * 0.03;
      mesh.current.rotation.x = Math.sin(time * 0.02) * 0.15;
      
      // Animate particles
      const positionsAttr = mesh.current.geometry.attributes.position;
      for (let i = 0; i < count; i++) {
        const i3 = i * 3;
        positionsAttr.array[i3] += velocities[i3];
        positionsAttr.array[i3 + 1] += velocities[i3 + 1];
        positionsAttr.array[i3 + 2] += velocities[i3 + 2];
        
        // Boundary check and reverse
        const dist = Math.sqrt(
          positionsAttr.array[i3] ** 2 + 
          positionsAttr.array[i3 + 1] ** 2 + 
          positionsAttr.array[i3 + 2] ** 2
        );
        if (dist > 8 || dist < 2) {
          velocities[i3] *= -1;
          velocities[i3 + 1] *= -1;
          velocities[i3 + 2] *= -1;
        }
      }
      positionsAttr.needsUpdate = true;
      
      const material = mesh.current.material as THREE.PointsMaterial;
      material.color.lerp(targetColor, 0.03);
    }
  });

  return (
    <points ref={mesh}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.04}
        color={config.particleColor}
        transparent
        opacity={0.9}
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
  const config = serviceConfigs[activeService];
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    if (meshRef.current) {
      const time = state.clock.getElapsedTime();
      meshRef.current.rotation.x = time * 0.15;
      meshRef.current.rotation.y = time * 0.2;
      meshRef.current.rotation.z = Math.sin(time * 0.3) * 0.1;
      
      // Pulsing scale
      const scale = 1 + Math.sin(time * 2) * 0.05 + (hovered ? 0.1 : 0);
      meshRef.current.scale.setScalar(scale);
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.3} floatIntensity={1.5}>
      <Sphere 
        ref={meshRef} 
        args={[1.8, 128, 128]}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <MeshDistortMaterial
          color={config.orbColor}
          attach="material"
          distort={0.5}
          speed={3}
          roughness={0.1}
          metalness={0.9}
          emissive={config.emissive}
          emissiveIntensity={0.5}
        />
      </Sphere>
    </Float>
  );
}

function NeuralNetwork({ activeService }: { activeService: number }) {
  const groupRef = useRef<THREE.Group>(null);
  const config = serviceConfigs[activeService];
  
  const nodes = useMemo(() => {
    const nodeData: { position: [number, number, number]; connections: number[] }[] = [];
    const nodeCount = 25;
    
    for (let i = 0; i < nodeCount; i++) {
      const x = (Math.random() - 0.5) * 12;
      const y = (Math.random() - 0.5) * 8;
      const z = (Math.random() - 0.5) * 6 - 3;
      
      // Connect to nearby nodes
      const connections: number[] = [];
      nodeData.push({ position: [x, y, z], connections });
    }
    
    // Create connections between nearby nodes
    for (let i = 0; i < nodeCount; i++) {
      for (let j = i + 1; j < nodeCount; j++) {
        const dist = Math.sqrt(
          (nodeData[i].position[0] - nodeData[j].position[0]) ** 2 +
          (nodeData[i].position[1] - nodeData[j].position[1]) ** 2 +
          (nodeData[i].position[2] - nodeData[j].position[2]) ** 2
        );
        if (dist < 3) {
          nodeData[i].connections.push(j);
        }
      }
    }
    
    return nodeData;
  }, []);

  useFrame((state) => {
    if (groupRef.current) {
      const time = state.clock.getElapsedTime();
      groupRef.current.rotation.y = Math.sin(time * 0.05) * 0.2;
      groupRef.current.rotation.x = Math.cos(time * 0.03) * 0.1;
    }
  });

  return (
    <group ref={groupRef}>
      {nodes.map((node, i) => (
        <group key={i}>
          {/* Node sphere */}
          <mesh position={node.position}>
            <sphereGeometry args={[0.06, 16, 16]} />
            <meshBasicMaterial 
              color={config.particleColor} 
              transparent 
              opacity={0.8} 
            />
          </mesh>
          
          {/* Connections */}
          {node.connections.map((targetIndex) => (
            <Line
              key={`${i}-${targetIndex}`}
              points={[node.position, nodes[targetIndex].position]}
              color={config.particleColor}
              lineWidth={0.5}
              transparent
              opacity={0.3}
            />
          ))}
        </group>
      ))}
    </group>
  );
}

function FloatingShapes({ activeService }: { activeService: number }) {
  const groupRef = useRef<THREE.Group>(null);
  const config = serviceConfigs[activeService];
  
  const shapes = useMemo(() => {
    return Array.from({ length: 15 }, (_, i) => ({
      position: [
        (Math.random() - 0.5) * 15,
        (Math.random() - 0.5) * 10,
        (Math.random() - 0.5) * 8 - 4,
      ] as [number, number, number],
      rotation: Math.random() * Math.PI * 2,
      scale: 0.1 + Math.random() * 0.3,
      speed: 0.2 + Math.random() * 0.5,
      type: Math.floor(Math.random() * 3),
    }));
  }, []);

  useFrame((state) => {
    if (groupRef.current) {
      const time = state.clock.getElapsedTime();
      groupRef.current.children.forEach((child, i) => {
        child.rotation.x = time * shapes[i].speed;
        child.rotation.y = time * shapes[i].speed * 0.7;
        child.position.y = shapes[i].position[1] + Math.sin(time + i) * 0.3;
      });
    }
  });

  return (
    <group ref={groupRef}>
      {shapes.map((shape, i) => (
        <mesh key={i} position={shape.position} scale={shape.scale}>
          {shape.type === 0 && <boxGeometry args={[1, 1, 1]} />}
          {shape.type === 1 && <octahedronGeometry args={[1]} />}
          {shape.type === 2 && <tetrahedronGeometry args={[1]} />}
          <meshBasicMaterial 
            color={config.particleColor} 
            transparent 
            opacity={0.15}
            wireframe
          />
        </mesh>
      ))}
    </group>
  );
}

function GradientWaves({ activeService }: { activeService: number }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const config = serviceConfigs[activeService];

  useFrame((state) => {
    if (meshRef.current) {
      const time = state.clock.getElapsedTime();
      const geometry = meshRef.current.geometry as THREE.PlaneGeometry;
      const position = geometry.attributes.position;
      
      for (let i = 0; i < position.count; i++) {
        const x = position.getX(i);
        const y = position.getY(i);
        const wave = Math.sin(x * 0.5 + time) * 0.3 + 
                     Math.sin(y * 0.3 + time * 0.7) * 0.2;
        position.setZ(i, wave);
      }
      position.needsUpdate = true;
    }
  });

  return (
    <mesh ref={meshRef} position={[0, -3, -5]} rotation={[-Math.PI / 4, 0, 0]}>
      <planeGeometry args={[30, 20, 50, 50]} />
      <meshBasicMaterial 
        color={config.particleColor}
        wireframe
        transparent
        opacity={0.08}
      />
    </mesh>
  );
}

function CameraController() {
  const { camera } = useThree();
  
  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    camera.position.x = Math.sin(time * 0.1) * 0.5;
    camera.position.y = Math.cos(time * 0.08) * 0.3;
    camera.lookAt(0, 0, 0);
  });
  
  return null;
}

interface HeroSceneProps {
  activeService: number;
}

export function HeroScene({ activeService }: HeroSceneProps) {
  return (
    <Canvas
      camera={{ position: [0, 0, 7], fov: 55 }}
      style={{ position: 'absolute', inset: 0 }}
      gl={{ antialias: true, alpha: true }}
      dpr={[1, 2]}
    >
      <color attach="background" args={['#050508']} />
      
      {/* Camera animation */}
      <CameraController />
      
      {/* Lighting */}
      <ambientLight intensity={0.15} />
      <pointLight position={[10, 10, 10]} intensity={0.8} color="#7C3AED" />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#EC4899" />
      <pointLight position={[0, 5, 5]} intensity={0.4} color="#06B6D4" />
      
      {/* Background stars with depth */}
      <Stars radius={80} depth={80} count={3000} factor={5} saturation={0.5} fade speed={0.5} />
      
      {/* Gradient waves background */}
      <GradientWaves activeService={activeService} />
      
      {/* Floating geometric shapes */}
      <FloatingShapes activeService={activeService} />
      
      {/* Main floating orb */}
      <FloatingOrb activeService={activeService} />
      
      {/* Particle system */}
      <Particles count={2000} activeService={activeService} />
      
      {/* Neural network connections */}
      <NeuralNetwork activeService={activeService} />
    </Canvas>
  );
}