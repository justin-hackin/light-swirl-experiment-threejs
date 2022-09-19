import React, { useRef } from "react";
import { clock } from "./common";
import { Mesh } from "three";
import { useFrame } from "@react-three/fiber";

function useSawtooth(interval: number) {
  const elapsedTime = clock.getElapsedTime();
  const intervalsWithin = elapsedTime / interval;
  const remainder = elapsedTime - (Math.floor(intervalsWithin) * interval);
  return remainder / interval;
}

export function OrbitPointLight({ color, zPosition, orbitRadius, interval, offsetRatio = 0 }:
{ color: string, zPosition: number, orbitRadius: number, interval: number, offsetRatio?: number }
) {
  const meshRef = useRef<Mesh>(null!);
  useFrame(() => {
    const positionFraction = useSawtooth(interval) + offsetRatio;

    meshRef?.current?.position?.set(
      Math.cos(Math.PI * 2 * positionFraction) * orbitRadius,
      zPosition,
      Math.sin(Math.PI * 2 * positionFraction) * orbitRadius,
    );
  });


  return (<mesh ref={meshRef} scale={0.1}>
    <sphereGeometry  />
    <meshBasicMaterial color={color} />
    <pointLight color={color}  />
  </mesh>);
}
