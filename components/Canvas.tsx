import { Canvas, useFrame, useThree } from "@react-three/fiber";
import l from "../styles/Login.module.css";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { useEffect, useRef, useState } from "react";
import { SVGLoader } from 'three/examples/jsm/loaders/SVGLoader';
import { Color,Group,Shape, Vector3 } from "three";
import Test from "./test";

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


type svg_shape = {
    shape:Shape;
    color:Color;
}

const extrudeSettings = { depth: 28, bevelEnabled: true, bevelSegments: 9, steps: 2, bevelSize: 1, bevelThickness: 1 };


const Padlock = () => {

  const[lock,setLock] = useState<svg_shape[]>([]);
  useEffect(() => {
    const loader = new SVGLoader();
    loader.load("/padlock2.svg", function(data){
        const padlock = data.paths.map((shp) => ({shape:SVGLoader.createShapes(shp)[0],color:shp.color }));
        setLock(padlock);
    });
  }, []);

  return (
  <div className={l.login_shell_padlock}>
      <Canvas>
      <CameraController/>
      <Test/>
      </Canvas>
  </div>
    );
}
 
export default Padlock;