"use client"
import { useLoader } from '@react-three/fiber'
import * as THREE from 'three'
const Dome = () => {
  const px = useLoader(THREE.TextureLoader, '/img/px.jpg');
  const nx = useLoader(THREE.TextureLoader, '/img/nx.jpg');
  const py = useLoader(THREE.TextureLoader, '/img/py.jpg');
  const ny = useLoader(THREE.TextureLoader, '/img/ny.jpg');
  const pz = useLoader(THREE.TextureLoader, '/img/pz.jpg');
  const nz = useLoader(THREE.TextureLoader, '/img/nz.jpg');
  [px, nx, py, ny, pz, nz].forEach(texture => {
    texture.generateMipmaps = false; 
    texture.minFilter = THREE.LinearFilter; 
    texture.magFilter = THREE.LinearFilter;
  });
  const materials = [
    new THREE.MeshStandardMaterial({ map: px, side: THREE.BackSide }),
    new THREE.MeshStandardMaterial({ map: nx, side: THREE.BackSide }),
    new THREE.MeshStandardMaterial({ map: py, side: THREE.BackSide }),
    new THREE.MeshStandardMaterial({ map: ny, side: THREE.BackSide }),
    new THREE.MeshStandardMaterial({ map: pz, side: THREE.BackSide }),
    new THREE.MeshStandardMaterial({ map: nz, side: THREE.BackSide })
  ];
  
  return (
    <mesh material={materials}>
      <boxGeometry args={[500, 500, 500]} />
    </mesh>
  )
}
export default Dome