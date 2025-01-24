import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import flowerModel from '../assets/models/glowing_flower.glb';

const GlowingFlower = () => {
  const mountRef = useRef(null);
  const controlsRef = useRef(null);
  
  useEffect(() => {
    const currentMount = mountRef.current;

    // Scene, camera, renderer setup
    const scene = new THREE.Scene();
    scene.background = null;
    
    const camera = new THREE.PerspectiveCamera(
      50,
      currentMount.clientWidth / currentMount.clientHeight,
      0.1,
      1000
    );
    camera.position.set(0, 2, 5);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({ 
      antialias: true,
      alpha: true
    });
    renderer.setSize(currentMount.clientWidth, currentMount.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setClearColor(0x000000, 0);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    currentMount.appendChild(renderer.domElement);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 1);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0xffffff, 2);
    pointLight.position.set(2, 3, 4);
    scene.add(pointLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1.5);
    directionalLight.position.set(-1, 2, 4);
    scene.add(directionalLight);

    // Add glowing effect
    const glowLight = new THREE.PointLight(0x00ff00, 3, 5);
    glowLight.position.set(0, 0, 2);
    scene.add(glowLight);

    // Controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.enableZoom = false;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 1;
    controlsRef.current = controls;

    // Load Model
    const loader = new GLTFLoader();
    loader.load(
      flowerModel,
      (gltf) => {
        const model = gltf.scene;
        
        // Center the model
        const box = new THREE.Box3().setFromObject(model);
        const center = box.getCenter(new THREE.Vector3());
        model.position.sub(center);
        
        // Adjust scale
        const scale = 1;
        model.scale.set(scale, scale, scale);

        // Rotate model if needed
        model.rotation.x = Math.PI / 6;
        
        scene.add(model);
        console.log('Flower model loaded successfully');
      },
      (xhr) => {
        console.log((xhr.loaded / xhr.total) * 100 + '% loaded');
      },
      (error) => {
        console.error('Error loading flower model:', error);
      }
    );

    // Animation
    const animate = () => {
      requestAnimationFrame(animate);
      
      // Rotate glowing effect
      if (glowLight) {
        const time = Date.now() * 0.001;
        glowLight.position.x = Math.sin(time) * 2;
        glowLight.position.z = Math.cos(time) * 2;
        glowLight.position.y = Math.sin(time * 0.5);
      }

      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    // Handle window resize
    const handleResize = () => {
      camera.aspect = currentMount.clientWidth / currentMount.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(currentMount.clientWidth, currentMount.clientHeight);
    };
    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      currentMount.removeChild(renderer.domElement);
      scene.clear();
    };
  }, []);

  return <div ref={mountRef} style={{ 
    width: '200px',
    height: '300px',
    margin: 'auto'
  }} />;
};

export default GlowingFlower;
