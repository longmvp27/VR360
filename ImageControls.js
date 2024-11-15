"use client"
import { useRef } from 'react' 
import { useFrame, useThree} from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei';
const ImageControls = (props) => {
    const {camera, gl} = useThree();
    const ref = useRef();
    
    useFrame(() => {
      if(ref.current) {
        ref.current.update();
      } 
    }); //update controls for every frame 
    return (
    <OrbitControls 
      ref={ref} 
      target={[0, 0, 0]} 
      {...props} 
      args={[camera, gl.domElement]}
    />
    );
  }
export default ImageControls