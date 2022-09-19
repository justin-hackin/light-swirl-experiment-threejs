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

export function OrbitPointLight({ color, yPosition, orbitRadius, interval, showPosition, offsetRatio = 0 }:
{ color: string, yPosition: number, orbitRadius: number, interval: number, showPosition: boolean, offsetRatio?: number }
) {
  const meshRef = useRef<Mesh>(null!);
  useFrame(() => {
    const positionFraction = useSawtooth(interval) + offsetRatio;

    meshRef?.current?.position?.set(
      Math.cos(Math.PI * 2 * positionFraction) * orbitRadius,
      yPosition,
      Math.sin(Math.PI * 2 * positionFraction) * orbitRadius,
    );
  });


  return (
    <mesh ref={meshRef} scale={0.1}>
      <pointLight color={color}  />
      { showPosition && (
        <mesh>
          <sphereGeometry  />
          <meshBasicMaterial color={color} />
        </mesh>
      )}
    </mesh>
    );
}
