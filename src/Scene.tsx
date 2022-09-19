import React from "react";
import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'

export function Scene() {
  return (
      <Canvas>
        <OrbitControls />
        <mesh>
          <boxGeometry/>
          <meshStandardMaterial color={'#ff0000'} />
          <ambientLight intensity={0.1} />
          <directionalLight color="red" position={[0, 0, 5]} />
        </mesh>
      </Canvas>
  )

}

