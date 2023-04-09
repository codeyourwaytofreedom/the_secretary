import { Canvas, useThree } from "@react-three/fiber";
import l from "../styles/Login.module.css";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { useEffect, useState } from "react";
import { SVGLoader } from 'three/examples/jsm/loaders/SVGLoader';
import { useLoader } from '@react-three/fiber';
import { Color,Shape } from "three";

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


type svg_shape = {
    shape:Shape;
    color:Color;
}

const Padlock = () => {
  const[lock,setLock] = useState<svg_shape[]>([]);
  useEffect(() => {
    const loader = new SVGLoader();
    loader.load("/padlock.svg", function(data){
        const padlock = data.paths.map((shp) => ({shape:SVGLoader.createShapes(shp)[0],color:shp.color }));
        setLock(padlock);
    });
}, []);


    return (
    <div className={l.login_shell_padlock}>
        <Canvas>
        <CameraController/>
            <mesh>
              <boxGeometry args={[2,2,2]} />
              <meshBasicMaterial color={"navy"}/>
            </mesh>
        </Canvas>
    </div>
      );
}
 
export default Padlock;