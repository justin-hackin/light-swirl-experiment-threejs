import React from "react";
import { Canvas } from '@react-three/fiber'
import { OrbitControls, useGLTF } from '@react-three/drei';
// TODO: why '?url' suffix needed when gltf in assetsInclude
import modelUrl from './models/swirl.gltf?url';
import { Mesh } from "three";
import { GLTF } from "three/examples/jsm/loaders/GLTFLoader";

type GLTFResult = GLTF & {
  nodes: {
    Swirl: Mesh
  }
}

export function Scene() {
  const { nodes } = useGLTF(modelUrl) as unknown as GLTFResult;
  return (
    <Canvas>
      <OrbitControls />
        <mesh geometry={nodes.Swirl.geometry}>
          <meshStandardMaterial color={'#ff0000'} />
          <ambientLight intensity={0.1} />
          <directionalLight color="red" position={[0, 0, 5]} />
        </mesh>
    </Canvas>
  )
}
