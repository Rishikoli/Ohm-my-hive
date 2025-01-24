import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import beeModel from '../assets/models/animated_bee_flying_landing_loop.glb';

const AnimatedBee = () => {
  const mountRef = useRef(null);
  const mixerRef = useRef(null);
  const controlsRef = useRef(null);
  const modelRef = useRef(null);
  
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
    camera.position.set(0, 0, 5);
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

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1.5);
    directionalLight.position.set(5, 5, 5);
    scene.add(directionalLight);

    // Add point lights for better illumination
    const pointLight1 = new THREE.PointLight(0xffffff, 1);
    pointLight1.position.set(-5, 5, 5);
    scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(0xffffff, 1);
    pointLight2.position.set(5, -5, 5);
    scene.add(pointLight2);

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
      beeModel,
      (gltf) => {
        const model = gltf.scene;
        modelRef.current = model;
        
        // Center the model
        const box = new THREE.Box3().setFromObject(model);
        const center = box.getCenter(new THREE.Vector3());
        model.position.sub(center);
        
        // Scale the model
        const scale = 0.3; // Reduced scale for smaller bee
        model.scale.set(scale, scale, scale);

        scene.add(modelRef.current);
        console.log('Bee model loaded successfully');

        // Handle animations
        if (gltf.animations && gltf.animations.length) {
          const mixer = new THREE.AnimationMixer(modelRef.current);
          mixerRef.current = mixer;
          
          // Play all animations
          gltf.animations.forEach(clip => {
            const action = mixer.clipAction(clip);
            action.setLoop(THREE.LoopRepeat);
            action.clampWhenFinished = false;
            action.timeScale = 1; // Normal speed
            action.play();
          });

          console.log('Animations loaded:', gltf.animations.length);
          gltf.animations.forEach((clip, index) => {
            console.log(`Animation ${index}:`, clip.name);
          });
        }
      },
      (xhr) => {
        console.log((xhr.loaded / xhr.total) * 100 + '% loaded');
      },
      (error) => {
        console.error('Error loading bee model:', error);
      }
    );

    // Animation loop
    let lastTime = 0;
    const animate = (time) => {
      requestAnimationFrame(animate);
      
      // Update mixer with proper delta time
      if (mixerRef.current) {
        const delta = (time - lastTime) * 0.001; // Convert to seconds
        mixerRef.current.update(delta);
        lastTime = time;
      }

      // Add some hovering motion to the model
      if (modelRef.current) {
        const hoverTime = time * 0.001;
        modelRef.current.position.y = Math.sin(hoverTime) * 0.1; // Gentle hovering
      }

      controls.update();
      renderer.render(scene, camera);
    };
    animate(0);

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
      if (mixerRef.current) {
        mixerRef.current.stopAllAction();
      }
    };
  }, []);

  return <div ref={mountRef} style={{ 
    width: '400px',
    height: '200px',
    margin: 'auto'
  }} />;
};

export default AnimatedBee;
