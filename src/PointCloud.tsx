import { extend, Object3DNode } from '@react-three/fiber'
import React from 'react';
import { shaderMaterial } from "@react-three/drei";
import vertexShader from './shaders/point-cloud/vertex.glsl';
import fragmentShader from './shaders/point-cloud/fragment.glsl';

const RadialTwistedRippleMaterial = shaderMaterial(
  {  }, vertexShader, fragmentShader, (mat) => {
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
  return (<mesh>
    <sphereGeometry args={[10, 64, 64]} attach="geometry"  />
    <radialTwistedRippleMaterial key={RadialTwistedRippleMaterial.key} attach="material"  />
  </mesh>);
}
