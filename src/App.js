import React, { useState, useRef, useCallback } from 'react';
import { Canvas, useThree, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import gsap from 'gsap';
import MainIsland from './components/MainIsland';
import SmallIsland from './components/SmallIsland';
import IslandDescription from './components/IslandDescription';
import GlobalStyles from './GlobalStyles';

// Animation duration in seconds
const ANIMATION_DURATION = 1.0; // Change this value to adjust the speed

function Scene({ selectedIsland, handleIslandClick }) {
  const { camera } = useThree();
  const controlsRef = useRef();
  const previousCameraStateRef = useRef(null);
  const animatingRef = useRef(false);

  const animateCamera = useCallback((targetPosition) => {
    animatingRef.current = true;
    const startRotation = camera.rotation.clone();
    const startPosition = camera.position.clone();
    const targetRotation = new THREE.Euler(-0.4636, 0, 0);

    gsap.to({}, {
      duration: ANIMATION_DURATION,
      onUpdate: function() {
        const t = this.progress();
        camera.position.lerpVectors(startPosition, targetPosition, t);
        camera.rotation.set(
          THREE.MathUtils.lerp(startRotation.x, targetRotation.x, t),
          THREE.MathUtils.lerp(startRotation.y, targetRotation.y, t),
          THREE.MathUtils.lerp(startRotation.z, targetRotation.z, t)
        );
        camera.lookAt(0, 0, 0);
      },
      onComplete: () => {
        animatingRef.current = false;
        if (controlsRef.current) {
          controlsRef.current.update();
        }
      },
      ease: "power2.inOut"
    });
  }, [camera]);

  const setDefaultCamera = useCallback(() => {
    previousCameraStateRef.current = {
      position: camera.position.clone(),
      rotation: camera.rotation.clone()
    };
    animateCamera(new THREE.Vector3(0, 8, 15));
  }, [camera, animateCamera]);

  const restoreCamera = useCallback(() => {
    if (previousCameraStateRef.current) {
      animateCamera(previousCameraStateRef.current.position);
    }
  }, [animateCamera]);

  React.useEffect(() => {
    if (selectedIsland !== null) {
      setDefaultCamera();
      if (controlsRef.current) {
        controlsRef.current.enabled = false;
      }
    } else {
      restoreCamera();
      if (controlsRef.current) {
        controlsRef.current.enabled = true;
      }
    }
  }, [selectedIsland, setDefaultCamera, restoreCamera]);

  useFrame(() => {
    if (animatingRef.current && controlsRef.current) {
      controlsRef.current.update();
    }
  });

  const degToRad = (degrees) => degrees * (Math.PI / 180);

  return (
    <>
      <OrbitControls 
        ref={controlsRef}
        enableZoom={true} 
        enablePan={false} 
        minDistance={10} 
        maxDistance={20}
        minPolarAngle={degToRad(75)}
        maxPolarAngle={degToRad(90)}
      />
      <MainIsland isVisible={selectedIsland === null} />
      {[0, 1, 2, 3, 4].map((index) => (
        <SmallIsland
          key={index}
          index={index}
          onClick={() => handleIslandClick(index)}
          isSelected={selectedIsland === index}
          isVisible={selectedIsland === null || selectedIsland === index}
        />
      ))}
    </>
  );
}

function App() {
  const [selectedIsland, setSelectedIsland] = useState(null);

  const handleIslandClick = (island) => {
    setSelectedIsland(island);
  };

  const handleBackClick = () => {
    setSelectedIsland(null);
  };

  return (
    <>
      <GlobalStyles />
      <div style={{ width: '100vw', height: '100vh' }}>
        <Canvas camera={{ position: [0, 8, 15], fov: 60 }}>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} />
          <Scene selectedIsland={selectedIsland} handleIslandClick={handleIslandClick} />
        </Canvas>
        {selectedIsland !== null && (
          <IslandDescription island={`Island ${selectedIsland + 1}`} onBackClick={handleBackClick} />
        )}
      </div>
    </>
  );
}

export default App;