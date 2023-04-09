import { Canvas, useThree } from "@react-three/fiber";
import l from "../styles/Login.module.css";
import { Color } from "three";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

import React, { useEffect, useState } from "react";

const CameraController = () => {
    const { camera, gl } = useThree();
    useEffect(
      () => {
        const controls = new OrbitControls(camera, gl.domElement);
/*         controls.minDistance = 3;
        controls.maxDistance = 20; */
        return () => {
          controls.dispose();
        };
      },
      [camera, gl]
    );
    return null;
  };

const Padlock = () => {
    return (
    <div className={l.login_shell_padlock}>
        <Canvas>
        <CameraController/>
            <mesh>
                <boxGeometry args={[1,1,1]} />
                <meshStandardMaterial color={"red"}/>
            </mesh>
        </Canvas>
    </div>
      );
}
 
export default Padlock;