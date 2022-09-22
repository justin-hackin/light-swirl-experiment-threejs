import React from "react";
import { useControls } from "leva";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import { capitalize, lowerCase } from "lodash-es";
// TODO: why '?url' suffix needed when gltf in assetsInclude

import modelUrl from "./models/swirl.gltf?url";
import { Mesh, MeshStandardMaterial } from "three";
import { GLTF } from "three/examples/jsm/loaders/GLTFLoader";
import { OrbitPointLight } from "./OrbitPointLight";

type GLTFResult = GLTF & {
  nodes: {
    Swirl: Mesh
  }
}

const SURFACE_MATERIAL = new MeshStandardMaterial({ color: '#fff'});
const BASE_RADIUS = 4;
const BASE_HEIGHT = 0.1;
const BASE_SEGMENTS = 20;

const addNamesToControlsSchema = (schema: Record<string, Record<string, any>>):void => {
  Object.keys(schema).forEach((key) => {
    schema[key].label = capitalize(lowerCase(key));
  });
};
const controlsSchema = {
  firstSphereRotationInterval: { value: 13, min: 1, max: 20 },
  secondSphereRotationInterval: { value: 20, min: 1, max: 20 },
  rotationIntervalScale: { value: 0.5, min: 0.1, max: 3 },
  yPosition: { value: 0.5, min: 0.5, max: 5, step: 0.1 },
  showLightPosition: { value: true }
};
addNamesToControlsSchema(controlsSchema);

export function Scene() {
  const PARAMS = useControls(controlsSchema, {
    oneLineLabels: true,
  });

  const { nodes } = useGLTF(modelUrl) as unknown as GLTFResult;
  const radius = 3;

  return (
    <Canvas>
      <OrbitControls />
      <group position={[0, -2, 0]}>
        <OrbitPointLight
          color={"#ff00d5"} yPosition={PARAMS.yPosition} interval={PARAMS.firstSphereRotationInterval * PARAMS.rotationIntervalScale}
          orbitRadius={radius} offsetRatio={0.5} showPosition={PARAMS.showLightPosition} />
        <OrbitPointLight color={"#00e1ff"} yPosition={PARAMS.yPosition}
                         interval={PARAMS.secondSphereRotationInterval * PARAMS.rotationIntervalScale} orbitRadius={radius}
                         showPosition={PARAMS.showLightPosition} />
        <mesh geometry={nodes.Swirl.geometry} material={SURFACE_MATERIAL}>
          <ambientLight intensity={0.1} />
        </mesh>
        <mesh material={SURFACE_MATERIAL} position-y={(BASE_HEIGHT / 2)}>
          <cylinderGeometry args={[BASE_RADIUS, BASE_RADIUS, BASE_HEIGHT, BASE_SEGMENTS]} />
        </mesh>
      </group>
    </Canvas>
  );
}
