import { extend, Object3DNode, useFrame } from "@react-three/fiber";
import React, { useRef, useState } from "react";
import { shaderMaterial } from "@react-three/drei";
import vertexShader from './shaders/point-cloud/vertex.glsl';
import fragmentShader from './shaders/point-cloud/fragment.glsl';
import { ShaderMaterial } from "three";
import { useControls } from "leva";

  const DEFAULT_INTERVAL = 50;
const RadialTwistedRippleMaterial = shaderMaterial(
  { uTime: 0, uInterval: DEFAULT_INTERVAL }, vertexShader, fragmentShader, (mat) => {
    if (mat) {
      mat.wireframe = true;
      mat.needsUpdate = true;
    }
  });

extend({ RadialTwistedRippleMaterial })

declare global {
  namespace JSX {
    interface IntrinsicElements {
      radialTwistedRippleMaterial: Object3DNode<typeof RadialTwistedRippleMaterial, typeof RadialTwistedRippleMaterial>;
    }
  }
}

export function PointCloud() {
  const PARAMS = useControls({
    uInterval: { value: DEFAULT_INTERVAL, min: 20, max: 100, step: 0.1, label: 'Grid wave interval' },
  });
  const [uTime, setUTime] = useState<number>(0);
  const [uInterval, setUInterval] = useState<number>(PARAMS.uInterval);

  useFrame(({ clock }) => {
    setUTime(clock.getElapsedTime());
    setUInterval(PARAMS.uInterval);
  });
  return (<mesh rotation-x={Math.PI/2}>
    <icosahedronGeometry args={[20, 16]} attach="geometry" />
    {/* @ts-ignore*/ }
    <radialTwistedRippleMaterial uTime={uTime} uInterval={uInterval} key={RadialTwistedRippleMaterial.key} attach="material"  />
  </mesh>);
}
