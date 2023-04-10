import { useFrame } from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";
import { SVGLoader } from 'three/examples/jsm/loaders/SVGLoader';
import { Color,Euler,Group,Shape, Vector3 } from "three";
import { NextPage } from "next";


type svg_shape = {
    shape:Shape;
    color:Color;
}
const extrudeSettings = { depth: 28, bevelEnabled: true, bevelSegments: 9, steps: 2, bevelSize: 1, bevelThickness: 1 };

interface approval {
  let_in:boolean,
  setLet_in:React.Dispatch<React.SetStateAction<boolean>>;
}

const Plock:NextPage<approval> = ({let_in,setLet_in}) => {
  const padlock = useRef<Group>(null)
  useFrame(()=>{
    if(!let_in){
      padlock.current!.rotation.y += 0.03;
    }  
    else{
      const y = padlock.current!.rotation.y;
      if(y !== 0)
      {
        padlock.current!.rotation.y = 0;
        console.log("y set")
      }
    }    
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
        <group ref={padlock} position={[0,0,-2]} rotation={let_in ? [0,0,0] : [0,0,0]}>
          <group rotation={[Math.PI,0,0]} position={[-3.3,3.3,0]}>
          { 
            lock.map((l_part,index)=>
            <group scale={
                          index === 0 ? new Vector3(0.013,0.013,0.015) : 
                          index === 2 ? new Vector3(0.013,0.013,0.019) : 0.013} 
                          key={index}
                          position={
                            let_in && index === 1 ? [0,-1.5,0] : [0,0,0]
                          }
                          >
                <mesh>
                  <extrudeGeometry args={[l_part.shape,extrudeSettings]} />
                  <meshBasicMaterial color={index === 0 ? "#9f1e49" : "silver"}/>
                </mesh>
            </group>
            )
          }
          </group>
        </group>

{/*     <mesh>
      <boxGeometry args={[0.2,0.2,1]}/>
    </mesh>  */}
    </>
     );
}
 
export default Plock;