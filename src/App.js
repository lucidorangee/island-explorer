import React, { useState, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import MainIsland from './components/MainIsland';
import SmallIsland from './components/SmallIsland';
import IslandDescription from './components/IslandDescription';

function App() {
  const [selectedIsland, setSelectedIsland] = useState(null);
  const controlsRef = useRef();

  const handleIslandClick = (island) => {
    setSelectedIsland(island);
    if (controlsRef.current) {
      controlsRef.current.enabled = false;
    }
  };

  const handleBackClick = () => {
    setSelectedIsland(null);
    if (controlsRef.current) {
      controlsRef.current.enabled = true;
    }
  };

  const degToRad = (degrees) => degrees * (Math.PI / 180);

  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <Canvas camera={{ position: [0, 5, 10], fov: 75 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <OrbitControls 
          ref={controlsRef}
          enableZoom={true} 
          enablePan={false} 
          minDistance={5} 
          maxDistance={15}
          minPolarAngle={degToRad(80)}
          maxPolarAngle={degToRad(100)}
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
      </Canvas>
      {selectedIsland !== null && (
        <IslandDescription island={`Island ${selectedIsland + 1}`} onBackClick={handleBackClick} />
      )}
    </div>
  );
}

export default App;