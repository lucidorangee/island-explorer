import React, { useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { useSpring, animated } from '@react-spring/three';

function SmallIsland({ index, onClick, isSelected, isVisible }) {
  const meshRef = useRef();
  const { viewport } = useThree();

  const initialPosition = [
    Math.cos((index / 5) * Math.PI * 2) * 5,
    0,
    Math.sin((index / 5) * Math.PI * 2) * 5
  ];

  const { position, scale, opacity } = useSpring({
    position: isSelected ? [-viewport.width / 4, 0, 0] : initialPosition,
    scale: isSelected ? 4 : 1,
    opacity: isVisible ? 1 : 0,
    config: { mass: 1, tension: 280, friction: 60 }
  });

  useFrame(() => {
    if (!isSelected) {
      meshRef.current.rotation.y += 0.01;
    }
  });

  return (
    <animated.mesh
      ref={meshRef}
      position={position}
      scale={scale}
      onClick={onClick}
    >
      <cylinderGeometry args={[0.5, 0.75, 0.5, 32]} />
      <animated.meshStandardMaterial color="lightgreen" transparent opacity={opacity} />
    </animated.mesh>
  );
}

export default SmallIsland;