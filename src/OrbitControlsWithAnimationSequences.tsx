import { useControls } from "leva";
import { CameraControls } from "./CameraControls";
import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
// @ts-ignore
import Timeline = gsap.core.Timeline;
import { addNamesToControlsSchema } from "./Scene";

const BASE_DURATION = 10;
enum CAMERA_MODE {
  BIRDS_EYE_ZOOM='BIRDS_EYE_ZOOM',
  MERRY_GO_ROUND='MERRY_GO_ROUND',
  ORBIT_CONTROLS='ORBIT_CONTROLS',
}
export function OrbitControlsWithAnimationSequences () {
  const controlsSchema = {
    cameraMode: {
      value: CAMERA_MODE.ORBIT_CONTROLS,
      options: {
        'Orbit controls': CAMERA_MODE.ORBIT_CONTROLS,
        'Merry-go-round': CAMERA_MODE.MERRY_GO_ROUND,
        'Bird\'s eye zoom': CAMERA_MODE.BIRDS_EYE_ZOOM,
      },
    },
    animationDurationScale: { value: 1, min: 0.1, max: 10, step: 0.1 },
  };
  addNamesToControlsSchema(controlsSchema);
  const PARAMS = useControls(controlsSchema);

  const controlsRef = useRef<CameraControls>(null!);
  const [controlsEnabled, setControlsEnabled] = useState(true);
  const [loopedAnimation, setLoopedAnimation] = useState<Timeline | null>(null);

  useEffect(() => {
    console.log(controlsRef?.current?.polarAngle);
    setControlsEnabled(PARAMS.cameraMode === CAMERA_MODE.ORBIT_CONTROLS);
    if (loopedAnimation) {
      loopedAnimation.kill();
    }
    if (PARAMS.cameraMode === CAMERA_MODE.BIRDS_EYE_ZOOM) {
      (async() => {
        await gsap.to(controlsRef.current, { duration: 2, azimuthAngle: 0, polarAngle: 0, distance: 5,  ease: 'expo.out' });
        const tl = gsap.timeline({ repeat: -1 });
        tl.to(controlsRef.current, { duration: BASE_DURATION, repeat: -1, azimuthAngle: 2 * Math.PI , ease: 'none' }, 0);
        tl.to(controlsRef.current, { duration: BASE_DURATION, distance: 1, repeat: -1, yoyo: true, ease: 'sine.inOut' }, 0);
        setLoopedAnimation(tl);
      })();
    } else if (PARAMS.cameraMode === CAMERA_MODE.ORBIT_CONTROLS) {
      controlsRef.current.reset(true);
      setLoopedAnimation(null);
    } else if (PARAMS.cameraMode == CAMERA_MODE.MERRY_GO_ROUND) {
      (async() => {
        await controlsRef.current.reset(true);
        const tl = gsap.timeline({ repeat: -1 });
        tl.to(controlsRef.current, { duration: BASE_DURATION, repeat: -1, azimuthAngle: 2 * Math.PI , ease: 'none' }, 0);
        tl.to(controlsRef.current, { duration: BASE_DURATION, polarAngle: 0.9, repeat: -1, yoyo: true, ease: 'sine.inOut' }, 0);
        setLoopedAnimation(tl);
      })();
    }
  }, [PARAMS.cameraMode]);

  useEffect(() => {
    if (loopedAnimation) {
      loopedAnimation.timeScale(PARAMS.animationDurationScale);
    }
  }, [PARAMS.animationDurationScale]);

  useEffect(() => {
    controlsRef.current.enabled = controlsEnabled;
  }, [controlsEnabled]);

  useEffect(() => {
    console.log(controlsRef?.current?.polarAngle);
  }, [controlsRef?.current?.polarAngle]);

  return (<CameraControls ref={controlsRef} />);
}
