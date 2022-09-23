import { OrbitControls, PerspectiveCamera, useAnimations } from "@react-three/drei";
import { useControls } from "leva";
import React, { useEffect, useRef, useState } from "react";
import { useThree } from "@react-three/fiber";
import { AnimationClip, Group, NumberKeyframeTrack, Vector3 } from "three";

enum CAMERA_MODE {
  BIRDS_EYE_ZOOM='BIRDS_EYE_ZOOM',
  MERRY_GO_ROUND='MERRY_GO_ROUND',
  ORBIT_CONTROLS='ORBIT_CONTROLS',
}
const DEFAULT_CAMERA_DIST = 7;
const CAMERA_POS = new Vector3(DEFAULT_CAMERA_DIST, 0, 0);
export function OrbitControlsWithAnimationSequences () {
  const { camera } = useThree();
  const orbitControlsRef = useRef(null!);
  const cameraRef = useRef(null!);
  const [controlsEnabled, setControlsEnabled] = useState(true);
  const PARAMS = useControls({
    cameraMode: {
      value: CAMERA_MODE.ORBIT_CONTROLS,
      options: {
        'Orbit controls': CAMERA_MODE.ORBIT_CONTROLS,
        'Merry-go-round': CAMERA_MODE.MERRY_GO_ROUND,
        'Bird\'s eye zoom': CAMERA_MODE.BIRDS_EYE_ZOOM,
      },
    },
    animationInterval: 5,
  });

  const { actions, ref: cameraGroupRef } = useAnimations([
    new AnimationClip(CAMERA_MODE.BIRDS_EYE_ZOOM, PARAMS.animationInterval, [
      new NumberKeyframeTrack('.position[y]',
        [0, PARAMS.animationInterval/2, PARAMS.animationInterval],
        [DEFAULT_CAMERA_DIST, 0, DEFAULT_CAMERA_DIST])
    ]),
    new AnimationClip(CAMERA_MODE.MERRY_GO_ROUND, PARAMS.animationInterval, [
      new NumberKeyframeTrack('.rotation[y]',
        [0, PARAMS.animationInterval],
        [0, Math.PI * 2])
    ]),
  ]);

  useEffect(() => {
    const cameraGroup = cameraGroupRef.current as Group;
    console.log(cameraGroup.position);
    const stopAll = () => {
      actions[CAMERA_MODE.MERRY_GO_ROUND]?.stop();
      actions[CAMERA_MODE.BIRDS_EYE_ZOOM]?.stop();
    };
    const isOrbit = PARAMS.cameraMode === CAMERA_MODE.ORBIT_CONTROLS;
    setControlsEnabled(isOrbit);
    camera.position.set(...CAMERA_POS.toArray());
    cameraGroup.position.set(0,0,0);
    cameraGroup.rotation.y = 0;
    camera.lookAt(0, 0, 0);
    stopAll();
    if (!isOrbit) {
      if (PARAMS.cameraMode === CAMERA_MODE.BIRDS_EYE_ZOOM) {
        camera.position.set(0, 0, 0);
        cameraGroup.position.set(0, DEFAULT_CAMERA_DIST, 0);
        camera.lookAt(0, 0, 0);
      }
      actions[PARAMS.cameraMode]?.play();

    } else {
      // @ts-ignore
      orbitControlsRef?.current?.update();
    }
  }, [PARAMS.cameraMode]);

  useEffect(() => {console.log(camera, cameraRef.current === camera )}, [camera]);

  return (<>
    <group ref={cameraGroupRef}>
      <PerspectiveCamera makeDefault ref={cameraRef} position={CAMERA_POS.toArray()} />
    </group>
    <OrbitControls makeDefault enabled={controlsEnabled} camera={camera}/>
  </>);
}
