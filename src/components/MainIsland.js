import React from 'react';
import { animated, useSpring } from '@react-spring/three';

function MainIsland({ isVisible }) {
  const { opacity } = useSpring({
    opacity: isVisible ? 1 : 0,
    config: { mass: 1, tension: 280, friction: 60 }
  });

  return (
    <animated.mesh position={[0, 0, 0]}>
      <cylinderGeometry args={[2, 2.5, 1, 32]} />
      <animated.meshStandardMaterial color="green" transparent opacity={opacity} />
    </animated.mesh>
  );
}

export default MainIsland;