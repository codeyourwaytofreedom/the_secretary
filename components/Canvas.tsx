import { Canvas, useThree } from "@react-three/fiber";
import l from "../styles/Login.module.css";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { useEffect, useRef, useState } from "react";
import Plock from "./plock";

const CameraController = () => {
    const { camera, gl } = useThree();
    useEffect(
      () => {
        const controls = new OrbitControls(camera, gl.domElement);
        controls.minPolarAngle = Math.PI / 2;
        controls.maxPolarAngle = Math.PI / 2;
        return () => {
          controls.dispose();
        };
      },
      [camera, gl]
    );
    return null;
};

const Animation_3D = () => {
  return (
  <div className={l.login_shell_padlock}>
      <Canvas>
      <CameraController/>
      <Plock/>
      </Canvas>
  </div>
    );
}
 
export default Animation_3D;