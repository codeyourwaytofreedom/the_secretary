
import { useFrame } from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";
import { SVGLoader } from 'three/examples/jsm/loaders/SVGLoader';
import { Color,Shape, Vector3 } from "three";


type svg_shape = {
    shape:Shape;
    color:Color;
}
const extrudeSettings = { depth: 28, bevelEnabled: true, bevelSegments: 9, steps: 2, bevelSize: 1, bevelThickness: 1 };

const Plock = () => {
    useFrame(()=>{
        
    })
    const[lock,setLock] = useState<svg_shape[]>([]);
    useEffect(() => {
      const loader = new SVGLoader();
      loader.load("/padlock2.svg", function(data){
          const padlock = data.paths.map((shp) => ({shape:SVGLoader.createShapes(shp)[0],color:shp.color }));
          setLock(padlock);
      });
    }, []);
    return ( 
        <>
       
        <group rotation={[Math.PI,0,0]} position={[-3.1,3.3,0]} scale={0.95}>
        { 
          lock.map((l_part,index)=>
          <group scale={
                        index === 0 ? new Vector3(0.013,0.013,0.014) : 
                        index === 2 ? new Vector3(0.013,0.013,0.019) : 0.013} 
                        key={index}
                        >
                    
              <mesh>
                <extrudeGeometry args={[l_part.shape,extrudeSettings]} />
                <meshBasicMaterial color={index === 0 ? "#9f1e49" : "#fecd51"}/>
              </mesh>
          </group>
          )
        }
    </group>
    <mesh>
      <boxGeometry/>
    </mesh> 
    </>
     );
}
 
export default Plock;