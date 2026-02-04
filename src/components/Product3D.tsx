'use client';

import { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Environment, ContactShadows } from '@react-three/drei';
import { ColorScheme } from '@/types';
import * as THREE from 'three';

interface Product3DProps {
  colorScheme: ColorScheme;
  productType?: 'chair' | 'lamp' | 'vase' | 'room';
}

// 椅子组件
function Chair({ colorScheme }: { colorScheme: ColorScheme }) {
  const meshRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
    }
  });

  return (
    <group ref={meshRef} position={[0, -1, 0]}>
      {/* 椅子座位 */}
      <mesh position={[0, 0.5, 0]}>
        <boxGeometry args={[1.5, 0.1, 1.5]} />
        <meshStandardMaterial color={colorScheme.primary} />
      </mesh>
      
      {/* 椅子靠背 */}
      <mesh position={[0, 1.2, -0.7]}>
        <boxGeometry args={[1.5, 1.4, 0.1]} />
        <meshStandardMaterial color={colorScheme.secondary} />
      </mesh>
      
      {/* 椅子腿 */}
      {[
        [-0.6, 0, -0.6],
        [0.6, 0, -0.6],
        [-0.6, 0, 0.6],
        [0.6, 0, 0.6]
      ].map((position, index) => (
        <mesh key={index} position={position}>
          <cylinderGeometry args={[0.05, 0.05, 1]} />
          <meshStandardMaterial color={colorScheme.accent} />
        </mesh>
      ))}
    </group>
  );
}

// 台灯组件
function Lamp({ colorScheme }: { colorScheme: ColorScheme }) {
  const meshRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.15;
    }
  });

  return (
    <group ref={meshRef} position={[0, -1, 0]}>
      {/* 灯罩 */}
      <mesh position={[0, 1.5, 0]}>
        <coneGeometry args={[0.8, 1, 8]} />
        <meshStandardMaterial color={colorScheme.primary} />
      </mesh>
      
      {/* 灯杆 */}
      <mesh position={[0, 0.5, 0]}>
        <cylinderGeometry args={[0.05, 0.05, 2]} />
        <meshStandardMaterial color={colorScheme.secondary} />
      </mesh>
      
      {/* 底座 */}
      <mesh position={[0, -0.5, 0]}>
        <cylinderGeometry args={[0.5, 0.5, 0.2]} />
        <meshStandardMaterial color={colorScheme.accent} />
      </mesh>
      
      {/* 光源效果 */}
      <pointLight position={[0, 1.5, 0]} intensity={0.5} color={colorScheme.accent} />
    </group>
  );
}

// 花瓶组件
function Vase({ colorScheme }: { colorScheme: ColorScheme }) {
  const meshRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.2;
    }
  });

  return (
    <group ref={meshRef} position={[0, -1, 0]}>
      {/* 花瓶主体 */}
      <mesh position={[0, 0.5, 0]}>
        <cylinderGeometry args={[0.3, 0.6, 1.5, 16]} />
        <meshStandardMaterial color={colorScheme.primary} />
      </mesh>
      
      {/* 花瓶口 */}
      <mesh position={[0, 1.3, 0]}>
        <cylinderGeometry args={[0.35, 0.3, 0.2, 16]} />
        <meshStandardMaterial color={colorScheme.secondary} />
      </mesh>
      
      {/* 装饰花朵 */}
      {[0, 1, 2].map((index) => (
        <mesh key={index} position={[
          Math.cos(index * 2.1) * 0.2,
          1.5 + Math.sin(index * 1.5) * 0.1,
          Math.sin(index * 2.1) * 0.2
        ]}>
          <sphereGeometry args={[0.1]} />
          <meshStandardMaterial color={colorScheme.accent} />
        </mesh>
      ))}
    </group>
  );
}

// 房间组件
function Room({ colorScheme }: { colorScheme: ColorScheme }) {
  return (
    <group position={[0, -2, 0]}>
      {/* 地板 */}
      <mesh position={[0, 0, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[8, 8]} />
        <meshStandardMaterial color={colorScheme.background} />
      </mesh>
      
      {/* 后墙 */}
      <mesh position={[0, 2, -4]}>
        <planeGeometry args={[8, 4]} />
        <meshStandardMaterial color={colorScheme.primary} />
      </mesh>
      
      {/* 左墙 */}
      <mesh position={[-4, 2, 0]} rotation={[0, Math.PI / 2, 0]}>
        <planeGeometry args={[8, 4]} />
        <meshStandardMaterial color={colorScheme.secondary} />
      </mesh>
      
      {/* 装饰立方体 */}
      <mesh position={[-2, 0.5, -2]}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color={colorScheme.accent} />
      </mesh>
      
      <mesh position={[2, 0.3, -1]}>
        <boxGeometry args={[0.6, 0.6, 0.6]} />
        <meshStandardMaterial color={colorScheme.text} />
      </mesh>
    </group>
  );
}

export default function Product3D({ colorScheme, productType = 'chair' }: Product3DProps) {
  const [isLoading, setIsLoading] = useState(true);

  const renderProduct = () => {
    switch (productType) {
      case 'chair':
        return <Chair colorScheme={colorScheme} />;
      case 'lamp':
        return <Lamp colorScheme={colorScheme} />;
      case 'vase':
        return <Vase colorScheme={colorScheme} />;
      case 'room':
        return <Room colorScheme={colorScheme} />;
      default:
        return <Chair colorScheme={colorScheme} />;
    }
  };

  return (
    <div className="w-full h-96 relative rounded-lg overflow-hidden shadow-lg">
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 z-10">
          <div className="text-gray-500">加载3D模型中...</div>
        </div>
      )}
      
      <Canvas
        camera={{ position: [3, 2, 5], fov: 50 }}
        onCreated={() => setIsLoading(false)}
        style={{ background: colorScheme.background }}
      >
        <ambientLight intensity={0.4} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <directionalLight position={[-10, -10, -5]} intensity={0.3} />
        
        {renderProduct()}
        
        <ContactShadows
          position={[0, -1.5, 0]}
          opacity={0.4}
          scale={10}
          blur={2}
          far={4}
        />
        
        <Environment preset="city" />
        
        <OrbitControls
          enablePan={false}
          enableZoom={true}
          enableRotate={true}
          minDistance={3}
          maxDistance={10}
          minPolarAngle={0}
          maxPolarAngle={Math.PI / 2}
        />
      </Canvas>
    </div>
  );
}
