import React from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
// TODO: why '?url' suffix needed when gltf in assetsInclude

import modelUrl from "./models/swirl.gltf?url";
import { Mesh } from "three";
import { GLTF } from "three/examples/jsm/loaders/GLTFLoader";
import { OrbitPointLight } from "./OrbitPointLight";
import { useTweaks } from "use-tweaks";

type GLTFResult = GLTF & {
  nodes: {
    Swirl: Mesh
  }
}

export function Scene() {
  const PARAMS = useTweaks({
    interval1: { value: 13, min: 1, max: 20, },
    interval2: { value: 20, min: 1, max: 20, },
    intervalScale: { value: 0.5, min: 0.1, max: 3, },
    yPosition: { value: 0, min: 0, max: 5, step: 0.1 },
    showLightPosition: true,
  });

  const { nodes } = useGLTF(modelUrl) as unknown as GLTFResult;
  const radius = 3;

  return (
    <Canvas>
      <OrbitControls />
      <group position={[0, -2, 0]}>
        <OrbitPointLight
          color={"#ff00d5"} yPosition={PARAMS.yPosition} interval={PARAMS.interval1 * PARAMS.intervalScale } orbitRadius={radius} offsetRatio={0.5} showPosition={PARAMS.showLightPosition} />
        <OrbitPointLight color={"#00e1ff"} yPosition={PARAMS.yPosition} interval={PARAMS.interval2 * PARAMS.intervalScale } orbitRadius={radius} showPosition={PARAMS.showLightPosition} />
        <mesh geometry={nodes.Swirl.geometry}>
          <meshStandardMaterial color={"#fff"} />
          <ambientLight intensity={0.1} />
        </mesh>
      </group>
    </Canvas>
  );
}
