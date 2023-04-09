import { Canvas, useThree } from "@react-three/fiber";
import l from "../styles/Login.module.css";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { useEffect, useState } from "react";
import { SVGLoader } from 'three/examples/jsm/loaders/SVGLoader';
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
        <group rotation={[Math.PI,0,0]} position={[-3.4,3.5,0]}>
            { 
              lock.map((l_part,index)=>
              <group scale={0.013} position={[0,0,0]} key={index}>
                  <mesh>
                    <extrudeGeometry args={[l_part.shape,extrudeSettings]} />
                    <meshBasicMaterial color={l_part.color}/>
                  </mesh>
              </group>
              )
            }
        </group>
        <mesh>
          <boxGeometry/>
        </mesh>
        </Canvas>
    </div>
      );
}
 
export default Padlock;