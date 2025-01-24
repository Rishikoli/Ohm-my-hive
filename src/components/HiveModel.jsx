import React, { useRef, useEffect } from 'react';
import { useGLTF } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export function HiveModel(props) {
  const group = useRef();
  const modelPath = '/assets/models/hive.glb';

  // Load the model with error handling
  const { nodes, materials, scene } = useGLTF(modelPath, true, 
    (error) => console.error('Error loading model:', error)
  );

  useEffect(() => {
    if (scene) {
      // Log successful model loading
      console.log('Model loaded successfully');
      
      // Apply default material if original is missing
      scene.traverse((child) => {
        if (child.isMesh && !child.material) {
          child.material = new THREE.MeshStandardMaterial({
            color: '#FFB74D',
            metalness: 0.5,
            roughness: 0.5,
          });
        }
      });
    }
  }, [scene]);

  // Gentle rotation animation
  useFrame((state) => {
    if (group.current) {
      group.current.rotation.y += 0.002;
    }
  });

  if (!nodes || !nodes.Hive) {
    console.log('Model nodes not loaded:', nodes);
    // Return a placeholder mesh while loading
    return (
      <mesh {...props}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="#FFB74D" />
      </mesh>
    );
  }

  return (
    <group ref={group} {...props} dispose={null}>
      <mesh
        geometry={nodes.Hive.geometry}
        material={
          materials.HiveMaterial || 
          new THREE.MeshStandardMaterial({
            color: '#FFB74D',
            metalness: 0.5,
            roughness: 0.5,
          })
        }
        scale={[0.5, 0.5, 0.5]}
        position={[0, 0, 0]}
        castShadow
        receiveShadow
      />
    </group>
  );
}

// Preload the model
useGLTF.preload('/assets/models/hive.glb');
