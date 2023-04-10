import { Canvas, useThree } from "@react-three/fiber";
import l from "../styles/Login.module.css";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { useEffect, useRef, useState } from "react";
import Plock from "./plock";
import { NextPage } from "next";

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
interface approval {
  let_in:boolean,
  setLet_in:React.Dispatch<React.SetStateAction<boolean>>;
}
const Animation_3D:NextPage<approval> = ({let_in,setLet_in}) => {
  return (
  <div className={l.login_shell_padlock}>
      <Canvas>
      <Plock let_in={let_in} setLet_in={setLet_in}/>
      </Canvas>
  </div>
    );
}
 
export default Animation_3D;