import React from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
// TODO: why '?url' suffix needed when gltf in assetsInclude
import modelUrl from "./models/swirl.gltf?url";
import { Mesh } from "three";
import { GLTF } from "three/examples/jsm/loaders/GLTFLoader";
import { OrbitPointLight } from "./OrbitPointLight";

type GLTFResult = GLTF & {
  nodes: {
    Swirl: Mesh
  }
}

export function Scene() {
  const { nodes } = useGLTF(modelUrl) as unknown as GLTFResult;
  const interval = 5;
  const radius = 3;
  const zPosition = 2;

  return (
    <Canvas>
      <OrbitControls />
      <group position={[0, -2, 0]}>
        <OrbitPointLight color={"#ff00d5"} zPosition={zPosition} interval={interval} orbitRadius={radius} offsetRatio={0.2} />
        <OrbitPointLight color={"#00e1ff"} zPosition={zPosition} interval={interval} orbitRadius={radius} />
        <mesh geometry={nodes.Swirl.geometry}>
          <meshStandardMaterial color={"#fff"} />
          <ambientLight intensity={0.1} />
        </mesh>
      </group>
    </Canvas>
  );
}
