// components/LaptopCanvas.tsx
"use client";

import React, { useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader.js';
import { useLoader } from '@react-three/fiber';
import * as THREE from 'three';

// TypeScript interface for the model
interface ModelProps {
  model: THREE.Group;
}

// Component to load and render the laptop model
const LaptopModel: React.FC = () => {
  const [fbx, setFbx] = useState<THREE.Group | null>(null);
  const fbxLoader = new FBXLoader();

  // Load the model and set it to state
  useEffect(() => {
    fbxLoader.load('/models/laptop.fbx', (model) => {
      setFbx(model);
    });
  }, [fbxLoader]);

  const [rotation, setRotation] = useState(0);

  // Update rotation based on scroll
  useEffect(() => {
    const handleScroll = () => {
      setRotation(window.scrollY * 0.01); // Adjust rotation speed
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useFrame(() => {
    if (fbx) fbx.rotation.y = rotation; // Update rotation
  });

  return fbx ? <primitive object={fbx} scale={[0.5, 0.5, 0.5]} position={[0, 0, 0]} /> : null;
};

// Canvas wrapper component
const LaptopCanvas: React.FC = () => {
  return (
    <Canvas
      style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        width: '100vw',
        height: '100vh',
        transform: 'translate(-50%, -50%)',
        zIndex: 0, // Ensure it's behind other content
      }}
      camera={{ position: [0, 0, 5], fov: 50 }}
    >
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      <LaptopModel />
    </Canvas>
  );
};

export default LaptopCanvas;